import Link from "next/link"
import type { Article } from "@/components/blog/data"
import { Button } from "@/components/ui/button"

export function ArticleSidebar({
  related,
  tocItems,
  relatedTitle = "Related guides",
}: {
  related: Article[]
  tocItems: { id: string; label: string }[]
  relatedTitle?: string
}) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
      <section className="rounded-3xl bg-gradient-to-br from-[#1747c8] to-[#123996] p-5 text-white shadow-lg md:p-6">
        <h2 className="text-xl font-black leading-tight md:text-2xl">Fast Headline Formatting</h2>
        <p className="mt-2 text-sm text-blue-100">
          Stop guessing title-case rules. Convert headlines instantly and keep your publishing workflow consistent.
        </p>
        <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/80">Preview</p>
          <p className="mt-3 text-sm text-blue-100">the definitive guide to apa 7th edition title case</p>
          <div className="my-3 h-px bg-white/20" />
          <p className="text-sm font-bold text-white">The Definitive Guide to APA 7th Edition Title Case</p>
        </div>
        <Button asChild className="mt-5 w-full bg-white text-blue-800 hover:bg-blue-50 dark:border dark:border-white/35 dark:bg-white/10 dark:text-white dark:backdrop-blur dark:hover:bg-white/20">
          <Link href="/">Start Converting</Link>
        </Button>
      </section>
      <details className="rounded-2xl border border-slate-200 bg-white p-4 md:hidden">
        <summary className="cursor-pointer text-base font-bold text-slate-950 dark:text-zinc-100">On this page</summary>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
          {tocItems.map((item) => (
            <li key={`mobile-${item.id}`}>
              <Link href={`#${item.id}`} className="hover:text-blue-700 dark:hover:text-blue-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      <section className="hidden rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/80 md:block">
        <h2 className="text-base font-bold text-slate-950 dark:text-zinc-100">On this page</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
          {tocItems.map((item) => (
            <li key={`desktop-${item.id}`}>
              <Link href={`#${item.id}`} className="hover:text-blue-700 dark:hover:text-blue-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/80">
        <h2 className="text-base font-bold text-slate-950 dark:text-zinc-100">{relatedTitle}</h2>
        <div className="mt-3 space-y-3">
          {related.map((relatedArticle) => (
            <Link
              key={relatedArticle.slug}
              href={`/blog/${relatedArticle.slug}`}
              className="block text-sm font-medium text-slate-700 transition-colors hover:text-blue-700 dark:text-zinc-300 dark:hover:text-blue-300"
            >
              {relatedArticle.title}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  )
}
