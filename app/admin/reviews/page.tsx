import Link from 'next/link'
import { Suspense } from 'react'
import { connection } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { ReviewRow } from './ReviewRow'

export const metadata: Metadata = {
    title: 'Content Review Queue — AGWIC',
    robots: { index: false, follow: false },
}

async function getReviews(productFilter?: string) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return { configured: false as const }

    const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    })

    let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)

    if (productFilter) {
        // When filtering by product, show everything (including approved + seeds)
        query = query.eq('product_slug', productFilter)
    } else {
        // Default queue: only non-seed reviews
        query = query.eq('is_seed', false)
    }

    const { data, error } = await query
    if (error) {
        console.error('[admin/reviews] query error:', error.message)
        return { configured: true as const, reviews: [] }
    }
    return { configured: true as const, reviews: data ?? [] }
}

export default function AdminReviewsPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>
}) {
    return (
        <div className="max-w-6xl">
            <header className="mb-6">
                <h1 className="font-display text-3xl text-ink mb-1">
                    Content Review Queue
                </h1>
                <p className="text-sm text-ink-muted">
                    The Content Review Team is reviewing. The Content Review Team is
                    always reviewing.
                </p>
            </header>

            <Suspense fallback={<QueueSkeleton />}>
                <QueueContent searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

async function QueueContent({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>
}) {
    await connection()
    const { product } = await searchParams
    const data = await getReviews(product)

    if (!data.configured) {
        return (
            <div className="border border-border bg-surface rounded p-8">
                <p className="text-sm text-ink">
                    Supabase is not configured. The Content Review Team is aware.
                </p>
            </div>
        )
    }

    const pending = data.reviews.filter((r) => r.status === 'PENDING_REVIEW')
    const returned = data.reviews.filter((r) => r.status === 'RETURNED')
    const escalated = data.reviews.filter((r) => r.status === 'ESCALATED')

    const tabs = [
        { key: 'pending', label: 'Pending', rows: pending },
        { key: 'returned', label: 'Returned', rows: returned },
        { key: 'escalated', label: 'Escalated', rows: escalated },
    ]

    const totalActionable = pending.length + returned.length + escalated.length

    return (
        <div className="space-y-6">
            {/* Product filter */}
            <form method="GET" className="flex gap-2">
                <input
                    name="product"
                    defaultValue={product ?? ''}
                    placeholder="Filter by product slug (e.g. the-original-cork)"
                    className="flex-1 min-w-0 block px-3 h-9 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                />
                <button
                    type="submit"
                    className="px-4 h-9 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Filter
                </button>
                {product && (
                    <Link
                        href="/admin/reviews"
                        className="px-4 h-9 border border-border rounded text-sm text-ink hover:border-ink transition-colors inline-flex items-center"
                    >
                        Clear
                    </Link>
                )}
            </form>

            {/* Status counts */}
            <div className="grid grid-cols-3 gap-3">
                {tabs.map((t) => (
                    <div key={t.key} className="border border-border bg-surface rounded p-3">
                        <p className="text-xs uppercase text-ink-muted">{t.label}</p>
                        <p className="font-display text-2xl text-ink">{t.rows.length}</p>
                    </div>
                ))}
            </div>

            {product ? (
                <p className="fine-print">
                    Showing all reviews for <span className="font-mono">{product}</span>{' '}
                    ({totalActionable} actionable, {data.reviews.length - totalActionable}{' '}
                    approved or other).{' '}
                    <Link href="/admin/reviews" className="underline">
                        Show queue only
                    </Link>
                </p>
            ) : (
                <p className="fine-print">
                    Showing non-seed reviews only. Seed reviews are approved by
                    definition and do not require moderation. {totalActionable} actionable
                    review{totalActionable === 1 ? '' : 's'} in the queue.
                </p>
            )}

            {/* Queues */}
            {tabs.map((t) => {
                if (t.rows.length === 0) return null
                return (
                    <section key={t.key} className="border border-border bg-surface rounded">
                        <div className="p-4 border-b border-border">
                            <h2 className="font-display text-xl text-ink">
                                {t.label} ({t.rows.length})
                            </h2>
                        </div>
                        <div className="divide-y divide-border">
                            {t.rows.map((r) => (
                                <ReviewRow key={r.id} review={r} />
                            ))}
                        </div>
                    </section>
                )
            })}

            {product && (
                <section className="border border-border bg-surface rounded">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-display text-xl text-ink">
                            Approved ({data.reviews.filter((r) => r.status === 'APPROVED').length})
                        </h2>
                        <p className="fine-print mt-1">
                            Approved reviews appear on the public product page. You can add a
                            response to any of them.
                        </p>
                    </div>
                    {data.reviews.filter((r) => r.status === 'APPROVED').length === 0 ? (
                        <p className="p-6 text-sm text-ink-muted">
                            No approved reviews for this product.
                        </p>
                    ) : (
                        <div className="divide-y divide-border">
                            {data.reviews
                                .filter((r) => r.status === 'APPROVED')
                                .map((r) => (
                                    <ReviewRow key={r.id} review={r} />
                                ))}
                        </div>
                    )}
                </section>
            )}

            {data.reviews.length === 0 && (
                <div className="border border-border bg-surface rounded p-10 text-center">
                    <p className="font-display text-xl text-ink mb-2">
                        {product ? 'No reviews for this product.' : 'The queue is empty.'}
                    </p>
                    <p className="text-sm text-ink-muted">
                        {product
                            ? 'No reviews for this product. The Content Review Team has forwarded your request to the Customer Success Specialist.'
                            : 'The queue is empty. The Content Review Team has forwarded your request to the Customer Success Specialist. The Customer Success Specialist has forwarded your request back to the Content Review Team.'}
                    </p>
                </div>
            )}
        </div>
    )
}

function QueueSkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-10 bg-stripe rounded" />
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-stripe rounded" />
                ))}
            </div>
            <div className="h-64 bg-stripe rounded" />
        </div>
    )
}