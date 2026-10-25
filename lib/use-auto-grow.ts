import * as React from "react"

/** Grows a textarea with its content between `min` and `max` pixels, then scrolls. */
export function useAutoGrow(value: string, min: number, max: number) {
    const ref = React.useRef<HTMLTextAreaElement>(null)
    React.useLayoutEffect(() => {
        const el = ref.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${Math.min(max, Math.max(min, el.scrollHeight))}px`
    }, [value, min, max])
    return ref
}
