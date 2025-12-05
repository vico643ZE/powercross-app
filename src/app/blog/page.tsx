import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function BlogIndex() {
  let posts: { id: string; title: string; slug: string }[] = []
  try {
    posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
  } catch (e) {
    posts = []
  }
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <ul className="divide-y">
        {posts.map(p => (
          <li key={p.id} className="py-2"><Link href={`/blog/${p.slug}`} className="underline">{p.title}</Link></li>
        ))}
        {posts.length === 0 && <li className="py-2 text-sm text-slate-500">No posts</li>}
      </ul>
    </div>
  )
}
