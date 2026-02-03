import { ConversionType } from "@/lib/converters"

interface WebApplicationProps {
    name: string
    description: string
    url: string
}

interface FAQItem {
    question: string
    answer: string
}

interface FAQPageProps {
    faqs: FAQItem[]
}

// WebApplication schema for tool pages
export function WebApplicationJsonLd({ name, description, url }: WebApplicationProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "1.0",
        "creator": {
            "@type": "Organization",
            "name": "Antigravity"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

// FAQ Page schema for rich snippets
export function FAQPageJsonLd({ faqs }: FAQPageProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

// HowTo schema for converter pages
export function HowToJsonLd({
    name,
    description,
    steps
}: {
    name: string
    description: string
    steps: { name: string; text: string }[]
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "description": description,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

// Combined schema for homepage
export function HomePageJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Title Case Converter Online",
        "description": "Free online tool to convert text between various cases including Title Case, Sentence Case, camelCase, PascalCase, snake_case, and more.",
        "url": "https://titlecaseconverter.online",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://titlecaseconverter.online/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
