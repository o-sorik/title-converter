// Rendered only inside TextConverter, which is the client boundary.
import * as React from "react"

import { convert, explainWords, type ConversionType, type TitleCaseStyle, type WordRule } from "@/lib/converters"
import { cn } from "@/lib/utils"

export const OUTPUT_PLACEHOLDER = "Result will appear here..."

/** Which way a rule moved its word, from the result rather than the change. */
function isCapitalizedForm(word: string): boolean {
    return /^\P{Ll}/u.test(word) && word !== word.toLowerCase()
}

/** Groups words decided by the same rule in the same direction. */
export function ruleKey(rule: WordRule): string {
    return `${isCapitalizedForm(rule.converted) ? "up" : "down"}|${rule.reason}`
}

const MARK_COLOR = {
    up: "[--mark:var(--color-emerald-600)] dark:[--mark:var(--color-emerald-400)]",
    down: "[--mark:var(--color-blue-600)] dark:[--mark:var(--color-blue-400)]",
    muted: "[--mark:var(--color-zinc-300)] dark:[--mark:var(--color-zinc-600)]",
}

/** Rebuilds the result word by word so each word can carry its rule and highlight. */
export function RuledText({
    text,
    rules,
    activeRule,
    drawing,
    muted = false,
}: {
    text: string
    rules: WordRule[]
    activeRule?: string | null
    drawing?: boolean
    muted?: boolean
}) {
    const pieces: React.ReactNode[] = []
    let cursor = 0
    let markIndex = 0
    rules.forEach((rule, index) => {
        if (rule.start > cursor) pieces.push(text.slice(cursor, rule.start))
        const key = ruleKey(rule)
        const up = key.startsWith("up")
        const highlighted = activeRule === key
        const highlight = highlighted && (up ? "bg-emerald-500/15" : "bg-blue-500/15")
        if (rule.word !== rule.converted) {
            const i = markIndex++
            pieces.push(
                <mark
                    key={index}
                    title={muted ? undefined : rule.reason}
                    data-change={muted ? undefined : up ? "capitalized" : "lowercased"}
                    style={drawing ? ({ "--mark-index": i } as React.CSSProperties) : undefined}
                    className={cn(
                        "proof-mark rounded-[3px] bg-transparent px-0.5 text-inherit transition-colors duration-200",
                        muted ? MARK_COLOR.muted : up ? MARK_COLOR.up : MARK_COLOR.down,
                        drawing && "proof-mark-draw",
                        highlight
                    )}
                >
                    {rule.converted}
                </mark>
            )
        } else if (highlight) {
            pieces.push(
                <span key={index} className={cn("rounded-[3px] px-0.5 transition-colors duration-200", highlight)}>
                    {rule.converted}
                </span>
            )
        } else {
            pieces.push(rule.converted)
        }
        cursor = rule.end
    })
    if (cursor < text.length) pieces.push(text.slice(cursor))
    return <>{pieces}</>
}

/**
 * The converted text, or a placeholder already run through the active mode and
 * style so it previews what will happen. `revealKey` changes only on the
 * empty-to-filled transition, which is when the marks draw in.
 */
export function ResultText({
    text,
    mode,
    titleStyle,
    output,
    rules,
    activeRule,
    revealKey,
    drawing,
}: {
    text: string
    mode: ConversionType
    titleStyle: TitleCaseStyle
    output: string
    rules: WordRule[]
    activeRule: string | null
    revealKey: number
    drawing: boolean
}) {
    const options = mode === "title" ? { titleStyle } : {}
    if (!output) {
        const placeholderRules = explainWords(OUTPUT_PLACEHOLDER, mode, options)
        return (
            <span className="text-zinc-500 dark:text-zinc-400">
                {placeholderRules.length ? (
                    <RuledText text={OUTPUT_PLACEHOLDER} rules={placeholderRules} muted />
                ) : (
                    convert(OUTPUT_PLACEHOLDER, mode, options)
                )}
            </span>
        )
    }
    return (
        <span key={revealKey} className={cn(revealKey > 0 && "result-appear")}>
            {rules.length ? <RuledText text={text} rules={rules} activeRule={activeRule} drawing={drawing} /> : output}
        </span>
    )
}

interface RuleGroup {
    key: string
    up: boolean
    reason: string
    words: string[]
}

function groupRules(rules: WordRule[]): RuleGroup[] {
    const groups: RuleGroup[] = []
    for (const rule of rules) {
        const word = rule.converted.replace(/[^\p{L}\p{N}'’.-]+$/u, "")
        if (!/\p{L}/u.test(word)) continue
        const key = ruleKey(rule)
        let group = groups.find((g) => g.key === key)
        if (!group) {
            group = { key, up: key.startsWith("up"), reason: rule.reason, words: [] }
            groups.push(group)
        }
        group.words.push(word)
    }
    return [...groups.filter((g) => g.up), ...groups.filter((g) => !g.up)]
}

/**
 * Every word of the result under the rule that decided it. Always open on
 * desktop; on phones it opens from the toggle above it. Hovering, focusing or
 * tapping a rule lights up its words in the result.
 */
export function RuleNotes({
    id,
    rules,
    open,
    animate,
    activeRule,
    onActiveRule,
}: {
    id: string
    rules: WordRule[]
    open: boolean
    animate: boolean
    activeRule: string | null
    onActiveRule: (key: string | null) => void
}) {
    const groups = React.useMemo(() => groupRules(rules), [rules])
    let row = 0
    return (
        <div
            id={id}
            className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:visible md:grid-rows-[1fr]",
                open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
            )}
        >
            <div className="min-h-0 overflow-hidden">
                <div className="grid gap-4 pt-3 text-[13px] md:pt-0">
                    {[true, false].map((up) => {
                        const rows = groups.filter((g) => g.up === up)
                        if (!rows.length) return null
                        return (
                            <div key={String(up)} className="grid gap-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                                    {up ? "Capitalized" : "Lowercase"}
                                </p>
                                {rows.map((group) => {
                                    const i = row++
                                    const active = activeRule === group.key
                                    return (
                                        <button
                                            key={group.key}
                                            type="button"
                                            aria-pressed={active}
                                            onMouseEnter={() => onActiveRule(group.key)}
                                            onMouseLeave={() => onActiveRule(null)}
                                            onFocus={() => onActiveRule(group.key)}
                                            onBlur={() => onActiveRule(null)}
                                            onClick={() => onActiveRule(active ? null : group.key)}
                                            style={animate ? { animationDelay: `${120 + i * 45}ms` } : undefined}
                                            className={cn(
                                                "-mx-2 grid cursor-pointer gap-x-3 gap-y-0.5 rounded-md px-2 py-1 text-left outline-none transition-colors hover:bg-zinc-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] dark:hover:bg-zinc-800/60",
                                                active && "bg-zinc-100 dark:bg-zinc-800/60",
                                                animate && "rule-row-appear"
                                            )}
                                        >
                                            <span className="text-muted-foreground">{group.reason}</span>
                                            <span className="font-medium text-foreground">{group.words.join(", ")}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
