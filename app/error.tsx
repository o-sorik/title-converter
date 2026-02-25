"use client"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Something went wrong</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                An unexpected error occurred. Please try again.
            </p>
            {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                    Error ID: {error.digest}
                </p>
            )}
            <button
                onClick={reset}
                className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                Try again
            </button>
        </main>
    )
}
