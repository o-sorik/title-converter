import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, describe, expect, test, vi } from "vitest"
import { evaluateReleaseGate } from "./release-gate.mjs"

describe("release gate", () => {
  const tempDirs: string[] = []

  afterEach(() => {
    vi.restoreAllMocks()
    for (const dir of tempDirs) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
    tempDirs.length = 0
  })

  test("passes when lint, test, and seo qa all pass", () => {
    const runCheck = vi.fn(() => ({ exitCode: 0 }))
    const result = evaluateReleaseGate({
      outputPath: path.join(os.tmpdir(), "release-gate-pass.json"),
      runCheck,
      timestamp: "2026-02-19T00:00:00.000Z",
      logger: { log: vi.fn() } as unknown as Console,
    })

    expect(result.releaseRecord.passed).toBe(true)
    expect(result.releaseRecord.failed_checks).toEqual([])
    expect(runCheck).toHaveBeenCalledTimes(3)
    expect(runCheck).toHaveBeenNthCalledWith(1, "npm run lint")
    expect(runCheck).toHaveBeenNthCalledWith(2, "npm test")
    expect(runCheck).toHaveBeenNthCalledWith(3, "npm run seo:qa")
    expect(result.releaseRecord.bypasses).toBe(0)
  })

  test("fails and records all check statuses when one command fails", () => {
    const runCheck = vi
      .fn()
      .mockReturnValueOnce({ exitCode: 0 })
      .mockReturnValueOnce({ exitCode: 1 })
      .mockReturnValueOnce({ exitCode: 0 })

    const result = evaluateReleaseGate({
      outputPath: path.join(os.tmpdir(), "release-gate-fail.json"),
      runCheck,
      timestamp: "2026-02-19T00:00:00.000Z",
      logger: { log: vi.fn() } as unknown as Console,
    })

    expect(result.releaseRecord.passed).toBe(false)
    expect(result.releaseRecord.failed_checks).toEqual(["test"])
    expect(result.releaseRecord.checks.lint.status).toBe("pass")
    expect(result.releaseRecord.checks.test.status).toBe("fail")
    expect(result.releaseRecord.checks.seo_qa.status).toBe("pass")
    expect(runCheck).toHaveBeenCalledTimes(3)
  })

  test("writes machine-readable release record json", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "release-gate-"))
    tempDirs.push(tempDir)
    const outputPath = path.join(tempDir, "release-gate-status.json")

    evaluateReleaseGate({
      outputPath,
      runCheck: () => ({ exitCode: 0 }),
      timestamp: "2026-02-19T00:00:00.000Z",
      logger: { log: vi.fn() } as unknown as Console,
    })

    const record = JSON.parse(fs.readFileSync(outputPath, "utf8"))
    expect(record.generated_at).toBe("2026-02-19T00:00:00.000Z")
    expect(record.passed).toBe(true)
    expect(record.required_checks).toEqual(["lint", "test", "seo_qa"])
    expect(record.checks.lint.command).toBe("npm run lint")
    expect(record.checks.test.command).toBe("npm test")
    expect(record.checks.seo_qa.command).toBe("npm run seo:qa")
  })
})
