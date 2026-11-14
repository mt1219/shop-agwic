import Link from 'next/link'
import type { ReactNode } from 'react'

const nav = [
    { href: '/admin', label: 'Home' },
    { href: '/admin/analytics', label: 'Analytics' },
    { href: '/admin/reviews', label: 'Content Review Queue', badge: 'soon' },
    { href: '/admin/emails', label: 'Email Composer', badge: 'soon' },
    { href: '/admin/signups', label: 'Signups', badge: 'soon' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <aside className="w-64 border-r border-border bg-surface hidden md:flex flex-col">
                <div className="h-14 flex items-center px-4 border-b border-border">
                    <Link href="/admin" className="font-display text-lg tracking-tight">
                        <span className="text-primary">A</span>GWIC
                        <span className="text-xs text-ink-muted ml-2">Staff</span>
                    </Link>
                </div>

                <nav className="flex-1 py-4">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-ink hover:bg-stripe transition-colors"
                        >
                            <span>{item.label}</span>
                            {item.badge === 'soon' && (
                                <span className="text-[10px] uppercase text-ink-muted">Soon</span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="px-4 py-3 border-t border-border fine-print">
                    The Content Review Team is very tired.
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="h-14 border-b border-border bg-surface flex items-center px-6">
                    <p className="text-sm text-ink-muted">
                        AGWIC Internal — Authorized Personnel Only
                    </p>
                </header>

                <div className="flex-1 p-6 lg:p-10">{children}</div>
            </div>
        </div>
    )
}