import type { DoNotExample, AlternativeExample } from "@/lib/is-x-article-data"

interface DoDoNotProps {
  doExamples: string[]
  doNotExamples: DoNotExample[]
  alternativeExamples?: AlternativeExample[]
}

export function DoDoNot({ doExamples, doNotExamples, alternativeExamples }: DoDoNotProps) {
  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:bg-emerald-500/10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">✓ Do</p>
          <ul className="mt-3 space-y-2">
            {doExamples.map((example) => (
              <li key={example} className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug text-emerald-900 dark:text-emerald-200">
                {example}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:bg-rose-500/10">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">✗ Do not</p>
          <ul className="mt-3 space-y-3">
            {doNotExamples.map((example) => (
              <li key={example.text}>
                <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug line-through decoration-rose-400 text-rose-900 dark:text-rose-200">{example.text}</p>
                <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{example.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {alternativeExamples && alternativeExamples.length > 0 && (
        <div className="space-y-3">
          {alternativeExamples.map((alt) => (
            <div
              key={alt.label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                {alt.label}
              </p>
              <ul className="mt-2 space-y-1">
                {alt.examples.map((ex) => (
                  <li key={ex} className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
