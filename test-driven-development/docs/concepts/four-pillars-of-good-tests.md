---
title: Four Pillars of a Good Test
type: concept
tags: [testing, test-quality, unit-testing, framework]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

[[vladimir-khorikov]]'s framework for evaluating any automated test. A good test scores well on four attributes; its overall value is the *product* of its scores, so a zero in any one attribute makes the test worthless.

## The Four Pillars

### 1. Protection Against Regressions

How well the test catches bugs when code changes break existing functionality. Determined by:

- The amount of code executed during the test
- The complexity and domain significance of that code
- Whether external libraries and frameworks are included in the test scope

Trivial code (e.g., single-line property accessors) scores low here because there is little room for a mistake. Complex business logic scores high.

### 2. Resistance to Refactoring

How well the test avoids **false positives** (false alarms) — failing when the code is refactored but behavior is unchanged. This is the most important pillar because:

- False positives erode trust in the test suite over time
- Developers stop paying attention to test failures and real bugs slip through
- Teams become afraid to refactor, letting the codebase deteriorate

The sole cause of false positives is **coupling to implementation details**. The remedy is to verify observable behavior (the end result), not the steps the code takes. See [[test-fragility]] for a deeper treatment.

### 3. Fast Feedback

How quickly the test executes. Faster tests can be run more frequently, shortening the feedback loop and reducing the cost of fixing bugs. Slow tests discourage frequent execution and allow bugs to compound.

### 4. Maintainability

How easy the test is to understand and operate. Two components:

- **Readability** — a function of the test's size. Smaller, more focused tests are easier to understand and modify.
- **Operational cost** — a function of out-of-process dependencies. Tests that work with databases, message queues, etc. require keeping those systems running.

## The Impossibility of the Ideal Test

The first three pillars are **mutually exclusive**: you can maximize only two at the expense of the third. This is analogous to the CAP theorem in distributed systems.

| Extreme case | Pillar 1 (Regressions) | Pillar 2 (Refactoring) | Pillar 3 (Feedback) |
|---|---|---|---|
| **End-to-end tests** | High | High | Low |
| **Trivial tests** | Low | High | High |
| **Brittle tests** | High | Low | High |

Maintainability (Pillar 4) is independent of the other three, except that end-to-end tests tend to score low on it due to their size and operational complexity.

## The Non-Negotiable Pillar

**Resistance to refactoring is non-negotiable.** It is mostly a binary property — a test either has it or it doesn't. You cannot "sacrifice a little" resistance to refactoring; you lose it entirely when you couple to implementation details.

Therefore, the practical trade-off reduces to a slider between **protection against regressions** and **fast feedback**:

- **Unit tests** emphasize fast feedback (and still protect against regressions in domain logic)
- **Integration tests** emphasize protection against regressions (across component boundaries)
- **End-to-end tests** maximize regression protection but sacrifice speed

This trade-off is what the [Test Pyramid](integration-testing.md) encodes: many fast unit tests at the base, fewer integration tests in the middle, very few end-to-end tests at the top. All layers should maximize resistance to refactoring.

## The Multiplication Rule

A test's value is the product of all four scores:

```
Value = [0..1] * [0..1] * [0..1] * [0..1]
```

If any attribute is zero, the test provides zero value. This means you cannot ignore any pillar. Set a high threshold and only keep tests that clear it — a small number of highly valuable tests beats a large number of mediocre ones.

## Applying the Framework

Use the four pillars to:

- **Evaluate existing tests** — score each test and decide whether to keep, refactor, or remove it
- **Choose testing strategies** — the pillars explain why the Test Pyramid works and when to deviate from it
- **Analyze testing approaches** — Khorikov uses the framework to evaluate mocking (Ch 5), testing styles (Ch 6), and integration testing (Ch 8)
- **Guide refactoring** — tests with low resistance to refactoring need to be decoupled from implementation details

## Relationship to Other Frameworks

| Framework | Focus | Relationship |
|---|---|---|
| [[good-test-properties]] (UMRANGS+F, Farley) | Eight dimensions of test quality | Complementary; maps roughly to Khorikov's pillars |
| [[good-test-properties]] (F.I.R.S.T., Martin) | Five test properties | Fast/Independent/Repeatable/Self-Validating/Timely |
| [[good-test-properties]] (Meszaros's Goals) | Test automation goals | Safety net, documentation, defect localization |

The four pillars framework is more analytical — it explicitly addresses trade-offs and the impossibility of maximizing all dimensions simultaneously.

## Related Pages

- [[test-fragility]]
- [[output-vs-state-vs-communication-testing]]
- [[good-test-properties]]
- [[integration-testing]]
- [[mocking]]
- [[chicago-vs-london]]
- [[unit-testing-khorikov]]
- [[vladimir-khorikov]]
