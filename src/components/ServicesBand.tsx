import Link from 'next/link'

export default function ServicesBand() {
  const items = [
    { title: 'Entretien & garantie', desc: 'Réseau agréé et support PowerCross', href: '/models' },
    { title: 'Pièces & accessoires', desc: 'Qualité d’origine, compatibilité garantie', href: '/models' },
    { title: 'Service client', desc: 'Accompagnement avant et après achat', href: '/models' },
  ]
  return (
    <section className="rounded-lg border p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <Link key={it.title} href={it.href} className="group rounded-md border p-4 hover:bg-slate-50">
            <div className="text-sm text-slate-500">{it.desc}</div>
            <div className="mt-1 text-base font-semibold">{it.title}</div>
            <div className="mt-2 text-sm text-[#2563eb] group-hover:underline">En savoir plus →</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
