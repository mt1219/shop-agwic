import { Suspense } from 'react'
import { connection } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { SuggestionRow } from './SuggestionRow'

export const metadata: Metadata = {
    title: 'Suggestion Bin — AGWIC',
    robots: { index: false, follow: false },
}

async function getSuggestions() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return { configured: false as const }

    const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data } = await supabase
        .from('product_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)

    return { configured: true as const, suggestions: data ?? [] }
}

export default function AdminSuggestionsPage() {
    return (
        <div className="max-w-6xl">
            <header className="mb-6">
                <h1 className="font-display text-3xl text-ink mb-1">
                    Suggestion Bin
                </h1>
                <p className="text-sm text-ink-muted">
                    Suggestions are reviewed by the Content Review Team.
                </p>
            </header>

            <Suspense fallback={<Skeleton />}>
                <Content />
            </Suspense>
        </div>
    )
}

async function Content() {
    await connection()
    const data = await getSuggestions()

    if (!data.configured) {
        return (
            <div className="border border-border bg-surface rounded p-8">
                <p className="text-sm text-ink">
                    Supabase is not configured.
                </p>
            </div>
        )
    }

    const pending = data.suggestions.filter((s) => s.status === 'PENDING_REVIEW')
    const approved = data.suggestions.filter((s) => s.status === 'APPROVED')
    const returned = data.suggestions.filter((s) => s.status === 'RETURNED')

    const tabs = [
        { key: 'pending', label: 'Pending', rows: pending },
        { key: 'approved', label: 'Approved', rows: approved },
        { key: 'returned', label: 'Returned', rows: returned },
    ]

    const total = data.suggestions.length

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
                {tabs.map((t) => (
                    <div key={t.key} className="border border-border bg-surface rounded p-3">
                        <p className="text-xs uppercase text-ink-muted">{t.label}</p>
                        <p className="font-display text-2xl text-ink">{t.rows.length}</p>
                    </div>
                ))}
            </div>

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
                            {t.rows.map((s) => (
                                <SuggestionRow key={s.id} suggestion={s} />
                            ))}
                        </div>
                    </section>
                )
            })}

            {total === 0 && (
                <div className="border border-border bg-surface rounded p-10 text-center">
                    <p className="font-display text-xl text-ink mb-2">
                        The Suggestion Bin is empty.
                    </p>
                    <p className="text-sm text-ink-muted">
                        No suggestions have been submitted.
                    </p>
                </div>
            )}
        </div>
    )
}

function Skeleton() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-stripe rounded" />
                ))}
            </div>
            <div className="h-64 bg-stripe rounded" />
        </div>
    )
}