---
title: Good Test Properties (UMRANGS+F)
type: concept
tags: [tests, quality, properties, dave-farley, f.i.r.s.t., tdd]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/clean-code-robert-martin.md, "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

The properties that define a high-quality automated test. Farley identifies eight dimensions; Martin's F.I.R.S.T. is a related formulation. [Test First](test-first.md) development naturally produces tests with superior scores across all these dimensions vs. test-after unit testing.

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
The most important dimension — the distinguishing characteristic of TDD vs. unit testing. Writing the test first changes the design of both the test and the code. See [Test First](test-first.md).

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

[Gerard Meszaros](../entities/gerard-meszaros.md) frames test quality as a set of goals in [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md):

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

## Khorikov's Four Pillars — Cross-Framework Mapping

Khorikov's [four pillars of a good test](four-pillars-of-good-tests.md) offer a complementary analytical lens. Rather than re-explain them here (see the [dedicated page](four-pillars-of-good-tests.md) for the full framework, trade-offs, and context-specific guidance), the unique value of this page is showing how the frameworks map onto each other.

### Mapping Between Frameworks

| Khorikov Pillar | UMRANGS+F Equivalent | F.I.R.S.T. Equivalent | Meszaros Goal |
|---|---|---|---|
| Protection against regressions | Necessary, Granular | Self-Validating | Bug Repellent, Safety Net |
| Resistance to refactoring | Maintainable, Understandable | Independent | Robust Test |
| Fast feedback | Fast | Fast | No Harm |
| Maintainability | Understandable | — | Simple Test, Expressive Tests |

### How These Frameworks Differ

The mapping above is approximate — the concepts rhyme but are not identical.

The clearest divergence is around **maintainability**. Farley's "Maintainable" is about *test-to-production coupling*: a maintainable test breaks only when requirements change, not when you refactor internals. Khorikov's "Maintainability" is about *test code quality*: how small the test is, how few assertions it contains, and how expensive its out-of-process dependencies are to operate. Both matter, but they diagnose different problems. A test can be perfectly decoupled from implementation (Farley-maintainable) yet still be a 200-line setup nightmare (Khorikov-unmaintainable), or vice versa.

Similarly, Farley's "Necessary" means every test must *demand* production code — a TDD-rooted idea. Khorikov's "Protection against regressions" is outcome-focused: how much complex, domain-significant code does the test actually exercise? A test can be necessary (it drove a design decision) yet provide weak regression protection if it only covers trivial logic.

Finally, UMRANGS+F and F.I.R.S.T. treat their properties as a checklist of desirable qualities, while Khorikov models the first three pillars as a **zero-sum trade-off** — you cannot maximize all three simultaneously. This trade-off analysis is the four pillars framework's distinctive contribution.

## Related Pages

- [Test First](test-first.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
- [TDD Smells](tdd-smells.md)
- [Test Smells Catalog](test-smells-catalog.md)
- [Mocking](mocking.md)
- [Dependency Injection](dependency-injection.md)
- [Four-Phase Test](four-phase-test.md)
- [The Art of Clean Code](../sources/art-of-clean-code-mayer.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Clean Code](../sources/clean-code-robert-martin.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
- [Four Pillars of a Good Test](four-pillars-of-good-tests.md)
- [Test Fragility](test-fragility.md)
- [Unit Testing (Khorikov)](../sources/unit-testing-khorikov.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
- [Mutation Testing](mutation-testing.md) -- validates test quality by measuring whether tests actually detect injected faults
