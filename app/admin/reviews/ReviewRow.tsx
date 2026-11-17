'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
    approveReview,
    returnReview,
    escalateReview,
    addAdminComment,
    deleteReview,
} from './actions'

type Review = {
    id: string
    product_slug: string
    author_name: string
    rating: number | null
    title: string | null
    body: string
    status: string
    is_seed: boolean
    created_at: string
    admin_comment: string | null
    admin_commented_at: string | null
}

export function ReviewRow({ review }: { review: Review }) {
    const [pending, startTransition] = useTransition()
    const [commentOpen, setCommentOpen] = useState(false)
    const [comment, setComment] = useState(review.admin_comment ?? '')
    const [saved, setSaved] = useState(false)

    function onApprove() {
        startTransition(() => approveReview(review.id, review.product_slug))
    }
    function onReturn() {
        startTransition(() => returnReview(review.id))
    }
    function onEscalate() {
        startTransition(() => escalateReview(review.id))
    }
    function onDelete() {
        if (!confirm('Delete this review permanently? This cannot be undone.')) return
        startTransition(() => deleteReview(review.id, review.product_slug))
    }
    function onSaveComment() {
        startTransition(async () => {
            await addAdminComment(review.id, comment)
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        })
    }

    return (
        <div className={`p-4 ${pending ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0">
                    <p className="text-xs text-ink-muted mb-1">
                        <Link href={`/product/${review.product_slug}`} className="text-primary underline">
                            {review.product_slug}
                        </Link>
                        {' · '}
                        {new Date(review.created_at).toLocaleDateString()}
                        {review.is_seed && ' · seed'}
                    </p>
                    <p className="text-sm font-semibold text-ink">
                        {review.author_name}
                        {review.rating != null && (
                            <span className="ml-2" style={{ color: '#ffd166' }}>
                                {'★'.repeat(review.rating)}
                            </span>
                        )}
                    </p>
                    {review.title && (
                        <p className="text-sm text-ink mt-0.5">{review.title}</p>
                    )}
                </div>
                <span className="text-[10px] font-mono uppercase text-ink-muted shrink-0">
                    {review.status}
                </span>
            </div>

            <p className="text-sm text-ink leading-relaxed mb-3">{review.body}</p>

            {review.admin_comment && (
                <div className="border-l-2 border-primary pl-3 mb-3">
                    <p className="text-xs font-semibold text-primary mb-1">
                        Response from the Content Review Team
                    </p>
                    <p className="text-sm text-ink">{review.admin_comment}</p>
                    {review.admin_commented_at && (
                        <p className="fine-print mt-1">
                            {new Date(review.admin_commented_at).toLocaleDateString()}
                        </p>
                    )}
                </div>
            )}

            <div className="flex gap-2 flex-wrap text-xs">
                {review.status !== 'APPROVED' && (
                    <button
                        onClick={onApprove}
                        disabled={pending}
                        className="px-3 h-7 bg-primary text-primary-ink rounded font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        Approve
                    </button>
                )}
                {review.status !== 'RETURNED' && (
                    <button
                        onClick={onReturn}
                        disabled={pending}
                        className="px-3 h-7 border border-border rounded text-ink hover:border-ink transition-colors disabled:opacity-60"
                    >
                        Return for Revision
                    </button>
                )}
                {review.status !== 'ESCALATED' && (
                    <button
                        onClick={onEscalate}
                        disabled={pending}
                        className="px-3 h-7 border border-border rounded text-ink hover:border-ink transition-colors disabled:opacity-60"
                    >
                        Escalate
                    </button>
                )}
                <button
                    onClick={() => setCommentOpen((o) => !o)}
                    className="px-3 h-7 border border-border rounded text-ink hover:border-ink transition-colors"
                >
                    {review.admin_comment ? 'Edit Response' : 'Respond'}
                </button>
                {review.status === 'PENDING_REVIEW' && (
                    <button
                        onClick={onDelete}
                        disabled={pending}
                        className="px-3 h-7 border border-warning rounded text-warning hover:bg-warning-bg transition-colors disabled:opacity-60"
                    >
                        Delete
                    </button>
                )}
            </div>

            {commentOpen && (
                <div className="mt-3 border-t border-border pt-3">
                    <label className="text-xs uppercase tracking-wide text-ink-muted mb-1 block">
                        Response from the Content Review Team
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        maxLength={1000}
                        className="w-full min-w-0 block px-3 py-2 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink resize-y"
                        placeholder="Respond on behalf of the Content Review Team."
                    />
                    <div className="flex gap-2 mt-2 items-center">
                        <button
                            onClick={onSaveComment}
                            disabled={pending}
                            className="px-3 h-7 bg-primary text-primary-ink rounded text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                        >
                            Save Response
                        </button>
                        <button
                            onClick={() => setCommentOpen(false)}
                            className="px-3 h-7 border border-border rounded text-xs text-ink hover:border-ink transition-colors"
                        >
                            Cancel
                        </button>
                        {saved && <span className="text-xs text-primary">Saved.</span>}
                    </div>
                </div>
            )}
        </div>
    )
}