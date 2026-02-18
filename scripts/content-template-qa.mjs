import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, "utf8");
}

const templatePath = "components/blog/article/grammar-101-template.tsx";
const template = read(templatePath);

if (!template) {
  console.error(`[FAIL] template-file: Missing ${templatePath}`);
  process.exit(1);
}

const requiredMarkers = [
  {
    id: "short-answer",
    description: "Template includes short answer section",
    marker: 'data-testid="grammar-101-short-answer"',
  },
  {
    id: "pos-logic",
    description: "Template includes POS logic section",
    marker: 'data-testid="grammar-101-pos-logic"',
  },
  {
    id: "style-verdicts",
    description: "Template includes style differences section",
    marker: 'data-testid="grammar-101-style-verdicts"',
  },
  {
    id: "examples",
    description: "Template includes examples section",
    marker: 'data-testid="grammar-101-examples"',
  },
  {
    id: "special-cases",
    description: "Template includes special cases section",
    marker: 'data-testid="grammar-101-special-cases"',
  },
  {
    id: "why-confusing",
    description: "Template includes why-people-get-this-wrong section",
    marker: 'data-testid="grammar-101-why-confusing"',
  },
  {
    id: "attested-usage",
    description: "Template includes attested usage section",
    marker: 'data-testid="grammar-101-attested-usage"',
  },
  {
    id: "converter-cta",
    description: "Template includes converter CTA block",
    marker: "Need instant formatting help?",
  },
  {
    id: "related-links",
    description: "Template includes related links section",
    marker: 'data-testid="grammar-101-related"',
  },
];

const requiredOrder = [
  'data-testid="grammar-101-short-answer"',
  'data-testid="grammar-101-pos-logic"',
  'data-testid="grammar-101-style-verdicts"',
  'data-testid="grammar-101-examples"',
  'data-testid="grammar-101-special-cases"',
  'data-testid="grammar-101-why-confusing"',
  'data-testid="grammar-101-attested-usage"',
  "Need instant formatting help?",
  'data-testid="grammar-101-related"',
];

const styleLinks = [
  "style=standard",
  "style=ap",
  "style=apa",
  "style=mla",
  "style=chicago",
];

const evidenceFraming = "observed editorial usage patterns, not absolute grammatical authority";

let failures = 0;
console.log("Content template governance checks\n");

for (const marker of requiredMarkers) {
  if (template.includes(marker.marker)) {
    console.log(`[PASS] ${marker.id}: ${marker.description}`);
  } else {
    failures += 1;
    console.log(`[FAIL] ${marker.id}: ${marker.description}`);
  }
}

for (const link of styleLinks) {
  const id = `style-link-${link}`;
  if (template.includes(link)) {
    console.log(`[PASS] ${id}: Style link is present`);
  } else {
    failures += 1;
    console.log(`[FAIL] ${id}: Style link is present`);
  }
}

if (template.includes(evidenceFraming)) {
  console.log("[PASS] attested-usage-framing: Evidence disclaimer is explicit");
} else {
  failures += 1;
  console.log("[FAIL] attested-usage-framing: Evidence disclaimer is explicit");
}

const orderIndexes = requiredOrder.map((marker) => template.indexOf(marker));
const hasMissingOrderMarker = orderIndexes.some((index) => index < 0);
if (hasMissingOrderMarker) {
  failures += 1;
  console.log("[FAIL] section-order: Cannot validate order because one or more markers are missing");
} else {
  const isOrdered = orderIndexes.every((value, index) => index === 0 || value > orderIndexes[index - 1]);
  if (isOrdered) {
    console.log("[PASS] section-order: Required sections are in governance order");
  } else {
    failures += 1;
    console.log("[FAIL] section-order: Required sections are in governance order");
  }
}

if (failures > 0) {
  console.error(`\nContent template QA failed: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log("\nContent template QA passed.");
