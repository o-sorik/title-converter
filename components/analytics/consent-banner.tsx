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

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Analytics preference"
            className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-lg border bg-background p-4 text-sm shadow-lg sm:inset-x-auto sm:right-4"
        >
            <p className="text-foreground">
                We use Google Analytics to count visits and see which tools get used. No ads, no data
                sales.{" "}
                <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground/80">
                    Privacy policy
                </Link>
            </p>
            <div className="mt-3 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => choose("denied")}>
                    Decline
                </Button>
                <Button type="button" size="sm" onClick={() => choose("granted")}>
                    Allow
                </Button>
            </div>
        </div>
    )
}
