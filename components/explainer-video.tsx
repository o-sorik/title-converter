"use client"

import * as React from "react"
import Image from "next/image"
import { IconBrandYoutube, IconPlayerPlayFilled } from "@tabler/icons-react"
import { EXPLAINER_VIDEO, youtubePlayerUrl, youtubeWatchUrl } from "@/lib/explainer-video"

// Lite embed: a poster and a play button until the visitor asks for the video.
// The YouTube player (about 1 MB of scripts, plus cookies) loads only after the click,
// from youtube-nocookie.com, so the homepage stays fast and nothing reaches YouTube by default.
// The poster is a ready-made 1280x720 JPG (~140 KB), served as is: no image optimizer round trip.
// The play button sits in the poster's empty top-right area so it does not cover the poster text.
export function ExplainerVideo() {
    const [playing, setPlaying] = React.useState(false)
    const video = EXPLAINER_VIDEO

    return (
        <section aria-labelledby="see-it-in-action-heading" className="w-full">
            <div className="text-center mb-6 space-y-2">
                <h2 id="see-it-in-action-heading" className="text-2xl font-bold tracking-tight">
                    See It in Action
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    A one-minute tour: paste a headline, switch between AP, Chicago and MLA, and see the rule behind every word.
                </p>
            </div>

            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-zinc-100 shadow-sm dark:bg-zinc-900">
                <div className="relative aspect-video">
                    {playing ? (
                        <iframe
                            src={youtubePlayerUrl(video.id)}
                            title={video.title}
                            className="absolute inset-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setPlaying(true)}
                            aria-label={`Play video: ${video.title}`}
                            className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                            <Image
                                src={video.poster}
                                alt=""
                                fill
                                unoptimized
                                sizes="(min-width: 768px) 768px, 100vw"
                                className="object-cover"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute left-[80%] top-[27%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-white/70 transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20"
                            >
                                <IconPlayerPlayFilled className="ml-1 h-6 w-6 sm:h-8 sm:w-8" />
                            </span>
                            <span className="absolute bottom-3 right-3 rounded-md bg-zinc-900/80 px-2 py-0.5 text-xs font-medium tabular-nums text-white">
                                1:01
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <p className="mt-3 text-center text-sm">
                <a
                    href={youtubeWatchUrl(video.id)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                    <IconBrandYoutube className="h-4 w-4" aria-hidden="true" />
                    Watch on YouTube
                </a>
            </p>
        </section>
    )
}
