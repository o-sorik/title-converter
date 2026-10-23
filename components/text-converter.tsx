"use client"

import * as React from "react"
import Link from "next/link"
import { IconBug, IconCheck, IconCopy, IconExternalLink, IconX } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ResultText, RuleNotes } from "@/components/converter-result"
import { convert, explainWords, type ConversionType, type TitleCaseStyle } from "@/lib/converters"
import { TITLE_STYLES } from "@/lib/title-styles"
import { getCopyFeedbackMessage, nextCopyFeedbackTick, type CopyFeedbackState } from "@/lib/copy-feedback"
import { getContextualRuleGuidance } from "@/lib/rule-guidance"
import {
    getConverterContextStorageKey,
    parseConverterContextPayload,
    parseConverterInitialStateFromQuery,
    writeConverterContext,
} from "@/lib/converter-context"
import { getHighIntentBlogHref, getHighIntentEntryFromInput } from "@/lib/high-intent-guidance"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics"

const COPY_FEEDBACK_DISMISS_MS = 2500
const FEEDBACK_SNIPPET_CHAR_LIMIT = 280
/** The last title style a visitor picked; deep links still win over it. */
const TITLE_STYLE_STORAGE_KEY = "tcc-title-style"

const CONVERSION_TYPES: { id: ConversionType; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "upper", label: "UPPER CASE" },
    { id: "lower", label: "lower case" },
    { id: "camel", label: "camelCase" },
    { id: "pascal", label: "PascalCase" },
    { id: "snake", label: "snake_case" },
    { id: "kebab", label: "URL Slug" },
    { id: "alternating", label: "aLtErNaTiNg" },
    { id: "inverse", label: "InVeRsE cAsE" },
]

const focusRing = "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

interface TextConverterProps {
    defaultMode?: ConversionType
    initialInput?: string
    initialTitleStyle?: TitleCaseStyle
    initialContextRef?: string
}

function isTitleStyle(value: string | null): value is TitleCaseStyle {
    return TITLE_STYLES.some((style) => style.id === value)
}

function plural(count: number, word: string): string {
    return `${count} ${word}${count === 1 ? "" : "s"}`
}

/** "APA title case" for title mode, the mode's own name otherwise. */
function resultLabel(mode: ConversionType, style: TitleCaseStyle): string {
    if (mode !== "title") return CONVERSION_TYPES.find((t) => t.id === mode)?.label ?? mode
    return `${TITLE_STYLES.find((s) => s.id === style)?.label ?? "Standard"} title case`
}

function useAutoGrow(value: string, min: number, max: number) {
    const ref = React.useRef<HTMLTextAreaElement>(null)
    React.useLayoutEffect(() => {
        const el = ref.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${Math.min(max, Math.max(min, el.scrollHeight))}px`
    }, [value, min, max])
    return ref
}

const selectClass = cn(
    "h-11 min-w-0 cursor-pointer rounded-md border border-zinc-200 bg-background px-3 text-base text-foreground md:h-9 md:text-sm dark:border-zinc-700",
    focusRing
)

function StyleHint({ titleStyle, onSentenceCase }: { titleStyle: TitleCaseStyle; onSentenceCase: () => void }) {
    return (
        <p className="text-xs text-muted-foreground">
            {TITLE_STYLES.find((s) => s.id === titleStyle)?.hint}
            {titleStyle === "ap" && (
                // AP's 4+ letter rule is for titles of works; AP news headlines are written in sentence case.
                <span data-testid="ap-headline-hint">
                    {" "}For titles of works. AP news headlines use{" "}
                    <button type="button" onClick={onSentenceCase} className={cn("cursor-pointer underline underline-offset-2 hover:text-foreground", focusRing)}>
                        sentence case
                    </button>
                    .
                </span>
            )}
        </p>
    )
}

export function TextConverter({
    defaultMode = "title",
    initialInput = "",
    initialTitleStyle = "standard",
    initialContextRef,
}: TextConverterProps) {
    const [input, setInput] = React.useState(initialInput)
    const [activeType, setActiveType] = React.useState<ConversionType>(defaultMode)
    const [titleStyle, setTitleStyle] = React.useState<TitleCaseStyle>(initialTitleStyle)
    const [copied, setCopied] = React.useState(false)
    const [copyFeedbackState, setCopyFeedbackState] = React.useState<CopyFeedbackState>("idle")
    const [copyFeedbackTick, setCopyFeedbackTick] = React.useState(0)
    const [notesOpen, setNotesOpen] = React.useState(false)
    const [activeRule, setActiveRule] = React.useState<string | null>(null)
    const [revealKey, setRevealKey] = React.useState(0)
    const [drawing, setDrawing] = React.useState(false)
    const hadOutputRef = React.useRef(Boolean(initialInput))
    const convertTrackedRef = React.useRef(false)
    const feedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? "support@titlecaseconverter.online"
    const inputRef = useAutoGrow(input, 96, 260)

    // Deferring the derived output (not the input value) keeps typing responsive
    // even for very large pasted texts: the conversion happens in an
    // interruptible deferred render while keystrokes commit immediately.
    const deferredInput = React.useDeferredValue(input)
    // Built from deferredInput so URL/href rebuilding stays off the urgent
    // keystroke path; the deferred value converges within a render.
    const navigationContext = React.useMemo(
        () => ({ input: deferredInput, mode: activeType, titleStyle }),
        [deferredInput, activeType, titleStyle]
    )

    // Update active type if defaultMode changes (e.g. navigation)
    React.useEffect(() => {
        setActiveType(defaultMode)
    }, [defaultMode])

    // Deep-link context is read from the URL here, on the client, on purpose.
    // Reading searchParams in the page component opted the whole route out of
    // static generation. Restoring it after mount keeps the static HTML intact
    // and treats the ctx_* round-trip as a progressive enhancement. A remembered
    // style applies only when nothing more specific asked for one.
    React.useEffect(() => {
        let contextRef = initialContextRef
        let styleFromContext = false

        try {
            const fromUrl = parseConverterInitialStateFromQuery(new URLSearchParams(window.location.search))
            contextRef = fromUrl.initialContextRef ?? initialContextRef

            if (fromUrl.initialInput) setInput(fromUrl.initialInput)
            if (fromUrl.initialMode) setActiveType(fromUrl.initialMode)
            if (fromUrl.initialTitleStyle) {
                setTitleStyle(fromUrl.initialTitleStyle)
                styleFromContext = true
            }
        } catch {
            // no-op: deep-link restoration is best-effort
        }

        if (contextRef) {
            try {
                const raw = window.sessionStorage.getItem(getConverterContextStorageKey(contextRef))
                const restored = raw ? parseConverterContextPayload(raw) : null
                if (restored) {
                    setInput(restored.input)
                    setActiveType(restored.mode)
                    setTitleStyle(restored.titleStyle)
                    styleFromContext = true
                }
            } catch {
                // no-op: context restoration is best-effort
            }
        }

        if (!styleFromContext && initialTitleStyle === "standard") {
            try {
                const remembered = window.localStorage.getItem(TITLE_STYLE_STORAGE_KEY)
                if (isTitleStyle(remembered)) setTitleStyle(remembered)
            } catch {
                // storage may be blocked; the default style stays
            }
        }
    }, [initialContextRef, initialTitleStyle])

    const isTitle = activeType === "title"
    const conversionOptions = React.useMemo(() => (isTitle ? { titleStyle } : {}), [isTitle, titleStyle])
    const output = React.useMemo(
        () => (deferredInput ? convert(deferredInput, activeType, conversionOptions) : ""),
        [deferredInput, activeType, conversionOptions]
    )
    const rules = React.useMemo(
        () => explainWords(deferredInput, activeType, conversionOptions),
        [deferredInput, activeType, conversionOptions]
    )
    const ruleGuidance = React.useMemo(
        () => getContextualRuleGuidance(activeType, titleStyle, navigationContext),
        [activeType, titleStyle, navigationContext]
    )
    const matchedHighIntentEntry = React.useMemo(() => getHighIntentEntryFromInput(deferredInput), [deferredInput])
    const highIntentContentHref = React.useMemo(
        () => (matchedHighIntentEntry ? getHighIntentBlogHref(matchedHighIntentEntry, navigationContext) : null),
        [matchedHighIntentEntry, navigationContext]
    )

    const canCopy = Boolean(output)
    const copyFeedbackMessage = getCopyFeedbackMessage(copyFeedbackState, canCopy)
    const copyLabel = isTitle ? `Copy ${TITLE_STYLES.find((s) => s.id === titleStyle)?.label ?? ""}`.trim() : "Copy"
    const trimmed = input.trim()
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0

    // The marks draw in only on the empty -> filled transition, not per keystroke.
    // Changed output also drops stale copy feedback: "Copied" no longer
    // describes what is in the clipboard.
    React.useEffect(() => {
        const hasOutput = output.length > 0
        let timeoutId: number | undefined
        if (hasOutput && !hadOutputRef.current) {
            setRevealKey((key) => key + 1)
            setDrawing(true)
            timeoutId = window.setTimeout(() => setDrawing(false), 1400)
        }
        hadOutputRef.current = hasOutput
        setCopied((prev) => (prev ? false : prev))
        setCopyFeedbackState((prev) => (prev === "idle" ? prev : "idle"))
        return () => window.clearTimeout(timeoutId)
    }, [output])

    React.useEffect(() => {
        writeConverterContext({ input: deferredInput, mode: activeType, titleStyle })
    }, [deferredInput, activeType, titleStyle])

    React.useEffect(() => {
        if (copyFeedbackState === "idle") return
        const timeoutId = window.setTimeout(() => {
            setCopied(false)
            setCopyFeedbackState("idle")
        }, COPY_FEEDBACK_DISMISS_MS)
        return () => window.clearTimeout(timeoutId)
    }, [copyFeedbackState, copyFeedbackTick])

    const selectMode = (mode: ConversionType) => {
        setActiveType(mode)
        setActiveRule(null)
        trackEvent("mode_change", { mode })
    }

    /**
     * Report that this visitor actually used the converter, once per mount.
     *
     * Deliberately called from the interaction handlers rather than from an
     * effect on `input`: the box also gets filled without anyone converting
     * anything - an article CTA seeds it through `ctx_input`, and returning from
     * the rules guide restores it from sessionStorage. Counting those would make
     * the metric agree with itself by construction, and the whole reason this
     * event exists is to separate "landed on the page" from "actually used it".
     *
     * GA4 already counts the key event ONCE_PER_SESSION, so a remount after
     * in-tab navigation costs an extra raw event but not a double conversion.
     */
    const markConverterUsed = (text: string) => {
        if (convertTrackedRef.current) return
        if (!text.trim()) return
        convertTrackedRef.current = true
        trackEvent("convert_text", { mode: activeType, style: titleStyle })
    }

    const selectStyle = (style: TitleCaseStyle) => {
        setTitleStyle(style)
        setActiveRule(null)
        trackEvent("style_change", { style })
        try {
            window.localStorage.setItem(TITLE_STYLE_STORAGE_KEY, style)
        } catch {
            // storage may be blocked; the choice still applies to this visit
        }
    }

    const handleCopy = async () => {
        if (!output) return
        try {
            await navigator.clipboard.writeText(output)
            setCopied(true)
            // Someone who arrived on a seeded link and copied the result used the
            // converter without typing a character; marking here keeps the funnel
            // monotonic (convert_text >= copy_output).
            markConverterUsed(output)
            trackEvent("copy_output", { mode: activeType, style: titleStyle, chars: output.length })
            setCopyFeedbackState("success")
            setCopyFeedbackTick((prev) => nextCopyFeedbackTick(prev))
        } catch {
            setCopied(false)
            setCopyFeedbackState("error")
            setCopyFeedbackTick((prev) => nextCopyFeedbackTick(prev))
            toast.error("Failed to copy")
        }
    }

    const handleClear = () => {
        setInput("")
        setCopied(false)
        setCopyFeedbackState("idle")
        setActiveRule(null)
        inputRef.current?.focus()
    }

    const handleReportTitleStyleError = () => {
        trackEvent("report_style_error", { style: titleStyle })
        const inputSnippet = input.trim().slice(0, FEEDBACK_SNIPPET_CHAR_LIMIT) || "(empty)"
        const outputSnippet = output.trim().slice(0, FEEDBACK_SNIPPET_CHAR_LIMIT) || "(empty)"
        const subject = `[Title Style Feedback] ${titleStyle.toUpperCase()}`
        const body = [
            "Hi, I found a possible capitalization issue.",
            "",
            `Selected style: ${titleStyle}`,
            `Input: ${inputSnippet}`,
            `Output: ${outputSnippet}`,
            `Page: ${typeof window !== "undefined" ? window.location.href : "/"}`,
            "",
            "Expected result:",
            "Why this looks incorrect:",
        ].join("\n")

        window.location.href = `mailto:${feedbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    const showNotes = rules.length > 0 && canCopy

    return (
        <section
            className="mx-auto grid w-full max-w-2xl grid-cols-[minmax(0,1fr)] gap-4"
            aria-label="Converter Workspace"
            data-testid="converter-workspace"
        >
            {/* Desktop: the style guide is the first question, the case sits beside it */}
            <div className="hidden gap-2 md:grid">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    {isTitle ? (
                        <div className="grid min-w-0 gap-1.5" data-testid="style-controls">
                            <span id="style-picker-label" className="text-sm font-medium">Which style guide?</span>
                            <div role="radiogroup" aria-labelledby="style-picker-label" className="flex flex-wrap gap-1.5">
                                {TITLE_STYLES.map((style) => {
                                    const active = titleStyle === style.id
                                    return (
                                        <button
                                            key={style.id}
                                            type="button"
                                            role="radio"
                                            aria-checked={active}
                                            onClick={() => selectStyle(style.id)}
                                            className={cn(
                                                "h-8 cursor-pointer rounded-full border px-3 text-sm font-medium transition-colors",
                                                focusRing,
                                                active
                                                    ? "border-transparent bg-primary text-primary-foreground"
                                                    : "border-zinc-200 text-foreground hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/60"
                                            )}
                                        >
                                            {style.qualifiedLabel}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <span />
                    )}
                    <select
                        aria-label="Conversion mode"
                        data-testid="mode-controls"
                        value={activeType}
                        onChange={(e) => selectMode(e.target.value as ConversionType)}
                        className={selectClass}
                    >
                        {CONVERSION_TYPES.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>
                {isTitle && <StyleHint titleStyle={titleStyle} onSentenceCase={() => selectMode("sentence")} />}
            </div>

            {/* Phones: two compact selects; the hint says what the style does */}
            <div className="grid gap-2 md:hidden" data-testid="mobile-mode-controls">
                <div className="flex gap-2">
                    <select
                        aria-label="Conversion mode"
                        value={activeType}
                        onChange={(e) => selectMode(e.target.value as ConversionType)}
                        className={cn(selectClass, "w-full flex-1")}
                    >
                        {CONVERSION_TYPES.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {isTitle && (
                        <select
                            aria-label="Title style"
                            value={titleStyle}
                            onChange={(e) => selectStyle(e.target.value as TitleCaseStyle)}
                            className={cn(selectClass, "w-full flex-1")}
                        >
                            {TITLE_STYLES.map((style) => (
                                <option key={style.id} value={style.id}>
                                    {style.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                {isTitle && <StyleHint titleStyle={titleStyle} onSentenceCase={() => selectMode("sentence")} />}
            </div>

            <div className="relative" data-testid="input-zone">
                <textarea
                    ref={inputRef}
                    id="converter-input"
                    aria-label="Input text"
                    aria-describedby="converter-input-helper"
                    placeholder="Type or paste your title here..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                        markConverterUsed(e.target.value)
                    }}
                    onPaste={(e) => {
                        trackEvent("paste_input", { mode: activeType })
                        markConverterUsed(e.clipboardData.getData("text"))
                    }}
                    className="block min-h-24 w-full resize-none rounded-xl border border-zinc-200 bg-background p-4 pr-12 text-lg font-medium text-foreground placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:placeholder:text-zinc-400"
                />
                <p id="converter-input-helper" className="sr-only">
                    The converted text updates as you type.
                </p>
                {input && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="Clear input"
                        title="Clear"
                        className={cn("absolute right-2 top-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-zinc-100 hover:text-foreground md:h-8 md:w-8 dark:hover:bg-zinc-800", focusRing)}
                    >
                        <IconX className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="grid gap-3 rounded-xl border bg-card p-4 sm:p-5" data-testid="output-zone">
                <div className="flex items-baseline justify-between gap-3">
                    <span id="converter-output-label" className="text-sm font-medium text-muted-foreground">
                        {resultLabel(activeType, titleStyle)}
                    </span>
                    {input && (
                        <span className="text-xs tabular-nums text-muted-foreground">
                            {plural(input.length, "character")} · {plural(wordCount, "word")}
                        </span>
                    )}
                </div>
                <div
                    id="converter-output"
                    role="textbox"
                    aria-readonly="true"
                    aria-label="Converted output"
                    aria-describedby="copy-feedback"
                    tabIndex={0}
                    className={cn("whitespace-pre-wrap break-words rounded-md pb-1 text-xl font-medium leading-relaxed text-foreground", focusRing)}
                >
                    <ResultText
                        text={deferredInput}
                        mode={activeType}
                        titleStyle={titleStyle}
                        output={output}
                        rules={rules}
                        activeRule={activeRule}
                        revealKey={revealKey}
                        drawing={drawing}
                    />
                </div>
                <p data-testid="copy-feedback" role="status" aria-live="polite" className="sr-only">
                    {copyFeedbackMessage}
                </p>
                <Button
                    size="lg"
                    onClick={handleCopy}
                    disabled={!canCopy}
                    title={copied ? "Copied!" : "Copy Result"}
                    aria-label="Copy output"
                    data-testid="copy-action"
                    className="w-full cursor-pointer gap-2 sm:w-auto sm:justify-self-end"
                >
                    {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
                    {copied ? "Copied" : copyLabel}
                </Button>
                {showNotes && (
                    <div className="border-t pt-4" data-testid="rule-notes">
                        <button
                            type="button"
                            onClick={() => setNotesOpen((open) => !open)}
                            aria-expanded={notesOpen}
                            aria-controls="converter-rule-notes"
                            data-testid="explanations-toggle"
                            className={cn("cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline md:hidden", focusRing)}
                        >
                            {notesOpen ? "Hide the rules" : "Why each word looks this way"}
                        </button>
                        <p className="mb-3 hidden text-sm font-medium md:block">Why each word looks this way</p>
                        <RuleNotes
                            id="converter-rule-notes"
                            rules={rules}
                            open={notesOpen}
                            animate={drawing || notesOpen}
                            activeRule={activeRule}
                            onActiveRule={setActiveRule}
                        />
                    </div>
                )}
            </div>

            <div
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs"
                data-testid="converter-content-continuity"
            >
                <div data-testid="output-rules-entry">
                    <Link
                        href={ruleGuidance.href}
                        className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        aria-label={ruleGuidance.description}
                    >
                        <span>{ruleGuidance.shortLabel}</span>
                        <IconExternalLink className="h-3 w-3" aria-hidden="true" />
                    </Link>
                </div>
                <Link
                    href="/blog/categories/grammar-101"
                    className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    aria-label="Browse Grammar 101 capitalization questions"
                >
                    <span>Grammar 101</span>
                    <IconExternalLink className="h-3 w-3" aria-hidden="true" />
                </Link>
                {highIntentContentHref && (
                    <Link
                        href={highIntentContentHref}
                        className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        aria-label="Open matched Grammar 101 guidance for this capitalization query"
                    >
                        <span>See matched answer</span>
                        <IconExternalLink className="h-3 w-3" aria-hidden="true" />
                    </Link>
                )}
                <Link
                    href="/batch-checker"
                    className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    aria-label="Open the batch headline checker for multiple headlines"
                >
                    <span>Batch Headline Checker</span>
                    <IconExternalLink className="h-3 w-3" aria-hidden="true" />
                </Link>
                {isTitle && (
                    <button
                        type="button"
                        onClick={handleReportTitleStyleError}
                        aria-label="Report title style issue"
                        className={cn("inline-flex cursor-pointer items-center gap-1 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline", focusRing)}
                    >
                        <IconBug className="h-3 w-3" aria-hidden="true" />
                        <span>Report error</span>
                    </button>
                )}
            </div>
        </section>
    )
}
