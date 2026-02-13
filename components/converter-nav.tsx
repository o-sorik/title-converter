"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { IconBinary, IconBraces, IconBrackets, IconCode, IconLetterCaseLower, IconLetterCaseUpper, IconLink, IconMoodSmile, IconPilcrow, IconTypography } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CONVERTER_SLUGS, SEO_CONFIG } from "@/lib/seo-config"

const MENU_ITEMS = [
    {
        href: "/",
        title: "Title Case Converter",
        description: "Headlines and publishing-ready title capitalization.",
        icon: IconTypography,
    },
    {
        href: "/sentence-case-converter",
        title: "Sentence Case Converter",
        description: "Natural sentence formatting for body copy and UI text.",
        icon: IconPilcrow,
    },
    {
        href: "/lower-case-converter",
        title: "Lower Case Converter",
        description: "Normalize text by converting everything to lowercase.",
        icon: IconLetterCaseLower,
    },
    {
        href: "/upper-case-converter",
        title: "Upper Case Converter",
        description: "Convert text to all caps for emphasis and labels.",
        icon: IconLetterCaseUpper,
    },
    {
        href: "/camel-case-converter",
        title: "Camel Case Converter",
        description: "Build camelCase keys and variable names quickly.",
        icon: IconBrackets,
    },
    {
        href: "/pascal-case-converter",
        title: "Pascal Case Converter",
        description: "Generate PascalCase class and component names.",
        icon: IconCode,
    },
    {
        href: "/snake-case-converter",
        title: "Snake Case Converter",
        description: "Create snake_case for Python and database fields.",
        icon: IconBraces,
    },
    {
        href: "/alternating-case-converter",
        title: "Alternating Case Converter",
        description: "Playful alternating case for memes and social posts.",
        icon: IconMoodSmile,
    },
    {
        href: "/slug-generator",
        title: "URL Slug Generator",
        description: "SEO-friendly URL slugs with clean separators.",
        icon: IconLink,
    },
] as const

export function ConverterNav() {
    const knownHrefs = new Set<string>(MENU_ITEMS.map((item) => item.href))
    const fallbackItems = CONVERTER_SLUGS
        .map((slug) => SEO_CONFIG[slug])
        .filter((config) => config.slug !== "kebab-case-converter" && !knownHrefs.has(`/${config.slug}`))

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                    <span className="hidden sm:inline">All Converters</span>
                    <span className="sm:hidden">Converters</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[min(92vw,720px)] p-2">
                <DropdownMenuLabel>Text Converters Online</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className="grid gap-1 p-1 md:grid-cols-2">
                        {MENU_ITEMS.map((item) => {
                            const Icon = item.icon
                            return (
                                <DropdownMenuItem key={item.href} asChild className="p-0 focus:bg-transparent">
                                    <Link
                                        href={item.href}
                                        className="flex items-start gap-3 rounded-md border border-transparent p-3 transition-colors hover:bg-accent hover:text-accent-foreground hover:border-border"
                                    >
                                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <span className="space-y-1">
                                            <span className="block text-sm font-medium leading-none">{item.title}</span>
                                            <span className="block text-xs text-muted-foreground leading-snug">{item.description}</span>
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })}
                        {fallbackItems.map((config) => (
                            <DropdownMenuItem key={config.slug} asChild className="p-0 focus:bg-transparent">
                                <Link
                                    href={`/${config.slug}`}
                                    className="flex items-start gap-3 rounded-md border border-transparent p-3 transition-colors hover:bg-accent hover:text-accent-foreground hover:border-border"
                                >
                                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                        <IconBinary className="h-4 w-4" />
                                    </span>
                                    <span className="space-y-1">
                                        <span className="block text-sm font-medium leading-none">{config.h1}</span>
                                        <span className="block text-xs text-muted-foreground leading-snug">{config.description}</span>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
