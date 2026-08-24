import { describe, expect, test } from "vitest"

import {
  DEFAULT_CONVERTER_CONTEXT_REF,
  MAX_CONTEXT_INPUT_LENGTH,
  appendConverterContextToHref,
  getConverterContextStorageKey,
  parseConverterContextPayload,
  parseConverterInitialStateFromQuery,
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

// --- Query-string parsing and the ctx_input length cap ---

test("parses converter context from a URLSearchParams query", () => {
  const query = new URLSearchParams("ctx_input=walking+during+the+light&ctx_mode=title&ctx_style=ap&ctx_ref=latest")
  expect(parseConverterInitialStateFromQuery(query)).toEqual({
    initialInput: "walking during the light",
    initialMode: "title",
    initialTitleStyle: "ap",
    initialContextRef: "latest",
  })
})

test("query and searchParams parsing agree", () => {
  const record = { ctx_input: "hello", ctx_mode: "sentence", ctx_style: "chicago", ctx_ref: "latest" }
  const query = new URLSearchParams(record as Record<string, string>)
  expect(parseConverterInitialStateFromQuery(query)).toEqual(
    parseConverterInitialStateFromSearchParams(record)
  )
})

test("tolerates a missing query", () => {
  expect(parseConverterInitialStateFromQuery(null).initialInput).toBe("")
})

test("rejects invalid mode and style from the query", () => {
  const query = new URLSearchParams("ctx_mode=bogus&ctx_style=bogus")
  const state = parseConverterInitialStateFromQuery(query)
  expect(state.initialMode).toBeUndefined()
  expect(state.initialTitleStyle).toBeUndefined()
})

test("caps ctx_input length on read so a long paste cannot bloat the URL", () => {
  const long = "x".repeat(MAX_CONTEXT_INPUT_LENGTH + 500)
  const query = new URLSearchParams()
  query.set("ctx_input", long)
  expect(parseConverterInitialStateFromQuery(query).initialInput).toHaveLength(MAX_CONTEXT_INPUT_LENGTH)
  expect(parseConverterInitialStateFromSearchParams({ ctx_input: long }).initialInput).toHaveLength(
    MAX_CONTEXT_INPUT_LENGTH
  )
})

test("caps ctx_input length on write too", () => {
  const long = "y".repeat(MAX_CONTEXT_INPUT_LENGTH + 500)
  const href = appendConverterContextToHref("/capitalization-rules-guide", {
    input: long,
    mode: "title",
    titleStyle: "ap",
  })
  const value = new URL(href, "https://titlecaseconverter.online").searchParams.get("ctx_input")
  expect(value).toHaveLength(MAX_CONTEXT_INPUT_LENGTH)
})
