'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPage() {
  const [state, setState] = useState({ title: '', slug: '', content: '', published: true })
  const router = useRouter()
  async function create() {
    const res = await fetch('/api/pages', { method: 'POST', body: JSON.stringify(state) })
    if (res.ok) router.push('/admin')
  }
  return (
    <div className="grid gap-3 max-w-2xl">
      <h1 className="text-xl font-semibold">New Page</h1>
      <input value={state.title} onChange={e=>setState({...state, title:e.target.value})} className="rounded border p-2" placeholder="Title" />
      <input value={state.slug} onChange={e=>setState({...state, slug:e.target.value})} className="rounded border p-2" placeholder="Slug" />
      <textarea value={state.content} onChange={e=>setState({...state, content:e.target.value})} className="h-64 rounded border p-2" placeholder="Markdown content" />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={state.published} onChange={e=>setState({...state, published:e.target.checked})} /> Published</label>
      <button onClick={create} className="rounded bg-slate-900 px-4 py-2 text-white">Create</button>
    </div>
  )
}
