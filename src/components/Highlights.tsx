import HighlightCard from './HighlightCard'

export default function Highlights() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <HighlightCard title="Nouveautés 2025" subtitle="Lancement" href="/models" />
      <HighlightCard title="Configurer votre PowerCross" subtitle="Personnalisation" href="/models" />
      <HighlightCard title="Offres et financement" subtitle="Smart ownership" href="/models" />
    </section>
  )
}
