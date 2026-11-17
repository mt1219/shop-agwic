import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'FAQ — AGWIC',
    description: 'Frequently Asked Questions about AGWIC.',
}

const faqs = [
    {
        q: 'Is AGWIC a real store?',
        a: 'AGWIC is a global conglomerate. AGWIC has a corporate headquarters. AGWIC has a Customer Success Specialist. AGWIC has a Content Review Team. The Content Review Team is in a huddle.',
    },
    {
        q: 'Can I actually buy something?',
        a: 'You can click Buy Now. You can click Add to Cart. You can click Buy All. Every button works. The buttons have always worked.',
    },
    {
        q: 'What happens if I click Add to Cart?',
        a: 'The cart counter in the header increases. The counter reflects the number of items in your cart. Your cart is real. Your cart items are not.',
    },
    {
        q: 'Is the Cork real?',
        a: 'The Cork is one of our most popular products. It is currently in stock. It will remain in stock. It has never been out of stock.',
    },
    {
        q: 'Are the reviews real?',
        a: 'Every review is read by the Content Review Team. The Content Review Team is a team of one. The Content Review Team approves reviews within 2–3 business days. The Content Review Team has forwarded your request to the Customer Success Specialist.',
    },
    {
        q: 'Do you ship internationally?',
        a: 'We ship to all 50 states and most international destinations. Shipping is handled by USPS. USPS has been notified. USPS has been notified twice. USPS remains unresponsive.',
    },
    {
        q: 'How do I track my order?',
        a: 'You can track your order by checking your email. Your email has not received a tracking number. Please allow 4–6 weeks for your email to receive a tracking number.',
    },
    {
        q: 'How do I cancel my subscription?',
        a: 'You can cancel your subscription at any time from your account page. Your account page does not exist. Please allow 4–6 weeks for your account page to exist.',
    },
    {
        q: 'Who is responsible for what happens next?',
        a: 'You are. See §7.',
    },
    {
        q: 'I am a whistler. Can I shop here?',
        a: 'You can. Please see The Original Cork™. Please see §8.',
    },
    {
        q: 'I am a squirrel. Can I shop here?',
        a: 'You can. Please see the Humane Squirrel Eliminator™. Please do not click Add to Cart.',
    },
    {
        q: 'I have a question that is not answered here.',
        a: 'Click the Support button in the bottom-right corner of any page. A Customer Success Specialist will assist you. The Customer Success Specialist is on a call.',
    },
]

export default function FAQPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                Frequently Asked Questions
            </h1>
            <p className="text-sm text-ink-muted mb-10">
                Answers to our most frequently asked questions.
            </p>

            <div className="space-y-6">
                {faqs.map((f, i) => (
                    <details key={i} className="border-t border-border pt-4 group">
                        <summary className="cursor-pointer font-semibold text-ink text-sm marker:text-ink-muted">
                            {f.q}
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                    </details>
                ))}
            </div>

            <p className="fine-print pt-8 mt-8 border-t border-border">
                If your question is not answered here, please contact the Customer
                Success Specialist. The Customer Success Specialist is on a call.
            </p>
        </article>
    )
}