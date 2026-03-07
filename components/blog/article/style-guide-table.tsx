import type { StyleGuideRow } from "@/lib/is-x-article-data"

interface StyleGuideTableProps {
  word: string
  rows: StyleGuideRow[]
}

export function StyleGuideTable({ word, rows }: StyleGuideTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-zinc-800/60">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-zinc-300">
              Style Guide
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-zinc-300">
              &ldquo;{word}&rdquo; in middle of title?
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-zinc-300">
              Rule
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.guide} className="border-t border-slate-100 dark:border-zinc-700/50">
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-zinc-100">
                {row.guide}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    row.capitalize
                      ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }
                >
                  {row.capitalize ? "Capitalize" : "Lowercase"}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-zinc-400">{row.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
