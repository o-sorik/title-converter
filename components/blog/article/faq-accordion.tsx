import { FAQPageJsonLd } from "@/components/json-ld"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQItem } from "@/lib/is-x-article-data"

interface FAQAccordionProps {
  items: FAQItem[]
  heading?: string
}

export function FAQAccordion({ items, heading = "Frequently Asked Questions" }: FAQAccordionProps) {
  return (
    <section id="faq" className="scroll-mt-24 space-y-4">
      <FAQPageJsonLd faqs={items} />
      <h2 className="text-[1.55rem] font-black leading-tight text-slate-950 dark:text-zinc-100 md:text-[1.85rem]">
        {heading}
      </h2>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 dark:border-zinc-700 dark:bg-zinc-900/80">
        <Accordion type="multiple">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
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
