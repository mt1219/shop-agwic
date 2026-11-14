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

async function getDashboardData() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
        return { configured: false as const }
    }

    const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    })

    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const [pv7d, sessions7d, topPages, topProducts, recent] = await Promise.all([
        supabase
            .from('events')
            .select('*', { count: 'exact', head: true })
            .eq('event_name', 'page-view')
            .gte('created_at', since7d),
        supabase
            .from('events')
            .select('session_id')
            .gte('created_at', since7d)
            .not('session_id', 'is', null),
        supabase
            .from('events')
            .select('page')
            .eq('event_name', 'page-view')
            .gte('created_at', since7d),
        supabase
            .from('events')
            .select('product_slug, event_name')
            .gte('created_at', since7d)
            .not('product_slug', 'is', null),
        supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(30),
    ])

    const uniqueSessions = new Set(
        (sessions7d.data ?? []).map((r) => r.session_id).filter(Boolean),
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
            pv7d: pv7d.count ?? 0,
            sessions7d: uniqueSessions,
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

export default async function AnalyticsPage() {
    const data = await getDashboardData()

    if (!data.configured) {
        return (
            <div className="max-w-5xl">
                <h1 className="font-display text-3xl text-ink mb-1">Analytics</h1>
                <p className="text-sm text-ink-muted mb-8">
                    Pre-launch. No data yet. No bandwidth yet.
                </p>
                <div className="border border-border bg-surface rounded p-8">
                    <p className="text-sm text-ink">
                        Supabase is not configured. Once connected, page views, clicks, and
                        product activity will appear here.
                    </p>
                    <p className="fine-print mt-4">
                        The Content Review Team is aware. The Content Review Team is
                        looking into it. The Content Review Team is not looking into it.
                    </p>
                </div>
            </div>
        )
    }

    const stats: Stat[] = [
        { label: 'Page views (7d)', value: data.stats.pv7d.toLocaleString() },
        { label: 'Unique sessions (7d)', value: data.stats.sessions7d.toLocaleString() },
        { label: 'Top page (7d)', value: data.topPages[0]?.[0] ?? '—' },
        {
            label: 'Top product (7d)',
            value: data.topProducts[0]?.[0] ?? '—',
            hint: data.topProducts[0]
                ? `${data.topProducts[0][1].views} views`
                : undefined,
        },
    ]

    return (
        <div className="max-w-5xl">
            <h1 className="font-display text-3xl text-ink mb-1">Analytics</h1>
            <p className="text-sm text-ink-muted mb-8">
                Last 7 days. All numbers are approximations of the truth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                    <StatCard key={s.label} stat={s} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <section className="border border-border bg-surface rounded p-5">
                    <h2 className="font-display text-xl text-ink mb-3">Top Pages (7d)</h2>
                    {data.topPages.length === 0 ? (
                        <p className="text-sm text-ink-muted">
                            No page views yet. The Content Review Team is aware.
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
                    <h2 className="font-display text-xl text-ink mb-3">Top Products (7d)</h2>
                    {data.topProducts.length === 0 ? (
                        <p className="text-sm text-ink-muted">
                            No product activity yet. The Content Review Team is preparing.
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
        </div>
    )
}