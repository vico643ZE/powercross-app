import { z } from 'zod'
import { registerUser } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

export async function POST(req: Request) {
  const json = await req.json()
  const parsed = schema.safeParse(json)
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 })
  try {
    await registerUser(parsed.data.email, parsed.data.password, parsed.data.name)
    return new Response(null, { status: 201 })
  } catch (e: any) {
    return new Response(e?.message ?? 'Error', { status: 400 })
  }
}
