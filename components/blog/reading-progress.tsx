"use client"

import { useEffect, useState } from "react"

export function ReadingProgressBar({ targetId }: { targetId?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      if (targetId) {
        const target = document.getElementById(targetId)
        if (target) {
          const rect = target.getBoundingClientRect()
          const elementTop = scrollTop + rect.top
          const start = Math.max(0, elementTop - 120)
          const end = Math.max(start + 1, elementTop + target.offsetHeight - window.innerHeight * 0.4)
          const value = ((scrollTop - start) / (end - start)) * 100
          setProgress(Math.max(0, Math.min(100, value)))
          return
        }
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const fallbackValue = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
      setProgress(fallbackValue)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [targetId])

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-blue-700 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
