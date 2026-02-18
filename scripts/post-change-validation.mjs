import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const DEFAULT_OUTPUT_PATH = "_bmad-output/implementation-artifacts/post-change-validation-status.json";
const PERFORMANCE_ARTIFACT_PATH = "_bmad-output/implementation-artifacts/converter-performance-status.json";
const P95_LIMIT_MS = 2000;

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const next = argv[index + 1];
    if (!key.startsWith("--")) continue;

    const name = key.slice(2);
    if (next && !next.startsWith("--")) {
      args[name] = next;
      index += 1;
    } else {
      args[name] = "true";
    }
  }
  return args;
}

function runCommand(command) {
  const result = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  process.stdout.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");

  return {
    exitCode: typeof result.status === "number" ? result.status : 1,
    output: `${result.stdout ?? ""}\n${result.stderr ?? ""}`,
  };
}

function readPerformanceArtifact() {
  const absolutePath = path.resolve(PERFORMANCE_ARTIFACT_PATH);
  if (!fs.existsSync(absolutePath)) {
    return { p95Ms: null, generatedAt: null };
  }

  try {
    const payload = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
    const p95Ms = typeof payload.p95_ms === "number" ? payload.p95_ms : null;
    const generatedAt = typeof payload.generated_at === "string" ? payload.generated_at : null;
    return { p95Ms, generatedAt };
  } catch {
    return { p95Ms: null, generatedAt: null };
  }
}

export function runPostChangeValidation({
  outputPath = DEFAULT_OUTPUT_PATH,
  timestamp = new Date().toISOString(),
} = {}) {
  const seoQa = runCommand("npm run seo:qa");
  const testRun = runCommand("npm test");
  const performanceArtifact = readPerformanceArtifact();
  const converterP95Ms = performanceArtifact.p95Ms;
  const performancePass = converterP95Ms !== null && converterP95Ms <= P95_LIMIT_MS;

  const record = {
    generated_at: timestamp,
    passed: seoQa.exitCode === 0 && testRun.exitCode === 0 && performancePass,
    checks: {
      seo_qa: { status: seoQa.exitCode === 0 ? "pass" : "fail", exit_code: seoQa.exitCode },
      route_and_functional_tests: { status: testRun.exitCode === 0 ? "pass" : "fail", exit_code: testRun.exitCode },
      core_conversion_p95: {
        status: performancePass ? "pass" : "fail",
        p95_ms: converterP95Ms,
        threshold_ms: P95_LIMIT_MS,
        source_artifact: PERFORMANCE_ARTIFACT_PATH,
        source_generated_at: performanceArtifact.generatedAt,
      },
    },
    blocking_regressions: [],
  };

  if (seoQa.exitCode !== 0) record.blocking_regressions.push("seo_qa_failed");
  if (testRun.exitCode !== 0) record.blocking_regressions.push("route_or_functional_tests_failed");
  if (!performancePass) record.blocking_regressions.push("converter_p95_regression");

  const absoluteOutputPath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, `${JSON.stringify(record, null, 2)}\n`);

  return { record, outputPath: absoluteOutputPath };
}

export function runCli(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  return runPostChangeValidation({
    outputPath: args.output || DEFAULT_OUTPUT_PATH,
  });
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const result = runCli();
  if (!result.record.passed) {
    console.error(`\nPost-change validation failed. Record: ${result.outputPath}`);
    process.exit(1);
  }

  console.log(`\nPost-change validation passed. Record: ${result.outputPath}`);
}
