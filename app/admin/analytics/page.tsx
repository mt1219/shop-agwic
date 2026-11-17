import { Suspense } from 'react'
import { connection } from 'next/server'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'

export const metadata: Metadata = {
    title: 'AGWIC Analytics',
    robots: { index: false, follow: false },
}

type Stat = { label: string; value: string; hint?: string }

type RecentEvent = {
    id: string
    event_name: string
    page: string | null
    product_slug: string | null
    session_id: string | null
    created_at: string
}

type DashboardData = Awaited<ReturnType<typeof getDashboardData>>

const RANGES = [
    { value: '1', label: '1 day' },
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
]

async function getDashboardData(days: number) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
        return { configured: false as const }
    }

    const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    })

    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    const [pv, sessions, topPages, topProducts, recent] = await Promise.all([
        supabase
            .from('events')
            .select('*', { count: 'exact', head: true })
            .eq('event_name', 'page-view')
            .gte('created_at', since),
        supabase
            .from('events')
            .select('session_id')
            .gte('created_at', since)
            .not('session_id', 'is', null),
        supabase
            .from('events')
            .select('page')
            .eq('event_name', 'page-view')
            .gte('created_at', since),
        supabase
            .from('events')
            .select('product_slug, event_name')
            .gte('created_at', since)
            .not('product_slug', 'is', null),
        supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(30),
    ])

    const uniqueSessions = new Set(
        (sessions.data ?? []).map((r) => r.session_id).filter(Boolean),
    ).size

    const pageCounts = new Map<string, number>()
    for (const r of topPages.data ?? []) {
        if (!r.page) continue
        pageCounts.set(r.page, (pageCounts.get(r.page) ?? 0) + 1)
    }
    const topPagesSorted = Array.from(pageCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

    const productCounts = new Map<string, { views: number; adds: number; buys: number }>()
    for (const r of topProducts.data ?? []) {
        if (!r.product_slug) continue
        const entry =
            productCounts.get(r.product_slug) ?? { views: 0, adds: 0, buys: 0 }
        if (r.event_name === 'product-view') entry.views++
        else if (r.event_name === 'add-to-cart-click') entry.adds++
        else if (r.event_name === 'buy-click') entry.buys++
        productCounts.set(r.product_slug, entry)
    }
    const topProductsSorted = Array.from(productCounts.entries())
        .sort((a, b) => b[1].views - a[1].views)
        .slice(0, 10)

    return {
        configured: true as const,
        stats: {
            pv: pv.count ?? 0,
            sessions: uniqueSessions,
        },
        topPages: topPagesSorted,
        topProducts: topProductsSorted,
        recent: (recent.data ?? []) as RecentEvent[],
    }
}

function StatCard({ stat }: { stat: Stat }) {
    return (
        <div className="border border-border bg-surface rounded p-5">
            <p className="text-xs uppercase tracking-wide text-ink-muted mb-1">
                {stat.label}
            </p>
            <p className="font-display text-3xl text-ink break-all">{stat.value}</p>
            {stat.hint && <p className="fine-print mt-1">{stat.hint}</p>}
        </div>
    )
}

function RangeFilter({ current }: { current: string }) {
    return (
        <div className="flex gap-1.5 mb-6">
            {RANGES.map((r) => (
                <Link
                    key={r.value}
                    href={`/admin/analytics?days=${r.value}`}
                    className={`h-8 px-3 text-xs rounded border flex items-center transition-colors ${current === r.value
                            ? 'bg-primary text-primary-ink border-primary font-semibold'
                            : 'bg-surface text-ink-muted border-border hover:border-ink-muted'
                        }`}
                >
                    {r.label}
                </Link>
            ))}
        </div>
    )
}

function AnalyticsSkeleton() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-border bg-surface rounded p-5">
                        <div className="h-3 bg-stripe rounded w-2/3 mb-2" />
                        <div className="h-8 bg-stripe rounded w-1/2" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {[1, 2].map((i) => (
                    <div key={i} className="border border-border bg-surface rounded p-5 h-48" />
                ))}
            </div>
            <div className="border border-border bg-surface rounded p-5 h-64" />
        </div>
    )
}

export default function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ days?: string }>
}) {
    return (
        <div className="max-w-5xl">
            <h1 className="font-display text-3xl text-ink mb-1">Analytics</h1>
            <p className="text-sm text-ink-muted mb-6">
                All numbers are approximations of the truth.
            </p>

            <Suspense fallback={<AnalyticsSkeleton />}>
                <AnalyticsContent searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

async function AnalyticsContent({
    searchParams,
}: {
    searchParams: Promise<{ days?: string }>
}) {
    await connection()
    const { days: daysParam } = await searchParams
    const days = Math.max(1, Math.min(365, Number(daysParam) || 7))
    const current = String(days)

    const data = await getDashboardData(days)

    if (!data.configured) {
        return (
            <div className="border border-border bg-surface rounded p-8">
                <p className="text-sm text-ink">
                    Supabase is not configured. Once connected, page views, clicks, and
                    product activity will appear here.
                </p>
                <p className="fine-print mt-4">
                    The Content Review Team is aware. The Content Review Team is looking
                    into it. The Content Review Team is not looking into it.
                </p>
            </div>
        )
    }

    const stats: Stat[] = [
        { label: `Page views (${days}d)`, value: data.stats.pv.toLocaleString() },
        { label: `Unique sessions (${days}d)`, value: data.stats.sessions.toLocaleString() },
        { label: `Top page (${days}d)`, value: data.topPages[0]?.[0] ?? '—' },
        {
            label: `Top product (${days}d)`,
            value: data.topProducts[0]?.[0] ?? '—',
            hint: data.topProducts[0]
                ? `${data.topProducts[0][1].views} views`
                : undefined,
        },
    ]

    return (
        <>
            <RangeFilter current={current} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                    <StatCard key={s.label} stat={s} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <section className="border border-border bg-surface rounded p-5">
                    <h2 className="font-display text-xl text-ink mb-3">
                        Top Pages ({days}d)
                    </h2>
                    {data.topPages.length === 0 ? (
                        <p className="text-sm text-ink-muted">
                            No page views in this range. The Content Review Team is aware.
                        </p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs uppercase text-ink-muted">
                                    <th className="pb-2">Path</th>
                                    <th className="pb-2 text-right">Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.topPages.map(([path, count]) => (
                                    <tr key={path} className="border-t border-border">
                                        <td className="py-2 pr-2 break-all">{path}</td>
                                        <td className="py-2 text-right tabular-nums">{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>

                <section className="border border-border bg-surface rounded p-5">
                    <h2 className="font-display text-xl text-ink mb-3">
                        Top Products ({days}d)
                    </h2>
                    {data.topProducts.length === 0 ? (
                        <p className="text-sm text-ink-muted">
                            No product activity in this range. The Content Review Team is
                            preparing.
                        </p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs uppercase text-ink-muted">
                                    <th className="pb-2">Product</th>
                                    <th className="pb-2 text-right">Views</th>
                                    <th className="pb-2 text-right">Adds</th>
                                    <th className="pb-2 text-right">Buys</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.topProducts.map(([slug, counts]) => (
                                    <tr key={slug} className="border-t border-border">
                                        <td className="py-2 pr-2 break-all">{slug}</td>
                                        <td className="py-2 text-right tabular-nums">{counts.views}</td>
                                        <td className="py-2 text-right tabular-nums">{counts.adds}</td>
                                        <td className="py-2 text-right tabular-nums">{counts.buys}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>

            <section className="border border-border bg-surface rounded p-5">
                <h2 className="font-display text-xl text-ink mb-3">Recent Events</h2>
                {data.recent.length === 0 ? (
                    <p className="text-sm text-ink-muted">
                        No events yet. Events will appear here once someone visits the site
                        and Supabase is connected.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-left text-ink-muted uppercase">
                                    <th className="pb-2 pr-2">Time</th>
                                    <th className="pb-2 pr-2">Event</th>
                                    <th className="pb-2 pr-2">Page</th>
                                    <th className="pb-2 pr-2">Product</th>
                                    <th className="pb-2">Session</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recent.map((e) => (
                                    <tr key={e.id} className="border-t border-border">
                                        <td className="py-1.5 pr-2 tabular-nums whitespace-nowrap">
                                            {new Date(e.created_at).toLocaleTimeString()}
                                        </td>
                                        <td className="py-1.5 pr-2 font-mono">{e.event_name}</td>
                                        <td className="py-1.5 pr-2 break-all">{e.page ?? '—'}</td>
                                        <td className="py-1.5 pr-2 break-all">{e.product_slug ?? '—'}</td>
                                        <td className="py-1.5 font-mono text-ink-muted">
                                            {e.session_id?.slice(0, 8) ?? '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    )
}