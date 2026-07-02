"use client"

import * as React from "react"
import Link from "next/link"
import { IconCopy, IconRotateClockwise, IconClipboard, IconCheck, IconInfoCircle, IconBug, IconExternalLink } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

import { convert, convertWithExplanations, type ConversionType, type WordExplanation, type TitleCaseStyle } from "@/lib/converters"
import { getCopyFeedbackMessage, nextCopyFeedbackTick, type CopyFeedbackState } from "@/lib/copy-feedback"
import { getContextualRuleGuidance } from "@/lib/rule-guidance"
import { getConverterContextStorageKey, parseConverterContextPayload } from "@/lib/converter-context"
import { getHighIntentBlogHref, getHighIntentEntryFromInput } from "@/lib/high-intent-guidance"
import { cn } from "@/lib/utils"

const MAX_VISIBLE_EXPLANATIONS = 15
const COPY_FEEDBACK_DISMISS_MS = 2500
const FEEDBACK_SNIPPET_CHAR_LIMIT = 280

const CONVERSION_TYPES: { id: ConversionType; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "lower", label: "lower case" },
    { id: "upper", label: "UPPER CASE" },
    { id: "camel", label: "camelCase" },
    { id: "pascal", label: "PascalCase" },
    { id: "snake", label: "snake_case" },
    { id: "kebab", label: "URL Slug" },
    { id: "alternating", label: "aLtErNaTiNg" },
    { id: "inverse", label: "InVeRsE cAsE" },
]

// Modes that support explanations
const EXPLANATION_MODES: ConversionType[] = ["title", "sentence"]
const TITLE_STYLES: { id: TitleCaseStyle; label: string; hint: string }[] = [
    { id: "standard", label: "Standard", hint: "Balanced default title casing" },
    { id: "ap", label: "AP", hint: "AP-like: capitalize prepositions with 5+ letters" },
    { id: "chicago", label: "Chicago", hint: "Classic editorial style defaults" },
    { id: "mla", label: "MLA", hint: "Common humanities title style" },
    { id: "apa", label: "APA", hint: "Academic-friendly title style" },
]

const CONVERSION_GROUPS: { label: string; ids: ConversionType[] }[] = [
    { label: "Text Case", ids: ["title", "sentence", "upper", "lower"] },
    { label: "Code Case", ids: ["camel", "pascal", "snake", "kebab"] },
    { label: "Fun", ids: ["alternating", "inverse"] },
]

const CONVERSION_TOOLTIPS: Record<ConversionType, { desc: string; example: string }> = {
    title:       { desc: "Capitalize major words per style guide", example: "Hello World" },
    sentence:    { desc: "Capitalize the first word only",         example: "Hello world" },
    upper:       { desc: "ALL CAPS — every letter uppercase",      example: "HELLO WORLD" },
    lower:       { desc: "all lowercase — every letter",           example: "hello world" },
    camel:       { desc: "Joined words, first word lowercase",     example: "helloWorld" },
    pascal:      { desc: "Joined words, each capitalized",         example: "HelloWorld" },
    snake:       { desc: "Words joined by underscores",            example: "hello_world" },
    kebab:       { desc: "Words joined by hyphens (URL-safe)",     example: "hello-world" },
    alternating: { desc: "Alternates upper and lower letters",     example: "hElLo WoRlD" },
    inverse:     { desc: "Flips the case of each letter",          example: "hELLO wORLD" },
}

const STYLE_RULE_SUMMARY: Record<TitleCaseStyle, string> = {
    standard: "Lowercases most prepositions and conjunctions; capitalizes major words plus first/last positions.",
    ap: "Capitalizes prepositions with 5+ letters, lowercases shorter ones in the middle of titles.",
    chicago: "Lowercases prepositions and conjunctions in most middle positions; strong positional rules.",
    mla: "Similar to Chicago for core capitalization; emphasizes consistent headline style usage.",
    apa: "Capitalizes prepositions and conjunctions with 4+ letters; lowercases shorter ones in the middle.",
}

interface TextConverterProps {
    defaultMode?: ConversionType
    initialInput?: string
    initialTitleStyle?: TitleCaseStyle
    initialContextRef?: string
}

// Text Statistics Component
function TextStats({ text }: { text: string }) {
    const stats = React.useMemo(() => {
        const trimmed = text.trim()
        const words = trimmed ? trimmed.split(/\s+/).length : 0
        const characters = text.length
        const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0

        return { words, characters, sentences }
    }, [text])

    return (
        <div className="flex gap-4 text-xs text-muted-foreground animate-slideUp">
            <span className="flex items-center gap-1">
                <span className="font-semibold text-foreground">{stats.words}</span> words
            </span>
            <span className="flex items-center gap-1">
                <span className="font-semibold text-foreground">{stats.characters}</span> characters
            </span>
            <span className="flex items-center gap-1">
                <span className="font-semibold text-foreground">{stats.sentences}</span> sentences
            </span>
        </div>
    )
}

// Explanations Component
function ExplanationsPanel({
    explanations,
    activeType,
    titleStyle,
}: {
    explanations: WordExplanation[]
    activeType: ConversionType
    titleStyle: TitleCaseStyle
}) {
    if (!explanations.length) return null

    return (
        <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-slideUp">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <IconInfoCircle className="h-4 w-4 text-blue-500" />
                Why was it capitalized this way?
            </h4>
            {activeType === "title" && (
                <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">{TITLE_STYLES.find((s) => s.id === titleStyle)?.label} style:</span>{" "}
                    {STYLE_RULE_SUMMARY[titleStyle]}
                </p>
            )}
            <div className="space-y-2 max-h-48 overflow-y-auto">
                {explanations.slice(0, MAX_VISIBLE_EXPLANATIONS).map((exp, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${exp.type === "capitalized"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            }`}>
                            {exp.word} → {exp.converted}
                        </span>
                        <span className="text-muted-foreground">{exp.reason}</span>
                    </div>
                ))}
                {explanations.length > MAX_VISIBLE_EXPLANATIONS && (
                    <p className="text-xs text-muted-foreground italic">
                        +{explanations.length - MAX_VISIBLE_EXPLANATIONS} more changes...
                    </p>
                )}
            </div>
        </div>
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
    const [copied, setCopied] = React.useState(false)
    const [copyFeedbackState, setCopyFeedbackState] = React.useState<CopyFeedbackState>("idle")
    const [ripple, setRipple] = React.useState(0)
    const [copyFeedbackTick, setCopyFeedbackTick] = React.useState(0)
    const [showExplanations, setShowExplanations] = React.useState(false)
    const [titleStyle, setTitleStyle] = React.useState<TitleCaseStyle>(initialTitleStyle)
    const [reveal, setReveal] = React.useState(false)
    const hadOutputRef = React.useRef(false)
    const buttonRefs = React.useRef<Partial<Record<ConversionType, HTMLButtonElement>>>({})
    const [pillStyles, setPillStyles] = React.useState<Record<string, React.CSSProperties>>({})
    const feedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? "support@titlecaseconverter.online"
    // Deferring the derived output (not the input value) keeps typing responsive
    // even for very large pasted texts: the conversion happens in an
    // interruptible deferred render while keystrokes commit immediately.
    const deferredInput = React.useDeferredValue(input)
    // Built from deferredInput so URL/href rebuilding stays off the urgent
    // keystroke path; the deferred value converges within a render.
    const navigationContext = React.useMemo(
        () => ({
            input: deferredInput,
            mode: activeType,
            titleStyle,
            outputMode: activeType,
            outputTitleStyle: titleStyle,
        }),
        [deferredInput, activeType, titleStyle]
    )

    // Update active type if defaultMode changes (e.g. navigation)
    React.useEffect(() => {
        setActiveType(defaultMode)
    }, [defaultMode])

    // Set initial pill position after mount
    React.useLayoutEffect(() => {
        const raf = requestAnimationFrame(() => {
            const activeBtn = buttonRefs.current[activeType]
            if (!activeBtn) return
            const activeGroup = CONVERSION_GROUPS.find(g => g.ids.includes(activeType))
            if (!activeGroup) return
            const newStyles: Record<string, React.CSSProperties> = {}
            CONVERSION_GROUPS.forEach(group => {
                if (group.label === activeGroup.label) {
                    newStyles[group.label] = {
                        left: activeBtn.offsetLeft,
                        top: activeBtn.offsetTop,
                        width: activeBtn.offsetWidth,
                        height: activeBtn.offsetHeight,
                        opacity: 1,
                    }
                } else {
                    newStyles[group.label] = { opacity: 0 }
                }
            })
            setPillStyles(newStyles)
        })
        return () => cancelAnimationFrame(raf)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update pill position when activeType changes
    React.useEffect(() => {
        const activeBtn = buttonRefs.current[activeType]
        if (!activeBtn) return
        const activeGroup = CONVERSION_GROUPS.find(g => g.ids.includes(activeType))
        if (!activeGroup) return
        const newStyles: Record<string, React.CSSProperties> = {}
        CONVERSION_GROUPS.forEach(group => {
            if (group.label === activeGroup.label) {
                newStyles[group.label] = {
                    left: activeBtn.offsetLeft,
                    top: activeBtn.offsetTop,
                    width: activeBtn.offsetWidth,
                    height: activeBtn.offsetHeight,
                    opacity: 1,
                }
            } else {
                newStyles[group.label] = {
                    ...(pillStyles[group.label] ?? {}),
                    opacity: 0,
                }
            }
        })
        setPillStyles(newStyles)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeType])

    React.useEffect(() => {
        if (!initialContextRef) return
        try {
            const raw = window.sessionStorage.getItem(getConverterContextStorageKey(initialContextRef))
            if (!raw) return
            const restored = parseConverterContextPayload(raw)
            if (!restored) return

            setInput(restored.input)
            setActiveType(restored.mode)
            setTitleStyle(restored.titleStyle)
        } catch {
            // no-op: context restoration is best-effort
        }
    }, [initialContextRef])

    const ruleGuidance = React.useMemo(
        () => getContextualRuleGuidance(activeType, titleStyle, navigationContext),
        [activeType, titleStyle, navigationContext]
    )
    const matchedHighIntentEntry = React.useMemo(
        () => getHighIntentEntryFromInput(deferredInput),
        [deferredInput]
    )
    const highIntentContentHref = React.useMemo(
        () => (matchedHighIntentEntry ? getHighIntentBlogHref(matchedHighIntentEntry, navigationContext) : null),
        [matchedHighIntentEntry, navigationContext]
    )
    const outputSupportsExplanations = EXPLANATION_MODES.includes(activeType)
    const conversionOptions = React.useMemo(
        () => activeType === "title" ? { titleStyle } : {},
        [activeType, titleStyle]
    )

    // Derived state for output and explanations - converts live as the user types
    const { output, explanations } = React.useMemo(() => {
        if (!deferredInput.trim()) {
            return { output: "", explanations: [] as WordExplanation[] }
        }
        if (showExplanations && outputSupportsExplanations) {
            return convertWithExplanations(deferredInput, activeType, conversionOptions)
        }
        return { output: convert(deferredInput, activeType, conversionOptions), explanations: [] as WordExplanation[] }
    }, [deferredInput, activeType, showExplanations, outputSupportsExplanations, conversionOptions])
    const canCopy = Boolean(output)
    const copyFeedbackMessage = getCopyFeedbackMessage(copyFeedbackState, canCopy)
    const showVisibleCopyFeedback = copyFeedbackState === "success" || copyFeedbackState === "error"
    const copyFeedbackBadgeText =
        copyFeedbackState === "success" ? "Copied" : copyFeedbackState === "error" ? "Copy failed" : ""

    // Reveal animation only on the empty -> non-empty transition, not per keystroke.
    // Also drop stale copy feedback: once the output changes, "Copied" no longer
    // describes what is in the clipboard.
    React.useEffect(() => {
        const hasOutput = output.length > 0
        if (hasOutput && !hadOutputRef.current) {
            setReveal(true)
        }
        hadOutputRef.current = hasOutput
        setCopied((prev) => (prev ? false : prev))
        setCopyFeedbackState((prev) => (prev === "idle" ? prev : "idle"))
    }, [output])

    React.useEffect(() => {
        try {
            window.sessionStorage.setItem(
                getConverterContextStorageKey(),
                JSON.stringify({
                    input: deferredInput,
                    mode: activeType,
                    titleStyle,
                    outputMode: activeType,
                    outputTitleStyle: titleStyle,
                })
            )
        } catch {
            // no-op: persistence is best-effort
        }
    }, [deferredInput, activeType, titleStyle])

    React.useEffect(() => {
        if (!outputSupportsExplanations && showExplanations) {
            setShowExplanations(false)
        }
    }, [outputSupportsExplanations, showExplanations])

    React.useEffect(() => {
        if (copyFeedbackState === "idle") return
        const timeoutId = window.setTimeout(() => {
            setCopied(false)
            setCopyFeedbackState("idle")
        }, COPY_FEEDBACK_DISMISS_MS)
        return () => window.clearTimeout(timeoutId)
    }, [copyFeedbackState, copyFeedbackTick])

    const handleCopy = async () => {
        if (!output) return
        try {
            await navigator.clipboard.writeText(output)
            setCopied(true)
            setCopyFeedbackState("success")
            setCopyFeedbackTick((prev) => nextCopyFeedbackTick(prev))
        } catch {
            setCopied(false)
            setCopyFeedbackState("error")
            setCopyFeedbackTick((prev) => nextCopyFeedbackTick(prev))
            toast.error("Failed to copy")
        }
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setInput(text)
            toast.success("Pasted from clipboard")
        } catch {
            toast.error("Failed to paste", { description: "Please allow clipboard access." })
        }
    }

    const handleClear = () => {
        setInput("")
        setCopied(false)
        setCopyFeedbackState("idle")
        toast.message("Cleared text")
    }

    const handleReportTitleStyleError = () => {
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

        const mailtoUrl = `mailto:${feedbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = mailtoUrl
    }

    return (
        <section
            className="w-full max-w-5xl mx-auto p-4 space-y-8"
            aria-label="Converter Workspace"
            data-testid="converter-workspace"
        >
            <Card className="border-0 shadow-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
                <CardContent className="flex flex-col gap-6 pt-6">

                    {/* Controls - Grouped by category */}
                    <div
                        className="order-2 md:order-1 flex flex-wrap items-start justify-center gap-2 sm:gap-4 pb-3 sm:pb-4"
                        aria-label="Mode Controls"
                        data-testid="mode-controls"
                    >
                        {CONVERSION_GROUPS.filter((group) => group.label !== "Fun" || (["alternating", "inverse"] as ConversionType[]).includes(activeType)).map((group) => (
                            <div key={group.label} className="flex flex-col items-center gap-1 sm:gap-1.5">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
                                    {group.label}
                                </span>
                                <div className="relative flex flex-wrap justify-center gap-1 sm:gap-1.5">
                                    {/* Sliding pill */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute rounded-full bg-primary pointer-events-none z-0"
                                        style={{
                                            transition: 'left 220ms cubic-bezier(0.4,0,0.2,1), top 220ms cubic-bezier(0.4,0,0.2,1), width 220ms cubic-bezier(0.4,0,0.2,1), height 220ms cubic-bezier(0.4,0,0.2,1), opacity 150ms ease',
                                            ...pillStyles[group.label],
                                        }}
                                    />
                                    {group.ids.map((id) => {
                                        const type = CONVERSION_TYPES.find((t) => t.id === id)!
                                        const tip = CONVERSION_TOOLTIPS[type.id]
                                        const isActive = activeType === type.id
                                        return (
                                            <Tooltip key={type.id} delayDuration={300}>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        ref={el => { if (el) buttonRefs.current[type.id] = el }}
                                                        onClick={() => setActiveType(type.id)}
                                                        aria-pressed={isActive}
                                                        data-active={isActive ? "true" : "false"}
                                                        className={cn(
                                                            "relative z-10 rounded-full h-8 px-2 text-xs sm:px-3 sm:text-sm font-medium border transition-colors duration-150 cursor-pointer",
                                                            isActive
                                                                ? "text-primary-foreground border-transparent"
                                                                : "text-foreground border-zinc-200 dark:border-zinc-700 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                                        )}
                                                    >
                                                        {type.label}
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    side="bottom"
                                                    sideOffset={6}
                                                    className="tooltip-no-arrow p-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl max-w-[200px]"
                                                >
                                                    <div className="px-3 pt-2.5 pb-2 space-y-1.5">
                                                        <p className="text-[11px] leading-snug text-muted-foreground">{tip.desc}</p>
                                                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                                                            <span className="text-muted-foreground/60">Hello World</span>
                                                            <span className="text-muted-foreground/40">→</span>
                                                            <span className="font-semibold text-primary">{tip.example}</span>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}

                        {activeType === "title" && (
                            // Desktop style tabs live next to the mode groups; mobile
                            // uses the compact select above the input
                            <div className="hidden md:flex flex-col items-center gap-1 sm:gap-1.5" data-testid="style-controls">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
                                    Title Style
                                </span>
                                <Tabs
                                    value={titleStyle}
                                    onValueChange={(value) => setTitleStyle(value as TitleCaseStyle)}
                                    className="w-fit"
                                >
                                    <TabsList className="w-fit h-auto flex-wrap justify-start gap-1 p-1 bg-zinc-100 dark:bg-zinc-900">
                                        {TITLE_STYLES.map((style) => (
                                            <TabsTrigger
                                                key={style.id}
                                                value={style.id}
                                                data-active={titleStyle === style.id ? "true" : "false"}
                                                className="h-8 px-3 flex-none"
                                            >
                                                {style.label}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>
                                <p className="text-xs text-muted-foreground">
                                    {TITLE_STYLES.find((style) => style.id === titleStyle)?.hint}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="order-1 md:order-2 grid md:grid-cols-2 gap-6 relative">
                        {/* Mobile-only compact mode + style pickers: the full chip
                            selector sits below the output on small screens, so give
                            mobile users a way to switch mode before typing */}
                        <div className="md:hidden flex gap-2" data-testid="mobile-mode-controls">
                            <Select value={activeType} onValueChange={(value) => setActiveType(value as ConversionType)}>
                                <SelectTrigger className="flex-1 min-h-11" aria-label="Conversion mode">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CONVERSION_GROUPS.map((group) => (
                                        <SelectGroup key={group.label}>
                                            <SelectLabel>{group.label}</SelectLabel>
                                            {group.ids.map((id) => {
                                                const type = CONVERSION_TYPES.find((t) => t.id === id)!
                                                return (
                                                    <SelectItem key={type.id} value={type.id}>
                                                        {type.label}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                            {activeType === "title" && (
                                <Select value={titleStyle} onValueChange={(value) => setTitleStyle(value as TitleCaseStyle)}>
                                    <SelectTrigger className="w-32 min-h-11" aria-label="Title style">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TITLE_STYLES.map((style) => (
                                            <SelectItem key={style.id} value={style.id}>
                                                {style.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="space-y-2 group" data-testid="input-zone">
                            <div className="flex items-center justify-between px-1">
                                <label htmlFor="converter-input" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                                    Input Text
                                </label>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-11 w-11 sm:h-8 sm:w-8"
                                        onClick={handlePaste}
                                        title="Paste from Clipboard"
                                        aria-label="Paste from clipboard"
                                    >
                                        <IconClipboard className="h-4 w-4" />
                                        <span className="sr-only">Paste</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-11 w-11 sm:h-8 sm:w-8 hover:text-red-500"
                                        onClick={handleClear}
                                        title="Clear Input"
                                        aria-label="Clear input"
                                    >
                                        <IconRotateClockwise className="h-4 w-4" />
                                        <span className="sr-only">Clear</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <Textarea
                                    id="converter-input"
                                    placeholder="Type or paste your text here..."
                                    className="min-h-[140px] sm:min-h-[160px] md:min-h-[200px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    aria-describedby="converter-input-helper"
                                    aria-label="Input text"
                                />
                                <div
                                    id="converter-input-helper"
                                    className={`absolute bottom-4 left-6 text-xs text-zinc-500 dark:text-zinc-400 pointer-events-none pointer-coarse:hidden ${input ? "sr-only" : "animate-fadeIn"}`}
                                >
                                    Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-mono">⌘/Ctrl + V</kbd> to paste
                                </div>
                            </div>
                            {input && <TextStats text={input} />}
                        </div>

                        {/* Output Area */}
                        <div className="space-y-2 group" data-testid="output-zone">
                            <div className="flex items-center justify-between px-1">
                                <label htmlFor="converter-output" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                                    {CONVERSION_TYPES.find(t => t.id === activeType)?.label} output
                                </label>
                                <div className="flex items-center gap-2">
                                    <span
                                        data-testid="copy-feedback-visible"
                                        aria-hidden="true"
                                        className={`rounded-full px-2 py-0.5 text-xs transition-all duration-500 ease-in-out motion-reduce:transition-none ${copyFeedbackState === "success"
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                            : copyFeedbackState === "error"
                                                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                                : "bg-transparent text-transparent"
                                            } ${showVisibleCopyFeedback ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                                    >
                                        {copyFeedbackBadgeText}
                                    </span>
                                    {outputSupportsExplanations && canCopy && (
                                        <Button
                                            variant={showExplanations ? "secondary" : "ghost"}
                                            size="sm"
                                            className="h-11 sm:h-8 px-2 gap-1.5 text-muted-foreground"
                                            onClick={() => setShowExplanations((prev) => !prev)}
                                            aria-pressed={showExplanations}
                                            title="See why each word was capitalized"
                                            data-testid="explanations-toggle"
                                        >
                                            <IconInfoCircle className="h-4 w-4" />
                                            <span className="hidden sm:inline">Explain</span>
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-11 sm:h-8 px-3 gap-1.5 relative overflow-hidden"
                                        onClick={() => { setRipple(k => k + 1); handleCopy() }}
                                        disabled={!canCopy}
                                        title={copied ? "Copied!" : "Copy Result"}
                                        data-testid="copy-action"
                                        aria-label="Copy output"
                                    >
                                        {ripple > 0 && (
                                            <span key={ripple} className="ripple-burst" onAnimationEnd={() => setRipple(0)} />
                                        )}
                                        {copied ? (
                                            <IconCheck className="h-4 w-4 text-green-500 animate-checkmark" />
                                        ) : (
                                            <IconCopy className="h-4 w-4" />
                                        )}
                                        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                                    </Button>
                                </div>
                            </div>
                            <p
                                data-testid="copy-feedback"
                                role="status"
                                aria-live="polite"
                                className="sr-only"
                            >
                                {copyFeedbackMessage}
                            </p>
                            <Textarea
                                id="converter-output"
                                readOnly
                                placeholder="Result Will Appear Here..."
                                className={cn(
                                  "min-h-[140px] sm:min-h-[160px] md:min-h-[200px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-foreground font-medium focus-visible:ring-0 placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
                                  reveal && "animate-result-reveal"
                                )}
                                value={output}
                                onAnimationEnd={() => setReveal(false)}
                                aria-describedby="copy-feedback"
                                aria-label="Converted output"
                            />
                            <div
                                className="flex justify-end"
                                data-testid="output-rules-entry"
                            >
                                <Link
                                    href={ruleGuidance.href}
                                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                                    aria-label={ruleGuidance.description}
                                >
                                    <span>{ruleGuidance.shortLabel}</span>
                                    <IconExternalLink className="h-3 w-3" />
                                </Link>
                            </div>
                            {output && <TextStats text={output} />}
                            {/* Explanations Panel - lives right under the output it explains */}
                            {showExplanations && explanations.length > 0 && (
                                <ExplanationsPanel explanations={explanations} activeType={activeType} titleStyle={titleStyle} />
                            )}
                        </div>
                    </div>

                    <div
                        className="order-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 text-xs"
                        data-testid="converter-content-continuity"
                    >
                        <Link
                            href="/blog/categories/grammar-101"
                            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                            aria-label="Browse Grammar 101 capitalization questions"
                        >
                            <span>Grammar 101</span>
                            <IconExternalLink className="h-3 w-3" />
                        </Link>
                        {highIntentContentHref && (
                            <Link
                                href={highIntentContentHref}
                                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                                aria-label="Open matched Grammar 101 guidance for this capitalization query"
                            >
                                <span>See matched answer</span>
                                <IconExternalLink className="h-3 w-3" />
                            </Link>
                        )}
                        <Link
                            href="/batch-checker"
                            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                            aria-label="Open the batch headline checker for multiple headlines"
                        >
                            <span>Batch Headline Checker</span>
                            <IconExternalLink className="h-3 w-3" />
                        </Link>
                        {activeType === "title" && (
                            <button
                                type="button"
                                onClick={handleReportTitleStyleError}
                                aria-label="Report title style issue"
                                className="inline-flex cursor-pointer items-center gap-1 text-muted-foreground/60 hover:text-muted-foreground underline-offset-4 hover:underline"
                            >
                                <IconBug className="h-3 w-3" />
                                <span>Report error</span>
                            </button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
