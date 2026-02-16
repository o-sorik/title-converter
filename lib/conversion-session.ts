import type { ConversionType, TitleCaseStyle } from "./converters"

export interface ConversionSnapshot {
  input: string
  type: ConversionType
  titleStyle: TitleCaseStyle
}

export function createConversionSnapshot(
  input: string,
  type: ConversionType,
  titleStyle: TitleCaseStyle
): ConversionSnapshot | null {
  if (!input.trim()) return null
  return { input, type, titleStyle }
}

export function syncSnapshotMode(
  snapshot: ConversionSnapshot | null,
  mode: ConversionType
): ConversionSnapshot | null {
  if (!snapshot) return snapshot
  if (snapshot.type === mode) return snapshot
  return { ...snapshot, type: mode }
}

export function hasPendingConversionChanges(
  snapshot: ConversionSnapshot | null,
  input: string,
  type: ConversionType,
  titleStyle: TitleCaseStyle
): boolean {
  if (!snapshot) return Boolean(input.trim())
  return (
    snapshot.input !== input ||
    snapshot.type !== type ||
    snapshot.titleStyle !== titleStyle
  )
}
