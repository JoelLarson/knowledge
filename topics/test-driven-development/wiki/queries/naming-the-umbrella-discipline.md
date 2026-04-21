---
title: "Is TDD the Right Name? Naming the Umbrella Discipline"
type: query
tags: [tdd, bdd, atdd, naming, outside-in, specification, terminology]
created: 2026-04-21
updated: 2026-04-21
sources: []
---

TDD, BDD, and ATDD are often presented as separate methodologies, but they are better understood as the same discipline applied at different levels of granularity. The confusion arises because no single term has won universal adoption for the complete practice.

## The Naming Problem

- **TDD** emphasizes test-first at the unit level, but the word "test" misleads people into thinking about verification rather than specification
- **BDD** was created to fix TDD's vocabulary problem ([Dan North](../entities/dan-north.md)), but got narrowed in popular usage to mean "Cucumber/Gherkin acceptance tooling"
- **ATDD** covers the acceptance/feature level but doesn't name the unit-level practice

## The Complete Practice

The full discipline is a composition of techniques at different levels:

| Level | Term | Question Answered |
|-------|------|-------------------|
| Philosophy | [BDD](../concepts/bdd.md) | What should the system do? |
| Feature level | [ATDD](../concepts/atdd.md) | Does the change do what users need? |
| Development flow | [Outside-In TDD](../concepts/outside-in-tdd.md) | How to drive from acceptance → unit? |
| Unit level | [TDD](../concepts/red-green-refactor.md) with BDD naming | Does the code do what I think? |
| Boundary verification | [Integration testing](../concepts/integration-testing.md) | Do components connect correctly? |
| Decision framework | [Testing pyramid](../guides/choosing-test-levels.md) | Which level for this verification? |

## Candidate Umbrella Terms

- **Outside-In Development / Double-Loop TDD** — describes the workflow (acceptance test drives unit tests inward)
- **Specification by Example** (Gojko Adzic) — captures the idea that tests are executable specifications at all levels
- **Executable Specifications** — [Dave Farley](../entities/dave-farley.md)'s framing: "test is the wrong word, should be specification"
- **Specification-First Development** — names *what* you write (specifications), *when* (first), and implies the behavioral focus
- **BDD (broadly understood)** — what Dan North originally intended, before the term was narrowed

## Why No Single Term Has Won

The practice is a *composition* of techniques at different levels, not a single technique. Each term captures part of the picture. The closest to a unified framework is the acceptance-first workflow described in [Choosing Test Levels](../guides/choosing-test-levels.md):

```
User Story → Acceptance Test (RED) → Unit TDD → Integration Tests → Acceptance Test (GREEN)
```

## Practical Recommendation

For conversation, **"specification-first development"** or **"outside-in specification"** communicates the full intent better than TDD or BDD alone — it names what you write (specifications, not tests), when you write them (first), and which direction work flows (outside in).

Dave Farley's position: all of this is simply *good software engineering* — empirical, feedback-driven, specification-first at every level. The names matter less than the practice.

## Related Pages

- [BDD](../concepts/bdd.md)
- [ATDD](../concepts/atdd.md)
- [Outside-In TDD](../concepts/outside-in-tdd.md)
- [Test First](../concepts/test-first.md)
- [TDD vs. Unit Testing](../concepts/tdd-vs-unit-testing.md)
- [Choosing Test Levels](../guides/choosing-test-levels.md)
- [Integration Testing](../concepts/integration-testing.md)
- [Dan North](../entities/dan-north.md)
- [Dave Farley](../entities/dave-farley.md)
