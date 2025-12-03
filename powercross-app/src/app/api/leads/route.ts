import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendLeadNotification } from '@/lib/email'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  message: z.string().max(2000).optional(),
})

export async function POST(req: Request) {
  const json = await req.json()
  const parsed = schema.safeParse(json)
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 })
  const session = await getServerSession(authOptions)
  const lead = await prisma.lead.create({ data: { ...parsed.data, userId: session?.user && (session.user as any).id } })
  const to = process.env.NOTIFY_EMAIL
  if (to) {
    // fire-and-forget; don't block response
    sendLeadNotification({ to, email: parsed.data.email, name: parsed.data.name ?? null, message: parsed.data.message ?? null }).catch(() => {})
  }
  return new Response(JSON.stringify({ id: lead.id }), { status: 201 })
}
