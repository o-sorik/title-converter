export default function ArticleLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-10 rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-3 w-2 rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-3 w-8 rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-3 w-2 rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-zinc-800" />
      </div>

      {/* Article header skeleton */}
      <div className="space-y-4">
        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-zinc-800" />
        <hr className="border-t border-slate-200 dark:border-zinc-700" />
        <div className="space-y-3">
          <div className="h-10 w-5/6 rounded bg-slate-200 dark:bg-zinc-800 md:h-12" />
          <div className="h-10 w-3/4 rounded bg-slate-200 dark:bg-zinc-800 md:h-12" />
        </div>
        <hr className="border-t border-slate-200 dark:border-zinc-700" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-zinc-800" />
        </div>
        <hr className="border-t border-slate-200 dark:border-zinc-700" />
        <div className="h-3 w-64 rounded bg-slate-200 dark:bg-zinc-800" />
      </div>

      {/* Two-column content skeleton */}
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Main content */}
        <div className="space-y-4 rounded-3xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 p-6">
          <div className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-zinc-800" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-slate-200 dark:bg-zinc-800"
                style={{ width: `${65 + (i % 4) * 10}%` }}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-200 dark:bg-zinc-800 h-48" />
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-700 p-5 space-y-3">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-800" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 rounded bg-slate-200 dark:bg-zinc-800" style={{ width: `${60 + i * 8}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
