import { signIn } from './actions'
import { PasswordField } from './PasswordField'

export async function LoginForm({
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

                <PasswordField />

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