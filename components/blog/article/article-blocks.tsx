import { Fragment, type ReactNode } from "react"
import Link from "next/link"
import type { ArticleBlock, ArticleSection, CaseDiagramTone, StyleGuideName } from "@/lib/article-content"
import { cn } from "@/lib/utils"
import { CapitalizationBadge } from "./capitalization-badge"
import { WordFormMatrix } from "./word-form-matrix"

// Renders the serializable block model from lib/article-content.ts.
// Supported inline markup: **bold**, *italic*, [label](href); link labels
// may contain *italic*. Anything richer belongs in a new block type.

const p = "text-base leading-8 text-slate-800 dark:text-zinc-200"
const li = "text-base leading-7 text-slate-700 dark:text-zinc-300"
const linkClass = "underline underline-offset-4 text-blue-700 dark:text-blue-400"

const tableWrap = "overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-700"
const tableClass = "w-full text-sm"
const thClass = "px-4 py-3 text-left font-semibold text-slate-700 dark:text-zinc-300"
const tdClass = "px-4 py-3 text-slate-700 dark:text-zinc-300"
const trBorder = "border-t border-slate-100 dark:border-zinc-700/50"
const theadBg = "bg-slate-50 dark:bg-zinc-800/60"

const DIAGRAM_TONE_CLASS: Record<CaseDiagramTone, string> = {
  differs: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200",
  same: "bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200",
  check: "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200",
}

const GUIDE_COLUMNS: { key: StyleGuideName; label: string }[] = [
  { key: "ap", label: "AP" },
  { key: "apa", label: "APA" },
  { key: "chicago", label: "Chicago" },
  { key: "mla", label: "MLA" },
]

function renderEmphasis(text: string, keyPrefix: string): ReactNode[] {
  // **bold** first, then *italic* inside the remaining plain segments.
  const nodes: ReactNode[] = []
  const boldSplit = text.split(/\*\*([^*]+)\*\*/g)
  boldSplit.forEach((segment, boldIndex) => {
    if (boldIndex % 2 === 1) {
      nodes.push(<strong key={`${keyPrefix}-b${boldIndex}`}>{segment}</strong>)
      return
    }
    const italicSplit = segment.split(/\*([^*]+)\*/g)
    italicSplit.forEach((piece, italicIndex) => {
      if (!piece) return
      if (italicIndex % 2 === 1) {
        nodes.push(<em key={`${keyPrefix}-b${boldIndex}-i${italicIndex}`}>{piece}</em>)
      } else {
        nodes.push(piece)
      }
    })
  })
  return nodes
}

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Links first so emphasis parsing can run independently inside/outside labels.
  // The href part tolerates one level of balanced parentheses (Wikipedia URLs).
  const linkPattern = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let linkIndex = 0

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...renderEmphasis(text.slice(lastIndex, match.index), `t${linkIndex}`))
    }
    const [, label, href] = match
    const labelNodes = renderEmphasis(label, `l${linkIndex}`)
    // Protocol-relative URLs (//host) are external, not internal routes.
    if (href.startsWith("/") && !href.startsWith("//")) {
      nodes.push(
        <Link key={`link-${linkIndex}`} href={href} className={linkClass}>
          {labelNodes}
        </Link>
      )
    } else {
      nodes.push(
        <a key={`link-${linkIndex}`} href={href} rel="noopener noreferrer" target="_blank" className={linkClass}>
          {labelNodes}
        </a>
      )
    }
    lastIndex = match.index + match[0].length
    linkIndex += 1
  }

  if (lastIndex < text.length) {
    nodes.push(...renderEmphasis(text.slice(lastIndex), `t${linkIndex}`))
  }

  return nodes
}

function CapitalizeBadgeCell({ capitalize }: { capitalize: boolean }) {
  return (
    <td className={tdClass}>
      <CapitalizationBadge capitalize={capitalize} />
    </td>
  )
}

export function ArticleBlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph": {
      if (block.variant === "note") {
        return <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">{renderInline(block.text)}</p>
      }
      if (block.variant === "subheading") {
        return <p className={cn(p, "font-semibold mt-4")}>{renderInline(block.text)}</p>
      }
      return <p className={p}>{renderInline(block.text)}</p>
    }
    case "heading": {
      const Heading = block.level === 3 ? "h3" : "h4"
      return (
        <Heading
          className={cn(
            "leading-snug text-slate-950 dark:text-zinc-100",
            block.level === 3 ? "pt-3 text-xl font-bold" : "pt-1 text-lg font-semibold",
            block.grouping && "italic"
          )}
        >
          {block.text}
        </Heading>
      )
    }
    case "caseDiagram":
      return (
        <figure className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/60">
          {block.rows.map((row) => {
            const marks = new Map((row.marks ?? []).map((mark) => [mark.index, mark]))
            return (
              <div key={row.label} className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                  {row.label}
                </p>
                <p className="font-mono text-base leading-9 text-slate-900 dark:text-zinc-100">
                  {row.text.split(" ").map((word, index) => {
                    const mark = marks.get(index)
                    return (
                      <Fragment key={index}>
                        {index > 0 && " "}
                        {mark ? (
                          <span className={cn("rounded px-1", DIAGRAM_TONE_CLASS[mark.tone])}>
                            {word}
                            {mark.note !== undefined && <sup className="ml-0.5 font-sans font-bold">{mark.note}</sup>}
                          </span>
                        ) : (
                          word
                        )}
                      </Fragment>
                    )
                  })}
                </p>
              </div>
            )
          })}
          <figcaption className="space-y-2 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600 dark:border-zinc-700/50 dark:text-zinc-400">
            <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {block.notes.map((note, index) => (
                <li key={index}>
                  <sup className="mr-1 font-bold">{index + 1}</sup>
                  {note}
                </li>
              ))}
            </ol>
            {block.caption && <p>{renderInline(block.caption)}</p>}
          </figcaption>
        </figure>
      )
    case "list": {
      const List = block.ordered ? "ol" : "ul"
      return (
        <List className={cn("space-y-2 pl-5", block.ordered ? "list-decimal" : "list-disc")}>
          {block.items.map((item, index) => (
            <li key={index} className={li}>
              {renderInline(item)}
            </li>
          ))}
        </List>
      )
    }
    case "table":
      return (
        <div className={tableWrap}>
          <table className={tableClass}>
            <thead className={theadBg}>
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className={thClass}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={trBorder}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={cn(tdClass, cellIndex === 0 && "font-semibold")}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "statHighlight":
      return (
        <div
          className={cn(
            "grid gap-4",
            block.items.length === 1 && "grid-cols-1",
            block.items.length === 2 && "grid-cols-1 sm:grid-cols-2",
            block.items.length >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {block.items.map((item, index) => (
            <div key={index} className="border-t-2 border-slate-900 pt-3 dark:border-zinc-100">
              <p className="text-3xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-zinc-300">{item.label}</p>
              {item.sourceName &&
                (item.sourceHref ? (
                  <a
                    href={item.sourceHref}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="mt-1 inline-block cursor-pointer text-xs text-slate-500 underline underline-offset-4 dark:text-zinc-400"
                  >
                    {item.sourceName}
                  </a>
                ) : (
                  <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">{item.sourceName}</p>
                ))}
            </div>
          ))}
        </div>
      )
    case "barList":
      return (
        <div className="space-y-4">
          {block.items.map((item, index) => (
            <div key={index}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={cn(li, "font-medium")}>{renderInline(item.label)}</span>
                <span className="shrink-0 text-sm font-bold tabular-nums text-slate-900 dark:text-zinc-100">
                  {item.display}
                </span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-zinc-800">
                <div
                  className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                  style={{ width: `${Math.min(Math.max(item.percent, 0), 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )
    case "keyStats":
      return (
        <div className="border-t-2 border-slate-900 pt-4 dark:border-zinc-100">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
            Key Statistics
          </p>
          <ul className="mt-3 space-y-2.5">
            {block.items.map((item, index) => (
              <li key={index} className={cn(li, "flex gap-3")}>
                <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case "sources":
      return (
        <ol className="list-decimal space-y-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index} className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
              <a
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
                className={cn(linkClass, "cursor-pointer")}
              >
                {item.name}
              </a>{" "}
              — {item.publisher}, {item.year}
            </li>
          ))}
        </ol>
      )
    case "wordFormMatrix":
      return <WordFormMatrix block={block} />
    case "styleGuideMatrix":
      return (
        <div className={tableWrap}>
          <table className={tableClass}>
            <thead className={theadBg}>
              <tr>
                <th className={thClass}>{block.rowHeader}</th>
                {GUIDE_COLUMNS.map((guide) => (
                  <th key={guide.key} className={thClass}>
                    {guide.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.label} className={trBorder}>
                  <td className={cn(tdClass, "font-semibold")}>
                    {renderInline(row.label)}
                    {row.note && <span className="block text-xs font-normal text-slate-500 dark:text-zinc-400">{row.note}</span>}
                  </td>
                  {GUIDE_COLUMNS.map((guide) => (
                    <CapitalizeBadgeCell key={guide.key} capitalize={row.guides[guide.key]} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function ArticleSectionRenderer({ section }: { section: ArticleSection }) {
  return (
    <section id={section.id} className="scroll-mt-24 space-y-3">
      {section.heading && (
        <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
          {section.heading}
        </h2>
      )}
      {section.blocks.map((block, index) => (
        <ArticleBlockRenderer key={index} block={block} />
      ))}
    </section>
  )
}
