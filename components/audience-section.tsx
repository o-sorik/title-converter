import Link from "next/link"
import { BookOpen, BarChart2, FileText, Code2, PenLine } from "lucide-react"

const AUDIENCES = [
    {
        icon: BookOpen,
        title: "Students and Academics",
        styleTag: "APA · MLA",
        description:
            "Format thesis titles, research headings, and bibliography entries per your required style guide instantly.",
        example: "Formatting a dissertation chapter title to APA 7 rules before submission.",
        href: "/blog/apa-7-title-case-guide",
    },
    {
        icon: BarChart2,
        title: "Content Marketers and SEOs",
        styleTag: "AP · Standard",
        description:
            "Standardize blog headline capitalization across an entire editorial calendar in seconds.",
        example: "Running 50 blog post titles through AP Style before scheduling.",
        href: "/blog/ap-title-capitalization-basics",
    },
    {
        icon: FileText,
        title: "Editors and Publishers",
        styleTag: "Chicago",
        description:
            "Check book chapter titles and magazine headlines against Chicago Manual style before layout.",
        example: "Verifying chapter headings follow Chicago rules ahead of print.",
        href: "/blog/categories/chicago",
    },
    {
        icon: Code2,
        title: "Developers",
        styleTag: "camelCase · snake_case",
        description:
            "Convert human-readable field names into database columns, API keys, or class names without typos.",
        example: "Turning 'User First Name' into userFirstName or user_first_name.",
        href: "/camel-case-converter",
    },
    {
        icon: PenLine,
        title: "Writers and Bloggers",
        styleTag: "Chicago · Standard",
        description:
            "Get consistent title capitalization for blog posts, newsletter subject lines, and social media headlines.",
        example: "Making every newsletter subject line match the same capitalization standard.",
        href: "/blog/sentence-vs-title-case",
    },
] as const

export function AudienceSection() {
    return (
        <section aria-labelledby="who-is-this-for-heading" className="w-full">
            <div className="text-center mb-8 space-y-2">
                <h2
                    id="who-is-this-for-heading"
                    className="text-2xl font-bold tracking-tight"
                >
                    Who Uses This Tool
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    From academic papers to developer codebases — consistent capitalization matters everywhere.
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {AUDIENCES.map((audience) => {
                    const Icon = audience.icon
                    return (
                        <Link
                            key={audience.title}
                            href={audience.href}
                            className="group rounded-xl border bg-white/60 dark:bg-zinc-900/60 p-5 space-y-3 transition-colors hover:border-primary/40 hover:bg-white/80 dark:hover:bg-zinc-900/80 backdrop-blur-sm"
                        >
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                    <Icon className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                                        {audience.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                                        {audience.styleTag}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {audience.description}
                            </p>
                            <p className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 rounded-md px-2.5 py-1.5 text-primary leading-relaxed">
                                {audience.example}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
