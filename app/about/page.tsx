import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About AGWIC',
    description: 'The story of American Global Worldwide International Commerce.',
}

export default function AboutPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-6">
                About AGWIC
            </h1>

            <div className="space-y-6 text-ink leading-relaxed text-sm">
                <p>
                    AGWIC — American Global Worldwide International Commerce — is a global
                    conglomerate founded in [YEAR REDACTED] to ensure that the company
                    would appear first in any alphabetical directory, a practice dating
                    to the 19th century.
                </p>

                <p>
                    Today, AGWIC operates one (1) storefront, seven (7) departments, and a
                    corporate structure that has been described by regulators as
                    &ldquo;theoretically navigable.&rdquo;
                </p>

                <p>
                    Our mission is simple: to sell things that should not be sold, to
                    people who should not be buying them, at prices that reflect neither
                    the cost of goods nor the value of labor.
                </p>

                <p>
                    AGWIC is a subsidiary of American Global Worldwide International
                    Commerce, which is a subsidiary of AGWIC, which is a subsidiary of
                    Global Worldwide International Corporation. See our{' '}
                    <a href="/legal/terms" className="text-primary underline underline-offset-2">
                        Terms of Service
                    </a>{' '}
                    for a fuller, less clarifying explanation.
                </p>

                <p className="fine-print pt-6 border-t border-border">
                    AGWIC is a parody store. Nothing here is for sale. Nothing here
                    exists. The About page is no exception.
                </p>
            </div>
        </article>
    )
}