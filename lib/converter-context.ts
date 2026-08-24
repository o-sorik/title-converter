import type { ConversionType, TitleCaseStyle } from "./converters"
import { SITE_URL } from "@/lib/constants"

export interface ConverterContext {
  input: string
  mode: ConversionType
  titleStyle: TitleCaseStyle
}

export interface ConverterInitialState {
  initialInput: string
  initialMode?: ConversionType
  initialTitleStyle?: TitleCaseStyle
  initialContextRef?: string
}

export const DEFAULT_CONVERTER_CONTEXT_REF = "latest"
const STORAGE_PREFIX = "tcc_ctx:"
const CONTEXT_REF_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/

const VALID_MODES: ConversionType[] = [
  "title",
  "sentence",
  "lower",
  "upper",
  "camel",
  "pascal",
  "snake",
  "kebab",
  "alternating",
  "inverse",
]

const VALID_STYLES: TitleCaseStyle[] = ["standard", "ap", "chicago", "mla", "apa"]

function firstValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

function asMode(value?: string): ConversionType | undefined {
  if (!value) return undefined
  return VALID_MODES.includes(value as ConversionType) ? (value as ConversionType) : undefined
}

function asStyle(value?: string): TitleCaseStyle | undefined {
  if (!value) return undefined
  return VALID_STYLES.includes(value as TitleCaseStyle) ? (value as TitleCaseStyle) : undefined
}

function normalizeContextRef(value?: string): string | undefined {
  if (!value) return undefined
  return CONTEXT_REF_PATTERN.test(value) ? value : DEFAULT_CONVERTER_CONTEXT_REF
}

export function appendConverterContextToHref(href: string, context: ConverterContext): string {
  const url = new URL(href, SITE_URL)
  url.searchParams.set("ctx_ref", DEFAULT_CONVERTER_CONTEXT_REF)
  url.searchParams.set("ctx_mode", context.mode)
  url.searchParams.set("ctx_style", context.titleStyle)
  url.searchParams.set("ctx_input", context.input.slice(0, MAX_CONTEXT_INPUT_LENGTH))
  const query = url.searchParams.toString()
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`
}

/**
 * ctx_input carries arbitrary user text through the URL. Cap it so a long paste
 * can't produce an unusable link, and so the read side never accepts more than
 * the write side should ever have produced.
 */
export const MAX_CONTEXT_INPUT_LENGTH = 280

function parseConverterInitialState(get: (key: string) => string | undefined): ConverterInitialState {
  return {
    initialInput: (get("ctx_input") ?? "").slice(0, MAX_CONTEXT_INPUT_LENGTH),
    initialMode: asMode(get("ctx_mode")),
    initialTitleStyle: asStyle(get("ctx_style")),
    initialContextRef: normalizeContextRef(get("ctx_ref")),
  }
}

/** Server side: Next's `searchParams` record. */
export function parseConverterInitialStateFromSearchParams(
  searchParams?: Record<string, string | string[] | undefined>
): ConverterInitialState {
  return parseConverterInitialState((key) => firstValue(searchParams?.[key]))
}

/** Client side: the URLSearchParams handed back by `useSearchParams()`. */
export function parseConverterInitialStateFromQuery(query: URLSearchParams | null): ConverterInitialState {
  return parseConverterInitialState((key) => query?.get(key) ?? undefined)
}

export function toConverterContext(state: ConverterInitialState): ConverterContext | null {
  if (!state.initialMode || !state.initialTitleStyle) {
    return null
  }

  return {
    input: state.initialInput,
    mode: state.initialMode,
    titleStyle: state.initialTitleStyle,
  }
}

export function getConverterContextStorageKey(contextRef = DEFAULT_CONVERTER_CONTEXT_REF): string {
  const safeRef = normalizeContextRef(contextRef) ?? DEFAULT_CONVERTER_CONTEXT_REF
  return `${STORAGE_PREFIX}${safeRef}`
}

export function parseConverterContextPayload(raw: string): ConverterContext | null {
  try {
    const value = JSON.parse(raw) as Partial<ConverterContext>
    if (!value || typeof value !== "object") return null
    if (typeof value.input !== "string") return null
    const mode = asMode(value.mode)
    const titleStyle = asStyle(value.titleStyle)
    if (!mode || !titleStyle) return null

    // Payloads written before the realtime-converter refactor carry extra
    // output* fields; they are intentionally ignored here.
    return {
      input: value.input,
      mode,
      titleStyle,
    }
  } catch {
    return null
  }
}
