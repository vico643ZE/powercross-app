import StoryCard from './StoryCard'

const stories = [
  {
    title: 'Prêts pour la saison 2025',
    href: '/blog',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'La nouvelle PowerCross SX-E',
    href: '/blog',
    image: 'https://images.unsplash.com/photo-1516642898673-edd1ced5268c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Équipements & pièces',
    href: '/blog',
    image: 'https://images.unsplash.com/photo-1608389168343-5e1d3a9c7e10?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function Stories() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stories.map((s) => (
        <StoryCard key={s.title} {...s} />
      ))}
    </section>
  )
}
