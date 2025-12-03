export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } })
}
