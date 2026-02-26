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
    <div className={cn(playfair.variable, "blog-theme min-h-screen bg-[#faf9f6] dark:bg-zinc-950")}>
      <SiteHeader containerClassName="max-w-5xl" />
      <main className="mx-auto w-full max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <SiteFooter containerClassName="max-w-5xl" />
    </div>
  )
}
