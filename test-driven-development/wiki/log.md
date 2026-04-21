# Wiki Log

Append-only chronological record of all wiki operations.

---

## [2026-04-19] init | Test-Driven Development Wiki initialized

- Created directory structure: `wiki/`, `raw/`, `wiki/concepts/`, `wiki/entities/`, `wiki/sources/`, `wiki/queries/`
- Wrote `schema.md`, `index.md`, `log.md`, `overview.md`
- No sources in `raw/` at init time — ready for first ingest

## [2026-04-20] ingest | 7 sources (4 books, 1 course, 1 kata, 1 engineering framework)

Sources ingested:

- `raw/tdd-by-example-kent-beck-v2.md` — Kent Beck's foundational TDD text
- `raw/refactoring-martin-fowler.md` — Martin Fowler's Refactoring (2nd ed.)
- `raw/modern-software-engineering-dave-farley.md` — Dave Farley's engineering framework
- `raw/clean-code-robert-martin.md` — Robert Martin's Clean Code
- `raw/art-of-clean-code.md` — Christian Mayer's Art of Clean Code
- `raw/dave-farley-302-tdd-and-bdd-design-through-testing/` — 30+ video lesson transcripts
- `raw/code-samples/fowler-theatrical-players/` — Emily Bache's multi-language refactoring kata

Pages created:

- `sources/` — 7 source summary pages
- `concepts/` — 12 concept pages (red-green-refactor, test-first, good-test-properties, refactoring, bdd, dependency-injection, mocking, tdd-vs-unit-testing, tdd-smells, approval-testing, atdd, legacy-code)
- `entities/` — 6 entity pages (kent-beck, martin-fowler, dave-farley, robert-martin, emily-bache, xunit)
- Updated `overview.md` with full synthesis
- Updated `index.md` with all new pages

## [2026-04-20] lint | Post-ingest health check

Errors fixed:

- `test-first.md` incorrectly claimed F.I.R.S.T. "F" = "First" → corrected to "T" = "Timely"
- `log.md` counted 11 concept pages → corrected to 12
- `schema.md` had broken `[[wikilinks]]` wikilink → rewrote as plain text

Structural fixes:

- `art-of-clean-code-mayer.md` was orphan → added inbound links from `refactoring.md` and `good-test-properties.md`
- `approval-testing.md` → added missing link to `[Emily Bache](entities/emily-bache.md)`

Gaps identified (not yet addressed):

- Missing concept pages: SOLID, XP, Continuous Delivery, Test Doubles, Strangler Pattern, Ports and Adapters, DDD/Ubiquitous Language
- Missing entity pages: Dan North, Michael Feathers
- 12+ missing cross-references across pages (see lint agent report)
- Suggested new sources: _Working Effectively with Legacy Code_ (Feathers), _Growing Object-Oriented Software_ (Freeman/Pryce), _xUnit Test Patterns_ (Meszaros)
- Open questions: Chicago vs. London school TDD, TDD in FP, property-based testing, TDD with AI, mutation testing

## [2026-04-20] expand | 9 new pages filling lint-identified gaps

New concept pages:

- `concepts/solid-principles.md` — SRP, OCP, LSP, ISP, DIP and their relationship to testability
- `concepts/extreme-programming.md` — XP methodology where TDD was born
- `concepts/continuous-delivery.md` — CD as the broader context TDD enables
- `concepts/test-doubles.md` — taxonomy of mocks, stubs, fakes, spies, dummies
- `concepts/strangler-pattern.md` — incremental legacy migration strategy
- `concepts/ports-and-adapters.md` — hexagonal architecture and its test implications
- `concepts/ubiquitous-language.md` — DDD naming principles connected to BDD

New entity pages:

- `entities/dan-north.md` — BDD creator
- `entities/michael-feathers.md` — legacy code definition and techniques

Cross-reference updates across 14 existing pages.
Updated `index.md` with all new pages.

## [2026-04-20] ingest | 5 books (GOOS, Legacy Code, xUnit Patterns, DDD, IDDD)

Sources ingested:

- `raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md` — London school TDD, outside-in, walking skeleton
- `raw/Working.Effectively.with.Legacy.Code.md` — Seams, characterization tests, dependency-breaking techniques
- `raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md` — Test pattern catalog, smell taxonomy, fixture strategies
- `raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md` — Ubiquitous language, bounded contexts, aggregates
- `raw/Implementing Domain-Driven Design.md` — Practical DDD, test-first aggregates, domain events, CQRS/ES

Pages created (30 new):

- `sources/` — 5 source summary pages
- `concepts/` — 20 concept pages (london-school-tdd, walking-skeleton, outside-in-tdd, tell-dont-ask, seams, characterization-tests, legacy-code-change-algorithm, dependency-breaking-techniques, sprout-method, test-smells-catalog, four-phase-test, test-fixture-strategies, sut-and-doc, test-organization-patterns, humble-object, bounded-context, aggregates, domain-events, value-objects, domain-model-testing)
- `entities/` — 5 entity pages (steve-freeman, nat-pryce, gerard-meszaros, eric-evans, vaughn-vernon)

Pages updated (15+):

- `concepts/mocking.md`, `concepts/test-doubles.md`, `concepts/dependency-injection.md`, `concepts/atdd.md`, `concepts/ports-and-adapters.md`, `concepts/legacy-code.md`, `concepts/refactoring.md`, `concepts/tdd-smells.md`, `concepts/good-test-properties.md`, `concepts/ubiquitous-language.md`, `concepts/bdd.md`
- `entities/michael-feathers.md`, `entities/xunit.md`
- `overview.md`, `index.md`

## [2026-04-20] lint | Post-ingest health check (12 sources)

Errors found: 0

Fixes applied:

- 12 files: quoted YAML `sources:` paths containing commas (ambiguous YAML array separators)
- `index.md`: corrected stale source counts on 10 concept entries (e.g., test-doubles 2→7, dependency-injection 1→5)

Structural health:

- No broken wikilinks
- No orphan pages (all 39 concepts + 13 entities have inbound links)
- All pages present in `index.md`
- All frontmatter valid (except meta files index.md/log.md which lack frontmatter by convention)

Gaps identified (not yet addressed):

- Missing concept pages: integration testing (13 mentions), property-based testing (5-6 mentions), simple design, pair programming, parameterized tests
- Missing entity pages: Ward Cunningham, Alistair Cockburn
- Open questions: Chicago vs London school tradeoffs in practice, TDD in functional programming, mutation testing, TDD with AI assistants

## [2026-04-20] expand | 10 new pages filling lint-identified gaps

New concept pages:

- `concepts/integration-testing.md` — Integration vs unit testing, testing pyramid, bounded context boundaries
- `concepts/property-based-testing.md` — Generative testing with invariants; QuickCheck, Hypothesis, fast-check
- `concepts/simple-design.md` — Beck's four rules, YAGNI, "Is Design Dead?"
- `concepts/pair-programming.md` — Driver/navigator, ping-pong pairing with TDD, mob programming
- `concepts/parameterized-tests.md` — Data-driven tests, table-driven patterns, framework support
- `concepts/mutation-testing.md` — Mutant generation, mutation score vs coverage, PIT/Stryker/mutmut
- `concepts/chicago-vs-london.md` — Classical vs mockist TDD schools compared in depth
- `concepts/tdd-in-functional-programming.md` — Pure functions, no mocking, property-based, REPL-driven

New entity pages:

- `entities/ward-cunningham.md` — XP co-creator, wiki inventor, technical debt, CRC cards, FIT
- `entities/alistair-cockburn.md` — Hexagonal Architecture creator, Agile Manifesto co-author

Cross-reference updates across 17 existing pages.
Updated `index.md` with all new pages.
Wiki now has 47 concept pages, 15 entity pages, 12 source pages (74 total).

## [2026-04-20] ingest | 7 sources (3 research papers, Accelerate, Unit Testing, Tidy First, Software Architecture)

Sources ingested:

- `raw/Realizing Quality Improvement Through TDD - Nagappan et al 2008.md` — Microsoft/IBM industrial TDD study
- `raw/Dissection of TDD - Fucci et al 2017.md` — Process granularity vs test-first ordering
- `raw/Why Research on TDD is Inconclusive - Ghafari 2020.md` — Meta-analysis of TDD research methodology
- `raw/Accelerate The Science of Lean Software and DevOps...md` — DORA metrics, delivery performance research
- `raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md` — Four pillars, test fragility, mocking philosophy
- `raw/Tidy First.md` — Beck's tidying catalog, structure/behavior economics
- `raw/Software Architecture_ The Hard Parts.md` — Fitness functions, modularity, coupling analysis

Pages created (22 new):

- `sources/` — 7 source summary pages
- `concepts/` — 11 concept pages (tdd-empirical-evidence, tdd-process-granularity, dora-metrics, test-automation-at-scale, continuous-integration, four-pillars-of-good-tests, test-fragility, output-vs-state-vs-communication-testing, tidyings, fitness-functions, coupling-and-cohesion)
- `entities/` — 4 entity pages (nicole-forsgren, jez-humble, vladimir-khorikov, neal-ford)

Pages updated (19):

- Concepts: red-green-refactor, test-first, tdd-vs-unit-testing, continuous-delivery, integration-testing, chicago-vs-london, mocking, good-test-properties, humble-object, refactoring, simple-design
- Entities: dave-farley, kent-beck
- Meta: overview, index

Wiki now has 58 concept pages, 19 entity pages, 19 source pages (96 total).

## [2026-04-20] lint | Post-ingest health check (19 sources, 96 pages)

Errors fixed:

- `four-pillars-of-good-tests.md`: malformed wikilinks with backslash-pipe (`\|`) → plain `[[wikilink]]` format
- `accelerate-forsgren-humble-kim.md`: case-mismatch wikilinks `[[Continuous-integration]]` → `[Continuous Integration](concepts/continuous-integration.md)`
- `continuous-integration.md`: broken `[[trunk-based-development]]` link → replaced with `[Continuous Delivery](concepts/continuous-delivery.md)`
- `nicole-forsgren.md`: empty sources array → added Accelerate raw source
- `index.md`: corrected overstated source counts (mocking 6→4, test-doubles 7→5, dependency-injection 5→3)

Structural health:

- No orphan pages
- All 96 pages present in index.md
- No unquoted-comma YAML issues

Suggestions (not addressed):

- Missing concept pages: trunk-based-development, technical debt, code coverage, test pyramid
- Open question: TDD with AI assistants

## [2026-04-20] lint | Full health check (19 sources, 96 pages)

Errors fixed:

- `overview.md`: frontmatter `sources` only listed 12 of 19 raw sources → added missing 7 (research papers, Accelerate, Unit Testing, Tidy First, Software Architecture)
- `entities/ward-cunningham.md`: empty `sources` array → added `raw/tdd-by-example-kent-beck-v2.md`

Structural health:

- 0 broken wikilinks in content pages (4 meta-references in log.md/schema.md are documentation examples, not real links)
- 0 orphan pages — all 96 pages have inbound links
- index.md perfectly synchronized with files on disk
- All 96 page frontmatter valid (correct types, dates, fields)
- All 19 raw sources ingested — no uningest backlog
- `unprocessed-books/` contains PDFs matching ingested sources + 1 unidentified file (`books-library.net-07192142Kn9I3.pdf`)

Gaps identified (not yet addressed):

- Missing concept pages for frequently-mentioned terms:
  - **fake** (14 file mentions) — covered within test-doubles.md but no dedicated page
  - **mock object** (13 mentions) — covered within mocking.md but no dedicated page
  - **trunk-based development** (7 mentions) — referenced across CI/CD pages
  - **code coverage** (5 mentions) — referenced in empirical evidence pages
  - **spy** (5 mentions) — covered within test-doubles.md
  - **test pyramid** (4 mentions) — referenced in integration testing and test quality pages
  - **technical debt** (4 mentions) — referenced in Ward Cunningham and simple design pages
  - **code smell** (4 mentions) — referenced in test smells pages
  - **design patterns** (3 mentions) — referenced across pattern pages
- Open question: TDD with AI assistants (still unaddressed)

Suggested new sources to investigate:

- _Test-Driven Development: A Practical Guide_ — David Astels (early TDD practice text)
- _The Art of Unit Testing_ — Roy Osherove (complements Khorikov's perspective)
- _Specification by Example_ — Gojko Adzic (deepens ATDD/BDD coverage)
- _Continuous Delivery_ — Humble & Farley (the CD book itself, not just Accelerate)

Suggested new questions to explore:

- How do the Chicago and London schools perform differently on legacy code vs greenfield?
- What is the relationship between TDD cycle size and developer experience level?
- How should TDD practices adapt for AI-assisted development?
- What is the optimal test pyramid shape for microservices vs monoliths?

## [2026-04-20] refine | Wiki-wide concept refinement (7 priorities)

Changes across 16 files implementing review-identified improvements:

New pages (2):

- `concepts/tdd-adoption-path.md` — phased path from untested legacy to well-tested system (5 phases + pitfalls)
- `concepts/tdd-by-context.md` — domain, language family, and team maturity adaptation guide

Worked code examples added (5 pages, Python):

- `concepts/seams.md` — hardcoded DB call → extracted dependency via object seam
- `concepts/characterization-tests.md` — 4-iteration Feathers algorithm on `compute_price`
- `concepts/aggregates.md` — full Order aggregate with test-first workflow (invariant, event, factory tests)
- `concepts/chicago-vs-london.md` — same order-placing feature implemented both schools
- `concepts/outside-in-tdd.md` — double-loop shopping cart API (1 outer + 3 inner cycles)

Limitations sections added (4 pages):

- `concepts/atdd.md` — infrastructure cost, maintenance burden, CI blocking
- `concepts/walking-skeleton.md` — upfront cost, over-engineering risk
- `concepts/mocking.md` — false confidence, Mockery smell, when integration tests are better
- `concepts/london-school-tdd.md` — fragility, mock maintenance, learning curve

Citations audit (3 pages):

- `concepts/red-green-refactor.md` — attributed "experts take smaller steps," Fake It pattern, refactor-on-green rule
- `concepts/test-first.md` — sourced comparison table and courage framing
- `concepts/bounded-context.md` — distinguished Evans Ch. 14 vs Vernon Part 2 claims

Overlap resolution and tradeoff guidance (3 pages):

- `concepts/london-school-tdd.md` — sharpened to focus on interface discovery workflow; removed duplicate comparison content
- `concepts/four-pillars-of-good-tests.md` — added "Pillar Priorities by Context" table (startup, regulated, legacy, microservices)
- `concepts/good-test-properties.md` — compressed redundant four-pillars recap; added "How These Frameworks Differ" section

Updated `index.md` and `mkdocs.yml` with new pages.
Wiki now has 60 concept pages, 19 entity pages, 19 source pages (98 total).
