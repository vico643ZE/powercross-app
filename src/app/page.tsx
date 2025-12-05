import LeadForm from '@/components/LeadForm'

export default function HomePage() {
  return (
    <section className="grid gap-8 py-8">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Build fast. Launch faster.</h1>
        <p className="text-slate-600 max-w-prose">This starter ships with authentication, a simple CMS, lead capture, and analytics scaffolding so you can focus on your product.</p>
      </div>
      <LeadForm />
    </section>
  )
}
