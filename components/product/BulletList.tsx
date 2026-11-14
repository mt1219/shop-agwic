import type { Footnote } from '@/lib/products/types'

export function BulletList({
    bullets,
    footnotes,
}: {
    bullets: string[]
    footnotes?: Footnote[]
}) {
    if (!bullets || bullets.length === 0) return null

    return (
        <section>
            <h2 className="font-display text-xl text-ink mb-3">Features</h2>
            <ul className="space-y-2">
                {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                        <span className="text-primary shrink-0">•</span>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
            {footnotes && footnotes.length > 0 && (
                <div className="fine-print mt-3 space-y-1">
                    {footnotes.map((f, i) => (
                        <p key={i}>
                            <span className="font-mono mr-1">{f.marker}</span>
                            {f.text}
                        </p>
                    ))}
                </div>
            )}
        </section>
    )
}