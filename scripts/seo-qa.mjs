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

function containsAll(content, markers) {
  return markers.every((marker) => content.includes(marker));
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
      return !!content && content.includes("sitemap:") && content.includes("sitemap.xml");
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
    id: "home-metadata-canonical-title-description",
    description: "Home route defines canonical + title + description metadata",
    run: () => {
      const content = read("app/page.tsx");
      return (
        !!content &&
        containsAll(content, [
          "export const metadata",
          "absolute: HOME_PAGE_CONFIG.title",
          "description: HOME_PAGE_CONFIG.description",
          "alternates:",
          "canonical: SITE_URL",
        ])
      );
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
    id: "slug-metadata-canonical-title-description",
    description: "Converter slug route metadata includes canonical + title + description",
    run: () => {
      const content = read("app/[slug]/page.tsx");
      return (
        !!content &&
        containsAll(content, [
          "title: config.title",
          "description: config.description",
          "alternates:",
          "canonical: pageUrl",
        ])
      );
    },
  },
  {
    id: "guide-indexed",
    description: "Rules guide is set to index",
    run: () => {
      const content = read("app/capitalization-rules-guide/page.tsx");
      return !!content && content.includes("robots:") && content.includes("index: true");
    },
  },
  {
    id: "sitemap-guide-included",
    description: "Sitemap includes rules guide",
    run: () => {
      const content = read("app/sitemap.ts");
      return !!content && content.includes("/capitalization-rules-guide");
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
  {
    id: "breadcrumb-schema-component",
    description: "BreadcrumbList JSON-LD component is defined",
    run: () => {
      const content = read("components/json-ld.tsx");
      return (
        !!content &&
        content.includes("export function BreadcrumbListJsonLd") &&
        content.includes('"@type": "BreadcrumbList"')
      );
    },
  },
  {
    id: "blog-index-breadcrumb-jsonld",
    description: "Blog index includes BreadcrumbList JSON-LD",
    run: () => {
      const content = read("app/blog/page.tsx");
      return !!content && content.includes("BreadcrumbListJsonLd");
    },
  },
  {
    id: "blog-index-metadata-canonical-title-description",
    description: "Blog index route defines canonical + title + description metadata",
    run: () => {
      const content = read("app/blog/page.tsx");
      return (
        !!content &&
        containsAll(content, [
          "export const metadata",
          'title: "Blog"',
          'description: "Capitalization guides, comparisons, and practical writing tips."',
          "alternates:",
          'canonical: "/blog"',
        ])
      );
    },
  },
  {
    id: "blog-categories-breadcrumb-jsonld",
    description: "Blog categories index includes BreadcrumbList JSON-LD",
    run: () => {
      const content = read("app/blog/categories/page.tsx");
      return !!content && content.includes("BreadcrumbListJsonLd");
    },
  },
  {
    id: "blog-categories-metadata-canonical-title-description",
    description: "Blog categories index route defines canonical + title + description metadata",
    run: () => {
      const content = read("app/blog/categories/page.tsx");
      return (
        !!content &&
        containsAll(content, [
          "export const metadata",
          'title: "Categories"',
          'description: "Explore writing and capitalization categories."',
          "alternates:",
          'canonical: "/blog/categories"',
        ])
      );
    },
  },
  {
    id: "blog-category-breadcrumb-jsonld",
    description: "Blog category detail includes BreadcrumbList JSON-LD",
    run: () => {
      const content = read("app/blog/categories/[category]/page.tsx");
      return !!content && content.includes("BreadcrumbListJsonLd");
    },
  },
  {
    id: "blog-category-metadata-canonical-title-description",
    description: "Blog category detail metadata includes canonical + title + description",
    run: () => {
      const content = read("app/blog/categories/[category]/page.tsx");
      return (
        !!content &&
        containsAll(content, [
          "title: `${currentCategory.name} Guides`",
          "description: currentCategory.description",
          "alternates:",
          "canonical: `/blog/categories/${currentCategory.id}`",
        ])
      );
    },
  },
  {
    id: "blog-article-breadcrumb-jsonld",
    description: "Blog article page includes BreadcrumbList JSON-LD",
    run: () => {
      const content = read("app/blog/[slug]/page.tsx");
      return !!content && content.includes("BreadcrumbListJsonLd");
    },
  },
  {
    id: "blog-article-metadata-canonical-title-description",
    description: "Blog article metadata source includes canonical + title + description",
    run: () => {
      const content = read("lib/blog-view-model.ts");
      return (
        !!content &&
        containsAll(content, [
          "title: article.title",
          "description: article.excerpt",
          "alternates:",
          "canonical: `/blog/${article.slug}`",
        ])
      );
    },
  },
  {
    id: "rules-guide-metadata-canonical-title-description",
    description: "Rules guide route defines canonical + title + description metadata",
    run: () => {
      const content = read("app/capitalization-rules-guide/page.tsx");
      return (
        !!content &&
        containsAll(content, [
          "export const metadata",
          "title:",
          "description:",
          "alternates:",
          "canonical: `${SITE_URL}/capitalization-rules-guide`",
        ])
      );
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
