interface AnswerBoxProps {
  children: React.ReactNode
  variant?: "quick-answer" | "it-depends"
}

export function AnswerBox({ children, variant = "quick-answer" }: AnswerBoxProps) {
  const isItDepends = variant === "it-depends"

  return (
    <div
      className={
        isItDepends
          ? "rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-500/10 md:p-5"
          : "rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 dark:bg-blue-500/10 md:p-5"
      }
    >
      <p
        className={
          isItDepends
            ? "mb-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400"
            : "mb-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400"
        }
      >
        {isItDepends ? "It Depends" : "Quick Answer"}
      </p>
      <div className="text-base leading-7 text-slate-700 dark:text-zinc-300">{children}</div>
    </div>
  )
}
