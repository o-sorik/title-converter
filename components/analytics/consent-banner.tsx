"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { applyConsentChoice } from "@/lib/analytics"

/**
 * One-time analytics prompt for EU/UK visitors. Everyone else never sees it:
 * the inline consent script grants analytics outside the EU, and a stored
 * choice suppresses the banner on return visits.
 */
export function ConsentBanner() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const snapshot = window.__tccConsent
        if (snapshot?.eu && snapshot.stored === null) {
            setOpen(true)
        }
    }, [])

    if (!open) return null

    const choose = (choice: "granted" | "denied") => {
        applyConsentChoice(choice)
        setOpen(false)
    }

    // A slim bar: it must not cover the converter result on phones, and refusing
    // has to be as easy as accepting, so both choices carry the same weight.
    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Analytics preference"
            className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 text-sm backdrop-blur supports-[backdrop-filter]:bg-background/85"
        >
            <div className="mx-auto flex max-w-5xl items-center gap-3">
                <p className="min-w-0 flex-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    <span className="hidden sm:inline">We use Google Analytics to count visits and see which tools get used. </span>
                    <span className="sm:hidden">Analytics cookies? </span>
                    <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
                        <span className="sm:hidden">Details</span>
                        <span className="hidden sm:inline">Privacy policy</span>
                    </Link>
                </p>
                <Button type="button" variant="outline" size="sm" className="h-9 min-w-20 cursor-pointer" onClick={() => choose("denied")}>
                    Decline
                </Button>
                <Button type="button" variant="outline" size="sm" className="h-9 min-w-20 cursor-pointer" onClick={() => choose("granted")}>
                    Allow
                </Button>
            </div>
        </div>
    )
}
