import Hero from '@/components/Hero'
import Highlights from '@/components/Highlights'
import CategoryGrid from '@/components/CategoryGrid'
import Stories from '@/components/Stories'
import Newsletter from '@/components/Newsletter'
import BrandBar from './(home)/BrandBar'

export default function HomePage() {
  return (
    <div className="grid gap-10 py-8">
      <Hero />
      <div className="mx-auto max-w-6xl px-4">
        <BrandBar />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <Highlights />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-2xl font-semibold">Gamme PowerCross</h2>
        <CategoryGrid />
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
