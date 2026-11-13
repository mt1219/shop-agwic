'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, FormEvent } from 'react'

export function SearchBar() {
    const router = useRouter()
    const params = useSearchParams()
    const [q, setQ] = useState(params.get('q') ?? '')

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        const trimmed = q.trim()
        if (!trimmed) {
            router.push('/shop')
            return
        }
        router.push(`/shop?q=${encodeURIComponent(trimmed)}`)
    }

    return (
        <form onSubmit={onSubmit} role="search" className="w-full">
            <label htmlFor="site-search" className="sr-only">
                Search products
            </label>
            <div className="flex w-full border border-border rounded-md overflow-hidden bg-surface focus-within:border-ink transition-colors">
                <input
                    id="site-search"
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search AGWIC"
                    className="flex-1 min-w-0 block w-full px-3 h-9 text-sm bg-transparent outline-none placeholder:text-ink-muted"
                />
                <button
                    type="submit"
                    className="px-3 h-9 text-sm bg-stripe text-ink-muted hover:text-ink transition-colors border-l border-border"
                >
                    Search
                </button>
            </div>
        </form>
    )
}