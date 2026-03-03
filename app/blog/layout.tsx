import type { ReactNode } from "react"
import { Playfair_Display } from "next/font/google"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { cn } from "@/lib/utils"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn(playfair.variable, "blog-theme min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-950 dark:via-blue-950/20 dark:to-purple-950/10")}>
      <SiteHeader containerClassName="max-w-5xl" />
      <main className="mx-auto w-full max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <SiteFooter containerClassName="max-w-5xl" />
    </div>
  )
}
