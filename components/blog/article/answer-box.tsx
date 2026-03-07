interface AnswerBoxProps {
  children: React.ReactNode
}

export function AnswerBox({ children }: AnswerBoxProps) {
  return (
    <div className="rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 dark:bg-blue-500/10 md:p-5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
        Quick Answer
      </p>
      <div className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
        {children}
      </div>
    </div>
  )
}
