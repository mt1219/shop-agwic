import type { Product } from '@/lib/products/types'

export function ReviewsSection({ product }: { product: Product }) {
    // Seed reviews from the product file (until Supabase is connected)
    const reviews = product.seedReviews

    // Histogram
    const counts = [0, 0, 0, 0, 0] // index 0 = 1 star, index 4 = 5 stars
    for (const r of reviews) counts[r.rating - 1]++
    const total = reviews.length
    const avg = total > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
        : 0

    return (
        <section className="border-t border-border pt-8 mt-8">
            <h2 className="font-display text-2xl text-ink mb-4">Customer reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8">
                <div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="font-display text-3xl text-ink">{avg.toFixed(1)}</span>
                        <span className="text-sm text-ink-muted">out of 5</span>
                    </div>
                    <p className="text-sm text-ink-muted mb-3">
                        {total} global rating{total === 1 ? '' : 's'}
                    </p>

                    <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const n = counts[stars - 1]
                            const pct = total > 0 ? (n / total) * 100 : 0
                            return (
                                <div key={stars} className="flex items-center gap-2 text-xs">
                                    <span className="text-ink-muted w-8">{stars} star</span>
                                    <div className="flex-1 h-3 bg-stripe rounded overflow-hidden">
                                        <div
                                            className="h-full bg-accent"
                                            style={{ width: `${pct}%`, backgroundColor: '#ffd166' }}
                                        />
                                    </div>
                                    <span className="text-ink-muted w-6 text-right">{Math.round(pct)}%</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-ink mb-3">
                        Reviews from the United States
                    </h3>
                    <div className="space-y-6">
                        {reviews.map((r, i) => (
                            <article key={i} className="border-t border-border pt-4">
                                <header className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-ink">
                                        {r.authorName}
                                    </span>
                                    {r.verifiedPurchase && (
                                        <span className="text-[10px] text-primary">
                                            Verified Purchase
                                        </span>
                                    )}
                                </header>
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="text-accent" style={{ color: '#ffd166' }}>
                                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                                    </span>
                                    <span className="text-sm font-semibold text-ink">
                                        {r.title}
                                    </span>
                                </div>
                                <p className="text-xs text-ink-muted mb-2">
                                    Reviewed on {r.createdAt}
                                </p>
                                <p className="text-sm leading-relaxed text-ink">{r.body}</p>
                                {r.helpfulCount !== undefined && r.helpfulCount > 0 && (
                                    <p className="fine-print mt-2">
                                        {r.helpfulCount} people found this helpful
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 p-4 border border-border bg-stripe rounded">
                        <p className="text-sm font-semibold text-ink mb-1">
                            Write a review
                        </p>
                        <p className="text-xs text-ink-muted mb-2">
                            Your review will be submitted to the Content Review Team (CRT).
                            The CRT reviews submissions within 2–3 business days. You will not
                            be notified when your review is approved.
                        </p>
                        <button
                            disabled
                            className="mt-2 px-4 h-8 bg-surface border border-border rounded text-xs text-ink-muted cursor-not-allowed"
                        >
                            Write a review (coming soon)
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}