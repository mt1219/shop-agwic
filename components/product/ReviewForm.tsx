'use client'

import { useState, useTransition } from 'react'
import { submitReview, type SubmitReviewResult } from '@/app/product/[slug]/actions'

export function ReviewForm({ productSlug }: { productSlug: string }) {
    const [rating, setRating] = useState<number | null>(null)
    const [hover, setHover] = useState<number | null>(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [pending, startTransition] = useTransition()
    const [result, setResult] = useState<SubmitReviewResult | null>(null)

    function onSubmit(formData: FormData) {
        startTransition(async () => {
            const res = await submitReview(formData)
            setResult(res)
            if (res.ok) {
                setRating(null)
                setTitle('')
                setBody('')
            }
        })
    }

    if (result?.ok) {
        return (
            <div className="p-4 border border-border bg-stripe rounded">
                <p className="text-sm font-semibold text-ink mb-2">
                    Your review has been received.
                </p>
                <p className="text-xs text-ink-muted leading-relaxed mb-2">
                    It has been routed to the Content Review Team (CRT) for quality
                    assurance and alignment with AGWIC community standards. The CRT
                    reviews submissions within 2–3 business days. You will not be
                    notified when your review is approved.
                </p>
                <p className="fine-print font-mono">
                    Status: PENDING_REVIEW
                </p>
                <button
                    type="button"
                    onClick={() => setResult(null)}
                    className="mt-3 text-xs text-primary underline underline-offset-2"
                >
                    Submit another
                </button>
            </div>
        )
    }

    return (
        <form action={onSubmit} className="p-4 border border-border bg-stripe rounded space-y-3">
            <input type="hidden" name="productSlug" value={productSlug} />
            <input type="hidden" name="rating" value={rating ?? ''} />

            <div>
                <p className="text-sm font-semibold text-ink mb-1">Write a review</p>
                <p className="text-xs text-ink-muted">
                    Submissions are reviewed for quality, relevance, and alignment with
                    AGWIC community standards.
                </p>
            </div>

            <div>
                <label className="block text-xs text-ink-muted mb-1">
                    Rate your experience (optional)
                </label>
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => {
                        const active = (hover ?? rating ?? 0) >= n
                        return (
                            <button
                                key={n}
                                type="button"
                                onMouseEnter={() => setHover(n)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(rating === n ? null : n)}
                                className={`text-xl leading-none transition-colors ${active ? 'text-accent' : 'text-ink-muted'
                                    }`}
                                style={active ? { color: '#ffd166' } : undefined}
                                aria-label={`${n} star${n === 1 ? '' : 's'}`}
                            >
                                {active ? '★' : '☆'}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div>
                <label htmlFor="title" className="block text-xs text-ink-muted mb-1">
                    Title (optional)
                </label>
                <input
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={120}
                    className="w-full min-w-0 block px-3 h-9 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                    placeholder="Summarize your experience"
                />
            </div>

            <div>
                <label htmlFor="body" className="block text-xs text-ink-muted mb-1">
                    Review
                </label>
                <textarea
                    id="body"
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    maxLength={2000}
                    rows={4}
                    className="w-full min-w-0 block px-3 py-2 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink resize-y"
                    placeholder="Tell us about your experience with this product."
                />
                <p className="fine-print mt-1">{body.length} / 2000</p>
            </div>

            {result?.ok === false && (
                <p className="text-xs text-warning">{result.error}</p>
            )}

            <button
                type="submit"
                disabled={pending || body.trim().length < 2}
                className="h-9 px-4 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
                {pending ? 'Submitting…' : 'Submit review'}
            </button>

            <p className="fine-print">
                The Content Review Team has forwarded your review to the Customer Success Specialist
            </p>
        </form>
    )
}