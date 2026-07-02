export function CapitalizationBadge({ capitalize }: { capitalize: boolean }) {
  return (
    <span
      className={
        capitalize
          ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
          : "rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
      }
    >
      {capitalize ? "Capitalize" : "Lowercase"}
    </span>
  )
}
