"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { applyConsentChoice, resetConsentChoice } from "@/lib/analytics"

/** Privacy-page control: shows the current analytics choice and lets the visitor change it. */
export function ConsentPreferences() {
    const [status, setStatus] = React.useState<"unknown" | "granted" | "denied" | "none">("unknown")

    React.useEffect(() => {
        const snapshot = window.__tccConsent
        if (!snapshot) return
        setStatus(snapshot.stored ?? (snapshot.granted ? "granted" : "none"))
    }, [])

    if (status === "unknown") return null

    const label =
        status === "granted"
            ? "Analytics is currently on for this browser."
            : status === "denied"
              ? "Analytics is currently off for this browser."
              : "You have not made a choice yet."

    return (
        <div className="not-prose mt-4 flex flex-wrap items-center gap-3 rounded-md border px-4 py-3 text-sm">
            <span className="text-muted-foreground">{label}</span>
            {status === "granted" ? (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        resetConsentChoice()
                        applyConsentChoice("denied")
                        setStatus("denied")
                    }}
                >
                    Turn analytics off
                </Button>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        applyConsentChoice("granted")
                        setStatus("granted")
                    }}
                >
                    Turn analytics on
                </Button>
            )}
        </div>
    )
}
