import Image from 'next/image'
import Link from 'next/link'

export default function RangeTeaser() {
  return (
    <section className="relative isolate overflow-hidden rounded-lg">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1517174760878-7d86a99a3508?q=80&w=2000&auto=format&fit=crop"
          alt="PowerCross urban off-road"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" />
      </div>
      <div className="flex min-h-[280px] items-center px-6 py-10 text-white sm:px-10">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Découvrez la gamme PowerCross</h2>
          <p className="mt-2 max-w-xl text-white/90">Des modèles 100% électriques, taillés pour la ville comme pour les sentiers.</p>
          <div className="mt-5">
            <Link href="/models" className="rounded bg-[#ff6a00] px-5 py-2.5 font-medium text-white hover:bg-[#ff5500]">Voir les modèles</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
