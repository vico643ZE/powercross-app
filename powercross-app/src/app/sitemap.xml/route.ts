import { prisma } from '@/lib/prisma'

export async function GET() {
  const base = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const pages = await prisma.page.findMany({ where: { published: true } })
  const posts = await prisma.post.findMany({ where: { published: true } })
  const urls = [
    `${base}/`,
    `${base}/blog`,
    ...pages.map(p => `${base}/${p.slug}`),
    ...posts.map(p => `${base}/blog/${p.slug}`),
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
