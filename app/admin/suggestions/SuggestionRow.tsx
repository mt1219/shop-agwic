'use client'

import { useTransition } from 'react'
import { approveSuggestion, returnSuggestion, deleteSuggestion } from './actions'

type Suggestion = {
    id: string
    product_idea: string
    grievance: string | null
    author_name: string | null
    email: string | null
    status: string
    created_at: string
}

export function SuggestionRow({ suggestion }: { suggestion: Suggestion }) {
    const [pending, startTransition] = useTransition()

    function onApprove() {
        startTransition(() => approveSuggestion(suggestion.id))
    }
    function onReturn() {
        startTransition(() => returnSuggestion(suggestion.id))
    }
    function onDelete() {
        if (!confirm('Delete this suggestion permanently?')) return
        startTransition(() => deleteSuggestion(suggestion.id))
    }

    return (
        <div className={`p-4 ${pending ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0">
                    <p className="text-sm text-ink leading-relaxed">
                        {suggestion.product_idea}
                    </p>
                    {suggestion.grievance && (
                        <p className="text-xs text-ink-muted mt-1">
                            Solves: {suggestion.grievance}
                        </p>
                    )}
                    <p className="fine-print mt-2">
                        {suggestion.author_name ?? 'Anonymous'}
                        {suggestion.email && ` · ${suggestion.email}`}
                        {' · '}
                        {new Date(suggestion.created_at).toLocaleDateString()}
                    </p>
                </div>
                <span className="text-[10px] font-mono uppercase text-ink-muted shrink-0">
                    {suggestion.status}
                </span>
            </div>

            <div className="flex gap-2 flex-wrap text-xs">
                {suggestion.status !== 'APPROVED' && (
                    <button
                        onClick={onApprove}
                        disabled={pending}
                        className="px-3 h-7 bg-primary text-primary-ink rounded font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        Approve
                    </button>
                )}
                {suggestion.status !== 'RETURNED' && (
                    <button
                        onClick={onReturn}
                        disabled={pending}
                        className="px-3 h-7 border border-border rounded text-ink hover:border-ink transition-colors disabled:opacity-60"
                    >
                        Return
                    </button>
                )}
                {suggestion.status === 'PENDING_REVIEW' && (
                    <button
                        onClick={onDelete}
                        disabled={pending}
                        className="px-3 h-7 border border-warning rounded text-warning hover:bg-warning-bg transition-colors disabled:opacity-60"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}