import Image from 'next/image'
import Link from 'next/link'
import { MODELS } from '@/data/models'

function formatEUR(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

export const metadata = {
  title: 'Nos modèles — PowerCross',
  description: 'Découvrez la gamme de motos électriques PowerCross',
}

export default function ModelsPage({ searchParams }: { searchParams?: { min?: string; max?: string; autonomy?: string } }) {
  const min = searchParams?.min ? parseInt(searchParams.min) : undefined
  const max = searchParams?.max ? parseInt(searchParams.max) : undefined
  const autonomy = searchParams?.autonomy ? parseInt(searchParams.autonomy) : undefined

  const filtered = MODELS.filter(m => {
    const priceOk = (min === undefined || m.priceCents/100 >= min) && (max === undefined || m.priceCents/100 <= max)
    const autoOk = (autonomy === undefined || m.specs.autonomyKm >= autonomy)
    return priceOk && autoOk
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Nos modèles</h1>
      <form className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <input name="min" type="number" placeholder="Prix min (€)" className="rounded border p-2" defaultValue={min} />
        <input name="max" type="number" placeholder="Prix max (€)" className="rounded border p-2" defaultValue={max} />
        <input name="autonomy" type="number" placeholder="Autonomie min (km)" className="rounded border p-2" defaultValue={autonomy} />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Filtrer</button>
      </form>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(m => (
          <Link key={m.slug} href={`/products/${m.slug}`} className="group overflow-hidden rounded-lg border">
            <div className="relative h-48 w-full">
              <Image src={m.heroImage} alt={m.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <div className="text-[#0b1220] font-semibold">{formatEUR(m.priceCents)}</div>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{m.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
