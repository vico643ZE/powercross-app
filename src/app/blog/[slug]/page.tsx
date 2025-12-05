import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = await prisma.post.findUnique({ where: { slug: params.slug } })
    if (!post?.published) return <p>Not found</p>
    return (
      <article className="prose container-prose">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    )
  } catch {
    return <p>Not found</p>
  }
}
