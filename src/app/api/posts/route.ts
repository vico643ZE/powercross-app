import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const data = await req.json()
  const post = await prisma.post.create({ data })
  return new Response(JSON.stringify(post), { status: 201 })
}
