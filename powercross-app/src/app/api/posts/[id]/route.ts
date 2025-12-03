import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(post), { status: 200 })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const post = await prisma.post.update({ where: { id: params.id }, data })
  return new Response(JSON.stringify(post), { status: 200 })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: params.id } })
  return new Response(null, { status: 204 })
}
