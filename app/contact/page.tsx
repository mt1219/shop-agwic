import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Contact — AGWIC',
    description: 'Contact AGWIC. We are here to help.',
}

export default function ContactPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                Contact Us
            </h1>
            <p className="text-sm text-ink-muted mb-8">
                We are here to help. We are always here to help.
            </p>

            <div className="space-y-8 text-sm leading-relaxed text-ink">
                {/* Chat */}
                <section className="border border-border bg-surface rounded p-5">
                    <h2 className="font-display text-lg text-ink mb-2">Chat with us</h2>
                    <p className="text-ink-muted mb-3">
                        The fastest way to reach a Customer Success Specialist. Available
                        all hours. The Customer Success Specialist is always available. The
                        Customer Success Specialist is on a call.
                    </p>
                    <p className="fine-print">
                        Click the Support button in the bottom-right corner of any page to
                        start a chat.
                    </p>
                </section>

                {/* Phone */}
                <section className="border-t border-border pt-6">
                    <h2 className="font-display text-lg text-ink mb-2">Call us</h2>
                    <p className="text-ink-muted mb-2">
                        Our phone lines are open Monday through Friday, 9:00 AM to 5:00 PM
                        Eastern, excluding federal holidays, non-federal holidays, and
                        Tuesdays.
                    </p>
                    <p className="font-mono text-sm text-ink mb-2">1-800-AGWIC-00</p>
                    <p className="fine-print">
                        If the number does not connect, you have dialed the correct number.
                        Please check that you have dialed the correct number. The number is
                        correct.
                    </p>
                </section>

                {/* Email */}
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
                        <li>
                            <span className="font-semibold text-ink">Whistlers:</span>{' '}
                            <Link
                                href="/legal/terms#whistlers"
                                className="text-primary underline underline-offset-2"
                            >
                                Please see §8
                            </Link>
                        </li>
                        <li>
                            <span className="font-semibold text-ink">Squirrels:</span>{' '}
                            <Link
                                href="/product/humane-squirrel-eliminator"
                                className="text-primary underline underline-offset-2"
                            >
                                Please see the Humane Squirrel Eliminator™
                            </Link>
                        </li>
                    </ul>
                    <p className="fine-print mt-3">
                        All email addresses are monitored by the Content Review Team. The Content Review Team has forwarded your request to the Customer Success Specialist
                    </p>
                </section>

                {/* FAQ */}
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
                        The office is closed to the public on all days the office is closed.
                    </p>
                </section>

                {/* Footer note */}
                <p className="fine-print pt-6 border-t border-border">
                    AGWIC is a subsidiary of American Global Worldwide International
                    Commerce, which is a subsidiary of AGWIC. Please do not contact the parent company. The parent company is watching a mandatory training video.
                </p>
            </div>
        </article>
    )
}