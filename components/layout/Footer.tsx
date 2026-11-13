import Link from 'next/link'
import { cacheLife } from 'next/cache'

async function getCurrentYear(): Promise<number> {
    'use cache'
    cacheLife('max')
    return new Date().getFullYear()
}

const columns = [
    {
        heading: 'Shop',
        links: [
            { label: 'All Products', href: '/shop' },
            { label: 'New Arrivals', href: '/shop?sort=newest' },
            { label: 'Best Sellers', href: '/shop?sort=best' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' },
        ],
    },
    {
        heading: 'Help',
        links: [
            { label: 'Shipping', href: '/legal/terms#shipping' },
            { label: 'Returns', href: '/legal/terms#returns' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { label: 'Terms of Service', href: '/legal/terms' },
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Cookie Policy', href: '/legal/cookies' },
            { label: 'Accessibility', href: '/legal/accessibility' },
        ],
    },
]

export async function Footer() {
    const year = await getCurrentYear()

    return (
        <footer className="w-full border-t border-border bg-surface mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {columns.map((col) => (
                        <div key={col.heading}>
                            <h3 className="font-sans text-xs uppercase tracking-wide text-ink-muted mb-3">
                                {col.heading}
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {col.links.map((l) => (
                                    <li key={l.href + l.label}>
                                        <Link href={l.href} className="text-ink hover:text-primary transition-colors">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="fine-print mt-10 pt-6 border-t border-border space-y-2">
                    <p>
                        AGWIC is a subsidiary of American Global Worldwide International Commerce, which is a
                        subsidiary of AGWIC.
                    </p>
                    <p>
                        This is a parody store. Nothing here is for sale. Do not cork, guillotine, or otherwise
                        engage a whistler, a squirrel, or a noisy neighbor.{' '}
                        <Link href="/legal/terms">See full legal terms for details.</Link> We&apos;re serious
                        about that part.
                    </p>
                    <p>
                        © {year} American Global Worldwide International Commerce. All rights reserved. All
                        wrongs reversed.
                    </p>
                </div>
            </div>
        </footer>
    )
}