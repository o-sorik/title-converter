

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

interface BlogPostingProps {
    headline: string
    description: string
    url: string
    image: string
    author: string
    dateModified: string
    section?: string
}

interface BreadcrumbItem {
    name: string
    item: string
}

interface BreadcrumbListProps {
    items: BreadcrumbItem[]
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

// BlogPosting schema for article pages
export function BlogPostingJsonLd({
    headline,
    description,
    url,
    image,
    author,
    dateModified,
    section,
}: BlogPostingProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": headline,
        "description": description,
        "url": url,
        "image": [image],
        "author": {
            "@type": "Person",
            "name": author,
        },
        "publisher": {
            "@type": "Organization",
            "name": "TitleCase",
        },
        "dateModified": dateModified,
        "datePublished": dateModified,
        "articleSection": section ?? "Writing Guides",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

// BreadcrumbList schema for blog and category pages
export function BreadcrumbListJsonLd({ items }: BreadcrumbListProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.item,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
