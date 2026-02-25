"use client"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
                <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
                <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
                    A critical error occurred. Please try again.
                </p>
                {error.digest && (
                    <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                        Error ID: {error.digest}
                    </p>
                )}
                <button
                    onClick={reset}
                    className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                    Try again
                </button>
            </body>
        </html>
    )
}
