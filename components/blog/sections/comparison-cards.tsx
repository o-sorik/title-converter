import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Comparison } from "@/components/blog/data"

export function ComparisonCards({ items }: { items: Comparison[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-[#eef4fb] p-6">
      <h2 className="text-3xl font-black text-slate-950">Style Comparisons</h2>
      <p className="mt-2 text-sm text-slate-600">Quick references for deciding between major style guides.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
            <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              Read comparison <ArrowRight className="h-3 w-3" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
