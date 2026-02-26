import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FaqItem = {
  question: string
  answer: string
}

export function FaqBlock({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-center text-3xl font-black text-slate-950 dark:text-zinc-100">{title}</h2>
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-4 dark:border-zinc-700 dark:bg-zinc-900/80">
        <Accordion type="single" collapsible defaultValue={items[0]?.question}>
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="cursor-pointer text-sm font-semibold text-slate-900 hover:no-underline dark:text-zinc-100">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600 dark:text-zinc-400">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
