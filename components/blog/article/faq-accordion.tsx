import { FAQPageJsonLd } from "@/components/json-ld"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQItem } from "@/lib/is-x-article-data"
import { FAQ_SECTION_ID } from "@/lib/article-content"

interface FAQAccordionProps {
  items: FAQItem[]
  heading?: string
}

export function FAQAccordion({ items, heading = "Frequently Asked Questions" }: FAQAccordionProps) {
  return (
    <section id={FAQ_SECTION_ID} className="scroll-mt-24 space-y-4">
      <FAQPageJsonLd faqs={items} />
      <h2 className="text-2xl font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-3xl">
        {heading}
      </h2>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 dark:border-zinc-700 dark:bg-zinc-900/80">
        <Accordion type="multiple">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="cursor-pointer text-left text-base font-semibold text-slate-900 dark:text-zinc-100">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-base leading-7 text-slate-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
