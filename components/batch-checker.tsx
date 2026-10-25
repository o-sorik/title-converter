"use client"

import * as React from "react"
import Link from "next/link"
import { IconArrowRight, IconCheck, IconCopy, IconExternalLink, IconX } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { RuledText } from "@/components/converter-result"
import { StylePicker } from "@/components/style-picker"
import { explainWords, type ConversionType, type TitleCaseStyle, type WordRule } from "@/lib/converters"
import { TITLE_STYLES } from "@/lib/title-styles"
import { runEditorialQaBatch, type EditorialQaItem } from "@/lib/editorial-qa"
import { trackEvent } from "@/lib/analytics"
import { DEFAULT_CONVERTER_CONTEXT_REF, writeConverterContext } from "@/lib/converter-context"
import { useAutoGrow } from "@/lib/use-auto-grow"
import { cn } from "@/lib/utils"

// Only the 4 editorial-relevant modes; code case / fun modes aren't meaningful for QA
const QA_MODES: { id: ConversionType; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "lower", label: "lower case" },
    { id: "upper", label: "UPPER CASE" },
]

/** Shared with the converter, so a style picked on either tool carries over. */
const TITLE_STYLE_STORAGE_KEY = "tcc-title-style"
/** The list survives a trip to the converter and back within the tab. */
const BATCH_STORAGE_KEY = "tcc-batch-input"
const COPY_FEEDBACK_DISMISS_MS = 2000
/** Wait for typing to settle before announcing or counting a check. */
const SETTLE_MS = 800

/** Picked so every default style has lines to fix and lines already right. */
export const BATCH_EXAMPLE = [
    "the best laptops for students in 2026",
    "How to Train Your Dragon in 10 Days",
    "HOW TO WRITE A BETTER HEADLINE",
    "Productivity: a guide for remote teams",
    "What Is the Difference Between Who and Whom?",
    "10 Tips For Better Sleep",
    "The Art of War",
    "a beginner's guide to investing",
].join("\n")

const focusRing = "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

type Filter = "fix" | "all"

function isTitleStyle(value: string | null): value is TitleCaseStyle {
    return TITLE_STYLES.some((style) => style.id === value)
}

function isQaMode(value: unknown): value is ConversionType {
    return QA_MODES.some((mode) => mode.id === value)
}

function plural(count: number, word: string): string {
    return `${count} ${word}${count === 1 ? "" : "s"}`
}

/** "APA title case" for title mode, the mode's own name otherwise. */
function styleLabel(mode: ConversionType, style: TitleCaseStyle): string {
    if (mode !== "title") return QA_MODES.find((m) => m.id === mode)?.label ?? mode
    return `${TITLE_STYLES.find((s) => s.id === style)?.label ?? "Standard"} title case`
}

// The href names only the storage ref; the headline itself is handed over in
// sessionStorage on click. Spelling it out in the query would ship every result
// row to the server via <Link> prefetch, which the privacy policy rules out.
function buildReviewHref(mode: ConversionType, titleStyle: TitleCaseStyle): string {
    const params = new URLSearchParams({
        ctx_ref: DEFAULT_CONVERTER_CONTEXT_REF,
        ctx_mode: mode,
        ctx_style: titleStyle,
    })
    return `/?${params.toString()}`
}

function CopyIconButton({
    label,
    copied,
    onCopy,
}: {
    label: string
    copied: boolean
    onCopy: () => void
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={copied ? "Copied" : "Copy"}
            onClick={onCopy}
            className={cn(
                "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-zinc-100 hover:text-foreground md:h-8 md:w-8 dark:hover:bg-zinc-800",
                focusRing
            )}
        >
            {copied ? <IconCheck className="h-4 w-4" aria-hidden="true" /> : <IconCopy className="h-4 w-4" aria-hidden="true" />}
        </button>
    )
}

/** Each changed word with the rule that changed it, in reading order. */
function WhyList({ changes }: { changes: WordRule[] }) {
    return (
        <ul className="grid gap-1 text-[13px]">
            {changes.map((rule) => (
                <li key={rule.start} className="flex flex-wrap items-center gap-x-2">
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                        {rule.word}
                        <IconArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                        <span className="sr-only">becomes</span>
                        {rule.converted}
                    </span>
                    <span className="text-muted-foreground">{rule.reason}</span>
                </li>
            ))}
        </ul>
    )
}

function BatchRow({
    item,
    index,
    mode,
    titleStyle,
    open,
    onToggle,
    copied,
    onCopy,
}: {
    item: EditorialQaItem
    index: number
    mode: ConversionType
    titleStyle: TitleCaseStyle
    open: boolean
    onToggle: () => void
    copied: boolean
    onCopy: () => void
}) {
    const rules = React.useMemo(
        () => explainWords(item.normalized, mode, mode === "title" ? { titleStyle } : {}),
        [item.normalized, mode, titleStyle]
    )
    const changes = rules.filter((rule) => rule.word !== rule.converted)
    const whyId = `batch-why-${index}`

    return (
        <li
            className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-2 py-3"
            data-testid="batch-row"
            data-status={item.isConsistent ? "correct" : "fix"}
        >
            <span className="pt-0.5 text-sm tabular-nums text-muted-foreground">{index + 1}</span>
            <div className="grid min-w-0 gap-1">
                <p className="break-words text-base font-medium leading-relaxed text-foreground">
                    {rules.length ? <RuledText text={item.normalized} rules={rules} /> : item.converted}
                </p>
                {item.isConsistent ? (
                    <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <IconCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Already correct
                    </p>
                ) : (
                    <>
                        <p className="break-words text-sm text-muted-foreground">was: {item.source}</p>
                        {changes.length > 0 && (
                            <button
                                type="button"
                                onClick={onToggle}
                                aria-expanded={open}
                                aria-controls={whyId}
                                className={cn(
                                    "-mx-1 w-fit cursor-pointer rounded-sm px-1 py-1 text-sm font-medium text-primary underline-offset-4 hover:underline",
                                    focusRing
                                )}
                            >
                                {open ? "Hide why" : "Why?"}
                            </button>
                        )}
                        {open && (
                            <div id={whyId} className="grid gap-2 pb-1">
                                <WhyList changes={changes} />
                                <Link
                                    href={buildReviewHref(mode, titleStyle)}
                                    data-testid="review-link"
                                    onClick={() => writeConverterContext({ input: item.source, mode, titleStyle })}
                                    className="inline-flex w-fit items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                                >
                                    Open in the converter
                                    <IconExternalLink className="h-3 w-3" aria-hidden="true" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
            <CopyIconButton label={`Copy headline ${index + 1}`} copied={copied} onCopy={onCopy} />
        </li>
    )
}

/**
 * Checks a list of headlines against one style as you type. Lines that need a
 * fix come first (the default filter), each with the changed words marked and
 * the rule behind every change one tap away. The corrected list copies back in
 * its original order.
 */
export function BatchChecker({
    initialInput = "",
    initialMode = "title",
    initialTitleStyle = "standard",
}: {
    initialInput?: string
    initialMode?: ConversionType
    initialTitleStyle?: TitleCaseStyle
} = {}) {
    const [input, setInput] = React.useState(initialInput)
    const [mode, setMode] = React.useState<ConversionType>(initialMode)
    const [titleStyle, setTitleStyle] = React.useState<TitleCaseStyle>(initialTitleStyle)
    const [filter, setFilter] = React.useState<Filter>("fix")
    const [openKey, setOpenKey] = React.useState<string | null>(null)
    const [copiedKey, setCopiedKey] = React.useState<string | null>(null)
    const [announcement, setAnnouncement] = React.useState("")
    const inputRef = useAutoGrow(input, 128, 360)
    const userEditedRef = React.useRef(false)
    const checkTrackedRef = React.useRef(false)

    // Pasting a few hundred lines must not stall the textarea: results render
    // from the deferred value while keystrokes commit immediately.
    const deferredInput = React.useDeferredValue(input)
    const result = React.useMemo(
        () => runEditorialQaBatch(deferredInput, mode, titleStyle),
        [deferredInput, mode, titleStyle]
    )
    const corrected = React.useMemo(() => result.items.map((item) => item.converted).join("\n"), [result])
    const label = styleLabel(mode, titleStyle)
    const lineCount = input.split(/\r?\n/).filter((line) => line.trim()).length
    const summary = !result.total
        ? ""
        : result.needsCorrectionCount === 0
            ? `All ${plural(result.total, "headline")} already follow ${label}.`
            : `${result.needsCorrectionCount} of ${result.total} ${result.needsCorrectionCount === 1 ? "needs" : "need"} a fix for ${label}.`

    // Restore the list after a round trip to the converter. Only a non-empty
    // saved list restores, so StrictMode's second mount cannot blank it.
    React.useEffect(() => {
        try {
            const raw = window.sessionStorage.getItem(BATCH_STORAGE_KEY)
            const saved = raw ? (JSON.parse(raw) as { input?: unknown; mode?: unknown }) : null
            if (saved && typeof saved.input === "string" && saved.input) {
                setInput(saved.input)
                if (isQaMode(saved.mode)) setMode(saved.mode)
            }
        } catch {
            // no-op: restoring the list is best-effort
        }
        try {
            const remembered = window.localStorage.getItem(TITLE_STYLE_STORAGE_KEY)
            if (isTitleStyle(remembered)) setTitleStyle(remembered)
        } catch {
            // storage may be blocked; the default style stays
        }
    }, [])

    React.useEffect(() => {
        try {
            window.sessionStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify({ input: deferredInput, mode }))
        } catch {
            // storage may be blocked; the list just won't survive navigation
        }
    }, [deferredInput, mode])

    // One live-region update once the list settles, not one per keystroke.
    React.useEffect(() => {
        if (!summary) return
        const timeoutId = window.setTimeout(() => setAnnouncement(summary), SETTLE_MS)
        return () => window.clearTimeout(timeoutId)
    }, [summary])

    /**
     * Report one check per visit, once the visitor's own list settles. A list
     * restored from the session or filled from the example is not a check by
     * itself, for the same reason the converter's convert_text ignores seeded
     * input.
     */
    React.useEffect(() => {
        if (!userEditedRef.current || checkTrackedRef.current || !result.total) return
        const timeoutId = window.setTimeout(() => {
            checkTrackedRef.current = true
            trackEvent("batch_check", { mode, style: titleStyle, lines: result.total })
        }, SETTLE_MS)
        return () => window.clearTimeout(timeoutId)
    }, [result, mode, titleStyle])

    React.useEffect(() => {
        if (!copiedKey) return
        const timeoutId = window.setTimeout(() => setCopiedKey(null), COPY_FEEDBACK_DISMISS_MS)
        return () => window.clearTimeout(timeoutId)
    }, [copiedKey])

    const selectStyle = (style: TitleCaseStyle) => {
        setTitleStyle(style)
        try {
            window.localStorage.setItem(TITLE_STYLE_STORAGE_KEY, style)
        } catch {
            // storage may be blocked; the choice still applies to this visit
        }
    }

    const copy = async (text: string, key: string, lines: number, done: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedKey(key)
            setAnnouncement(done)
            trackEvent("copy_output", { mode, style: titleStyle, chars: text.length, lines, source: "batch" })
        } catch {
            toast.error("Failed to copy")
        }
    }

    const handleClear = () => {
        setInput("")
        setOpenKey(null)
        inputRef.current?.focus()
    }

    // Keys carry the text they were made for, so a copy tick or an open
    // explanation lapses on its own once that line or the whole list changes.
    const copyAllKey = `all\u0000${corrected}`
    const rows = result.items
        .map((item, index) => ({ item, index, key: `${index}\u0000${item.source}` }))
        .filter(({ item }) => filter === "all" || !item.isConsistent)

    return (
        <section
            className="mx-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)] gap-4"
            aria-label="Batch headline checker"
            data-testid="batch-checker"
        >
            <StylePicker
                modes={QA_MODES}
                mode={mode}
                onModeChange={setMode}
                titleStyle={titleStyle}
                onTitleStyleChange={selectStyle}
                modeLabel="Case"
            />

            <div className="grid gap-1.5">
                <div className="flex items-baseline justify-between gap-3 px-1">
                    <label htmlFor="batch-input" className="text-sm font-medium">
                        Your headlines
                    </label>
                    {lineCount > 0 && (
                        <span className="text-xs tabular-nums text-muted-foreground">{plural(lineCount, "headline")}</span>
                    )}
                </div>
                <div className="relative">
                    <textarea
                        ref={inputRef}
                        id="batch-input"
                        data-testid="batch-input"
                        aria-describedby="batch-input-helper"
                        value={input}
                        onChange={(e) => {
                            userEditedRef.current = true
                            setInput(e.target.value)
                        }}
                        placeholder="Paste one headline per line…"
                        className="block w-full resize-none rounded-xl border border-zinc-200 bg-background p-4 pr-12 text-base font-medium leading-relaxed text-foreground placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:placeholder:text-zinc-400"
                    />
                    <p id="batch-input-helper" className="sr-only">
                        Results update as you type.
                    </p>
                    {input && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear headlines"
                            title="Clear"
                            className={cn(
                                "absolute right-2 top-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-zinc-100 hover:text-foreground md:h-8 md:w-8 dark:hover:bg-zinc-800",
                                focusRing
                            )}
                        >
                            <IconX className="h-4 w-4" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>

            <p role="status" aria-live="polite" className="sr-only" data-testid="batch-status">
                {announcement}
            </p>

            {!result.total ? (
                <div
                    className="grid justify-items-start gap-3 rounded-xl border border-dashed border-zinc-300 p-5 text-sm text-muted-foreground dark:border-zinc-700"
                    data-testid="batch-empty"
                >
                    <p>Each headline is checked against the style you picked, and the words that need a change are marked.</p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-11 cursor-pointer md:h-8"
                        onClick={() => setInput(BATCH_EXAMPLE)}
                    >
                        Try an example
                    </Button>
                </div>
            ) : (
                <div className="result-appear grid gap-3 rounded-xl border bg-card p-4 sm:p-5" data-testid="qa-results">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-foreground" data-testid="batch-summary">
                            {result.needsCorrectionCount === 0 ? (
                                <>All {plural(result.total, "headline")} already follow {label}.</>
                            ) : (
                                <>
                                    <span className="font-semibold tabular-nums">{result.needsCorrectionCount}</span> of {result.total}{" "}
                                    {result.needsCorrectionCount === 1 ? "needs" : "need"} a fix{" "}
                                    <span className="text-muted-foreground">for {label}</span>
                                </>
                            )}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <div
                                role="radiogroup"
                                aria-label="Show"
                                className="inline-flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
                                data-testid="batch-filter"
                            >
                                {(["fix", "all"] as const).map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        role="radio"
                                        aria-checked={filter === option}
                                        onClick={() => setFilter(option)}
                                        className={cn(
                                            "h-11 cursor-pointer rounded-md px-3 text-sm font-medium tabular-nums transition-colors md:h-8",
                                            focusRing,
                                            filter === option
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {option === "fix" ? `Needs a fix · ${result.needsCorrectionCount}` : `All · ${result.total}`}
                                    </button>
                                ))}
                            </div>
                            <Button
                                onClick={() => copy(corrected, copyAllKey, result.total, `Copied ${plural(result.total, "headline")}`)}
                                aria-label={`Copy all ${plural(result.total, "corrected headline")}`}
                                data-testid="copy-all"
                                className="h-11 cursor-pointer gap-2 md:h-9"
                            >
                                {copiedKey === copyAllKey ? (
                                    <IconCheck className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <IconCopy className="h-4 w-4" aria-hidden="true" />
                                )}
                                {copiedKey === copyAllKey ? "Copied" : `Copy all ${result.total}`}
                            </Button>
                        </div>
                    </div>

                    {rows.length > 0 && (
                        <ol className="grid divide-y divide-zinc-200 dark:divide-zinc-800" data-testid="batch-results">
                            {rows.map(({ item, index, key }) => {
                                const rowCopyKey = `row\u0000${key}\u0000${item.converted}`
                                return (
                                    <BatchRow
                                        key={key}
                                        item={item}
                                        index={index}
                                        mode={mode}
                                        titleStyle={titleStyle}
                                        open={openKey === key}
                                        onToggle={() => setOpenKey(openKey === key ? null : key)}
                                        copied={copiedKey === rowCopyKey}
                                        onCopy={() => copy(item.converted, rowCopyKey, 1, `Copied headline ${index + 1}`)}
                                    />
                                )
                            })}
                        </ol>
                    )}

                    {filter === "fix" && result.consistentCount > 0 && (
                        <button
                            type="button"
                            onClick={() => setFilter("all")}
                            className={cn(
                                "w-fit cursor-pointer rounded-sm py-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
                                focusRing
                            )}
                        >
                            {result.consistentCount} already correct – show all
                        </button>
                    )}
                </div>
            )}
        </section>
    )
}
