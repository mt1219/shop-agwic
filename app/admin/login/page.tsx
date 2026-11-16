import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

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

function LoginFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-9 bg-stripe rounded" />
      <div className="h-9 bg-stripe rounded" />
      <div className="h-9 bg-primary/20 rounded" />
    </div>
  )
}