import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/components/blog/data"

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
      <Image src={article.image} alt={article.title} width={780} height={520} className="h-full w-full object-cover" />
      <div className="flex flex-col justify-center space-y-4 p-6">
        <div>
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
            Featured
          </Badge>
          <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-blue-700">{article.readTime}</span>
        </div>
        <h2 className="text-3xl font-black leading-tight text-slate-950">{article.title}</h2>
        <p className="text-sm text-slate-600">{article.excerpt}</p>
        <p className="text-xs text-slate-500">
          {article.author} • Last updated {article.updatedAt}
        </p>
        <Button asChild className="w-fit bg-blue-700 text-white hover:bg-blue-800">
          <Link href={`/blog/${article.slug}`}>Read the full guide</Link>
        </Button>
      </div>
    </article>
  )
}
