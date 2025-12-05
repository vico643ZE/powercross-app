import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any))
  const price = process.env.STRIPE_PRICE_ID
  const origin = req.headers.get('origin') ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  if (!process.env.STRIPE_SECRET_KEY || !price) {
    return new Response('Stripe not configured', { status: 400 })
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' as any })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
  })
  return new Response(JSON.stringify({ id: session.id, url: session.url }), { status: 200 })
}
