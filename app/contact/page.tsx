import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { submitContact } from './actions'

export const metadata: Metadata = {
    title: 'Contact — AGWIC',
    description: 'Contact AGWIC. We are here to help.',
}

// Page shell: synchronous, prerenderable
export default function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ submitted?: string; error?: string }>
}) {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                Contact Us
            </h1>
            <p className="text-sm text-ink-muted mb-8">
                We are here to help. We are always here to help.
            </p>

            <Suspense fallback={<ContactContentSkeleton />}>
                <ContactContent searchParams={searchParams} />
            </Suspense>
        </article>
    )
}

// Child: async, awaits searchParams inside Suspense
async function ContactContent({
    searchParams,
}: {
    searchParams: Promise<{ submitted?: string; error?: string }>
}) {
    const { submitted, error } = await searchParams

    return (
        <div className="space-y-8 text-sm leading-relaxed text-ink">


            {error && (
                <div className="p-3 border border-warning bg-warning-bg rounded text-sm text-warning">
                    Please include a valid email and a message.
                </div>
            )}

            {/* Chat section */}
            <section className="border border-border bg-surface rounded p-5">
                <h2 className="font-display text-lg text-ink mb-2">Chat with us</h2>
                <p className="text-ink-muted mb-3">
                    The fastest way to reach a Customer Success Specialist. Available all hours. The Customer Success Specialist is always available. The Customer Success Specialist is on a call.
                </p>
                <p className="fine-print">
                    Click the Support button in the bottom-right corner of any page to start a chat.
                </p>
            </section>

            {/* Contact form */}
            <section className="border-t border-border pt-6">

                {submitted && (
                    <div className="p-3 border border-border bg-sky-100 rounded text-sm mb-3">
                        <p className="font-semibold text-ink mb-1">
                            Your message has been received.
                        </p>
                        <p className="text-ink-muted">
                            It has been routed to the Customer Success Specialist. The Customer Success Specialist is on a call. Please allow 4–6 weeks for the Customer Success Specialist to return the call.
                        </p>
                    </div>
                )}
                <h2 className="font-display text-lg text-ink mb-2">Send a message</h2>
                <p className="text-ink-muted mb-3">
                    The message goes to the Customer Success Specialist. The Customer Success Specialist is on a call.
                </p>
                <form action={submitContact} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="name" className="block text-xs text-ink-muted mb-1">
                                Name (optional)
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs text-ink-muted mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-xs text-ink-muted mb-1">
                            Subject (optional)
                        </label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            className="w-full min-w-0 block px-3 h-9 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-xs text-ink-muted mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="w-full min-w-0 block px-3 py-2 text-base sm:text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink resize-y"
                        />
                    </div>
                    <button
                        type="submit"
                        className="h-9 px-4 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Send message
                    </button>
                </form>
            </section>

            {/* Phone section */}
            <section className="border-t border-border pt-6">
                <h2 className="font-display text-lg text-ink mb-2">Call us</h2>
                <p className="text-ink-muted mb-2">
                    Our phone lines are open Monday through Friday, 9:00 AM to 5:00 PM Eastern, excluding federal holidays, non-federal holidays, and Tuesdays.
                </p>
                <p className="font-mono text-sm text-ink mb-2">1-800-AGWIC-00</p>
                <p className="fine-print">
                    If the number does not connect, you have dialed the correct number.
                    Please check that you have dialed the correct number. The number is
                    correct.
                </p>
            </section>

            {/* Email section */}
            <section className="border-t border-border pt-6">
                <h2 className="font-display text-lg text-ink mb-2">Email us</h2>
                <p className="text-ink-muted mb-3">
                    For general inquiries, please email{' '}
                    <span className="font-mono">hello@shopagwic.com</span>. We respond
                    to all inquiries. We respond to all inquiries personally.
                </p>
                <ul className="space-y-2 text-sm">
                    <li>
                        <span className="font-semibold text-ink">General:</span>{' '}
                        <span className="font-mono text-ink-muted">hello@shopagwic.com</span>
                    </li>
                    <li>
                        <span className="font-semibold text-ink">Press:</span>{' '}
                        <span className="font-mono text-ink-muted">press@shopagwic.com</span>
                    </li>
                    <li>
                        <span className="font-semibold text-ink">Legal:</span>{' '}
                        <span className="font-mono text-ink-muted">legal@shopagwic.com</span>
                    </li>
                </ul>
                <p className="fine-print mt-3">
                    All email addresses are monitored by the Content Review Team. The Content Review Team is in a huddle.
                </p>
            </section>

            {/* FAQ link */}
            <section className="border-t border-border pt-6">
                <h2 className="font-display text-lg text-ink mb-2">Help Center</h2>
                <p className="text-ink-muted">
                    Most questions can be answered by our{' '}
                    <Link href="/faq" className="text-primary underline underline-offset-2">
                        Frequently Asked Questions
                    </Link>
                    . The Frequently Asked Questions are frequently asked. They are
                    frequently asked by the same person.
                </p>
            </section>

            {/* Address */}
            <section className="border-t border-border pt-6">
                <h2 className="font-display text-lg text-ink mb-2">
                    Corporate Headquarters
                </h2>
                <p className="text-ink-muted">
                    AGWIC
                    <br />
                    1 Synergy Plaza
                    <br />
                    Wilmington, DE 19801
                    <br />
                    United States
                </p>
                <p className="fine-print mt-2">
                    The office is closed to the public. The office is closed to the
                    public on all days the office is closed.
                </p>
            </section>

            <p className="fine-print pt-6 border-t border-border">
                AGWIC is a subsidiary of American Global Worldwide International
                Commerce, which is a subsidiary of AGWIC. Please do not contact the
                parent company. The parent company is in a meeting.
            </p>
        </div>
    )
}

function ContactContentSkeleton() {
    return (
        <div className="space-y-6">
            <div className="h-24 bg-stripe rounded" />
            <div className="h-48 bg-stripe rounded" />
            <div className="h-32 bg-stripe rounded" />
        </div>
    )
}