import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Article } from "@/components/blog/data"

export function BlogWritingTipsPanel({ items }: { items: Article[] }) {
  return (
    <section className="rounded-3xl bg-[#0e2366] p-6 text-white md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="text-3xl font-black">Writing Tips & Best Practices</h2>
          <div className="mt-6 space-y-4">
            {items.map((article) => (
              <Link
                key={`tips-${article.slug}`}
                href={`/blog/${article.slug}`}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10"
              >
                <Image src={article.image} alt={article.title} width={72} height={72} className="h-16 w-16 rounded-lg object-cover" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold leading-snug">{article.title}</h3>
                  <p className="text-xs text-blue-100">{article.excerpt}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-200">{article.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl bg-[#15348f] p-6">
          <h3 className="text-3xl font-black leading-tight">Ready to format your headlines?</h3>
          <p className="mt-3 text-sm text-blue-100">
            Stop second-guessing your capitalization. Use the converter to apply consistent style in seconds.
          </p>
          <Button asChild className="mt-6 w-full bg-white text-blue-800 hover:bg-blue-50">
            <Link href="/">Start Converting</Link>
          </Button>
        </aside>
      </div>
    </section>
  )
}
