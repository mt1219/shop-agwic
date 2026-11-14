import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact — AGWIC',
    description: 'Contact AGWIC. Please do not.',
}

export default function ContactPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-6">
                Contact Us
            </h1>

            <div className="space-y-6 text-sm leading-relaxed text-ink">
                <p>
                    Please do not contact us. We are a parody store. We do not have
                    customer service representatives, because we do not have customers,
                    because we do not have products, because none of this is real.
                </p>

                <p>
                    If you have an urgent question about a product, the product page has
                    a Q&amp;A section. The Q&amp;A section is also fictional, but it is
                    more responsive than our nonexistent customer service.
                </p>

                <div className="border-t border-border pt-6 space-y-3">
                    <div>
                        <p className="font-semibold">General Inquiries</p>
                        <p className="fine-print">hello@shopagwic.com (does not exist)</p>
                    </div>
                    <div>
                        <p className="font-semibold">Press</p>
                        <p className="fine-print">press@shopagwic.com (does not exist)</p>
                    </div>
                    <div>
                        <p className="font-semibold">Legal</p>
                        <p className="fine-print">legal@shopagwic.com (does not exist)</p>
                    </div>
                    <div>
                        <p className="font-semibold">Whistlers</p>
                        <p className="fine-print">Please see §8 of the Terms.</p>
                    </div>
                    <div>
                        <p className="font-semibold">Squirrels</p>
                        <p className="fine-print">Please see the Humane Squirrel Eliminator™.</p>
                    </div>
                </div>

                <p className="fine-print pt-6 border-t border-border">
                    AGWIC is a subsidiary of American Global Worldwide International
                    Commerce, which does not have a contact page either.
                </p>
            </div>
        </article>
    )
}