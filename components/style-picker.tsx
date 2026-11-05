// Rendered only inside client components (TextConverter, BatchChecker).
import * as React from "react"

import type { ConversionType, TitleCaseStyle } from "@/lib/converters"
import { TITLE_STYLES } from "@/lib/title-styles"
import { cn } from "@/lib/utils"

const focusRing = "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

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

/**
 * The style guide is the first question, the case sits beside it. Desktop gets
 * the styles as pills; phones get two compact selects, and the hint underneath
 * says what the picked style does.
 */
export function StylePicker({
    modes,
    mode,
    onModeChange,
    titleStyle,
    onTitleStyleChange,
    modeLabel = "Conversion mode",
}: {
    modes: { id: ConversionType; label: string }[]
    mode: ConversionType
    onModeChange: (mode: ConversionType) => void
    titleStyle: TitleCaseStyle
    onTitleStyleChange: (style: TitleCaseStyle) => void
    modeLabel?: string
}) {
    const labelId = React.useId()
    const isTitle = mode === "title"
    const modeOptions = modes.map((m) => (
        <option key={m.id} value={m.id}>
            {m.label}
        </option>
    ))

    return (
        <>
            <div className="hidden gap-2 md:grid">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    {isTitle ? (
                        <div className="grid min-w-0 gap-1.5" data-testid="style-controls">
                            <span id={labelId} className="text-sm font-medium">Which style guide?</span>
                            <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-1.5">
                                {TITLE_STYLES.map((style) => {
                                    const active = titleStyle === style.id
                                    return (
                                        <button
                                            key={style.id}
                                            type="button"
                                            role="radio"
                                            aria-checked={active}
                                            onClick={() => onTitleStyleChange(style.id)}
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
                        aria-label={modeLabel}
                        data-testid="mode-controls"
                        value={mode}
                        onChange={(e) => onModeChange(e.target.value as ConversionType)}
                        className={selectClass}
                    >
                        {modeOptions}
                    </select>
                </div>
                {isTitle && <StyleHint titleStyle={titleStyle} onSentenceCase={() => onModeChange("sentence")} />}
            </div>

            <div className="grid gap-2 md:hidden" data-testid="mobile-mode-controls">
                <div className="flex gap-2">
                    <select
                        aria-label={modeLabel}
                        value={mode}
                        onChange={(e) => onModeChange(e.target.value as ConversionType)}
                        className={cn(selectClass, "w-full flex-1")}
                    >
                        {modeOptions}
                    </select>
                    {isTitle && (
                        <select
                            aria-label="Title style"
                            value={titleStyle}
                            onChange={(e) => onTitleStyleChange(e.target.value as TitleCaseStyle)}
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
                {isTitle && <StyleHint titleStyle={titleStyle} onSentenceCase={() => onModeChange("sentence")} />}
            </div>
        </>
    )
}
