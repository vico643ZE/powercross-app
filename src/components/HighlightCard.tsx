import Link from 'next/link'

export default function HighlightCard({
  title,
  subtitle,
  href,
}: {
  title: string
  subtitle?: string
  href: string
}) {
  return (
    <Link href={href} className="group block rounded-lg border p-6 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-sm text-slate-500">{subtitle}</div>
      <div className="mt-1 text-xl font-semibold">{title}</div>
      <div className="mt-3 text-sm text-[#2563eb] group-hover:underline">Découvrir →</div>
    </Link>
  )
}
