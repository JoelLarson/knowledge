---
title: Wiki Schema
type: overview
tags: [wiki, schema]
created: 2026-04-08
updated: 2026-04-08
sources: []
---

This wiki stores durable GTD knowledge as interlinked markdown pages. It is meant to compound over time rather than be re-derived from scratch on every question.

## Conventions

- `raw/` is immutable source input curated by the user.
- `wiki/sources/` contains one summary page per ingested source.
- `wiki/concepts/` contains topic pages that synthesize across sources.
- `wiki/entities/` contains pages for concrete tools, systems, products, people, or organizations.
- `wiki/queries/` stores reusable synthesized answers worth keeping.
- `wiki/index.md` is the catalog of all active pages.
- `wiki/log.md` is the append-only operation log.

## Page Format

All pages should use YAML frontmatter with:

```yaml
---
title: Page Title
type: concept | entity | source | query | overview
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [raw/filename.ext]
---
```

## Linking

- Use standard markdown links for cross-references between wiki pages.
- Start each page with a short summary.
- Cite source summaries with relative markdown links when useful.

## Scope

This wiki is for domain and research knowledge relevant to GTD practice.

It is not the primary place for source code architecture notes unless they are part of a broader knowledge artifact worth preserving.

## Related Pages

- [Wiki Index](index.md)
- [Overview](overview.md)
- [Wiki Log](log.md)
