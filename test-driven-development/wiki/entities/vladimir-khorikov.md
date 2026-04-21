---
title: Vladimir Khorikov
type: entity
tags: [author, unit-testing, testing]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

Software engineer, Microsoft MVP, and Pluralsight author. Author of *Unit Testing: Principles, Practices, and Patterns* (Manning, 2020), a rigorous treatment of unit testing that introduces the four pillars framework and takes a clear stance in the classical vs mockist debate.

## Key Contributions

- **[Four Pillars of a Good Test](../concepts/four-pillars-of-good-tests.md)** — A universal evaluation framework: Protection against regressions, Resistance to refactoring, Fast feedback, Maintainability. The test's value is the product of its scores; zero in any pillar means zero value.
- **[Testing Styles Taxonomy](../concepts/output-vs-state-vs-communication-testing.md)** — Classified unit testing into output-based (best), state-based, and communication-based (worst), ranked using the four pillars.
- **[Test Fragility Analysis](../concepts/test-fragility.md)** — Identified coupling to implementation details as the sole cause of false positives, and resistance to refactoring as the non-negotiable pillar.
- **Mocking philosophy** — Only mock unmanaged dependencies whose side effects are visible externally. Intra-system communications are implementation details and should not be mocked. See [[mocking]].
- **Classical school advocacy** — Explicitly favors the Chicago/classical school over the London/mockist school, arguing that ubiquitous mocking destroys resistance to refactoring. See [[chicago-vs-london]].
- **Four types of code** — Categorizes code by complexity/domain significance vs number of collaborators, producing four quadrants: domain model (unit test), controllers (integration test), trivial code (don't test), overcomplicated code (refactor).
- **Generalized [Humble Object](../concepts/humble-object.md)** — Extended the pattern beyond Meszaros's original scope, identifying it as the unifying principle behind hexagonal architecture, functional architecture, MVC/MVP, and DDD aggregates.

## Background

- Blog: EnterpriseCraftsmanship.com
- Pluralsight author with courses on unit testing, DDD, and functional programming in C#
- Mathematical background; emphasizes deriving guidelines from first principles
- Works primarily in C# but frames ideas as language-agnostic

## Positions in Key Debates

| Debate | Khorikov's Position |
|---|---|
| Chicago vs London school | Strongly favors classical/Chicago |
| When to mock | Only unmanaged out-of-process dependencies |
| Coverage metrics as targets | Against — they encourage testing implementation details |
| Testing private methods | Against — signals poor design; extract and test through public API |
| In-memory database substitutes | Against — use real managed dependencies or skip integration tests entirely |

## Related Pages

- [[unit-testing-khorikov]]
- [[four-pillars-of-good-tests]]
- [[test-fragility]]
- [[output-vs-state-vs-communication-testing]]
- [[chicago-vs-london]]
- [[mocking]]
- [[humble-object]]
- [[gerard-meszaros]]
- [[kent-beck]]
