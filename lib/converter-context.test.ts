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
    })

    expect(href).toContain("mode=title")
    expect(href).toContain("style=ap")
    expect(href).toContain(`ctx_ref=${DEFAULT_CONVERTER_CONTEXT_REF}`)
    expect(href).toContain("ctx_mode=title")
    expect(href).toContain("ctx_style=ap")
    expect(href).not.toContain("ctx_output_mode")
  })

  test("preserves hash fragments when appending context", () => {
    const href = appendConverterContextToHref("/capitalization-rules-guide?mode=title#examples", {
      input: "walking during the light",
      mode: "title",
      titleStyle: "ap",
    })

    expect(href).toContain("ctx_ref=latest")
    expect(href.endsWith("#examples")).toBe(true)
  })

  test("parses converter initial state from search params", () => {
    const result = parseConverterInitialStateFromSearchParams({
      ctx_input: "hello world",
      ctx_mode: "sentence",
      ctx_style: "mla",
    })

    expect(result.initialInput).toBe("hello world")
    expect(result.initialMode).toBe("sentence")
    expect(result.initialTitleStyle).toBe("mla")
    expect(result.initialContextRef).toBeUndefined()
  })

  test("falls back invalid context ref to default latest key", () => {
    const result = parseConverterInitialStateFromSearchParams({
      ctx_ref: "../../unsafe-ref",
    })

    expect(result.initialContextRef).toBe(DEFAULT_CONVERTER_CONTEXT_REF)
  })

  test("ignores unsupported mode and style values", () => {
    const result = parseConverterInitialStateFromSearchParams({
      ctx_mode: "unsupported-mode",
      ctx_style: "unsupported-style",
    })

    expect(result.initialMode).toBeUndefined()
    expect(result.initialTitleStyle).toBeUndefined()
  })

  test("converts parsed state to converter context only when complete", () => {
    const incomplete = toConverterContext({
      initialInput: "hello",
      initialMode: undefined,
      initialTitleStyle: "ap",
    })
    expect(incomplete).toBeNull()

    const complete = toConverterContext({
      initialInput: "hello",
      initialMode: "title",
      initialTitleStyle: "ap",
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
      })
    )
    expect(parsed?.input).toBe("hello world")
    expect(parsed?.mode).toBe("title")
  })

  test("still parses payloads written before the realtime refactor (extra output fields)", () => {
    const parsed = parseConverterContextPayload(
      JSON.stringify({
        input: "hello world",
        mode: "title",
        titleStyle: "ap",
        outputMode: "title",
        outputTitleStyle: "ap",
      })
    )
    expect(parsed?.mode).toBe("title")
  })

  test("returns storage key for context ref", () => {
    expect(getConverterContextStorageKey()).toContain(DEFAULT_CONVERTER_CONTEXT_REF)
    expect(getConverterContextStorageKey("custom-ref")).toContain("custom-ref")
    expect(getConverterContextStorageKey("../../bad-key")).toContain(DEFAULT_CONVERTER_CONTEXT_REF)
  })
})
