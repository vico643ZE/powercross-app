import Image from 'next/image'
import Link from 'next/link'

export default function StoryCard({ title, href, image }: { title: string; href: string; image: string }) {
  return (
    <Link href={href} className="group relative isolate overflow-hidden rounded-lg border">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt={title} fill className="object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      </div>
      <div className="flex min-h-[220px] items-end p-5 text-white">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="text-sm text-white/90">Lire →</div>
        </div>
      </div>
    </Link>
  )
}
