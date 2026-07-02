interface AnswerBoxProps {
  children: React.ReactNode
  variant?: "quick-answer" | "it-depends"
}

// Editorial lede: the answer opens the article as a boxless magazine-style
// lead. Being the only non-boxed block on the page is what makes it stand out.
export function AnswerBox({ children, variant = "quick-answer" }: AnswerBoxProps) {
  const isItDepends = variant === "it-depends"

  return (
    <div className="border-t-2 border-slate-900 pt-4 dark:border-zinc-100">
      <p
        className={
          isItDepends
            ? "text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400"
            : "text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400"
        }
      >
        {isItDepends ? "It Depends" : "Quick Answer"}
      </p>
      <div className="mt-3 text-lg leading-8 text-slate-900 dark:text-zinc-100 md:text-xl md:leading-relaxed">
        {children}
      </div>
    </div>
  )
}
