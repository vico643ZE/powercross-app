'use client'

import { FormEvent, useState } from 'react'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const res = await fetch('/api/register', { method: 'POST', body: JSON.stringify({ email, name, password }) })
    setLoading(false)
    if (!res.ok) setError(await res.text())
    else window.location.href = '/auth/signin'
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-4 text-2xl font-semibold">Create account</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input name="name" placeholder="Your name" className="rounded border p-2" />
        <input name="email" type="email" placeholder="you@example.com" className="rounded border p-2" required />
        <input name="password" type="password" placeholder="••••••••" className="rounded border p-2" required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white">{loading ? 'Creating…' : 'Create account'}</button>
      </form>
    </div>
  )
}
