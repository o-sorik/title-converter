import { cn } from "@/lib/utils"

// Brand mark: a capital T with one mint underline, the proofreader's "make it capital"
// marks merged into a single explanation line. Colors are fixed brand values, not theme tokens.
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={cn("h-7 w-7 shrink-0", className)}
    >
      <rect width="64" height="64" rx="14" fill="#3558D3" />
      <path d="M14 11h36v8.5H36.5V42h-9V19.5H14z" fill="#FFFFFF" />
      <rect x="18" y="49" width="28" height="6" rx="3" fill="#73ECBC" />
    </svg>
  )
}
