import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AGWIC Staff Dashboard',
    robots: { index: false, follow: false },
}

export default function AdminHomePage() {
    return (
        <div className="max-w-5xl">
            <h1 className="font-display text-3xl text-ink mb-1">Staff Dashboard</h1>
            <p className="text-sm text-ink-muted mb-8">
                Welcome back. The Content Review Team is aware of your return.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/admin/analytics"
                    className="block p-6 border border-border bg-surface rounded hover:border-ink transition-colors"
                >
                    <h2 className="font-display text-xl text-ink mb-1">Analytics</h2>
                    <p className="text-sm text-ink-muted">
                        Page views, clicks, top products. Bandwidth permitting.
                    </p>
                </Link>

                <div className="block p-6 border border-border bg-stripe rounded opacity-60 cursor-not-allowed">
                    <h2 className="font-display text-xl text-ink mb-1">
                        Content Review Queue
                    </h2>
                    <p className="text-sm text-ink-muted">
                        Pending submissions. Coming soon. The CRT is preparing.
                    </p>
                </div>

                <div className="block p-6 border border-border bg-stripe rounded opacity-60 cursor-not-allowed">
                    <h2 className="font-display text-xl text-ink mb-1">Email Composer</h2>
                    <p className="text-sm text-ink-muted">
                        Send emails via Resend. Coming soon.
                    </p>
                </div>

                <div className="block p-6 border border-border bg-stripe rounded opacity-60 cursor-not-allowed">
                    <h2 className="font-display text-xl text-ink mb-1">Signups</h2>
                    <p className="text-sm text-ink-muted">
                        View collected email addresses. Coming soon.
                    </p>
                </div>
            </div>
        </div>
    )
}