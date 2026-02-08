"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RadioGroupContextValue = {
    value?: string
    onValueChange?: (value: string) => void
    name: string
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

function useRadioGroupContext() {
    const ctx = React.useContext(RadioGroupContext)
    if (!ctx) {
        throw new Error("RadioGroupItem must be used within a RadioGroup")
    }
    return ctx
}

type RadioGroupProps = React.ComponentProps<"div"> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
}

function RadioGroup({
    className,
    value,
    defaultValue,
    onValueChange,
    ...props
}: RadioGroupProps) {
    const generatedName = React.useId()
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const currentValue = value ?? uncontrolledValue

    const handleChange = (nextValue: string) => {
        if (value === undefined) {
            setUncontrolledValue(nextValue)
        }
        onValueChange?.(nextValue)
    }

    return (
        <RadioGroupContext.Provider
            value={{
                value: currentValue,
                onValueChange: handleChange,
                name: generatedName,
            }}
        >
            <div role="radiogroup" className={cn("grid gap-2", className)} {...props} />
        </RadioGroupContext.Provider>
    )
}

type RadioGroupItemProps = Omit<React.ComponentProps<"input">, "type"> & {
    value: string
}

function RadioGroupItem({ className, value, id, ...props }: RadioGroupItemProps) {
    const group = useRadioGroupContext()
    const checked = group.value === value

    return (
        <input
            id={id}
            type="radio"
            name={group.name}
            value={value}
            checked={checked}
            onChange={() => group.onValueChange?.(value)}
            className={cn(
                "h-4 w-4 shrink-0 border border-input text-primary shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}

export { RadioGroup, RadioGroupItem }
