import Image from 'next/image'
import Link from 'next/link'
import { MODELS } from '@/data/models'

function formatEUR(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents/100)
}

export default function FeaturedModels() {
  const featured = MODELS.slice(0, 6)
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featured.map((m) => (
        <div key={m.slug} className="group overflow-hidden rounded-lg border">
          <Link href={`/products/${m.slug}`} className="relative block h-48 w-full">
            <Image src={m.heroImage} alt={m.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
          </Link>
          <div className="p-4">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <div className="font-semibold text-[#0b1220]">{formatEUR(m.priceCents)}</div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-600">
              <div><span className="text-slate-500">Autonomie</span><br />{m.specs.autonomyKm} km</div>
              <div><span className="text-slate-500">Puissance</span><br />{m.specs.powerKw} kW</div>
              <div><span className="text-slate-500">Poids</span><br />{m.specs.weightKg} kg</div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/products/${m.slug}`} className="rounded bg-[#ff6a00] px-4 py-2 text-sm font-medium text-white hover:bg-[#ff5500]">Voir le modèle</Link>
              <Link href="/models" className="rounded border px-4 py-2 text-sm">Toute la gamme</Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
