import Script from "next/script"

interface GoogleAnalyticsProps {
    measurementId: string
}

/**
 * gtag.js loader + init. Consent Mode defaults are set by an inline script in
 * the root layout's <head>, which runs before these `afterInteractive` scripts.
 * Page views on client-side navigation come from GA4 enhanced measurement.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    if (!measurementId) return null
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)});`}
            </Script>
        </>
    )
}
