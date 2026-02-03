"use client"

import * as React from "react"
import { Copy, RotateCcw, ClipboardPaste, ArrowRightLeft, MoveRight, Check, Info } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { convert, convertWithExplanations, type ConversionType, type WordExplanation } from "@/lib/converters"

const CONVERSION_TYPES: { id: ConversionType; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "lower", label: "lower case" },
    { id: "upper", label: "UPPER CASE" },
    { id: "camel", label: "camelCase" },
    { id: "pascal", label: "PascalCase" },
    { id: "snake", label: "snake_case" },
    { id: "kebab", label: "kebab-case" },
    { id: "alternating", label: "aLtErNaTiNg" },
    { id: "inverse", label: "InVeRsE cAsE" },
]

// Modes that support explanations
const EXPLANATION_MODES: ConversionType[] = ["title", "sentence"]

interface TextConverterProps {
    defaultMode?: ConversionType
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
function ExplanationsPanel({ explanations }: { explanations: WordExplanation[] }) {
    if (!explanations.length) return null

    return (
        <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-slideUp">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Why was it capitalized this way?
            </h4>
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

export function TextConverter({ defaultMode = "title" }: TextConverterProps) {
    const [input, setInput] = React.useState("")
    const [activeType, setActiveType] = React.useState<ConversionType>(defaultMode)
    const [copied, setCopied] = React.useState(false)
    const [outputKey, setOutputKey] = React.useState(0)
    const [showExplanations, setShowExplanations] = React.useState(false)

    // Update active type if defaultMode changes (e.g. navigation)
    React.useEffect(() => {
        setActiveType(defaultMode)
    }, [defaultMode])

    // Check if current mode supports explanations
    const supportsExplanations = EXPLANATION_MODES.includes(activeType)

    // Derived state for output and explanations
    const { output, explanations } = React.useMemo(() => {
        if (showExplanations && supportsExplanations) {
            return convertWithExplanations(input, activeType)
        }
        return { output: convert(input, activeType), explanations: [] }
    }, [input, activeType, showExplanations, supportsExplanations])

    // Trigger animation when output changes
    React.useEffect(() => {
        if (output) {
            setOutputKey(prev => prev + 1)
        }
    }, [output])


    const handleCopy = async () => {
        if (!output) return
        try {
            await navigator.clipboard.writeText(output)
            setCopied(true)
            toast.success("Copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy")
        }
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setInput(text)
            toast.success("Pasted from clipboard")
        } catch (err) {
            toast.error("Failed to paste", { description: "Please allow clipboard access." })
        }
    }

    const handleClear = () => {
        setInput("")
        toast.message("Cleared text")
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
            <Card className="border-0 shadow-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
                <CardContent className="space-y-6 pt-6">

                    {/* Controls - Top for ez access */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
                        {CONVERSION_TYPES.map((type) => (
                            <Button
                                key={type.id}
                                variant={activeType === type.id ? "default" : "outline"}
                                onClick={() => setActiveType(type.id)}
                                className="rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                            >
                                {type.label}
                            </Button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 relative">
                        {/* Input Area */}
                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                                    Input Text
                                </label>
                                <div className="flex gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePaste}>
                                                    <ClipboardPaste className="h-4 w-4" />
                                                    <span className="sr-only">Paste</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Paste from Clipboard
                                                <kbd className="ml-2 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">⌘V</kbd>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500" onClick={handleClear}>
                                                    <RotateCcw className="h-4 w-4" />
                                                    <span className="sr-only">Clear</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Clear Input</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                            <div className="relative">
                                <Textarea
                                    placeholder="Type or paste your text here..."
                                    className="min-h-[300px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    autoFocus
                                />
                                {!input && (
                                    <div className="absolute bottom-4 left-6 text-xs text-muted-foreground/50 pointer-events-none animate-fadeIn">
                                        Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono">⌘/Ctrl + V</kbd> to paste
                                    </div>
                                )}
                            </div>
                            {input && <TextStats text={input} />}
                        </div>

                        {/* Arrow Icon for Desktop */}
                        <div className="hidden md:flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 gap-1">
                            <div className="bg-background rounded-full p-2 border shadow-sm text-muted-foreground">
                                <MoveRight className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full">Convert</span>
                        </div>

                        {/* Output Area */}
                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                                    {CONVERSION_TYPES.find(t => t.id === activeType)?.label} output
                                </label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 relative"
                                                onClick={handleCopy}
                                                disabled={!output}
                                            >
                                                {copied ? (
                                                    <Check className="h-4 w-4 text-green-500 animate-checkmark" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                                <span className="sr-only">Copy</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {copied ? "Copied!" : "Copy Result"}
                                            {!copied && <kbd className="ml-2 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">⌘C</kbd>}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Textarea
                                key={outputKey}
                                readOnly
                                placeholder="Result will appear here..."
                                className="min-h-[300px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground font-medium focus-visible:ring-0 animate-pulse-subtle"
                                value={output}
                            />
                            {output && <TextStats text={output} />}
                        </div>
                    </div>

                    {/* Show Explanations Toggle */}
                    {supportsExplanations && (
                        <div className="flex justify-center pt-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant={showExplanations ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setShowExplanations(!showExplanations)}
                                            className={`rounded-full gap-2 transition-all ${showExplanations ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
                                        >
                                            <Info className="h-4 w-4" />
                                            {showExplanations ? "Hide Explanations" : "Show Explanations"}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        See why each word was capitalized
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}

                    {/* Explanations Panel */}
                    {showExplanations && explanations.length > 0 && (
                        <ExplanationsPanel explanations={explanations} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
