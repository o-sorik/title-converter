"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { ConversionType, TitleCaseStyle } from "@/lib/converters"
import { runEditorialQaBatch, type EditorialQaResult } from "@/lib/editorial-qa"

// Only the 4 editorial-relevant modes; code case / fun modes aren't meaningful for QA
const QA_MODES: { id: ConversionType; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "lower", label: "lower case" },
    { id: "upper", label: "UPPER CASE" },
]

const TITLE_STYLES: { id: TitleCaseStyle; label: string; hint: string }[] = [
    { id: "standard", label: "Standard", hint: "Balanced default title casing" },
    { id: "ap", label: "AP", hint: "AP-like: capitalize prepositions with 4+ letters" },
    { id: "chicago", label: "Chicago", hint: "Classic editorial style defaults" },
    { id: "mla", label: "MLA", hint: "Common humanities title style" },
    { id: "apa", label: "APA", hint: "Academic-friendly title style" },
]

function buildReviewHref(text: string, mode: ConversionType, titleStyle: TitleCaseStyle): string {
    const params = new URLSearchParams({
        ctx_input: text,
        ctx_mode: mode,
        ctx_style: titleStyle,
    })
    return `/?${params.toString()}`
}

export function BatchChecker() {
    const [mode, setMode] = React.useState<ConversionType>("title")
    const [titleStyle, setTitleStyle] = React.useState<TitleCaseStyle>("standard")
    const [batchInput, setBatchInput] = React.useState("")
    const [qaResult, setQaResult] = React.useState<EditorialQaResult | null>(null)
    const [runId, setRunId] = React.useState(0)

    // Clear results when mode, style, or input changes
    React.useEffect(() => {
        setQaResult(null)
    }, [mode, titleStyle, batchInput])

    const handleRunQa = () => {
        const result = runEditorialQaBatch(batchInput, mode, titleStyle)
        setRunId(id => id + 1)
        setQaResult(result)
    }

    return (
        <Card
            className="border-0 shadow-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800"
            data-testid="batch-checker"
        >
            <CardContent className="space-y-6 pt-6">
                {/* Mode selector */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Capitalization Standard</p>
                    <Tabs
                        value={mode}
                        onValueChange={(v) => setMode(v as ConversionType)}
                        className="w-fit"
                    >
                        <TabsList className="h-auto flex-wrap justify-start gap-1 p-1 bg-zinc-100 dark:bg-zinc-900" data-testid="qa-mode-selector">
                            {QA_MODES.map((m) => (
                                <TabsTrigger
                                    key={m.id}
                                    value={m.id}
                                    className="h-8 px-3 flex-none"
                                    data-active={mode === m.id ? "true" : "false"}
                                >
                                    {m.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Title style — only when mode is title */}
                {mode === "title" && (
                    <div className="space-y-2 pb-4 border-b border-zinc-100 dark:border-zinc-800" data-testid="qa-title-style">
                        <p className="text-sm font-medium text-muted-foreground">Title Style</p>
                        <Tabs
                            value={titleStyle}
                            onValueChange={(v) => setTitleStyle(v as TitleCaseStyle)}
                            className="w-fit"
                        >
                            <TabsList className="w-fit h-auto flex-wrap justify-start gap-1 p-1 bg-zinc-100 dark:bg-zinc-900">
                                {TITLE_STYLES.map((style) => (
                                    <TabsTrigger
                                        key={style.id}
                                        value={style.id}
                                        className="h-8 px-3 flex-none"
                                        data-active={titleStyle === style.id ? "true" : "false"}
                                    >
                                        {style.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <p className="text-xs text-muted-foreground">
                            {TITLE_STYLES.find((s) => s.id === titleStyle)?.hint}
                        </p>
                    </div>
                )}

                {/* Batch textarea */}
                <div className="space-y-2">
                    <label htmlFor="batch-input" className="text-sm font-medium text-muted-foreground">
                        Headlines to Check
                    </label>
                    <Textarea
                        id="batch-input"
                        value={batchInput}
                        onChange={(e) => setBatchInput(e.target.value)}
                        placeholder="Paste one headline per line for QA pass..."
                        className="min-h-[160px] resize-y text-base rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-primary/20 transition-all"
                        aria-label="Batch headline input"
                        data-testid="batch-input"
                    />
                </div>

                {/* Run button + summary */}
                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        type="button"
                        onClick={handleRunQa}
                        disabled={!batchInput.trim()}
                        data-testid="run-qa"
                    >
                        Run QA Pass
                    </Button>
                    {qaResult && (
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">{qaResult.consistentCount}/{qaResult.total}</span> consistent
                            {qaResult.needsCorrectionCount > 0 && (
                                <>, <span className="font-semibold text-amber-600 dark:text-amber-400">{qaResult.needsCorrectionCount}</span> need correction</>
                            )}
                        </p>
                    )}
                </div>

                {/* Results */}
                {qaResult && qaResult.items.length > 0 && (
                    <div className="space-y-2" data-testid="qa-results">
                        {qaResult.items.map((item, index) => (
                            <article
                                key={`${runId}-${item.source}-${index}`}
                                className={`animate-result-reveal rounded-lg border p-3 space-y-2 ${item.isConsistent
                                    ? "border-zinc-200 dark:border-zinc-800"
                                    : "border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20"
                                }`}
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className={`text-xs font-medium ${item.isConsistent ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                                        {item.isConsistent ? "Consistent" : "Needs correction"}
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                        aria-label={`Review item ${index + 1} in converter`}
                                    >
                                        <Link href={buildReviewHref(item.source, mode, titleStyle)} data-testid="review-link">
                                            Review in converter →
                                        </Link>
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="font-medium text-foreground">Input:</span> {item.source}
                                </p>
                                {!item.isConsistent && (
                                    <p className="text-xs text-muted-foreground">
                                        <span className="font-medium text-foreground">Recommended:</span> {item.converted}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
