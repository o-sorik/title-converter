import Link from "next/link"

import type { ConverterLink } from "@/lib/converter-anchors"

interface ConverterInlineLinkProps {
  link: ConverterLink
}

/**
 * The one contextual in-body link to the converter every article carries.
 * Rendered high in the article (right after the answer or the intro) so the
 * link sits in the main content, not in a CTA box or the footer.
 */
export function ConverterInlineLink({ link }: ConverterInlineLinkProps) {
  return (
    <p data-testid="converter-inline-link" className="text-base leading-7 text-slate-600 dark:text-zinc-300">
      {link.before}
      <Link
        href={link.href ?? "/"}
        className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        {link.anchor}
      </Link>
      {link.after}
    </p>
  )
}
