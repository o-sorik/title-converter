import * as React from "react"
import { cn } from "@/lib/utils"

type FieldProps = React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical"
}

function Field({ className, orientation = "vertical", ...props }: FieldProps) {
    return (
        <div
            className={cn(
                "flex gap-3",
                orientation === "horizontal" ? "items-start" : "flex-col",
                className
            )}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("grid gap-0.5", className)} {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
    return <label className={cn("text-sm font-medium leading-none", className)} {...props} />
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
    return <p className={cn("text-xs text-muted-foreground", className)} {...props} />
}

export { Field, FieldContent, FieldDescription, FieldLabel }
