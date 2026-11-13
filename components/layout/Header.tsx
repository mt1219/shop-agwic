import Link from 'next/link'
import { SearchBar } from './SearchBar'
import { categories } from '@/lib/categories'
import { Suspense } from 'react'

export function Header() {
    return (
        <header className="w-full border-b border-border bg-surface">
            {/* Free shipping strip */}
            <div className="bg-stripe text-center text-[11px] text-ink-muted py-1.5 px-4 tracking-wide">
                FREE SHIPPING ON ORDERS OVER $0 · EVERY ORDER QUALIFIES ·{' '}
                <Link href="/legal/terms#shipping" className="underline underline-offset-2">
                    SEE TERMS
                </Link>
            </div>

            {/* Main header row */}
            <div className="mx-auto max-w-7xl px-4 h-14 flex items-center gap-4">
                <Link href="/" className="font-display text-2xl tracking-tight text-ink shrink-0">
                    <span className="text-primary">A</span>GWIC
                </Link>

                <div className="flex-1 max-w-2xl">
                    <Suspense fallback={<div className="h-9" />}>
                        <SearchBar />
                    </Suspense>
                </div>

                <nav className="hidden md:flex items-center gap-4 text-sm text-ink-muted">
                    <Link href="/shop" className="hover:text-ink transition-colors">
                        All Products
                    </Link>
                    <Link href="/account" className="hover:text-ink transition-colors" aria-label="Account">
                        Account
                    </Link>
                    <Link href="/cart" className="hover:text-ink transition-colors relative" aria-label="Cart">
                        Cart
                        <span className="absolute -top-2 -right-3 text-[10px] bg-primary text-primary-ink rounded-full w-4 h-4 flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </nav>
            </div>

            {/* Category nav */}
            <nav className="border-t border-border bg-surface">
                <div className="mx-auto max-w-7xl px-4 overflow-x-auto">
                    <ul className="flex items-center gap-5 h-10 text-[13px] text-ink-muted whitespace-nowrap">
                        {categories.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={`/shop?category=${c.slug}`}
                                    className="hover:text-ink transition-colors"
                                >
                                    {c.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}