import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const DEFAULT_OUTPUT_PATH = "_bmad-output/implementation-artifacts/release-gate-status.json";

const REQUIRED_CHECKS = [
  { id: "lint", command: "npm run lint" },
  { id: "test", command: "npm test" },
  { id: "seo_qa", command: "npm run seo:qa" },
  { id: "template_qa", command: "npm run template:qa" },
  { id: "intent_qa", command: "npm run intent:qa" },
];

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

function runShellCommand(command) {
  const result = spawnSync(command, {
    shell: true,
    stdio: "inherit",
  });

  return {
    exitCode: typeof result.status === "number" ? result.status : 1,
  };
}

export function evaluateReleaseGate({
  checks = REQUIRED_CHECKS,
  runCheck = runShellCommand,
  outputPath = DEFAULT_OUTPUT_PATH,
  timestamp = new Date().toISOString(),
  logger = console,
} = {}) {
  const checkResults = {};

  for (const check of checks) {
    logger.log(`[RUN] ${check.id}: ${check.command}`);
    const outcome = runCheck(check.command);
    const passed = outcome.exitCode === 0;

    checkResults[check.id] = {
      command: check.command,
      status: passed ? "pass" : "fail",
      exit_code: outcome.exitCode,
    };

    logger.log(`[${passed ? "PASS" : "FAIL"}] ${check.id}`);
  }

  const failedChecks = checks.filter((check) => checkResults[check.id].status === "fail").map((check) => check.id);
  const passed = failedChecks.length === 0;

  const releaseRecord = {
    generated_at: timestamp,
    passed,
    checks: checkResults,
    failed_checks: failedChecks,
    required_checks: checks.map((check) => check.id),
    bypasses: 0,
  };

  const absoluteOutputPath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, `${JSON.stringify(releaseRecord, null, 2)}\n`);

  return {
    releaseRecord,
    outputPath: absoluteOutputPath,
  };
}

export function runCli(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  return evaluateReleaseGate({
    outputPath: args.output || DEFAULT_OUTPUT_PATH,
  });
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const result = runCli();
  if (!result.releaseRecord.passed) {
    console.error(`\nRelease gate failed. Record: ${result.outputPath}`);
    process.exit(1);
  }

  console.log(`\nRelease gate passed. Record: ${result.outputPath}`);
}
