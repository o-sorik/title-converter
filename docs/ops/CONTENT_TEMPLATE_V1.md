# Content Template v1 (`Is X` Pages)

## Purpose
- Standard template for pages like `Is X Capitalized in Title Case?` and `Is X Capitalized?`.
- Primary goal: answer intent fast, then support with examples, style context, and internal links.

## Target Query Types
- Pattern A: `is <term> capitalized in title case`
- Pattern B: `is <term> capitalized`
- Pattern C: `capitalize <term> in title`

## Required Page Structure (in order)
1. `H1` exactly matches primary intent.
2. Short answer block above the fold (`Yes/No/Depends` in first sentence).
3. Rule summary table (AP / APA / MLA / Chicago columns where relevant).
4. Examples block (correct vs incorrect usage).
5. Edge cases block (hyphenation, subtitle/colon, proper nouns/brands).
6. FAQ block (`3-6` FAQs, intent-aligned, non-duplicate).
7. Related links block (minimum `3` internal links out).

## Content Rules
- One URL = one primary intent.
- Intro length target: `70-120` words.
- Use one decisive answer sentence in first `160` characters.
- Include at least `5` concrete examples.
- Include at least `1` style comparison row when guides differ.
- Keep paragraphs short (`2-4` lines).
- Avoid filler or generic history content.

## Metadata Rules
- Title: unique, intent-first, `50-65` chars.
- Meta description: unique, answer-focused, `140-160` chars.
- Canonical: self-referencing.
- Include FAQ JSON-LD only when FAQ section exists on page.

## Internal Linking Rules
- Minimum `3 in / 3 out` for each published page.
- At least one link to the main converter (`/`).
- At least one link to closely related rule page in same cluster.
- Anchor text should describe intent (not generic `click here`).

## Quality Gate (Must Pass)
- Answer appears before fold and is unambiguous.
- Examples are valid and match selected style logic.
- Metadata is unique and mapped to page intent.
- No near-duplicate copy vs sibling pages.
- Human editorial review >= `45` minutes logged.

## Definition of Done (`P0-05`)
- Template is used as the default for all new `Is X` pages.
- Any deviation from template must be explicitly justified in PR/release notes.
