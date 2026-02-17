import type { ConversionType, TitleCaseStyle } from "./converters"

export interface ConverterContext {
  input: string
  mode: ConversionType
  titleStyle: TitleCaseStyle
  outputMode: ConversionType
  outputTitleStyle: TitleCaseStyle
}

export interface ConverterInitialState {
  initialInput: string
  initialMode?: ConversionType
  initialTitleStyle?: TitleCaseStyle
  initialOutputMode?: ConversionType
  initialOutputTitleStyle?: TitleCaseStyle
  initialContextRef?: string
}

export const DEFAULT_CONVERTER_CONTEXT_REF = "latest"
const STORAGE_PREFIX = "tcc_ctx:"

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

export function appendConverterContextToHref(href: string, context: ConverterContext): string {
  const url = new URL(href, "https://titlecaseconverter.online")
  url.searchParams.set("ctx_ref", DEFAULT_CONVERTER_CONTEXT_REF)
  url.searchParams.set("ctx_mode", context.mode)
  url.searchParams.set("ctx_style", context.titleStyle)
  url.searchParams.set("ctx_output_mode", context.outputMode)
  url.searchParams.set("ctx_output_style", context.outputTitleStyle)
  return `${url.pathname}?${url.searchParams.toString()}`
}

export function parseConverterInitialStateFromSearchParams(
  searchParams?: Record<string, string | string[] | undefined>
): ConverterInitialState {
  const input = firstValue(searchParams?.ctx_input) ?? ""
  const mode = asMode(firstValue(searchParams?.ctx_mode))
  const style = asStyle(firstValue(searchParams?.ctx_style))
  const outputMode = asMode(firstValue(searchParams?.ctx_output_mode))
  const outputStyle = asStyle(firstValue(searchParams?.ctx_output_style))
  const contextRef = firstValue(searchParams?.ctx_ref)

  return {
    initialInput: input,
    initialMode: mode,
    initialTitleStyle: style,
    initialOutputMode: outputMode,
    initialOutputTitleStyle: outputStyle,
    initialContextRef: contextRef,
  }
}

export function toConverterContext(state: ConverterInitialState): ConverterContext | null {
  if (!state.initialMode || !state.initialTitleStyle || !state.initialOutputMode || !state.initialOutputTitleStyle) {
    return null
  }

  return {
    input: state.initialInput,
    mode: state.initialMode,
    titleStyle: state.initialTitleStyle,
    outputMode: state.initialOutputMode,
    outputTitleStyle: state.initialOutputTitleStyle,
  }
}

export function getConverterContextStorageKey(contextRef = DEFAULT_CONVERTER_CONTEXT_REF): string {
  return `${STORAGE_PREFIX}${contextRef}`
}

export function parseConverterContextPayload(raw: string): ConverterContext | null {
  try {
    const value = JSON.parse(raw) as Partial<ConverterContext>
    if (!value || typeof value !== "object") return null
    if (typeof value.input !== "string") return null
    if (!asMode(value.mode)) return null
    if (!asStyle(value.titleStyle)) return null
    if (!asMode(value.outputMode)) return null
    if (!asStyle(value.outputTitleStyle)) return null

    return {
      input: value.input,
      mode: value.mode,
      titleStyle: value.titleStyle,
      outputMode: value.outputMode,
      outputTitleStyle: value.outputTitleStyle,
    }
  } catch {
    return null
  }
}
