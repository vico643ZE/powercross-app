import Image from 'next/image'
import Link from 'next/link'
import { MODELS } from '@/data/models'

function formatEUR(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

export async function generateStaticParams() {
  return MODELS.map(m => ({ slug: m.slug }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const model = MODELS.find(m => m.slug === params.slug)
  if (!model) return <div className="mx-auto max-w-6xl p-4">Produit introuvable</div>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={model.heroImage} alt={model.title} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{model.title}</h1>
          <div className="mt-2 text-2xl font-semibold text-[#0b1220]">{formatEUR(model.priceCents)}</div>
          <p className="mt-4 text-slate-700">{model.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 rounded border p-4 text-sm">
            <div><span className="text-slate-500">Autonomie</span><br />{model.specs.autonomyKm} km</div>
            <div><span className="text-slate-500">Puissance</span><br />{model.specs.powerKw} kW</div>
            <div><span className="text-slate-500">Couple</span><br />{model.specs.torqueNm} Nm</div>
            <div><span className="text-slate-500">Poids</span><br />{model.specs.weightKg} kg</div>
            <div><span className="text-slate-500">Charge rapide</span><br />{model.specs.fastChargeMin} min</div>
          </div>
          <div className="mt-6 flex gap-3">
            <Link href="#" className="rounded bg-[#ff6a00] px-5 py-2.5 font-medium text-white hover:bg-[#ff5500]">Demander un essai</Link>
            <Link href="/models" className="rounded border px-5 py-2.5">Retour aux modèles</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
