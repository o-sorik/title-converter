export function ContentSection() {
    return (
        <section className="mt-16 space-y-12 max-w-4xl mx-auto px-4 text-zinc-800 dark:text-zinc-200">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">What Is Title Case?</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Title case is a capitalization style used for titles of works, such as books, movies, songs, and articles.
                    In title case, major words are capitalized, while minor words (like articles, prepositions, and conjunctions) are lowercase.
                </p>
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-semibold mb-2 text-green-600 dark:text-green-500">Correct Examples</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>The Catcher in the Rye</li>
                            <li>A Tale of Two Cities</li>
                            <li>Picking Up the Pieces</li>
                        </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-semibold mb-2 text-red-600 dark:text-red-500">Incorrect Examples</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>The catcher in the rye</li>
                            <li>A Tale Of Two Cities</li>
                            <li>Picking up the Pieces</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Title Capitalization Rules</h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Most style guides (APA, MLA, Chicago, etc.) share similar core rules for title capitalization:
                </p>
                <ul className="space-y-3 list-disc list-inside text-zinc-700 dark:text-zinc-300 ml-4">
                    <li><span className="font-medium text-foreground">Capitalize the first and last word</span> of the title, regardless of part of speech.</li>
                    <li><span className="font-medium text-foreground">Capitalize major words</span>: Nouns, Pronouns, Verbs, Adjectives, Adverbs.</li>
                    <li><span className="font-medium text-foreground">Lowercase minor words</span>: Articles (a, an, the), Coordinating Conjunctions (and, but, or, for, nor, etc.), and Prepositions (at, by, to, in, with, on, etc.) usually fewer than 4-5 letters.</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Tips and Tricks</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                        <h3 className="font-semibold text-lg mb-2">Paste Quickly</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Use the "Paste" button to instantly insert text from your clipboard into the converter.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                        <h3 className="font-semibold text-lg mb-2">Copy Result</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            One click on the copy button saves the converted text back to your system clipboard.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                        <h3 className="font-semibold text-lg mb-2">Keyboard Shortcuts</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-mono">Cmd/Ctrl + V</kbd> to paste and see instant results.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
