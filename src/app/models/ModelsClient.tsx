'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import type { Model } from '@/data/models'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function formatEUR(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

function mailtoFor(model: Model) {
  const subject = encodeURIComponent(`Demande d’essai — ${model.title}`)
  const body = encodeURIComponent(
    `Bonjour,%0D%0A%0D%0AJe souhaite demander un essai pour le modèle ${model.title}.%0D%0A%0D%0AMes coordonnées:%0D%0A- Nom:%0D%0A- Téléphone:%0D%0A- Ville:%0D%0A%0D%0AURL du modèle: ${typeof window !== 'undefined' ? window.location.origin + '/products/' + model.slug : ''}%0D%0A%0D%0AMerci !`
  )
  return `mailto:contact@powercross.fr?subject=${subject}&body=${body}`
}

export default function ModelsClient({ models }: { models: Model[] }) {
  const search = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [min, setMin] = useState<string>(search.get('min') || '')
  const [max, setMax] = useState<string>(search.get('max') || '')
  const [autonomy, setAutonomy] = useState<string>(search.get('autonomy') || '')
  const [power, setPower] = useState<string>(search.get('power') || '')
  const [weight, setWeight] = useState<string>(search.get('weight') || '')
  const [sort, setSort] = useState<string>(search.get('sort') || 'relevance')
  const [limit, setLimit] = useState<number>(parseInt(search.get('limit') || '6'))

  // Sync URL when filters change (debounced lightly)
  useEffect(() => {
    const params = new URLSearchParams()
    if (min) params.set('min', min)
    if (max) params.set('max', max)
    if (autonomy) params.set('autonomy', autonomy)
    if (power) params.set('power', power)
    if (weight) params.set('weight', weight)
    if (sort && sort !== 'relevance') params.set('sort', sort)
    if (limit !== 6) params.set('limit', String(limit))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, autonomy, power, weight, sort, limit])

  const filtered = useMemo(() => {
    const minV = min ? parseInt(min) : undefined
    const maxV = max ? parseInt(max) : undefined
    const autoV = autonomy ? parseInt(autonomy) : undefined
    const powerV = power ? parseInt(power) : undefined
    const weightV = weight ? parseInt(weight) : undefined

    let arr = models.filter(m => {
      const priceOk = (minV === undefined || m.priceCents/100 >= minV) && (maxV === undefined || m.priceCents/100 <= maxV)
      const autoOk = (autoV === undefined || m.specs.autonomyKm >= autoV)
      const powOk = (powerV === undefined || m.specs.powerKw >= powerV)
      const weiOk = (weightV === undefined || m.specs.weightKg <= weightV)
      return priceOk && autoOk && powOk && weiOk
    })

    switch (sort) {
      case 'price_asc':
        arr = arr.slice().sort((a,b)=>a.priceCents - b.priceCents)
        break
      case 'price_desc':
        arr = arr.slice().sort((a,b)=>b.priceCents - a.priceCents)
        break
      case 'autonomy_desc':
        arr = arr.slice().sort((a,b)=>b.specs.autonomyKm - a.specs.autonomyKm)
        break
      case 'newest':
        // Without createdAt, approximate by title for now
        arr = arr.slice().sort((a,b)=>a.title.localeCompare(b.title))
        break
      default:
        // relevance: keep original order
        break
    }
    return arr
  }, [models, min, max, autonomy, power, weight, sort])

  const visible = filtered.slice(0, limit)
  const canLoadMore = visible.length < filtered.length

  function reset() {
    setMin(''); setMax(''); setAutonomy(''); setPower(''); setWeight(''); setSort('relevance'); setLimit(6)
  }

  return (
    <div className="grid gap-6">
      {/* Sticky filters */}
      <div className="sticky top-0 z-10 -mx-4 border-b bg-white/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex flex-wrap items-end gap-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:items-end">
            <input value={min} onChange={e=>setMin(e.target.value)} type="number" inputMode="numeric" placeholder="Prix min (€)" className="rounded border p-2" />
            <input value={max} onChange={e=>setMax(e.target.value)} type="number" inputMode="numeric" placeholder="Prix max (€)" className="rounded border p-2" />
            <input value={autonomy} onChange={e=>setAutonomy(e.target.value)} type="number" inputMode="numeric" placeholder="Autonomie min (km)" className="rounded border p-2" />
            <input value={power} onChange={e=>setPower(e.target.value)} type="number" inputMode="numeric" placeholder="Puissance min (kW)" className="rounded border p-2" />
            <input value={weight} onChange={e=>setWeight(e.target.value)} type="number" inputMode="numeric" placeholder="Poids max (kg)" className="rounded border p-2" />
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded border p-2">
            <option value="relevance">Pertinence</option>
            <option value="price_asc">Prix ↑</option>
            <option value="price_desc">Prix ↓</option>
            <option value="autonomy_desc">Autonomie</option>
            <option value="newest">Nouveautés</option>
          </select>
          <button onClick={reset} className="rounded border px-3 py-2">Réinitialiser</button>
          <div className="ml-auto text-sm text-slate-600">{filtered.length} résultats</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(m => (
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
                <a href={mailtoFor(m)} className="rounded border px-4 py-2 text-sm">Demander un essai</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {canLoadMore && (
        <div className="flex justify-center">
          <button onClick={()=>setLimit(l=>l+6)} className="rounded bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-800">Charger plus</button>
        </div>
      )}
    </div>
  )
}
