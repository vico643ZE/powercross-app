import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } })
  if (!page) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify(page), { status: 200 })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const page = await prisma.page.update({ where: { id: params.id }, data })
  return new Response(JSON.stringify(page), { status: 200 })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.page.delete({ where: { id: params.id } })
  return new Response(null, { status: 204 })
}
