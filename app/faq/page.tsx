import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'FAQ — AGWIC',
    description: 'Frequently Asked Questions about AGWIC. Not frequently answered.',
}

const faqs = [
    {
        q: 'Is this a real store?',
        a: 'No. It is a parody. Nothing is for sale. Nothing is real. The FAQ is also not real.',
    },
    {
        q: 'Can I actually buy something?',
        a: 'You can click Buy. A page will appear. An email may be sent. Nothing will be delivered. Nothing was ever going to be delivered.',
    },
    {
        q: 'What happens if I click Add to Cart?',
        a: 'A counter increments. The counter is visible only to us. You will not see the counter. The counter does not affect anything.',
    },
    {
        q: 'Is the Cork real?',
        a: 'The Cork is not real. There is no Cork. The Cork has never existed. Please do not order the Cork.',
    },
    {
        q: 'Are the reviews real?',
        a: 'Some are. Most are not. The ones written by us are not. The ones written by you are. We encourage you to write more. We will not read them.',
    },
    {
        q: 'Do you ship internationally?',
        a: 'No. We do not ship domestically either. We do not ship.',
    },
    {
        q: 'How do I cancel my subscription?',
        a: 'You cannot. There is no subscription. There is no cancellation. There is only the feeling.',
    },
    {
        q: 'Who is responsible for what happens next?',
        a: 'You are. See §7.',
    },
    {
        q: 'I am a whistler. Can I shop here?',
        a: 'You can. We would prefer you did not. See §8.',
    },
    {
        q: 'I am a squirrel. Can I shop here?',
        a: 'You can. Please see the Humane Squirrel Eliminator™. Please do not click Add to Cart.',
    },
]

export default function FAQPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                Frequently Asked Questions
            </h1>
            <p className="fine-print mb-10">Not frequently answered.</p>

            <div className="space-y-6">
                {faqs.map((f, i) => (
                    <details
                        key={i}
                        className="border-t border-border pt-4 group"
                    >
                        <summary className="cursor-pointer font-semibold text-ink text-sm marker:text-ink-muted">
                            {f.q}
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                    </details>
                ))}
            </div>

            <p className="fine-print pt-8 mt-8 border-t border-border">
                If your question is not answered here, it will not be answered
                elsewhere either.
            </p>
        </article>
    )
}