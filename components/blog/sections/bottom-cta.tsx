import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BottomCta({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-navy-dark to-navy-mid px-6 py-12 text-center text-white shadow-lg">
      <h2 className="text-4xl font-black">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100">{description}</p>
      <Button asChild className="mt-6 bg-white text-blue-800 hover:bg-blue-50">
        <Link href="/">Start Converting</Link>
      </Button>
    </section>
  )
}
