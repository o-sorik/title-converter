"use client"

import * as React from "react"
import { Copy, RotateCcw, ClipboardPaste, Check, Info, Bug } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { convert, convertWithExplanations, type ConversionType, type WordExplanation, type TitleCaseStyle } from "@/lib/converters"
import { createConversionSnapshot, hasPendingConversionChanges, syncSnapshotMode, type ConversionSnapshot } from "@/lib/conversion-session"
import { getCopyFeedbackMessage, nextCopyFeedbackTick, type CopyFeedbackState } from "@/lib/copy-feedback"

const CONVERSION_TYPES: { id: ConversionType; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "lower", label: "lower case" },
    { id: "upper", label: "UPPER CASE" },
    { id: "camel", label: "camelCase" },
    { id: "pascal", label: "PascalCase" },
    { id: "snake", label: "snake_case" },
    { id: "kebab", label: "url-writing-case" },
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
                <Info className="h-4 w-4 text-blue-500" />
                Why was it capitalized this way?
            </h4>
            {activeType === "title" && (
                <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">{TITLE_STYLES.find((s) => s.id === titleStyle)?.label} style:</span>{" "}
                    {STYLE_RULE_SUMMARY[titleStyle]}
                </p>
            )}
            <div className="space-y-2 max-h-48 overflow-y-auto">
                {explanations.slice(0, 15).map((exp, i) => (
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
                {explanations.length > 15 && (
                    <p className="text-xs text-muted-foreground italic">
                        +{explanations.length - 15} more changes...
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
}: TextConverterProps) {
    const [input, setInput] = React.useState(initialInput)
    const [activeType, setActiveType] = React.useState<ConversionType>(defaultMode)
    const [conversionSnapshot, setConversionSnapshot] = React.useState<ConversionSnapshot | null>(
        createConversionSnapshot(initialInput, defaultMode, initialTitleStyle)
    )
    const [copied, setCopied] = React.useState(false)
    const [copyFeedbackState, setCopyFeedbackState] = React.useState<CopyFeedbackState>("idle")
    const [copyFeedbackTick, setCopyFeedbackTick] = React.useState(0)
    const [outputKey, setOutputKey] = React.useState(initialInput ? 1 : 0)
    const [showExplanations, setShowExplanations] = React.useState(false)
    const [titleStyle, setTitleStyle] = React.useState<TitleCaseStyle>(initialTitleStyle)
    const feedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? "support@titlecaseconverter.online"
    const outputTitleStyle = conversionSnapshot?.titleStyle ?? titleStyle

    // Update active type if defaultMode changes (e.g. navigation)
    React.useEffect(() => {
        setActiveType(defaultMode)
        setConversionSnapshot((prev) => syncSnapshotMode(prev, defaultMode))
    }, [defaultMode])

    const outputType = conversionSnapshot?.type ?? activeType
    const hasPendingChanges = hasPendingConversionChanges(conversionSnapshot, input, activeType, titleStyle)
    const outputSupportsExplanations = conversionSnapshot
        ? EXPLANATION_MODES.includes(conversionSnapshot.type)
        : false
    const conversionOptions = React.useMemo(
        () => outputType === "title" ? { titleStyle: outputTitleStyle } : {},
        [outputType, outputTitleStyle]
    )

    // Derived state for output and explanations
    const { output, explanations } = React.useMemo(() => {
        if (!conversionSnapshot) {
            return { output: "", explanations: [] }
        }
        if (showExplanations && outputSupportsExplanations) {
            return convertWithExplanations(conversionSnapshot.input, outputType, conversionOptions)
        }
        return { output: convert(conversionSnapshot.input, outputType, conversionOptions), explanations: [] }
    }, [conversionSnapshot, outputType, showExplanations, outputSupportsExplanations, conversionOptions])
    const canCopy = Boolean(output)
    const copyFeedbackMessage = getCopyFeedbackMessage(copyFeedbackState, canCopy)
    const showVisibleCopyFeedback = copyFeedbackState === "success" || copyFeedbackState === "error"
    const copyFeedbackBadgeText =
        copyFeedbackState === "success" ? "Copied" : copyFeedbackState === "error" ? "Copy failed" : ""

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
        }, 2500)
        return () => window.clearTimeout(timeoutId)
    }, [copyFeedbackState, copyFeedbackTick])

    const handleConvert = () => {
        const nextSnapshot = createConversionSnapshot(input, activeType, titleStyle)
        if (!nextSnapshot) return
        setConversionSnapshot(nextSnapshot)
        setCopied(false)
        setCopyFeedbackState("idle")
        setOutputKey((prev) => prev + 1)
    }

    const handleCopy = async () => {
        if (!output) return
        try {
            await navigator.clipboard.writeText(output)
            setCopied(true)
            setCopyFeedbackState("success")
            setCopyFeedbackTick((prev) => nextCopyFeedbackTick(prev))
            toast.success("Copied to clipboard")
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
        setConversionSnapshot(null)
        setCopied(false)
        setCopyFeedbackState("idle")
        setOutputKey((prev) => prev + 1)
        toast.message("Cleared text")
    }

    const handleReportTitleStyleError = () => {
        const snippetLimit = 280
        const inputSnippet = input.trim().slice(0, snippetLimit) || "(empty)"
        const outputSnippet = output.trim().slice(0, snippetLimit) || "(empty)"
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
                <CardContent className="space-y-6 pt-6">

                    {/* Controls - Top for ez access */}
                    <div
                        className="flex flex-wrap items-center justify-center gap-2 pb-4"
                        aria-label="Mode Controls"
                        data-testid="mode-controls"
                    >
                        {CONVERSION_TYPES.map((type) => (
                            <Button
                                key={type.id}
                                variant={activeType === type.id ? "default" : "outline"}
                                onClick={() => setActiveType(type.id)}
                                aria-pressed={activeType === type.id}
                                data-active={activeType === type.id ? "true" : "false"}
                                className="rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                            >
                                {type.label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <Button
                            type="button"
                            onClick={handleConvert}
                            disabled={!input.trim()}
                            data-testid="convert-action"
                            className="min-w-32"
                        >
                            Convert
                        </Button>
                        {hasPendingChanges && output && (
                            <p className="text-xs text-muted-foreground">
                                Settings changed. Run convert to refresh output.
                            </p>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 relative">
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
                                        className="h-8 w-8"
                                        onClick={handlePaste}
                                        title="Paste from Clipboard"
                                    >
                                        <ClipboardPaste className="h-4 w-4" />
                                        <span className="sr-only">Paste</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:text-red-500"
                                        onClick={handleClear}
                                        title="Clear Input"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        <span className="sr-only">Clear</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <Textarea
                                    id="converter-input"
                                    placeholder="Type or paste your text here..."
                                    className="min-h-[300px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                                            e.preventDefault()
                                            handleConvert()
                                        }
                                    }}
                                />
                                {!input && (
                                    <div className="absolute bottom-4 left-6 text-xs text-zinc-500 dark:text-zinc-400 pointer-events-none animate-fadeIn">
                                        Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-mono">⌘/Ctrl + V</kbd> to paste
                                    </div>
                                )}
                            </div>
                            {input && <TextStats text={input} />}
                        </div>

                        {/* Output Area */}
                        <div className="space-y-2 group" data-testid="output-zone">
                            <div className="flex items-center justify-between px-1">
                                <label htmlFor="converter-output" className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                                    {CONVERSION_TYPES.find(t => t.id === outputType)?.label} output
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
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 relative"
                                        onClick={handleCopy}
                                        disabled={!canCopy}
                                        title={copied ? "Copied!" : "Copy Result"}
                                        data-testid="copy-action"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-500 animate-checkmark" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                        <span className="sr-only">Copy</span>
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
                                key={outputKey}
                                readOnly
                                placeholder="Result will appear here..."
                                className="min-h-[300px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground font-medium focus-visible:ring-0 animate-pulse-subtle"
                                value={output}
                            />
                            {output && <TextStats text={output} />}
                        </div>
                    </div>

                    {outputType === "title" && (
                        <div className="space-y-2 pt-1" data-testid="style-controls">
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-4 gap-y-2 items-end">
                                <p className="text-sm font-medium text-muted-foreground text-left">Title Style</p>
                                <p className="text-sm font-medium text-muted-foreground text-left sm:text-right">
                                    Found an issue?
                                </p>
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
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-2 w-fit sm:justify-self-end"
                                    onClick={handleReportTitleStyleError}
                                >
                                    <Bug className="h-3.5 w-3.5" />
                                    Report error
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground text-left">
                                {TITLE_STYLES.find((style) => style.id === titleStyle)?.hint}
                            </p>
                        </div>
                    )}

                    {/* Show Explanations Toggle */}
                    {outputSupportsExplanations && output.length > 0 && (
                        <div className="flex justify-center pt-4">
                            <Button
                                variant={showExplanations ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowExplanations(!showExplanations)}
                                className={`rounded-full gap-2 transition-all ${showExplanations ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
                                title="See why each word was capitalized"
                            >
                                <Info className="h-4 w-4" />
                                {showExplanations ? "Hide Explanations" : "Show Explanations"}
                            </Button>
                        </div>
                    )}

                    {/* Explanations Panel */}
                    {showExplanations && explanations.length > 0 && (
                        <ExplanationsPanel explanations={explanations} activeType={outputType} titleStyle={outputTitleStyle} />
                    )}
                </CardContent>
            </Card>
        </section>
    )
}
