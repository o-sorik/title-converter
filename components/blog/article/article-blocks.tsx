import type { ReactNode } from "react"
import Link from "next/link"
import type { ArticleBlock, ArticleSection, StyleGuideName } from "@/lib/article-content"
import { cn } from "@/lib/utils"
import { CapitalizationBadge } from "./capitalization-badge"

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
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index} className={li}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
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
                  <td className={cn(tdClass, "font-semibold")}>{renderInline(row.label)}</td>
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
