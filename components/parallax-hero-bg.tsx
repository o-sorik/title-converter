"use client"
import { useEffect, useRef } from "react"

export function ParallaxHeroBg() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translateY(${window.scrollY * 0.3}px)`
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-56 w-[600px] rounded-full bg-blue-100/50 dark:bg-blue-950/25 blur-3xl" />
    </div>
  )
}
