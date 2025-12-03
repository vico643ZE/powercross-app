import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function PageRoute({ params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({ where: { slug: params.slug } })
  if (!page || !page.published) return notFound()
  return (
    <article className="prose container-prose">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </article>
  )
}
