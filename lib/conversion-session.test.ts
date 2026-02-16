import { expect, test } from "vitest"

import {
  createConversionSnapshot,
  hasPendingConversionChanges,
  syncSnapshotMode,
} from "./conversion-session"

test("creates snapshot only for non-empty input", () => {
  expect(createConversionSnapshot("   ", "title", "standard")).toBeNull()

  expect(createConversionSnapshot("hello world", "title", "ap")).toEqual({
    input: "hello world",
    type: "title",
    titleStyle: "ap",
  })
})

test("tracks pending changes for input, mode, and style", () => {
  const snapshot = createConversionSnapshot("headline text", "title", "standard")
  expect(snapshot).not.toBeNull()

  expect(hasPendingConversionChanges(snapshot, "headline text", "title", "standard")).toBe(false)
  expect(hasPendingConversionChanges(snapshot, "headline text updated", "title", "standard")).toBe(true)
  expect(hasPendingConversionChanges(snapshot, "headline text", "upper", "standard")).toBe(true)
  expect(hasPendingConversionChanges(snapshot, "headline text", "title", "ap")).toBe(true)
})

test("treats non-empty input as pending when no snapshot exists (clear -> rerun path)", () => {
  expect(hasPendingConversionChanges(null, "", "title", "standard")).toBe(false)
  expect(hasPendingConversionChanges(null, "new run", "title", "standard")).toBe(true)
})

test("syncs existing snapshot mode on route/default-mode changes", () => {
  const snapshot = createConversionSnapshot("hello world", "title", "standard")
  expect(snapshot).not.toBeNull()

  expect(syncSnapshotMode(snapshot, "title")).toEqual(snapshot)
  expect(syncSnapshotMode(snapshot, "upper")).toEqual({
    input: "hello world",
    type: "upper",
    titleStyle: "standard",
  })
})
