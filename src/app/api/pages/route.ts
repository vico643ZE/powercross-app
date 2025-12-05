import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const data = await req.json()
  const page = await prisma.page.create({ data })
  return new Response(JSON.stringify(page), { status: 201 })
}
