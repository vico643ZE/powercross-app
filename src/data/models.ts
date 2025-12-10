export type Model = {
  slug: string
  title: string
  priceCents: number
  heroImage: string
  gallery: string[]
  description: string
  specs: {
    autonomyKm: number
    powerKw: number
    torqueNm: number
    weightKg: number
    fastChargeMin: number
  }
}

export const MODELS: Model[] = [
  {
    slug: 'sx-e-pro',
    title: 'PowerCross SX‑E Pro',
    priceCents: 1299000,
    heroImage: 'https://images.unsplash.com/photo-1613138409043-ca80dcb6b2fd?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1613138409043-ca80dcb6b2fd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1600&auto=format&fit=crop',
    ],
    description: 'Couple instantané, châssis agile, pour la piste comme les singles engagés.',
    specs: { autonomyKm: 180, powerKw: 18, torqueNm: 120, weightKg: 96, fastChargeMin: 30 },
  },
  {
    slug: 'enduro-x',
    title: 'PowerCross Enduro X',
    priceCents: 1399000,
    heroImage: 'https://images.unsplash.com/photo-1627662057412-631f5e8ffd71?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1627662057412-631f5e8ffd71?q=80&w=1600&auto=format&fit=crop',
    ],
    description: 'Autonomie étendue, modes terrain, suspensions performantes.',
    specs: { autonomyKm: 220, powerKw: 22, torqueNm: 140, weightKg: 102, fastChargeMin: 35 },
  },
  {
    slug: 'adventure-r',
    title: 'PowerCross Adventure R',
    priceCents: 1599000,
    heroImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8ae?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8ae?q=80&w=1600&auto=format&fit=crop',
    ],
    description: 'Prête pour avaler les kilomètres, confort et capacité de charge.',
    specs: { autonomyKm: 280, powerKw: 24, torqueNm: 150, weightKg: 118, fastChargeMin: 40 },
  },
  {
    slug: 'urban-s',
    title: 'PowerCross Urban S',
    priceCents: 999000,
    heroImage: 'https://images.unsplash.com/photo-1510992107199-27f7ce6155f1?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1510992107199-27f7ce6155f1?q=80&w=1600&auto=format&fit=crop',
    ],
    description: 'Compacte et nerveuse, parfaite pour la ville et la périphérie.',
    specs: { autonomyKm: 160, powerKw: 12, torqueNm: 90, weightKg: 86, fastChargeMin: 25 },
  },
  {
    slug: 'ss-rr',
    title: 'PowerCross SS‑RR',
    priceCents: 1899000,
    heroImage: 'https://images.unsplash.com/photo-1598518141840-c331fd5c66ba?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598518141840-c331fd5c66ba?q=80&w=1600&auto=format&fit=crop',
    ],
    description: 'Supersport radicale, sensations pures, piste et route.',
    specs: { autonomyKm: 200, powerKw: 28, torqueNm: 160, weightKg: 110, fastChargeMin: 30 },
  },
]
