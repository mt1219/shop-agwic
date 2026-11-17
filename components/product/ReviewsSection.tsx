import type { Product } from '@/lib/products/types'
import { getApprovedReviews } from '@/lib/reviews'
import { ReviewForm } from './ReviewForm'

export async function ReviewsSection({ product }: { product: Product }) {
    const reviews = await getApprovedReviews(product.slug)

    // Histogram from real, approved reviews
    const counts = [0, 0, 0, 0, 0] // index 0 = 1 star
    let ratingSum = 0
    let ratingCount = 0
    for (const r of reviews) {
        if (r.rating != null) {
            counts[r.rating - 1]++
            ratingSum += r.rating
            ratingCount++
        }
    }
    const total = reviews.length
    const avg = ratingCount > 0 ? ratingSum / ratingCount : 0

    return (
        <section className="border-t border-border pt-8 mt-8">
            <h2 className="font-display text-2xl text-ink mb-4">Customer reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-8">
                {/* Histogram */}
                <div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="font-display text-3xl text-ink">
                            {avg > 0 ? avg.toFixed(1) : '—'}
                        </span>
                        <span className="text-sm text-ink-muted">out of 5</span>
                    </div>
                    <p className="text-sm text-ink-muted mb-3">
                        {total} global rating{total === 1 ? '' : 's'}
                    </p>

                    <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const n = counts[stars - 1]
                            const pct = ratingCount > 0 ? (n / ratingCount) * 100 : 0
                            return (
                                <div key={stars} className="flex items-center gap-2 text-xs">
                                    <span className="text-ink-muted w-8">{stars} star</span>
                                    <div className="flex-1 h-3 bg-stripe rounded overflow-hidden">
                                        <div
                                            className="h-full"
                                            style={{ width: `${pct}%`, backgroundColor: '#ffd166' }}
                                        />
                                    </div>
                                    <span className="text-ink-muted w-6 text-right">{Math.round(pct)}%</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Form first, then reviews */}
                <div>
                    <div className="mb-6">
                        <ReviewForm productSlug={product.slug} />
                    </div>

                    <h3 className="text-sm font-semibold text-ink mb-3">
                        Reviews from the United States
                    </h3>

                    {reviews.length === 0 ? (
                        <p className="text-sm text-ink-muted">
                            No approved reviews yet. The Content Review Team has been notified.
                            The Content Review Team has not been notified.
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((r) => (
                                <article key={r.id} className="border-t border-border pt-4">
                                    <header className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-ink">
                                            {r.author_name}
                                        </span>
                                        {r.verified_purchase && (
                                            <span className="text-[10px] text-primary">
                                                Verified Purchase
                                            </span>
                                        )}
                                    </header>
                                    <div className="flex items-center gap-1 mb-1">
                                        {r.rating != null && (
                                            <span style={{ color: '#ffd166' }}>
                                                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                                            </span>
                                        )}
                                        {r.title && (
                                            <span className="text-sm font-semibold text-ink">
                                                {r.title}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-ink-muted mb-2">
                                        Reviewed on {new Date(r.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm leading-relaxed text-ink">{r.body}</p>

                                    {r.admin_comment && (
                                        <div className="mt-3 pl-3 border-l-2 border-primary">
                                            <p className="text-xs font-semibold text-primary mb-1">
                                                Response from the Content Review Team
                                            </p>
                                            <p className="text-sm text-ink leading-relaxed">
                                                {r.admin_comment}
                                            </p>
                                        </div>
                                    )}

                                    {r.helpful_count > 0 && (
                                        <p className="fine-print mt-2">
                                            {r.helpful_count} people found this helpful
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}