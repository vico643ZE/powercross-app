import HighlightCard from './HighlightCard'

export default function Highlights() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <HighlightCard title="Nouveautés 2025" subtitle="Lancement" href="/blog" />
      <HighlightCard title="Configurer votre PowerCross" subtitle="Personnalisation" href="#configure" />
      <HighlightCard title="Offres et financement" subtitle="Smart ownership" href="#offers" />
    </section>
  )
}
