'use client'

import Link from 'next/link'

export function SortSelectMobile({
    activeCategory,
    query,
    current,
}: {
    activeCategory?: string
    query?: string
    current: string
}) {
    const options = [
        { value: 'newest', label: 'Newest' },
        { value: 'price-asc', label: 'Price ↑' },
        { value: 'price-desc', label: 'Price ↓' },
        { value: 'name', label: 'Name' },
    ]

    return (
        <div className="flex gap-1.5 overflow-x-auto -mx-4 px-4 pb-1">
            {options.map((opt) => {
                const qs = new URLSearchParams()
                if (activeCategory) qs.set('category', activeCategory)
                if (query) qs.set('q', query)
                if (opt.value !== 'default') qs.set('sort', opt.value)
                const href = `/shop${qs.toString() ? `?${qs.toString()}` : ''}`
                const isActive = current === opt.value

                return (
                    <Link
                        key={opt.value}
                        href={href}
                        className={`shrink-0 h-8 px-3 text-xs rounded-full border flex items-center whitespace-nowrap transition-colors ${isActive
                            ? 'bg-primary text-primary-ink border-primary font-semibold'
                            : 'bg-surface text-ink-muted border-border hover:border-ink-muted'
                            }`}
                    >
                        {opt.label}
                    </Link>
                )
            })}
        </div>
    )
}