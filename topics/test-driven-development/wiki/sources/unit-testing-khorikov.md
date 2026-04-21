---
title: "Unit Testing: Principles, Practices, and Patterns — Vladimir Khorikov"
type: source
tags: [testing, unit-testing, test-quality, mocking, integration-testing]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

A rigorous, first-principles treatment of unit testing that introduces the four pillars of a good test as a universal evaluation framework, takes a clear stance favoring the classical (Chicago) school over the London school, and provides a taxonomy of testing styles (output-based, state-based, communication-based) ranked by quality.

## Publication Details

- **ISBN-13:** 9781617296277
- **Publisher:** Manning
- **Buy from publisher:** [Manning](https://www.manning.com/books/unit-testing)

## Book Structure

The book is organized into four parts across 11 chapters:

**Part 1 — The Bigger Picture (Ch 1-3):** Defines the goal of unit testing (enabling sustainable project growth), explores the two schools of unit testing (classical vs London), and covers test anatomy (AAA pattern, naming, parameterized tests).

**Part 2 — Making Your Tests Work for You (Ch 4-7):** The core of the book. Introduces the [four pillars framework](../concepts/four-pillars-of-good-tests.md), analyzes [mocks and test fragility](../concepts/mocking.md), compares the [three styles of unit testing](../concepts/output-vs-state-vs-communication-testing.md), and shows how to refactor toward valuable tests using the [Humble Object pattern](../concepts/humble-object.md).

**Part 3 — Integration Testing (Ch 8-10):** Defines [integration tests](../concepts/integration-testing.md) as anything that is not a unit test, introduces the managed vs unmanaged dependency distinction, covers mocking best practices, and addresses database testing.

**Part 4 — Unit Testing Anti-Patterns (Ch 11):** Covers common anti-patterns including testing private methods, exposing private state, leaking domain knowledge to tests, code pollution, and mocking concrete classes.

## Key Contributions

### The Four Pillars of a Good Unit Test

Khorikov's central framework. Every test can be evaluated on four attributes, and the test's value is the *product* of its scores (zero in any one attribute means zero overall value):

1. **Protection against regressions** — how well the test catches bugs
2. **Resistance to refactoring** — how few false positives (false alarms) the test produces
3. **Fast feedback** — how quickly the test executes
4. **Maintainability** — how easy the test is to understand and run

The first three are mutually exclusive: you can maximize only two at the expense of the third. Resistance to refactoring is non-negotiable (it is mostly binary), so the real trade-off is between protection against regressions and fast feedback. See [Four Pillars of a Good Test](../concepts/four-pillars-of-good-tests.md) for details.

### Classical vs London School Stance

Khorikov explicitly favors the classical (Chicago) school over the London (mockist) school. His argument:

- The London school encourages mocking all dependencies except immutable ones, which does not distinguish intra-system from inter-system communications
- This leads to tests coupled to implementation details, which produces false positives and destroys resistance to refactoring
- The classical school only substitutes shared dependencies (usually out-of-process), preserving resistance to refactoring

See [Chicago vs. London Schools](../concepts/chicago-vs-london.md) for the broader debate.

### Mocking Philosophy: Only Mock Unmanaged Dependencies

Khorikov's mocking rule is precise and nuanced:

- **Mocks are for outcoming interactions** (commands/side effects); **stubs are for incoming interactions** (queries/data retrieval)
- **Never assert interactions with stubs** — this is overspecification
- **Intra-system communications are implementation details** — mocking them causes fragility
- **Inter-system communications are observable behavior** — mocking them is legitimate
- **Managed dependencies** (e.g., your application's own database) should use real instances in tests
- **Unmanaged dependencies** (e.g., SMTP servers, message buses) should be replaced with mocks

This leads to his key rule: **only mock unmanaged dependencies** whose side effects are visible to the external world. See [Mocking](../concepts/mocking.md) for the broader concept.

### Testing Styles Taxonomy

Khorikov classifies unit testing into three styles, ranked by quality:

1. **Output-based** (best) — verify the return value of a pure function; no side effects; most maintainable and resistant to refactoring
2. **State-based** (second) — verify the state of the SUT after an operation; more coupling surface than output-based
3. **Communication-based** (worst) — verify interactions via mocks; highest maintenance cost and most prone to false positives

The classical school prefers state-based; the London school prefers communication-based; both use output-based. To get more output-based tests, push code toward functional architecture. See [Output vs State vs Communication Testing](../concepts/output-vs-state-vs-communication-testing.md) for details.

### Test Fragility and False Positives

A central theme: tests that couple to implementation details are fragile. They produce false positives (fail when code is refactored but behavior is unchanged), which erodes trust in the test suite. The only remedy is to test observable behavior, not implementation steps. See [Test Fragility](../concepts/test-fragility.md).

### The Humble Object Pattern for Testability

Khorikov generalizes the [Humble Object pattern](../concepts/humble-object.md) beyond Meszaros's original formulation. He uses it as the unifying principle behind hexagonal architecture, functional architecture, MVC/MVP, and DDD aggregates. The idea: separate business logic (deep, complex code) from orchestration (wide, many-collaborator code). Test the logic; the orchestrator is "humble" and needs only integration tests.

### Four Types of Code

Code is categorized on two axes: complexity/domain significance and number of collaborators:

| | Few collaborators | Many collaborators |
|---|---|---|
| **High complexity** | Domain model / algorithms (unit test these) | Overcomplicated code (refactor away) |
| **Low complexity** | Trivial code (don't test) | Controllers (integration test these) |

### Integration Testing Guidelines

- An integration test is any test that is not a unit test (i.e., doesn't meet all three criteria: single behavior, fast, isolated)
- Use integration tests for one happy path per business scenario plus edge cases not coverable by unit tests
- Use real managed dependencies (databases); mock unmanaged dependencies (SMTP, message bus)
- The Test Pyramid: many unit tests, fewer integration tests, very few end-to-end tests
- For simple CRUD apps, the pyramid may flatten to a rectangle with equal unit and integration tests

## Distinctive Positions

- **Coverage metrics are not goals.** Code coverage and branch coverage are poor proxies for test suite quality. Aiming at a particular coverage number is counterproductive.
- **Code is a liability, not an asset.** More code means more surface for bugs. Tests are code too and must justify their maintenance cost.
- **Black-box when writing, white-box when analyzing.** Write tests as black-box (verify behavior). Analyze coverage gaps using white-box (inspect code paths).
- **Don't test trivial code.** Single-line properties, simple getters — not worth the maintenance cost.
- **Preconditions with domain significance should be tested.** Preconditions that are mere implementation guards should not.

## Related Pages

- [Four Pillars of a Good Test](../concepts/four-pillars-of-good-tests.md)
- [Test Fragility](../concepts/test-fragility.md)
- [Output vs State vs Communication Testing](../concepts/output-vs-state-vs-communication-testing.md)
- [Chicago vs. London Schools](../concepts/chicago-vs-london.md)
- [Mocking](../concepts/mocking.md)
- [Humble Object](../concepts/humble-object.md)
- [Integration Testing](../concepts/integration-testing.md)
- [Good Test Properties](../concepts/good-test-properties.md)
- [Test Doubles](../concepts/test-doubles.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
