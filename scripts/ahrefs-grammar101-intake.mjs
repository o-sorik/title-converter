import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_COLUMNS = [
  "keyword",
  "volume",
  "kd",
  "traffic_potential",
  "serp_intent_hints",
];

const HEADER_ALIASES = {
  keyword: ["keyword", "query"],
  volume: ["volume", "search volume"],
  kd: ["kd", "keyword difficulty", "difficulty"],
  traffic_potential: ["traffic potential", "traffic_potential", "tp"],
  serp_intent_hints: ["serp intent hints", "intent", "intents", "intent hints", "serp_intent_hints"],
};

function normalizeHeader(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function canonicalizeForSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s/g, "-");
}

function normalizeKeyword(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[`’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDelimited(text, delimiter) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  const flushValue = () => {
    row.push(current);
    current = "";
  };

  const flushRow = () => {
    if (row.length > 1 || (row.length === 1 && row[0].trim().length > 0)) {
      rows.push(row);
    }
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

    if (char === delimiter && !inQuotes) {
      flushValue();
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
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

function detectDelimiter(text) {
  const header = text.split(/\r?\n/, 1)[0] || "";
  const tabCount = (header.match(/\t/g) || []).length;
  const commaCount = (header.match(/,/g) || []).length;
  return tabCount > commaCount ? "\t" : ",";
}

function resolveHeaders(rawHeaders) {
  const normalized = rawHeaders.map(normalizeHeader);
  const selected = {};

  for (const [canonical, aliases] of Object.entries(HEADER_ALIASES)) {
    const foundIndex = normalized.findIndex((header) => aliases.includes(header));
    if (foundIndex >= 0) selected[canonical] = foundIndex;
  }

  const missing = REQUIRED_COLUMNS.filter((column) => selected[column] === undefined);
  if (missing.length > 0) {
    throw new Error(`Missing required columns: ${missing.join(", ")}`);
  }

  return selected;
}

function parseNumeric(value) {
  if (typeof value !== "string") return 0;
  const numeric = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(numeric) ? numeric : 0;
}

function detectIntentClass(normalizedKeyword) {
  if (/^is .+ capitalized in title case\b/.test(normalizedKeyword)) return "title-case-decision";
  if (/^is .+ capitalized\b/.test(normalizedKeyword)) return "general-capitalization-decision";
  if (/\bcapitalized\b/.test(normalizedKeyword)) return "capitalization-informational";
  return "other";
}

function extractCanonicalTerm(normalizedKeyword) {
  const patterns = [
    /^is (.+?) capitalized in title case\b/,
    /^is (.+?) capitalized\b/,
    /^should (.+?) be capitalized\b/,
    /^capitalize (.+)$/,
  ];

  for (const pattern of patterns) {
    const match = normalizedKeyword.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return normalizedKeyword;
}

function mapCandidate(normalizedKeyword) {
  const canonicalTerm = extractCanonicalTerm(normalizedKeyword);
  const intentClass = detectIntentClass(normalizedKeyword);

  if (intentClass === "title-case-decision") {
    const slug = `is-${canonicalizeForSlug(canonicalTerm)}-capitalized-in-title-case`;
    return {
      canonicalTerm,
      intentClass,
      clusterLabel: "cluster-1-title-case",
      canonicalTargetUrl: `/blog/${slug}`,
    };
  }

  if (intentClass === "general-capitalization-decision") {
    const slug = `is-${canonicalizeForSlug(canonicalTerm)}-capitalized`;
    return {
      canonicalTerm,
      intentClass,
      clusterLabel: "cluster-2-general-capitalization",
      canonicalTargetUrl: `/blog/${slug}`,
    };
  }

  return {
    canonicalTerm,
    intentClass,
    clusterLabel: "cluster-3-writing-tips",
    canonicalTargetUrl: "/blog/categories/grammar-101",
  };
}

function computeIntentFit(intentClass, serpHint) {
  const hint = (serpHint || "").toLowerCase();
  if (intentClass === "title-case-decision") return 1;
  if (intentClass === "general-capitalization-decision") return 0.92;
  if (hint.includes("informational")) return 0.72;
  return 0.6;
}

function computeBusinessFit(clusterLabel) {
  if (clusterLabel === "cluster-1-title-case") return 1;
  if (clusterLabel === "cluster-2-general-capitalization") return 0.85;
  return 0.65;
}

function toPriorityTier(score, thresholds) {
  if (score >= thresholds.p1Threshold) return "P1";
  if (score >= thresholds.p2Threshold) return "P2";
  return "P3";
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function buildDraftDate(startDate, offsetDays) {
  const date = new Date(`${startDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return formatDate(date);
}

function toCsv(rows, columns) {
  const encoded = (value) => {
    const text = value == null ? "" : String(value);
    if (/["\n,]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const lines = [columns.join(",")];
  for (const row of rows) {
    lines.push(columns.map((column) => encoded(row[column])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function ingestAhrefsCsv(csvText) {
  const table = parseDelimited(csvText, detectDelimiter(csvText));
  if (table.length < 2) return [];

  const headers = resolveHeaders(table[0]);
  const deduped = new Map();

  for (const row of table.slice(1)) {
    const keyword = row[headers.keyword] ?? "";
    const normalizedKeyword = normalizeKeyword(keyword);
    if (!normalizedKeyword) continue;

    const candidate = {
      sourceKeyword: keyword.trim(),
      normalizedKeyword,
      volume: parseNumeric(row[headers.volume]),
      kd: parseNumeric(row[headers.kd]),
      trafficPotential: parseNumeric(row[headers.traffic_potential]),
      serpIntentHints: (row[headers.serp_intent_hints] || "").trim(),
    };

    const existing = deduped.get(normalizedKeyword);
    if (!existing) {
      deduped.set(normalizedKeyword, candidate);
      continue;
    }

    const existingDemand = existing.volume + existing.trafficPotential;
    const nextDemand = candidate.volume + candidate.trafficPotential;
    if (nextDemand > existingDemand) deduped.set(normalizedKeyword, candidate);
  }

  return [...deduped.values()];
}

function decodeInputBuffer(buffer) {
  if (buffer.length >= 2) {
    const bomLE = buffer[0] === 0xff && buffer[1] === 0xfe;
    const bomBE = buffer[0] === 0xfe && buffer[1] === 0xff;
    if (bomLE) return buffer.toString("utf16le").replace(/^\uFEFF/, "");
    if (bomBE) {
      const swapped = Buffer.from(buffer);
      swapped.swap16();
      return swapped.toString("utf16le").replace(/^\uFEFF/, "");
    }
  }

  // Heuristic for UTF-16 data without explicit BOM.
  const sample = buffer.subarray(0, 200);
  let nullCount = 0;
  for (const byte of sample) {
    if (byte === 0) nullCount += 1;
  }
  if (sample.length > 0 && nullCount / sample.length > 0.2) {
    return buffer.toString("utf16le").replace(/^\uFEFF/, "");
  }

  return buffer.toString("utf8").replace(/^\uFEFF/, "");
}

export function prioritizeGrammar101Keywords(rows, options = {}) {
  const owner = options.owner || "seo-content";
  const status = options.status || "backlog";
  const startDate = options.startDate || formatDate(new Date());
  const thresholds = {
    p1Threshold: options.p1Threshold ?? 0.74,
    p2Threshold: options.p2Threshold ?? 0.52,
  };

  const mapped = rows.map((row) => {
    const mapping = mapCandidate(row.normalizedKeyword);
    return { ...row, ...mapping };
  });

  const termClusters = new Map();
  for (const item of mapped) {
    const key = item.canonicalTerm;
    if (!termClusters.has(key)) termClusters.set(key, new Set());
    termClusters.get(key).add(item.clusterLabel);
  }

  const maxVolume = Math.max(1, ...mapped.map((item) => item.volume));
  const maxTrafficPotential = Math.max(1, ...mapped.map((item) => item.trafficPotential));

  const scored = mapped.map((item) => {
    const normalizedVolume = item.volume / maxVolume;
    const normalizedTrafficPotential = item.trafficPotential / maxTrafficPotential;
    const intentFit = computeIntentFit(item.intentClass, item.serpIntentHints);
    const competitionFit = Math.max(0, Math.min(1, 1 - item.kd / 100));
    const businessFit = computeBusinessFit(item.clusterLabel);

    const priorityScore =
      normalizedVolume * 0.35 +
      normalizedTrafficPotential * 0.25 +
      intentFit * 0.2 +
      competitionFit * 0.1 +
      businessFit * 0.1;

    const hasCrossClusterTerm = (termClusters.get(item.canonicalTerm) || new Set()).size > 1;

    return {
      ...item,
      priorityScore: Number(priorityScore.toFixed(4)),
      publishPriority: toPriorityTier(priorityScore, thresholds),
      conflictFlag: hasCrossClusterTerm,
    };
  });

  const sorted = scored.sort((left, right) => {
    if (right.priorityScore !== left.priorityScore) return right.priorityScore - left.priorityScore;
    if (right.volume !== left.volume) return right.volume - left.volume;
    return right.trafficPotential - left.trafficPotential;
  });

  return sorted.map((row, index) => ({
    keyword: row.sourceKeyword,
    normalized_keyword: row.normalizedKeyword,
    canonical_term: row.canonicalTerm,
    canonical_target_url_candidate: row.canonicalTargetUrl,
    intent_class: row.intentClass,
    cluster_label: row.clusterLabel,
    volume: row.volume,
    kd: row.kd,
    traffic_potential: row.trafficPotential,
    serp_intent_hints: row.serpIntentHints,
    priority_score: row.priorityScore,
    publish_priority: row.publishPriority,
    conflict_flag: row.conflictFlag ? "yes" : "no",
    conflict_notes: row.conflictFlag
      ? "Same term maps to multiple intent clusters; run anti-cannibalization review."
      : "",
    owner,
    status,
    draft_target_date: buildDraftDate(startDate, index),
  }));
}

export function buildPrioritizedBacklogFromCsv(csvText, options = {}) {
  const ingested = ingestAhrefsCsv(csvText);
  return prioritizeGrammar101Keywords(ingested, options);
}

function parseCliArgs(argv) {
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

export function runCli(argv = process.argv.slice(2)) {
  const args = parseCliArgs(argv);
  const inputPath = args.input;
  const outputPath =
    args.output || "_bmad-output/implementation-artifacts/grammar-101-ahrefs-prioritized-backlog.csv";
  const owner = args.owner || "seo-content";
  const status = args.status || "backlog";
  const startDate = args["start-date"] || formatDate(new Date());
  const p1Threshold = args["p1-threshold"] ? Number(args["p1-threshold"]) : 0.74;
  const p2Threshold = args["p2-threshold"] ? Number(args["p2-threshold"]) : 0.52;
  const shortlistOutput = args["shortlist-output"];
  const shortlistSize = args["shortlist-size"] ? Number(args["shortlist-size"]) : 0;

  if (!inputPath) {
    throw new Error("Missing --input <path> argument.");
  }
  if (Number.isNaN(p1Threshold) || Number.isNaN(p2Threshold)) {
    throw new Error("Invalid priority threshold values.");
  }
  if (p2Threshold > p1Threshold) {
    throw new Error("--p2-threshold must be less than or equal to --p1-threshold.");
  }

  const raw = fs.readFileSync(path.resolve(inputPath));
  const csv = decodeInputBuffer(raw);
  const backlogRows = buildPrioritizedBacklogFromCsv(csv, {
    owner,
    status,
    startDate,
    p1Threshold,
    p2Threshold,
  });
  const columns = [
    "keyword",
    "normalized_keyword",
    "canonical_term",
    "canonical_target_url_candidate",
    "intent_class",
    "cluster_label",
    "volume",
    "kd",
    "traffic_potential",
    "serp_intent_hints",
    "priority_score",
    "publish_priority",
    "conflict_flag",
    "conflict_notes",
    "owner",
    "status",
    "draft_target_date",
  ];

  const outputCsv = toCsv(backlogRows, columns);
  const absoluteOutputPath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, outputCsv);

  if (shortlistOutput && shortlistSize > 0) {
    const shortlistColumns = columns;
    const shortlistRows = backlogRows.slice(0, shortlistSize);
    const shortlistCsv = toCsv(shortlistRows, shortlistColumns);
    const absoluteShortlistPath = path.resolve(shortlistOutput);
    fs.mkdirSync(path.dirname(absoluteShortlistPath), { recursive: true });
    fs.writeFileSync(absoluteShortlistPath, shortlistCsv);
  }

  return {
    inputPath: path.resolve(inputPath),
    outputPath: absoluteOutputPath,
    totalRows: backlogRows.length,
    p1Threshold,
    p2Threshold,
    shortlistOutput: shortlistOutput ? path.resolve(shortlistOutput) : null,
    shortlistSize: shortlistOutput && shortlistSize > 0 ? shortlistSize : 0,
  };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  try {
    const result = runCli();
    console.log("Ahrefs Grammar 101 intake completed.");
    console.log(`Input: ${result.inputPath}`);
    console.log(`Output: ${result.outputPath}`);
    console.log(`Rows: ${result.totalRows}`);
    console.log(`Thresholds: P1>=${result.p1Threshold}, P2>=${result.p2Threshold}`);
    if (result.shortlistOutput) {
      console.log(`Shortlist: ${result.shortlistOutput}`);
      console.log(`Shortlist rows: ${result.shortlistSize}`);
    }
  } catch (error) {
    console.error(`Ahrefs intake failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
