"use client"

import * as React from "react"
import Link from "next/link"

import { parseConverterInitialStateFromQuery, toConverterContext } from "@/lib/converter-context"
import { getHighIntentConverterHref } from "@/lib/high-intent-guidance"

interface ConverterCtaLinkProps {
    /** Seed text for the converter when the reader arrives without context. */
    converterInput: string
    className?: string
    children: React.ReactNode
}

/**
 * Carries the reader's converter context back to the tool.
 *
 * The ctx_* query is read after mount rather than via useSearchParams(). Both
 * reading searchParams in the page and calling useSearchParams() here would opt
 * /blog/[slug] out of static generation — 42 articles re-rendered per request,
 * and dynamicParams reduced to a no-op, which is what let unknown slugs answer
 * 200 instead of 404. Only this one link ever needed the query, and it is only
 * needed by the time someone clicks it.
 */
export function ConverterCtaLink({ converterInput, className, children }: ConverterCtaLinkProps) {
    const [href, setHref] = React.useState(() => getHighIntentConverterHref(converterInput, null))

    React.useEffect(() => {
        try {
            const context = toConverterContext(
                parseConverterInitialStateFromQuery(new URLSearchParams(window.location.search))
            )
            if (context) setHref(getHighIntentConverterHref(converterInput, context))
        } catch {
            // no-op: the default href already works
        }
    }, [converterInput])

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}
