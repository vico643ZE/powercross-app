import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-lg bg-black text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1600&auto=format&fit=crop"
          alt="PowerCross Electric Bikes"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/60" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Puissance électrique. Zéro compromis.
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Découvrez la nouvelle génération PowerCross — autonomie, couple instantané, design radical. Prêtes pour la route comme pour chaque terrain.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#range" className="rounded bg-[#ff6a00] px-5 py-2.5 font-medium text-white hover:bg-[#ff5500]">Voir la gamme</Link>
            <Link href="#dealers" className="rounded border border-white/30 px-5 py-2.5 font-medium hover:bg-white/10">Trouver un revendeur</Link>
            <Link href="#configure" className="rounded border border-white/30 px-5 py-2.5 font-medium hover:bg-white/10">Configurer</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
