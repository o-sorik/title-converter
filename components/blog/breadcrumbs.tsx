import Link from "next/link"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BlogBreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-zinc-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-blue-700 dark:text-blue-300">{item.label}</span>
            )}
            {!isLast ? " / " : null}
          </span>
        )
      })}
    </nav>
  )
}
