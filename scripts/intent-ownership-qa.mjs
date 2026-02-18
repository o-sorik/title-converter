import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_COLUMNS = [
  "normalized_keyword",
  "canonical_term",
  "canonical_target_url_candidate",
  "intent_class",
  "cluster_label",
  "conflict_flag",
  "status",
  "priority_score",
];

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  const flushValue = () => {
    row.push(current);
    current = "";
  };

  const flushRow = () => {
    if (row.length > 1 || (row.length === 1 && row[0].trim().length > 0)) rows.push(row);
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      flushValue();
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      flushValue();
      flushRow();
      continue;
    }

    current += char;
  }

  flushValue();
  flushRow();
  return rows;
}

function toCsv(rows, columns) {
  const encoded = (value) => {
    const text = value == null ? "" : String(value);
    if (/["\n,]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
    return text;
  };

  const lines = [columns.join(",")];
  for (const row of rows) {
    lines.push(columns.map((column) => encoded(row[column])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

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

function validateClusterUrlMapping(row) {
  if (row.cluster_label === "cluster-1-title-case") {
    return /^\/blog\/is-[a-z0-9-]+-capitalized-in-title-case$/.test(row.canonical_target_url_candidate);
  }
  if (row.cluster_label === "cluster-2-general-capitalization") {
    return /^\/blog\/is-[a-z0-9-]+-capitalized$/.test(row.canonical_target_url_candidate);
  }
  if (row.cluster_label === "cluster-3-writing-tips") {
    return row.canonical_target_url_candidate.startsWith("/blog/");
  }
  return true;
}

function score(row) {
  const value = Number(row.priority_score);
  return Number.isFinite(value) ? value : 0;
}

function mapBacklogRows(rows) {
  const byUrl = new Map();
  for (const row of rows) {
    const key = row.canonical_target_url_candidate;
    if (!byUrl.has(key)) byUrl.set(key, []);
    byUrl.get(key).push(row);
  }

  const mapRows = [];
  for (const [url, candidates] of byUrl.entries()) {
    const sorted = [...candidates].sort((a, b) => score(b) - score(a));
    const primary = sorted[0];
    const secondaryQueries = sorted.slice(1).map((item) => item.normalized_keyword);
    mapRows.push({
      slug: url.replace(/^\/blog\//, ""),
      primary_query: primary.normalized_keyword,
      secondary_queries: secondaryQueries.join(" | "),
      cluster: primary.cluster_label,
      status: primary.status,
      target_url: url,
    });
  }

  return mapRows.sort((a, b) => a.target_url.localeCompare(b.target_url));
}

export function analyzeIntentOwnership(csvText) {
  const table = parseCsv(csvText);
  if (table.length < 2) throw new Error("Input CSV has no data rows.");

  const header = table[0];
  const indexByColumn = Object.fromEntries(header.map((name, index) => [name, index]));

  const missingColumns = REQUIRED_COLUMNS.filter((column) => indexByColumn[column] === undefined);
  if (missingColumns.length > 0) throw new Error(`Missing required columns: ${missingColumns.join(", ")}`);

  const rows = table.slice(1).map((raw) => {
    const row = {};
    for (const column of header) {
      row[column] = (raw[indexByColumn[column]] || "").trim();
    }
    return row;
  });

  const findings = [];

  const queryToUrls = new Map();
  for (const row of rows) {
    if (!queryToUrls.has(row.normalized_keyword)) queryToUrls.set(row.normalized_keyword, new Set());
    queryToUrls.get(row.normalized_keyword).add(row.canonical_target_url_candidate);
  }
  for (const [query, urls] of queryToUrls.entries()) {
    if (urls.size > 1) {
      findings.push({
        level: "error",
        code: "duplicate-primary-query",
        message: `Primary query maps to multiple URLs: ${query}`,
      });
    }
  }

  const urlToIntents = new Map();
  for (const row of rows) {
    if (!urlToIntents.has(row.canonical_target_url_candidate)) urlToIntents.set(row.canonical_target_url_candidate, new Set());
    urlToIntents.get(row.canonical_target_url_candidate).add(row.intent_class);
  }
  for (const [url, intents] of urlToIntents.entries()) {
    if (intents.size > 1) {
      findings.push({
        level: "error",
        code: "multiple-intents-per-url",
        message: `URL maps to multiple intent classes: ${url}`,
      });
    }
  }

  for (const row of rows) {
    if (!validateClusterUrlMapping(row)) {
      findings.push({
        level: "error",
        code: "cluster-url-mismatch",
        message: `Cluster does not match URL pattern (${row.cluster_label} -> ${row.canonical_target_url_candidate})`,
      });
    }
  }

  const blockingStatuses = new Set(["ready", "ready-for-dev", "published"]);
  const publishConflicts = rows.filter(
    (row) => blockingStatuses.has(row.status.toLowerCase()) && row.conflict_flag.toLowerCase() === "yes"
  );
  for (const row of publishConflicts) {
    findings.push({
      level: "error",
      code: "publish-conflict-flag",
      message: `Publishing status with unresolved conflict: ${row.normalized_keyword} -> ${row.canonical_target_url_candidate}`,
    });
  }

  const allConflicts = rows.filter((row) => row.conflict_flag.toLowerCase() === "yes").length;
  if (allConflicts > 0) {
    findings.push({
      level: "warn",
      code: "conflicts-present",
      message: `Rows requiring ownership review: ${allConflicts}`,
    });
  }

  return {
    rows,
    findings,
    mapRows: mapBacklogRows(rows),
  };
}

export function runCli(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const inputPath =
    args.input || "_bmad-output/implementation-artifacts/grammar-101-ahrefs-prioritized-backlog.csv";
  const outputMapPath = args.output || "_bmad-output/implementation-artifacts/intent-url-map.csv";

  const input = fs.readFileSync(path.resolve(inputPath), "utf8");
  const analysis = analyzeIntentOwnership(input);
  const errorCount = analysis.findings.filter((item) => item.level === "error").length;
  const warnCount = analysis.findings.filter((item) => item.level === "warn").length;

  const outputColumns = ["slug", "primary_query", "secondary_queries", "cluster", "status", "target_url"];
  const csv = toCsv(analysis.mapRows, outputColumns);
  const absoluteOutputPath = path.resolve(outputMapPath);
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, csv);

  return {
    inputPath: path.resolve(inputPath),
    outputPath: absoluteOutputPath,
    rows: analysis.rows.length,
    mapRows: analysis.mapRows.length,
    findings: analysis.findings,
    errorCount,
    warnCount,
  };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  try {
    const result = runCli();
    console.log("Intent ownership QA checks");
    for (const finding of result.findings) {
      const prefix = finding.level === "error" ? "[FAIL]" : "[WARN]";
      console.log(`${prefix} ${finding.code}: ${finding.message}`);
    }
    console.log(`\nInput rows: ${result.rows}`);
    console.log(`URL map rows: ${result.mapRows}`);
    console.log(`Output map: ${result.outputPath}`);

    if (result.errorCount > 0) {
      console.error(`\nIntent ownership QA failed: ${result.errorCount} blocking issue(s).`);
      process.exit(1);
    }

    console.log(`\nIntent ownership QA passed with ${result.warnCount} warning(s).`);
  } catch (error) {
    console.error(`Intent ownership QA failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
