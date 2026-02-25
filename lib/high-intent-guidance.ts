import { appendConverterContextToHref } from "./converter-context"
import type { ConverterContext } from "./converter-context"
import { HIGH_INTENT_GUIDANCE_ENTRIES } from "./high-intent-guidance-data"

export type GuidanceStyleKey = "standard" | "ap" | "apa" | "mla" | "chicago"

export interface HighIntentExample {
  input: string
  output: string
  note: string
}

export interface HighIntentAttestedUsage {
  publisher: string
  url: string
  date_checked: string
  style_context: GuidanceStyleKey | "general"
  fragment: string
}

export interface HighIntentGuidanceEntry {
  slug: string
  term: string
  h1: string
  title: string
  description: string
  quickAnswer: string
  ruleSummary: string
  examples: HighIntentExample[]
  partOfSpeech: string
  posLogic: string
  whyPeopleGetThisWrong: string
  specialCases: string[]
  originOrMeaning?: string
  attestedUsage: HighIntentAttestedUsage[]
  styleNotes: Record<GuidanceStyleKey, string>
  middlePositionVerdictByStyle: Record<GuidanceStyleKey, "capitalized" | "not capitalized" | "depends">
  converterInput: string
  relatedSlugs: string[]
}

function assertHighIntentEntryV2(entry: HighIntentGuidanceEntry): void {
  if (!entry.partOfSpeech.trim()) throw new Error(`Missing partOfSpeech for ${entry.slug}`)
  if (!entry.posLogic.trim()) throw new Error(`Missing posLogic for ${entry.slug}`)
  if (!entry.whyPeopleGetThisWrong.trim()) throw new Error(`Missing whyPeopleGetThisWrong for ${entry.slug}`)
  if (entry.specialCases.length === 0) throw new Error(`Missing specialCases for ${entry.slug}`)
  if (entry.attestedUsage.length === 0) throw new Error(`Missing attestedUsage for ${entry.slug}`)

  for (const evidence of entry.attestedUsage) {
    if (!evidence.publisher.trim()) throw new Error(`Missing attestedUsage.publisher for ${entry.slug}`)
    if (!evidence.url.trim()) throw new Error(`Missing attestedUsage.url for ${entry.slug}`)
    if (!evidence.date_checked.trim()) throw new Error(`Missing attestedUsage.date_checked for ${entry.slug}`)
    if (!evidence.style_context.trim()) throw new Error(`Missing attestedUsage.style_context for ${entry.slug}`)
    if (!evidence.fragment.trim()) throw new Error(`Missing attestedUsage.fragment for ${entry.slug}`)
  }
}

for (const entry of HIGH_INTENT_GUIDANCE_ENTRIES) {
  assertHighIntentEntryV2(entry)
}

const HIGH_INTENT_GUIDANCE_BY_SLUG = new Map(
  HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => [entry.slug, entry])
)
const HIGH_INTENT_GUIDANCE_BY_TERM = new Map(
  HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => [entry.term, entry])
)

export function getHighIntentGuidanceSlugs(): string[] {
  return HIGH_INTENT_GUIDANCE_ENTRIES.map((entry) => entry.slug)
}

export function getHighIntentGuidanceBySlug(slug: string): HighIntentGuidanceEntry | null {
  return HIGH_INTENT_GUIDANCE_BY_SLUG.get(slug) ?? null
}

export function getHighIntentRelatedEntries(entry: HighIntentGuidanceEntry): HighIntentGuidanceEntry[] {
  return entry.relatedSlugs
    .map((slug) => HIGH_INTENT_GUIDANCE_BY_SLUG.get(slug))
    .filter((candidate): candidate is HighIntentGuidanceEntry => Boolean(candidate))
}

export function getHighIntentConverterHref(
  converterInput: string,
  converterContext?: ConverterContext | null
): string {
  const effectiveContext = converterContext ?? {
    input: converterInput,
    mode: "title",
    titleStyle: "standard" as const,
    outputMode: "title" as const,
    outputTitleStyle: "standard" as const,
  }

  const hrefWithContext = appendConverterContextToHref("/", effectiveContext)

  const url = new URL(hrefWithContext, "https://titlecaseconverter.online")
  url.searchParams.set("ctx_input", effectiveContext.input || converterInput)
  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
}

function extractCandidateTerm(input: string): string | null {
  const normalized = input.trim().toLowerCase().replace(/[^a-z\s?]/g, " ").replace(/\s+/g, " ").trim()
  if (!normalized) return null

  const patterns = [
    /^is ([a-z]+) capitalized\b/,
    /^should ([a-z]+) be capitalized\b/,
    /^([a-z]+) capitalized\??$/,
    /^([a-z]+)$/,
  ]

  for (const pattern of patterns) {
    const match = normalized.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

export function getHighIntentEntryFromInput(input: string): HighIntentGuidanceEntry | null {
  const term = extractCandidateTerm(input)
  if (!term) return null
  return HIGH_INTENT_GUIDANCE_BY_TERM.get(term) ?? null
}

export function getHighIntentBlogHref(
  entry: HighIntentGuidanceEntry,
  converterContext: ConverterContext
): string {
  const hrefWithContext = appendConverterContextToHref(`/blog/${entry.slug}`, converterContext)
  const url = new URL(hrefWithContext, "https://titlecaseconverter.online")
  url.searchParams.set("ctx_input", converterContext.input)
  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
}
