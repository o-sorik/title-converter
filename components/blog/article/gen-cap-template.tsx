import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import type { Article } from "@/components/blog/data"
import type { GenCapArticle } from "@/lib/gen-cap-article-data"
import { AnswerBox } from "./answer-box"
import { RuleBlock } from "./rule-block"
import { DoDoNot } from "./do-do-not"
import { FAQAccordion } from "./faq-accordion"
import { CTABlock } from "./cta-block"

interface GenCapTemplateProps {
  data: GenCapArticle
  article: Article
}

export function GenCapTemplate({ data, article }: GenCapTemplateProps) {
  return (
    <>
      <section id="quick-answer" className="scroll-mt-24">
        <AnswerBox variant={data.answerVariant ?? "quick-answer"}>{data.answerBox}</AnswerBox>
      </section>

      <section id="when-section" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
          {data.whenHeading}
        </h2>
        {data.whenBody.split("\n\n").map((para, i) => (
          <p key={i} className="text-base leading-8 text-slate-800 dark:text-zinc-200">
            {para}
          </p>
        ))}
      </section>

      <RuleBlock
        heading={data.ruleBlockHeading}
        capitalizeRules={data.ruleBlock.capitalizeRules}
        lowercaseRules={data.ruleBlock.lowercaseRules}
        tip={data.ruleBlock.tip}
      />

      {data.styleComparisonHeading && data.styleComparisonBody && (
        <section id="style-comparison" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
            {data.styleComparisonHeading}
          </h2>
          {data.styleComparisonBody.split("\n\n").map((para, i) => (
            <p key={i} className="text-base leading-8 text-slate-800 dark:text-zinc-200">
              {para}
            </p>
          ))}
        </section>
      )}

      <section id="examples" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
          Examples
        </h2>
        <DoDoNot doExamples={data.doExamples} doNotExamples={data.doNotExamples} />
      </section>

      <section id="edge-cases" className="scroll-mt-24 space-y-3 rounded-xl border bg-white p-4 dark:bg-zinc-900/40 md:p-5">
        <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
          {data.edgeCasesHeading}
        </h2>
        <p className="text-base leading-8 text-slate-800 dark:text-zinc-200">{data.edgeCasesBody}</p>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-700 dark:text-zinc-300">
          {data.edgeCaseItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <FAQAccordion items={data.faqItems} />

      <CTABlock word={data.ctaWord} text={data.ctaText} />

      {data.relatedSlugs.length > 0 && (
        <section data-testid="gen-cap-related">
          <Separator className="mb-8" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Related Capitalization Questions</h3>
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
          {["Capitalization", "Grammar 101", data.word].map((tag) => (
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
          {article.author} develops practical capitalization guidance for editorial and SEO workflows, with a focus on
          consistent rule application.
        </p>
      </section>
    </>
  )
}
