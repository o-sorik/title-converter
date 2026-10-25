import Link from "next/link"
import type { ArticleBlock, StyleGuideName } from "@/lib/article-content"
import { cn } from "@/lib/utils"

type WordFormMatrixBlock = Extract<ArticleBlock, { type: "wordFormMatrix" }>

const GUIDE_COLUMNS: { key: StyleGuideName; label: string }[] = [
  { key: "ap", label: "AP" },
  { key: "apa", label: "APA" },
  { key: "chicago", label: "Chicago" },
  { key: "mla", label: "MLA" },
]

const linkClass = "underline underline-offset-4 text-blue-700 dark:text-blue-400"
// Sticks under the 56px site header and its 1px border. No horizontal
// scroller around the table: a scroller would stop the header from sticking.
// Below 360px the table bleeds to the card's edges instead, so seven-letter
// words fit their columns on a 320px phone.
const headCell = "sticky top-[57px] z-10 bg-slate-50 py-2.5 text-[13px] font-semibold text-slate-700 sm:text-sm dark:bg-zinc-800 dark:text-zinc-300"
// Below 360px the word column lines up with the article text, 16px in from the card's edge.
const wordColumnInset = "px-2 sm:px-4 max-[359px]:pl-4 max-[359px]:pr-1"
// The converter's mark for a capital: a dotted underline in the capitalized color.
const capitalMark =
  "underline decoration-dotted decoration-2 underline-offset-[5px] decoration-emerald-600 dark:decoration-emerald-400"

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/** True when some guides capitalize the word and others do not. */
function guidesDisagree(guides: Record<StyleGuideName, boolean>): boolean {
  const verdicts = Object.values(guides)
  return verdicts.some(Boolean) && !verdicts.every(Boolean)
}

export function WordFormMatrix({ block }: { block: WordFormMatrixBlock }) {
  return (
    <div className="overflow-clip rounded-xl border border-slate-200 dark:border-zinc-700 max-[359px]:-mx-4 max-[359px]:rounded-none max-[359px]:border-x-0">
      <table className="w-full table-fixed text-sm">
        <caption className="caption-top px-3 pb-2 pt-3 text-left text-sm text-slate-600 sm:px-4 max-[359px]:px-4 dark:text-zinc-400">
          {block.caption}
        </caption>
        <colgroup>
          <col className="w-[28%] min-[360px]:w-[25%] sm:w-[34%]" />
          {GUIDE_COLUMNS.map((guide) => (
            <col key={guide.key} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={cn(headCell, wordColumnInset, "text-left")}>
              {block.rowHeader}
            </th>
            {GUIDE_COLUMNS.map((guide) => (
              <th key={guide.key} scope="col" className={cn(headCell, "px-0 text-center max-[359px]:text-[11px] sm:px-3")}>
                {guide.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => {
            const split = guidesDisagree(row.guides)
            return (
              <tr
                key={row.word}
                data-split={split ? "true" : undefined}
                className={cn("border-t border-slate-100 dark:border-zinc-700/50", split && "bg-sky-50 dark:bg-sky-400/10")}
              >
                <th scope="row" className={cn(wordColumnInset, "py-2.5 text-left align-top font-semibold text-slate-900 dark:text-zinc-100")}>
                  {row.href ? (
                    <Link href={row.href} className={linkClass}>
                      {row.word}
                    </Link>
                  ) : (
                    row.word
                  )}
                  {row.note && (
                    <span className="block text-[11px] font-normal leading-4 text-slate-500 sm:text-xs dark:text-zinc-400">{row.note}</span>
                  )}
                </th>
                {GUIDE_COLUMNS.map((guide) => {
                  const capitalized = row.guides[guide.key]
                  return (
                    <td key={guide.key} className="px-0.5 py-2.5 text-center align-top sm:px-3">
                      <span
                        className={cn(
                          "text-[11px] font-semibold min-[360px]:text-xs sm:text-sm",
                          capitalized
                            ? cn("text-slate-950 dark:text-zinc-50", capitalMark)
                            : split
                              ? "text-slate-700 dark:text-zinc-300"
                              : "font-medium text-slate-500 dark:text-zinc-400"
                        )}
                      >
                        {capitalized ? capitalize(row.word) : row.word}
                      </span>
                      <span className="sr-only">{capitalized ? ", capitalized" : ", lowercase"}</span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
