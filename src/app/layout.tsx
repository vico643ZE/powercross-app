import '../styles/globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BRAND_NAME ?? 'PulseCross'} — Next.js Starter` as any,
  description: 'Commercial-ready website with auth, CMS, leads, analytics.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {process.env.PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.PLAUSIBLE_DOMAIN}
            src={`https://plausible.io/js/script.js`}
          />
        )}
      </head>
      <body className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="border-b">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="font-semibold">{process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Powercross'}</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/models">Nos modèles</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/auth/signin">Sign in</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl p-4 text-sm text-slate-500">© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_BRAND_NAME ?? 'PulseCross'}</div>
        </footer>
      </body>
    </html>
  )
}
