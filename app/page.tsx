import { ContentSection } from "@/components/content-section"
import { TextConverter } from "@/components/text-converter"
import { ModeToggle } from "@/components/mode-toggle"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tighter">Title Case Converter Online</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4 min-h-[calc(100vh-3.5rem)] flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-16">
          <TextConverter />
          <ContentSection />
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 max-w-5xl">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Antigravity. Source available on GitHub.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
