import Hero from '@/components/Hero'
import AnnouncementBar from '@/components/AnnouncementBar'
import Highlights from '@/components/Highlights'
import RangeTeaser from '@/components/RangeTeaser'
import FeaturedModels from '@/components/FeaturedModels'
import Stories from '@/components/Stories'
import ServicesBand from '@/components/ServicesBand'
import Newsletter from '@/components/Newsletter'
import BrandBar from './(home)/BrandBar'

export default function HomePage() {
  return (
    <div className="grid gap-10 py-8">
      <Hero />
      <AnnouncementBar />
      <div className="mx-auto max-w-6xl px-4">
        <BrandBar />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <Highlights />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <RangeTeaser />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-2xl font-semibold">Modèles en vedette</h2>
        <FeaturedModels />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-2xl font-semibold">Services</h2>
        <ServicesBand />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-2xl font-semibold">Stories</h2>
        <Stories />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-2xl font-semibold">Restez informé</h2>
        <Newsletter />
      </div>
    </div>
  )
}
