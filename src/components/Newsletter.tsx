'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    const res = await fetch('/api/leads', { method: 'POST', body: JSON.stringify(payload) })
    setLoading(false)
    if (!res.ok) setError('Une erreur est survenue')
    else setDone(true)
  }

  if (done) return <p className="rounded border bg-green-50 p-3 text-green-700">Merci ! Vous recevrez nos nouveautés.</p>

  return (
    <form onSubmit={submit} className="grid max-w-md gap-3 rounded border p-4">
      <h2 className="text-lg font-medium">Restez informé</h2>
      <input name="name" placeholder="Votre nom" className="rounded border p-2" />
      <input name="email" type="email" placeholder="vous@example.com" className="rounded border p-2" required />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded bg-[#0b1220] px-4 py-2 text-white">{loading ? 'Envoi…' : 'S’inscrire'}</button>
    </form>
  )
}
