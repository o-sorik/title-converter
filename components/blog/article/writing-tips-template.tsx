import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import type { Article } from "@/components/blog/data"
import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"
import { ArticleSectionRenderer } from "./article-blocks"
import { FAQAccordion } from "./faq-accordion"
import { CTABlock } from "./cta-block"
import { getAuthorByName } from "@/lib/authors"

interface WritingTipsTemplateProps {
  data: WritingTipsArticle
  article: Article
}

export function WritingTipsTemplate({ data, article }: WritingTipsTemplateProps) {
  const authorData = getAuthorByName(article.author)

  return (
    <>
      {data.sections.map((section) => (
        <ArticleSectionRenderer key={section.id} section={section} />
      ))}

      <FAQAccordion items={data.faqItems} />

      <CTABlock word={data.ctaWord} text={data.ctaText} />

      {data.relatedSlugs.length > 0 && (
        <section data-testid="writing-tips-related">
          <Separator className="mb-8" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Related Articles</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-600 dark:text-zinc-300">
            {data.relatedSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`} className="underline underline-offset-4">
                  {slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <Separator className="mb-8" />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Tags:</span>
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section>
        <Separator className="mb-8" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">About {article.author}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
          {authorData?.bio ?? `${article.author} is part of the TitleCase editorial team, focused on practical style-guide implementation.`}
        </p>
      </section>
    </>
  )
}
