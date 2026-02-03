"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CONVERTER_SLUGS, SEO_CONFIG } from "@/lib/seo-config"

export function ConverterNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                    All Converters
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Text Converters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/" className="cursor-pointer">
                            Title Case Converter
                        </Link>
                    </DropdownMenuItem>
                    {CONVERTER_SLUGS.map((slug) => {
                        const config = SEO_CONFIG[slug]
                        return (
                            <DropdownMenuItem key={slug} asChild>
                                <Link href={`/${slug}`} className="cursor-pointer">
                                    {config.h1}
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
