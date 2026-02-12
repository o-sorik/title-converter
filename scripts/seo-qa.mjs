import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) {
    return null;
  }
  return fs.readFileSync(abs, "utf8");
}

const checks = [
  {
    id: "layout-metadata-base",
    description: "Layout has metadataBase with production domain",
    run: () => {
      const content = read("app/layout.tsx");
      return !!content && content.includes('metadataBase: new URL(siteUrl)');
    },
  },
  {
    id: "layout-canonical",
    description: "Layout sets canonical alternates for root",
    run: () => {
      const content = read("app/layout.tsx");
      return !!content && content.includes("alternates:") && content.includes("canonical: siteUrl");
    },
  },
  {
    id: "robots-sitemap",
    description: "robots.ts references sitemap.xml",
    run: () => {
      const content = read("app/robots.ts");
      return !!content && content.includes("sitemap: 'https://titlecaseconverter.online/sitemap.xml'");
    },
  },
  {
    id: "home-revalidate",
    description: "Home page has ISR revalidate",
    run: () => {
      const content = read("app/page.tsx");
      return !!content && content.includes("export const revalidate = 86400");
    },
  },
  {
    id: "slug-revalidate",
    description: "Dynamic slug page has ISR revalidate",
    run: () => {
      const content = read("app/[slug]/page.tsx");
      return !!content && content.includes("export const revalidate = 604800");
    },
  },
  {
    id: "slug-dynamic-params",
    description: "Dynamic slug page disables unknown params",
    run: () => {
      const content = read("app/[slug]/page.tsx");
      return !!content && content.includes("export const dynamicParams = false");
    },
  },
  {
    id: "guide-noindex",
    description: "Coming-soon guide is set to noindex",
    run: () => {
      const content = read("app/capitalization-rules-guide/page.tsx");
      return !!content && content.includes("robots:") && content.includes("index: false");
    },
  },
  {
    id: "sitemap-guide-excluded",
    description: "Sitemap excludes coming-soon guide",
    run: () => {
      const content = read("app/sitemap.ts");
      return !!content && !content.includes("/capitalization-rules-guide");
    },
  },
  {
    id: "sitemap-revalidate",
    description: "Sitemap has ISR revalidate",
    run: () => {
      const content = read("app/sitemap.ts");
      return !!content && content.includes("export const revalidate = 86400");
    },
  },
];

let failures = 0;
console.log("SEO QA smoke checks\n");
for (const check of checks) {
  const pass = check.run();
  if (pass) {
    console.log(`[PASS] ${check.id}: ${check.description}`);
  } else {
    failures += 1;
    console.log(`[FAIL] ${check.id}: ${check.description}`);
  }
}

if (failures > 0) {
  console.error(`\nSEO QA failed: ${failures} check(s) failed.`);
  process.exit(1);
}

console.log(`\nSEO QA passed: ${checks.length} check(s).`);
