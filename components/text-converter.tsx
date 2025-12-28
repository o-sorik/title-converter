"use client"

import * as React from "react"
import { Copy, RotateCcw, ClipboardPaste, ArrowRightLeft, MoveRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { convert, type ConversionType } from "@/lib/converters"

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

export function TextConverter() {
    const [input, setInput] = React.useState("")
    const [activeType, setActiveType] = React.useState<ConversionType>("title")

    // Derived state for output ensures it's always in sync
    const output = React.useMemo(() => {
        return convert(input, activeType)
    }, [input, activeType])

    const handleCopy = async () => {
        if (!output) return
        try {
            await navigator.clipboard.writeText(output)
            toast.success("Copied to clipboard")
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
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent pb-2">
                        TextMorph
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Transform your text instantly with smart casing tools.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* Controls - Top for ez access */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
                        {CONVERSION_TYPES.map((type) => (
                            <Button
                                key={type.id}
                                variant={activeType === type.id ? "default" : "outline"}
                                onClick={() => setActiveType(type.id)}
                                className="rounded-full transition-all duration-300 transform hover:scale-105"
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
                                            <TooltipContent>Paste from Clipboard</TooltipContent>
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
                            <Textarea
                                placeholder="Type or paste your text here..."
                                className="min-h-[300px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {/* Arrow Icon for Desktop */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="bg-background rounded-full p-2 border shadow-sm text-muted-foreground">
                                <MoveRight className="h-6 w-6" />
                            </div>
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
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} disabled={!output}>
                                                <Copy className="h-4 w-4" />
                                                <span className="sr-only">Copy</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Copy Result</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Textarea
                                readOnly
                                placeholder="Result will appear here..."
                                className="min-h-[300px] resize-none text-lg p-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground font-medium focus-visible:ring-0"
                                value={output}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
