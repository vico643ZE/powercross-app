export async function sendLeadNotification(params: { to: string; email: string; name?: string | null; message?: string | null }) {
  const { to, email, name, message } = params
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !to) return { skipped: true }
  const subject = `New lead: ${email}`
  const text = `New lead submitted\n\nEmail: ${email}\nName: ${name ?? '-'}\nMessage:\n${message ?? '-'}\n`
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: 'Leads <no-reply@yourdomain.com>', to, subject, text })
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('Resend error', res.status, body)
    return { ok: false }
  }
  return { ok: true }
}
