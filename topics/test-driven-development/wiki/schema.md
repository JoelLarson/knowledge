---
title: Wiki Schema & Conventions
type: overview
tags: [meta, schema]
created: 2026-04-19
updated: 2026-04-19
sources: []
---

# Wiki Schema & Conventions

This wiki captures knowledge about **test-driven development (TDD)** — practices, patterns, tools, and theory. Sources in `raw/` are ingested once and compiled into persistent, interlinked pages.

## Directory layout

```
raw/                    # Immutable source documents (never modify)
wiki/
├── index.md            # Content catalog — every page with link + summary
├── log.md              # Append-only chronological record of all operations
├── schema.md           # This file — wiki conventions
├── overview.md         # High-level synthesis across all sources
├── concepts/           # Concept pages (e.g., concepts/red-green-refactor.md)
├── entities/           # Entity pages (e.g., entities/junit.md)
├── sources/            # One summary page per ingested raw source
└── queries/            # Filed query results worth preserving
```

## Page frontmatter

Every page must have YAML frontmatter:

```yaml
---
title: Page Title
type: concept | entity | source | query | overview
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [raw/filename.md]
---
```

## Cross-references

- Use standard markdown links for internal cross-references: `[Display Text](relative-path/page-name.md)`.
- Use relative paths from the current file's directory (e.g., `../concepts/foo.md` from an entity page to a concept page, or `bar.md` between pages in the same directory).
- Start every page with a 1-2 sentence summary before deeper content.
- Cite ingested sources as `[source title](../sources/name.md)`.

## Index format

`index.md` is organized by category. Each entry:
```
- [Page Title](path/to/page.md) — one-line summary (N sources, YYYY-MM-DD)
```

## Log format

`log.md` is append-only. Each entry header:
```
## [YYYY-MM-DD] operation | Title
```

Parseable with: `grep "^## \[" wiki/log.md`

## Tagging conventions

| Tag | Used for |
|-----|----------|
| `tdd` | Core TDD concepts |
| `testing` | General testing practices |
| `refactoring` | Refactoring techniques |
| `design` | Software design principles |
| `tool` | Testing frameworks and tools |
| `pattern` | Recurring patterns |
| `anti-pattern` | Things to avoid |
| `process` | Workflow and process concepts |
