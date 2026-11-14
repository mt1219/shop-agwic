import type { Spec, Footnote } from '@/lib/products/types'

export function SpecsTable({
    specs,
    footnotes,
}: {
    specs: Spec[]
    footnotes?: Footnote[]
}) {
    if (!specs || specs.length === 0) return null

    return (
        <section className="border border-border rounded overflow-hidden">
            <h2 className="font-display text-lg text-ink p-3 border-b border-border bg-stripe">
                Specifications
            </h2>
            <table className="w-full text-sm">
                <tbody>
                    {specs.map((s, i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-stripe/50' : ''}>
                            <td className="px-3 py-2 text-ink-muted align-top w-1/3">{s.label}</td>
                            <td className="px-3 py-2 text-ink">{s.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {footnotes && footnotes.length > 0 && (
                <div className="fine-print p-3 border-t border-border space-y-1">
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