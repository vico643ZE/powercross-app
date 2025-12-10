export default function AnnouncementBar() {
  return (
    <div className="border-y bg-white/80 px-4 py-2 text-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 text-slate-700">
        <span className="font-medium text-[#ff6a00]">Essai gratuit</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Nouveautés 2025</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Financement disponible</span>
      </div>
    </div>
  )
}
