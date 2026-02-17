import { convert, type ConversionType, type TitleCaseStyle } from "./converters"

export interface EditorialQaItem {
  source: string
  normalized: string
  converted: string
  isConsistent: boolean
}

export interface EditorialQaResult {
  standardLabel: string
  total: number
  consistentCount: number
  needsCorrectionCount: number
  items: EditorialQaItem[]
}

function toStandardLabel(mode: ConversionType, titleStyle: TitleCaseStyle): string {
  if (mode === "title") return `title (${titleStyle.toUpperCase()})`
  return mode
}

export function runEditorialQaBatch(
  rawBatchInput: string,
  mode: ConversionType,
  titleStyle: TitleCaseStyle
): EditorialQaResult {
  const lines = rawBatchInput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const items: EditorialQaItem[] = lines.map((line) => {
    const converted = convert(line, mode, mode === "title" ? { titleStyle } : undefined)
    return {
      source: line,
      normalized: line,
      converted,
      isConsistent: line === converted,
    }
  })

  const consistentCount = items.filter((item) => item.isConsistent).length

  return {
    standardLabel: toStandardLabel(mode, titleStyle),
    total: items.length,
    consistentCount,
    needsCorrectionCount: items.length - consistentCount,
    items,
  }
}

