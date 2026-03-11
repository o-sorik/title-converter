import { IconCheck, IconX, IconBulb } from "@tabler/icons-react"
import type { GenCapRuleBlock } from "@/lib/gen-cap-article-data"

interface RuleBlockProps extends GenCapRuleBlock {
  heading?: string
}

export function RuleBlock({
  capitalizeRules,
  lowercaseRules,
  tip,
  heading = "Quick Rules",
}: RuleBlockProps) {
  return (
    <section id="quick-rules" className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
        {heading}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-500/10">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            <IconCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Capitalize when
          </p>
          <ul className="mt-3 space-y-2.5">
            {capitalizeRules.map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-emerald-900 dark:text-emerald-200">
                <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900/40 dark:bg-rose-500/10">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
            <IconX className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Keep lowercase when
          </p>
          <ul className="mt-3 space-y-2.5">
            {lowercaseRules.map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-rose-900 dark:text-rose-200">
                <IconX className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500 dark:text-rose-400" aria-hidden />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {tip && (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-500/10">
          <IconBulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
          <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
            <span className="font-semibold">Tip: </span>
            {tip}
          </p>
        </div>
      )}
    </section>
  )
}
