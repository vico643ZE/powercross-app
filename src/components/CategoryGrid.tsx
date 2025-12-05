import CategoryCard from './CategoryCard'

const items = [
  {
    title: 'Cross',
    image: 'https://images.unsplash.com/photo-1613138409043-ca80dcb6b2fd?q=80&w=1600&auto=format&fit=crop',
    href: '/categories/cross',
  },
  {
    title: 'Enduro',
    image: 'https://images.unsplash.com/photo-1627662057412-631f5e8ffd71?q=80&w=1600&auto=format&fit=crop',
    href: '/categories/enduro',
  },
  {
    title: 'Adventure',
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8ae?q=80&w=1600&auto=format&fit=crop',
    href: '/categories/adventure',
  },
  {
    title: 'Naked',
    image: 'https://images.unsplash.com/photo-1517174760878-7d86a99a3508?q=80&w=1600&auto=format&fit=crop',
    href: '/categories/naked',
  },
  {
    title: 'Supersport',
    image: 'https://images.unsplash.com/photo-1598518141840-c331fd5c66ba?q=80&w=1600&auto=format&fit=crop',
    href: '/categories/supersport',
  },
  {
    title: 'Urban',
    image: 'https://images.unsplash.com/photo-1510992107199-27f7ce6155f1?q=80&w=1600&auto=format&fit=crop',
    href: '/categories/urban',
  },
]

export default function CategoryGrid() {
  return (
    <section id="range" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <CategoryCard key={it.title} {...it} />
      ))}
    </section>
  )
}
