import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Press — AGWIC',
    description: 'Recent press releases from American Global Worldwide International Commerce.',
}

const releases = [
    {
        date: 'November 2026',
        title: 'AGWIC Announces It Is Still Not Real',
        body: 'For the fourth consecutive quarter, AGWIC has confirmed that it is a parody store, that nothing on it is for sale, and that this confirmation is not a denial of any previous confirmation.',
    },
    {
        date: 'October 2026',
        title: 'AGWIC Expands to One (1) Additional Department',
        body: 'The new department, whose name we have chosen not to announce, will house products that do not fit existing departments, or that fit them too well.',
    },
    {
        date: 'September 2026',
        title: 'Statement Regarding the Whistlers',
        body: 'AGWIC does not take a position on whistlers. AGWIC sells a product that does. Please direct all whistle-related inquiries to the product.',
    },
    {
        date: 'August 2026',
        title: 'AGWIC Holdings, LLC Merges With AGWIC',
        body: 'The merger is complete. The resulting entity is AGWIC. The previous entity was also AGWIC. We see no reason to dwell on this.',
    },
]

export default function PressPage() {
    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">
                Press
            </h1>
            <p className="fine-print mb-10">Recent releases</p>

            <div className="space-y-8">
                {releases.map((r) => (
                    <div key={r.title} className="border-t border-border pt-4">
                        <p className="fine-print mb-2">{r.date}</p>
                        <h2 className="font-display text-xl text-ink mb-2">{r.title}</h2>
                        <p className="text-sm leading-relaxed text-ink-muted">{r.body}</p>
                    </div>
                ))}
            </div>

            <p className="fine-print pt-8 mt-8 border-t border-border">
                Press inquiries: press@shopagwic.com. This address does not exist.
                Please do not contact it.
            </p>
        </article>
    )
}