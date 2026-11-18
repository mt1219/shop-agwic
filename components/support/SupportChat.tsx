'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

export function SupportChat({ onCloseAction }: { onCloseAction: () => void }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content:
                "Welcome to AGWIC Support. I'm a Customer Success Specialist. How can I help you today?",
        },
    ])
    const [input, setInput] = useState('')
    const [sending, setSending] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, sending])

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        const text = input.trim()
        if (!text || sending) return

        const next: Message[] = [...messages, { role: 'user', content: text }]
        setMessages(next)
        setInput('')
        setSending(true)

        try {
            const res = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: next }),
            })
            const data = await res.json()
            const reply: string =
                data?.reply ?? data?.error ?? 'The Content Review Team has no comment.'
            setMessages([...next, { role: 'assistant', content: reply }])
        } catch {
            setMessages([
                ...next,
                {
                    role: 'assistant',
                    content:
                        'The Content Review Team is away. The Content Review Team is always away.',
                },
            ])
        } finally {
            setSending(false)
        }
    }

    return (
        <div
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-dvh sm:h-[600px] flex flex-col bg-surface border border-border rounded-t-lg sm:rounded-lg shadow-2xl"
            role="dialog"
            aria-label="AGWIC Support Chat"
        >
            {/* Header */}
            <header className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
                <div>
                    <p className="text-sm font-semibold text-ink">AGWIC Support</p>
                    <p className="text-xs text-ink-muted">
                        Customer Success Specialist
                    </p>
                </div>
                <button
                    onClick={onCloseAction}
                    className="text-ink-muted hover:text-ink transition-colors p-1"
                    aria-label="Close chat"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${m.role === 'user'
                                ? 'bg-primary text-primary-ink'
                                : 'bg-stripe text-ink'
                                }`}
                        >
                            {m.content}
                        </div>
                    </div>
                ))}
                {sending && (
                    <div className="flex justify-start">
                        <div className="bg-stripe text-ink-muted px-3 py-2 rounded-lg text-sm">
                            The Customer Success Specialist is typing.
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <form
                onSubmit={onSubmit}
                className="border-t border-border p-3 flex gap-2 shrink-0 pb-[env(safe-area-inset-bottom)]"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={sending}
                    className="flex-1 min-w-0 block px-3 h-9 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink disabled:opacity-60"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={sending || !input.trim()}
                    className="h-9 px-4 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                    Send
                </button>
            </form>

            <p className="px-4 py-2 text-[10px] text-ink-muted text-center border-t border-border shrink-0">
                The Support Team love huddles.
            </p>
        </div>
    )
}