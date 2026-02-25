import Link from "next/link"

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                This page doesn&apos;t exist.
            </p>
            <Link
                href="/"
                className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                Back to Converter
            </Link>
        </main>
    )
}
