import type { ReactNode } from "react"
import { SiteFooter, SiteHeader } from "@/components/site-shell"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-theme min-h-screen bg-[#eaf1f8] text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <SiteHeader containerClassName="max-w-6xl" />
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <SiteFooter containerClassName="max-w-6xl" />
    </div>
  )
}
