import type { Metadata } from 'next'
import { Suspense } from 'react'
import { signIn } from './actions'

export const metadata: Metadata = {
  title: 'AGWIC — Staff Sign-In',
  robots: { index: false, follow: false },
}

// Page shell does NOT await searchParams
export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="border border-border bg-surface rounded-md p-8">
        <h1 className="font-display text-2xl text-ink mb-1">
          AGWIC Staff Sign-In
        </h1>
        <p className="text-xs text-ink-muted mb-6">
          Authorized personnel only. Unauthorized personnel will be redirected.
          Authorized personnel will also be redirected, to the dashboard.
        </p>

        {/* Suspense boundary wraps the part that reads searchParams */}
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm searchParams={searchParams} />
        </Suspense>

        <p className="fine-print mt-6 pt-4 border-t border-border">
          AGWIC does not accept new staff applications. See /careers. See §7.
        </p>
      </div>
    </div>
  )
}

// Child component awaits searchParams for error/next
async function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams

  return (
    <>
      {error && (
        <div className="mb-4 p-3 border border-warning bg-warning-bg rounded text-xs text-warning">
          {error}
        </div>
      )}

      <form action={signIn} className="space-y-4">
        <input type="hidden" name="next" value={next ?? '/admin/analytics'} />

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full min-w-0 block px-3 h-9 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-ink mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full min-w-0 block px-3 h-9 text-sm border border-border rounded bg-surface focus:outline-none focus:border-ink"
          />
        </div>

        <button
          type="submit"
          className="w-full h-9 bg-primary text-primary-ink rounded text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Sign In
        </button>
      </form>
    </>
  )
}

// Deterministic skeleton (no random, no date)
function LoginFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-9 bg-stripe rounded" />
      <div className="h-9 bg-stripe rounded" />
      <div className="h-9 bg-primary/20 rounded" />
    </div>
  )
}