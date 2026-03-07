import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import type { Article } from "@/components/blog/data"
import type { IsXArticle } from "@/lib/is-x-article-data"
import { AnswerBox } from "./answer-box"
import { StyleGuideTable } from "./style-guide-table"
import { DoDoNot } from "./do-do-not"
import { FAQAccordion } from "./faq-accordion"
import { CTABlock } from "./cta-block"

interface IsXTemplateProps {
  data: IsXArticle
  article: Article
}

export function IsXTemplate({ data, article }: IsXTemplateProps) {
  return (
    <>
      <section id="quick-answer" className="scroll-mt-24">
        <AnswerBox>{data.answerBox}</AnswerBox>
      </section>

      <section id="why-section" className="scroll-mt-24 space-y-3">
        <h2 className="text-[1.55rem] font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-[1.85rem]">
          {data.whySectionHeading}
        </h2>
        {data.whySectionBody.split("\n\n").map((para, i) => (
          <p key={i} className="text-[1.05rem] leading-8 text-slate-800 dark:text-zinc-200">
            {para}
          </p>
        ))}
      </section>

      <section id="style-guide-table" className="scroll-mt-24 space-y-3">
        <h2 className="text-[1.55rem] font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-[1.85rem]">
          By Style Guide
        </h2>
        <StyleGuideTable word={data.word} rows={data.styleGuideRows} />
        <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
          {data.contextNote}
        </p>
      </section>

      <section id="examples" className="scroll-mt-24 space-y-3">
        <h2 className="text-[1.55rem] font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-[1.85rem]">
          Examples
        </h2>
        <DoDoNot
          doExamples={data.doExamples}
          doNotExamples={data.doNotExamples}
          alternativeExamples={data.alternativeExamples}
        />
      </section>

      <section id="edge-cases" className="scroll-mt-24 space-y-3 rounded-xl border bg-white p-4 dark:bg-zinc-900/40 md:p-5">
        <h2 className="text-[1.55rem] font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-[1.85rem]">
          {data.edgeCasesHeading}
        </h2>
        <p className="text-[1.05rem] leading-8 text-slate-800 dark:text-zinc-200">
          {data.edgeCasesBody}
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-zinc-300">
          {data.edgeCaseItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <FAQAccordion items={data.faqItems} />

      <CTABlock word={data.ctaWord} />

      {data.relatedSlugs.length > 0 && (
        <section data-testid="is-x-related">
          <Separator className="mb-8" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
            Related Grammar 101 Questions
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
            {data.relatedSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`} className="underline underline-offset-4">
                  {slug
                    .replace(/-capitalized-in-title-case$/, "")
                    .replace(/-/g, " ")
                    .replace(/^\w/, (c) => `Is "${c.toUpperCase()}`)}
                  {'" Capitalized in Title Case?'}
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
          {["Grammar 101", "Title Case", data.word.toUpperCase()].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section>
        <Separator className="mb-8" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
          About {article.author}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
          {article.author} develops practical capitalization guidance for editorial and SEO workflows,
          with a focus on consistent rule application.
        </p>
      </section>
    </>
  )
}
