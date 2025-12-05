import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  let pages: { id: string; title: string; slug: string; updatedAt: Date }[] = []
  let posts: { id: string; title: string; updatedAt: Date }[] = []
  let leads: { id: string; email: string; name: string | null; createdAt: Date }[] = []
  try {
    [pages, posts, leads] = await Promise.all([
      prisma.page.findMany({ orderBy: { updatedAt: 'desc' } }),
      prisma.post.findMany({ orderBy: { updatedAt: 'desc' } }),
      prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    ])
  } catch (e) {
    // En l'absence de DATABASE_URL ou si la DB n'est pas prête, on affiche des listes vides
  }

  return (
    <div className="grid gap-8">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium">Pages</h2>
          <Link href="/admin/pages/new" className="text-sm underline">New Page</Link>
        </div>
        <ul className="divide-y">
          {pages.map(p => (
            <li key={p.id} className="py-2">
              <Link className="underline" href={`/admin/pages/${p.id}`}>{p.title}</Link>{' '}
              <span className="text-xs text-slate-500">/{p.slug}</span>
            </li>
          ))}
          {pages.length === 0 && <li className="py-2 text-sm text-slate-500">No pages</li>}
        </ul>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium">Blog</h2>
          <Link href="/admin/posts/new" className="text-sm underline">New Post</Link>
        </div>
        <ul className="divide-y">
          {posts.map(p => (
            <li key={p.id} className="py-2">
              <Link className="underline" href={`/admin/posts/${p.id}`}>{p.title}</Link>
            </li>
          ))}
          {posts.length === 0 && <li className="py-2 text-sm text-slate-500">No posts</li>}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-medium">Recent Leads</h2>
        <ul className="divide-y">
          {leads.map(l => (
            <li key={l.id} className="py-2 text-sm">{l.email} {l.name ? `— ${l.name}` : ''}</li>
          ))}
          {leads.length === 0 && <li className="py-2 text-sm text-slate-500">No leads</li>}
        </ul>
      </section>
    </div>
  )
}
