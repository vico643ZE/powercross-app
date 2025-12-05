import Stripe from 'stripe'

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !whSecret) return new Response('Webhook not configured', { status: 400 })

  const buf = Buffer.from(await req.arrayBuffer())
  if (!process.env.STRIPE_SECRET_KEY) return new Response('Stripe not configured', { status: 400 })
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' as any })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, whSecret)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // TODO: handle events (invoice.paid, customer.subscription.created, etc.)

  return new Response('ok', { status: 200 })
}
