import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FaqItem = {
  question: string
  answer: string
}

export function FaqBlock({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-center text-3xl font-black text-slate-950">{title}</h2>
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-4">
        <Accordion type="single" collapsible>
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
