import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CTABlockProps {
  word: string
  text?: string
}

export function CTABlock({ word, text = "Need to check your title formatting?" }: CTABlockProps) {
  const href = `/?ctx_input=${encodeURIComponent(word)}&ctx_mode=title`

  return (
    <section className="rounded-2xl bg-gradient-to-br from-navy-dark to-navy-mid p-5 text-white md:p-6">
      <p className="text-xl font-black md:text-2xl">{text}</p>
      <p className="mt-2 text-sm text-blue-100">
        Open the converter with a prefilled example and adapt it to your headline.
      </p>
      <Button
        asChild
        className="mt-4 bg-white text-blue-800 hover:bg-blue-50 dark:border dark:border-white/35 dark:bg-white/10 dark:text-white dark:backdrop-blur dark:hover:bg-white/20"
      >
        <Link href={href}>Try It Now</Link>
      </Button>
    </section>
  )
}
