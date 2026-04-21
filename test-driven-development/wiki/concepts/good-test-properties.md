---
title: Good Test Properties (UMRANGS+F)
type: concept
tags: [tests, quality, properties, dave-farley, f.i.r.s.t., tdd]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/clean-code-robert-martin.md, "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

The properties that define a high-quality automated test. Farley identifies eight dimensions; Martin's F.I.R.S.T. is a related formulation. [[test-first]] development naturally produces tests with superior scores across all these dimensions vs. test-after unit testing.

## Farley's Eight Properties (UMRANGS+F)

### Understandable
Tests should describe what they are testing so we can understand the goals of our software. Focused on the behavior of the system, not a specific implementation. A test is an executable specification — it should read like one.

**TDD advantage:** Writing the test first forces you to think about what you actually want. Tests describe desired behavior, not how implementation works.

### Maintainable
Tests should act as a defense of our system — breaking when we want them to, remaining true as we change the system. Tests that are tightly coupled to implementation break on legitimate refactoring and no longer defend the system.

**TDD advantage:** Tests written first are loosely coupled because the implementation doesn't exist yet. They become executable specifications — they change only when requirements change.

### Repeatable
Tests should always pass or fail in the same way for a given version of the software. Independent of external state, time, network, other tests, or execution order.

**TDD advantage:** The isolation pressure of test-first pushes you to fake dependencies (dependency injection, mocks). Fewer shared resources → more consistent results.

### Atomic
Tests should be isolated and focus on a single outcome. No side effects. Independent of other tests. This allows parallel execution.

**TDD advantage:** Writing test-first naturally keeps tests small. Giant tests with many assertions don't arise organically in TDD.

### Necessary
Tests should help guide development choices. Don't create tests "for test sake." Only create tests that demand production code.

**TDD advantage:** If you only write code when a failing test demands it, every test is necessary by definition. You may still miss test cases (missed requirements), but no test is unnecessary.

### Granular
Tests should be small, simple, and focused; assert a single outcome. Clear pass/fail without interpretation. When a test fails, you know exactly what broke and why.

**TDD advantage:** Each test demands only the minimum code needed to pass, so granularity is built in.

### Fast
Tests are used as a development tool — run after every change, potentially thousands of times per day. Slow tests interrupt flow and reduce frequency of running.

**TDD advantage:** Isolation pressure (needed for Repeatable/Atomic) eliminates real I/O. No real databases, files, network. Tests run in milliseconds, not seconds.

### First (written before code)
The most important dimension — the distinguishing characteristic of TDD vs. unit testing. Writing the test first changes the design of both the test and the code. See [[test-first]].

## F.I.R.S.T. (Robert Martin)

Clean Code's formulation:
- **Fast** — tests must run quickly
- **Independent** — tests must not depend on each other
- **Repeatable** — tests must work in any environment
- **Self-Validating** — tests must return a boolean pass/fail
- **Timely** — tests must be written just before production code

## How TDD Produces Better Tests

The key insight: the properties that make code *testable* are exactly the same properties that make code *high quality*:
- Modular → testable (need boundaries)
- Loosely coupled → testable (need isolation)
- Cohesive → testable (avoid assembling many pieces for one test)
- Separation of concerns → testable (focused, well-bounded units)
- Information hiding → testable (test outcomes not implementation)

Therefore, forcing testability forces quality. TDD is a talent amplifier.

## The 60% Statistic

> "Nearly sixty percent of production outages could have been cured by simple tests that validated that the code did what the developers thought the code did." — Dave Farley

This is the cost of missing simple, granular, fast test coverage.

## Meszaros's Goals of Test Automation

[[gerard-meszaros]] frames test quality as a set of goals in [[xunit-test-patterns-meszaros|xUnit Test Patterns]]:

**Project Goals:**
- Tests as Specification — executable definition of behavior
- Tests as Documentation — readable description of what the SUT does
- Tests as Safety Net — catch regressions early (Bug Repellent)
- Defect Localization — when a test fails, you know exactly what broke
- No Harm — tests must not introduce risk or slow the team down

**Test Writing Goals:**
- Fully Automated and Self-Checking
- Repeatable Test — same result every time
- Robust Test — doesn't break for irrelevant reasons
- Simple Test — easy to understand
- Expressive Tests — communicate intent clearly
- Separation of Concerns — each test focuses on one thing

These goals complement Farley's UMRANGS+F and Martin's F.I.R.S.T. with a more systematic framework that connects quality properties to the patterns that achieve them and the smells that indicate violations.

## Khorikov's Four Pillars (Alternative Framework)

[[vladimir-khorikov]] offers a different analytical framework in [Unit Testing: Principles, Practices, and Patterns](../sources/unit-testing-khorikov.md) — the [[four-pillars-of-good-tests|four pillars of a good test]]:

1. **Protection against regressions** — how well the test catches bugs
2. **Resistance to refactoring** — how few false positives (false alarms) the test produces
3. **Fast feedback** — how quickly the test executes
4. **Maintainability** — how easy the test is to understand and run

The key insight that distinguishes this from other frameworks: the test's value is the **product** of its scores. Zero in any pillar means zero value. Furthermore, the first three pillars are **mutually exclusive** — you can maximize only two at the expense of the third.

Khorikov argues that **resistance to refactoring is non-negotiable** because it is mostly binary (a test either couples to implementation details or it doesn't). The practical trade-off therefore reduces to choosing between protection against regressions and fast feedback — which is exactly what the Test Pyramid encodes.

### Mapping Between Frameworks

| Khorikov Pillar | UMRANGS+F Equivalent | F.I.R.S.T. Equivalent | Meszaros Goal |
|---|---|---|---|
| Protection against regressions | Necessary, Granular | Self-Validating | Bug Repellent, Safety Net |
| Resistance to refactoring | Maintainable, Understandable | Independent | Robust Test |
| Fast feedback | Fast | Fast | No Harm |
| Maintainability | Understandable | — | Simple Test, Expressive Tests |

The four pillars framework is more analytical: it explicitly models the trade-offs between dimensions and explains *why* you can't have it all, rather than listing desirable properties.

## Related Pages

- [[test-first]]
- [[tdd-vs-unit-testing]]
- [[tdd-smells]]
- [[test-smells-catalog]]
- [[mocking]]
- [[dependency-injection]]
- [[four-phase-test]]
- [[art-of-clean-code-mayer]]
- [[dave-farley-302-course]]
- [[clean-code-robert-martin]]
- [[xunit-test-patterns-meszaros]]
- [[four-pillars-of-good-tests]]
- [[test-fragility]]
- [[unit-testing-khorikov]]
- [[vladimir-khorikov]]
- [[mutation-testing]] -- validates test quality by measuring whether tests actually detect injected faults
