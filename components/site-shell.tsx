"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ConverterNav } from "@/components/converter-nav"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  containerClassName?: string
}

type SiteFooterProps = {
  containerClassName?: string
}

const primaryLinks = [
  { href: "/blog", label: "Guides" },
  { href: "/capitalization-rules-guide", label: "Rules" },
  { href: "/batch-checker", label: "Batch Checker" },
]

const footerColumns = [
  {
    title: "Converters",
    links: [
      { href: "/", label: "Title Case" },
      { href: "/sentence-case-converter", label: "Sentence Case" },
      { href: "/slug-generator", label: "Slug Generator" },
      { href: "/batch-checker", label: "Batch Checker" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/blog/categories", label: "Categories" },
      { href: "/capitalization-rules-guide", label: "Capitalization Rules" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/blog/categories/writing-tips", label: "Writing Tips" },
      { href: "/blog/apa-7-title-case-guide", label: "APA Title Case" },
      { href: "/blog/ap-title-capitalization-basics", label: "AP Title Case" },
    ],
  },
]

export function SiteHeader({ containerClassName }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className={cn("container mx-auto flex h-14 items-center justify-between px-4", containerClassName)}>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80 sm:text-base">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            T
          </span>
          <span className="hidden sm:inline">TitleCase</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              {link.label}
            </Link>
          ))}
          <ConverterNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ containerClassName }: SiteFooterProps) {
  return (
    <footer className="border-t bg-background/70">
      <div className={cn("container mx-auto grid gap-8 px-4 py-10 sm:grid-cols-[1.3fr_1fr_1fr_1fr]", containerClassName)}>
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold transition-opacity hover:opacity-80">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              T
            </span>
            TitleCase
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Practical capitalization tools and guides for editors, students, and content teams.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">{column.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t py-4">
        <p className={cn("container mx-auto px-4 text-xs text-muted-foreground", containerClassName)}>
          © 2026 TitleCase. Built by Antigravity.
        </p>
      </div>
    </footer>
  )
}
