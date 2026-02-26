export default function BlogLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Masthead skeleton */}
      <div className="space-y-6 py-6">
        <div className="border-t-2 border-slate-200 dark:border-zinc-700 pt-5">
          <div className="flex justify-between">
            <div className="h-3 w-40 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-3 w-32 rounded bg-slate-200 dark:bg-zinc-800 hidden sm:block" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-12 w-3/4 rounded bg-slate-200 dark:bg-zinc-800 md:h-16" />
          <div className="h-10 w-1/2 rounded bg-slate-200 dark:bg-zinc-800 md:h-14" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-80 rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-zinc-800" />
        </div>
        <hr className="border-t border-slate-200 dark:border-zinc-700" />
      </div>

      {/* Featured article skeleton */}
      <div className="space-y-0">
        <div className="aspect-video w-full rounded-2xl bg-slate-200 dark:bg-zinc-800" />
        <div className="border-t border-b border-slate-200 dark:border-zinc-700 my-5 py-3 flex justify-between">
          <div className="h-3 w-28 rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-zinc-800" />
        </div>
        <div className="space-y-4">
          <div className="h-8 w-2/3 rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="h-8 w-1/2 rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="flex justify-between">
            <div className="h-4 w-48 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Category chips skeleton */}
      <div className="flex gap-6 border-b border-slate-200 dark:border-zinc-700 pb-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-3 rounded bg-slate-200 dark:bg-zinc-800" style={{ width: `${48 + (i % 3) * 16}px` }} />
        ))}
      </div>

      {/* Latest Guides label */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-36 rounded bg-slate-200 dark:bg-zinc-800" />
        <div className="h-4 w-16 rounded bg-slate-200 dark:bg-zinc-800" />
      </div>

      {/* Article card grid skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 space-y-3">
            <div className="border-l-4 border-slate-200 dark:border-zinc-700 pl-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-2.5 w-20 rounded bg-slate-200 dark:bg-zinc-800" />
                <div className="h-2.5 w-10 rounded bg-slate-200 dark:bg-zinc-800" />
              </div>
              <div className="h-5 w-full rounded bg-slate-200 dark:bg-zinc-800" />
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-zinc-800" />
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-zinc-800" />
              <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-zinc-800" />
              <div className="flex justify-between mt-2">
                <div className="h-3 w-32 rounded bg-slate-200 dark:bg-zinc-800" />
                <div className="h-3 w-12 rounded bg-slate-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
