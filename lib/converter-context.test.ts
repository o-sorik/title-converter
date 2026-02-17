import { describe, expect, test } from "vitest"

import {
  DEFAULT_CONVERTER_CONTEXT_REF,
  appendConverterContextToHref,
  getConverterContextStorageKey,
  parseConverterContextPayload,
  parseConverterInitialStateFromSearchParams,
  toConverterContext,
} from "./converter-context"

describe("converter context helpers", () => {
  test("appends converter context to guidance href", () => {
    const href = appendConverterContextToHref("/capitalization-rules-guide?mode=title&style=ap", {
      input: "walking during the light",
      mode: "title",
      titleStyle: "ap",
      outputMode: "title",
      outputTitleStyle: "ap",
    })

    expect(href).toContain("mode=title")
    expect(href).toContain("style=ap")
    expect(href).toContain(`ctx_ref=${DEFAULT_CONVERTER_CONTEXT_REF}`)
    expect(href).toContain("ctx_mode=title")
    expect(href).toContain("ctx_style=ap")
    expect(href).toContain("ctx_output_mode=title")
    expect(href).toContain("ctx_output_style=ap")
  })

  test("parses converter initial state from search params", () => {
    const result = parseConverterInitialStateFromSearchParams({
      ctx_input: "hello world",
      ctx_mode: "sentence",
      ctx_style: "mla",
      ctx_output_mode: "title",
      ctx_output_style: "ap",
    })

    expect(result.initialInput).toBe("hello world")
    expect(result.initialMode).toBe("sentence")
    expect(result.initialTitleStyle).toBe("mla")
    expect(result.initialOutputMode).toBe("title")
    expect(result.initialOutputTitleStyle).toBe("ap")
    expect(result.initialContextRef).toBeUndefined()
  })

  test("ignores unsupported mode and style values", () => {
    const result = parseConverterInitialStateFromSearchParams({
      ctx_mode: "unsupported-mode",
      ctx_style: "unsupported-style",
      ctx_output_mode: "also-bad",
      ctx_output_style: "nope",
    })

    expect(result.initialMode).toBeUndefined()
    expect(result.initialTitleStyle).toBeUndefined()
    expect(result.initialOutputMode).toBeUndefined()
    expect(result.initialOutputTitleStyle).toBeUndefined()
  })

  test("converts parsed state to converter context only when complete", () => {
    const incomplete = toConverterContext({
      initialInput: "hello",
      initialMode: "title",
      initialTitleStyle: "ap",
      initialOutputMode: undefined,
      initialOutputTitleStyle: "ap",
    })
    expect(incomplete).toBeNull()

    const complete = toConverterContext({
      initialInput: "hello",
      initialMode: "title",
      initialTitleStyle: "ap",
      initialOutputMode: "title",
      initialOutputTitleStyle: "ap",
    })
    expect(complete).not.toBeNull()
    expect(complete?.mode).toBe("title")
  })

  test("parses stored converter context payload", () => {
    const parsed = parseConverterContextPayload(
      JSON.stringify({
        input: "hello world",
        mode: "title",
        titleStyle: "ap",
        outputMode: "title",
        outputTitleStyle: "ap",
      })
    )
    expect(parsed?.input).toBe("hello world")
    expect(parsed?.mode).toBe("title")
  })

  test("returns storage key for context ref", () => {
    expect(getConverterContextStorageKey()).toContain(DEFAULT_CONVERTER_CONTEXT_REF)
    expect(getConverterContextStorageKey("custom-ref")).toContain("custom-ref")
  })
})
