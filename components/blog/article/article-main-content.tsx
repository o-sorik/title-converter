import Image from "next/image"
import type { Article } from "@/components/blog/data"
import { Grammar101Template } from "./grammar-101-template"
import { IsXTemplate } from "./is-x-template"
import { GenCapTemplate } from "./gen-cap-template"
import {
  getHighIntentRelatedEntries,
} from "@/lib/high-intent-guidance"
import { getArticleContentBySlug } from "@/lib/article-content"
import { WritingTipsTemplate } from "./writing-tips-template"

function ArticleShell({ article, children }: { article: Article; children: React.ReactNode }) {
  return (
    <article id="article-content" className="space-y-8 rounded-3xl border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/80 sm:p-5 md:space-y-10 md:p-8">
      <Image src={article.image} alt={article.title} width={1120} height={640} priority sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 760px" className="rounded-xl border border-slate-200 dark:border-zinc-700 md:rounded-2xl" />
      {children}
    </article>
  )
}

export function ArticleMainContent({
  article,
}: {
  article: Article
}) {
  const content = getArticleContentBySlug(article.slug)

  if (content.template === "is-x") {
    return (
      <ArticleShell article={article}>
        <IsXTemplate data={content.data} article={article} />
      </ArticleShell>
    )
  }

  if (content.template === "gen-cap") {
    return (
      <ArticleShell article={article}>
        <GenCapTemplate data={content.data} article={article} />
      </ArticleShell>
    )
  }

  if (content.template === "writing-tips") {
    return (
      <ArticleShell article={article}>
        <WritingTipsTemplate data={content.data} article={article} />
      </ArticleShell>
    )
  }

  if (content.template === "grammar-101") {
    const highIntentEntry = content.data
    const relatedHighIntent = getHighIntentRelatedEntries(highIntentEntry)
    return (
      <ArticleShell article={article}>
        <Grammar101Template
          article={article}
          entry={highIntentEntry}
          converterInput={highIntentEntry.converterInput}
          relatedSlugs={relatedHighIntent}
        />
      </ArticleShell>
    )
  }

  // Fallback for an article whose body data is missing. It used to render a
  // hardcoded APA lesson, which meant five unrelated slugs shipped identical
  // content. Now it renders the shell only, and article-content.test.ts fails
  // if any published slug reaches this branch at all.
  return <ArticleShell article={article}>{null}</ArticleShell>
}
