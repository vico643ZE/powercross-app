'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) setError(res.error)
    else window.location.href = '/'
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input name="email" type="email" placeholder="you@example.com" className="rounded border p-2" required />
        <input name="password" type="password" placeholder="••••••••" className="rounded border p-2" required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white">{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link className="underline" href="/auth/signup">Create one</Link></p>
    </div>
  )
}
