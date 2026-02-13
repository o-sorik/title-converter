export function TopicPills({
  items,
  activeIndex = 0,
}: {
  items: string[]
  activeIndex?: number
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center gap-2">
        {items.map((topic, index) => (
          <button
            key={topic}
            type="button"
            className={
              index === activeIndex
                ? "rounded-full bg-blue-700 px-4 py-2 text-xs font-semibold text-white"
                : "rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-700"
            }
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  )
}
