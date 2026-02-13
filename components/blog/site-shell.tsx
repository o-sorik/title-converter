import Link from "next/link"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Tool" },
  { href: "/blog", label: "Guides" },
  { href: "/capitalization-rules-guide", label: "Rules" },
]

const footerColumns = [
  {
    title: "Resources",
    links: [
      { href: "/blog/categories/apa-style", label: "APA Guide" },
      { href: "/blog/categories/mla-style", label: "MLA Guide" },
      { href: "/blog/categories/chicago", label: "Chicago Manual" },
      { href: "/blog/categories/journalism", label: "AP Stylebook" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Writing Team" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Use" },
      { href: "#", label: "Cookie Policy" },
    ],
  },
]

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-950">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-700 text-xs font-bold text-white">
            T
          </span>
          TitleCase
        </Link>
        <nav className="hidden items-center gap-6 text-xs text-slate-700 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-blue-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="bg-blue-700 text-white hover:bg-blue-800">
          <Link href="/">Start Converting</Link>
        </Button>
      </div>
    </header>
  )
}

export function BlogFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.3fr_1fr_1fr_1fr] sm:px-6">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-slate-950">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-700 text-xs font-bold text-white">
              T
            </span>
            TitleCase
          </Link>
          <p className="max-w-xs text-sm text-slate-500">
            The practical resource for editors and writers who care about precise capitalization.
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title} className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">{column.title}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-blue-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 py-4">
        <p className="mx-auto w-full max-w-6xl px-4 text-xs text-slate-400 sm:px-6">
          © 2026 TitleCase. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
