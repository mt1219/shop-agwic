import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { submitSuggestion } from './actions'

export const metadata: Metadata = {
    title: 'The Suggestion Bin — AGWIC',
    description: 'Tell us what to make. We will consider it.',
}

async function getApprovedSuggestions() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return []

    const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data } = await supabase
        .from('product_requests')
        .select('id, product_idea, grievance, author_name, created_at, status')
        .eq('status', 'APPROVED')
        .order('created_at', { ascending: false })
        .limit(100)

    return data ?? []
}

export default function SuggestionsPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                The Suggestion Bin
            </h1>
            <p className="text-sm text-ink-muted mb-8">
                Tell us what to make. We will consider it.
            </p>

            <section className="border border-border bg-surface rounded p-5 mb-10">
                <h2 className="font-display text-lg text-ink mb-3">
                    Submit a suggestion
                </h2>
                <form action={submitSuggestion} className="space-y-3">
                    <div>
                        <label htmlFor="product_idea" className="block text-xs text-ink-muted mb-1">
                            Product idea
                        </label>
                        <input
                            id="product_idea"
                            name="product_idea"
                            type="text"
                            required
                            maxLength={500}
                            placeholder="A product that..."
                            className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                        />
                    </div>
                    <div>
                        <label htmlFor="grievance" className="block text-xs text-ink-muted mb-1">
                            The grievance it solves (optional)
                        </label>
                        <input
                            id="grievance"
                            name="grievance"
                            type="text"
                            placeholder="Whistlers. Slow drivers. Leaf blowers."
                            className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="author_name" className="block text-xs text-ink-muted mb-1">
                                Name (optional)
                            </label>
                            <input
                                id="author_name"
                                name="author_name"
                                type="text"
                                className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs text-ink-muted mb-1">
                                Email (optional, not published)
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="h-9 px-4 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Submit suggestion
                    </button>
                    <p className="fine-print">
                        Suggestions are reviewed by the Content Review Team.
                    </p>
                </form>
            </section>

            <section>
                <h2 className="font-display text-xl text-ink mb-4">
                    Recent suggestions
                </h2>
                <Suspense fallback={<SuggestionsSkeleton />}>
                    <SuggestionsList />
                </Suspense>
            </section>
        </div>
    )
}

async function SuggestionsList() {
    const suggestions = await getApprovedSuggestions()

    if (suggestions.length === 0) {
        return (
            <div className="border border-border bg-surface rounded p-10 text-center">
                <p className="font-display text-lg text-ink mb-2">
                    The Suggestion Bin is empty.
                </p>
                <p className="text-sm text-ink-muted">
                    The Content Review Team has nothing to review. The Content Review
                    Team is reviewing anyway.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {suggestions.map((s) => (
                <article key={s.id} className="border border-border bg-surface rounded p-4">
                    <p className="text-sm text-ink leading-relaxed mb-2">
                        {s.product_idea}
                    </p>
                    {s.grievance && (
                        <p className="text-xs text-ink-muted mb-2">
                            Solves: {s.grievance}
                        </p>
                    )}
                    <p className="fine-print">
                        {s.author_name} · {new Date(s.created_at).toLocaleDateString()}
                    </p>
                </article>
            ))}
        </div>
    )
}

function SuggestionsSkeleton() {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-stripe rounded" />
            ))}
        </div>
    )
}