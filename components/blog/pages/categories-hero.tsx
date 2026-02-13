import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CategoriesHero() {
  return (
    <section className="space-y-5 py-8 text-center">
      <div className="text-xs text-slate-500">
        <Link href="/blog" className="hover:text-blue-700">
          Home
        </Link>{" "}
        / <span className="font-semibold text-blue-700">Categories</span>
      </div>
      <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-6xl">
        Explore Writing Style <span className="text-blue-700">Categories</span>
      </h1>
      <p className="mx-auto max-w-3xl text-base text-slate-600">
        Browse practical guides across APA, MLA, Chicago, AP, grammar, and writing tips.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-blue-700 text-white hover:bg-blue-800">
          <Link href="/">Open Converter</Link>
        </Button>
        <Button asChild variant="ghost" className="text-blue-700 hover:bg-blue-50">
          <Link href="/blog">View Latest Guides</Link>
        </Button>
      </div>
    </section>
  )
}
