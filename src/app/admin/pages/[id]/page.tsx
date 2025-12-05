'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [state, setState] = useState<any>({ title: '', slug: '', content: '', published: true })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/pages/${params.id}`).then(r => r.json()).then(setState).finally(() => setLoading(false))
  }, [params.id])

  async function save() {
    setLoading(true)
    await fetch(`/api/pages/${params.id}`, { method: 'PUT', body: JSON.stringify(state) })
    setLoading(false)
    router.push('/admin')
  }

  async function del() {
    if (!confirm('Delete page?')) return
    await fetch(`/api/pages/${params.id}`, { method: 'DELETE' })
    router.push('/admin')
  }

  if (loading) return <p>Loading…</p>
  return (
    <div className="grid gap-3 max-w-2xl">
      <h1 className="text-xl font-semibold">Edit Page</h1>
      <input value={state.title} onChange={e=>setState({...state, title:e.target.value})} className="rounded border p-2" placeholder="Title" />
      <input value={state.slug} onChange={e=>setState({...state, slug:e.target.value})} className="rounded border p-2" placeholder="Slug" />
      <textarea value={state.content} onChange={e=>setState({...state, content:e.target.value})} className="h-64 rounded border p-2" placeholder="Markdown content" />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={state.published} onChange={e=>setState({...state, published:e.target.checked})} /> Published</label>
      <div className="flex gap-2">
        <button onClick={save} className="rounded bg-slate-900 px-4 py-2 text-white">Save</button>
        <button onClick={del} className="rounded border px-4 py-2">Delete</button>
      </div>
    </div>
  )
}
