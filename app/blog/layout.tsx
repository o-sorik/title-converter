import type { ReactNode } from "react"
import { BlogFooter, BlogHeader } from "@/components/blog/site-shell"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#eaf1f8] text-slate-900">
      <BlogHeader />
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <BlogFooter />
    </div>
  )
}
