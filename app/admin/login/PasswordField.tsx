'use client'

import { useState } from 'react'

export function PasswordField() {
    const [show, setShow] = useState(false)

    return (
        <div>
            <label htmlFor="password" className="block text-xs font-semibold text-ink mb-1">
                Password
            </label>
            <div className="relative">
                <input
                    id="password"
                    name="password"
                    type={show ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    className="w-full min-w-0 block px-3 pr-16 h-9 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-0 top-0 h-9 px-3 text-xs text-ink-muted hover:text-ink transition-colors"
                    aria-label={show ? 'Hide password' : 'Show password'}
                >
                    {show ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    )
}