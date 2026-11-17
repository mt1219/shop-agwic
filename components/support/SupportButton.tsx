'use client'

import { useState } from 'react'
import { SupportChat } from './SupportChat'

export function SupportButton() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-40 h-12 px-4 bg-primary text-primary-ink rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-semibold"
                    aria-label="Open support chat"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Support</span>
                </button>
            )}

            {open && <SupportChat onCloseAction={() => setOpen(false)} />}
        </>
    )
}