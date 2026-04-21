---
title: Test First
type: concept
tags: [tdd, test-first, design, specification, kent-beck]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/clean-code-robert-martin.md]
---

The discipline of writing an automated test before writing any production code. The "T" (Timely) in F.I.R.S.T. and the distinguishing characteristic separating TDD from unit testing.

## Core Idea

You may not write any production code until you have a failing automated test that demands it. This is Beck's first rule of TDD. Robert Martin's Three Laws of TDD formalize this:

1. You may not write production code until you have written a failing unit test.
2. You may not write more of a unit test than is sufficient to fail (not compiling = failing).
3. You may not write more production code than is sufficient to pass the currently failing test.

## Why Test First Matters

Writing tests before code is not just procedure — it fundamentally changes what tests test and how code is designed.

### Design from the Outside In
When you write the test first, you have no code yet. This forces you to think from the perspective of a consumer of the code. The test specifies the interface, not the implementation. This leads to:
- Better-named APIs
- Simpler interfaces
- Fewer unnecessary parameters
- More discoverable behavior

### Better Tests
Tests written first are structurally different from tests written after:

| Property | Test First | Test After |
|----------|-----------|------------|
| **Understandable** | Focused on behavior, not implementation | Led by implementation, often opaque |
| **Maintainable** | Loosely coupled — survives refactoring | Tightly coupled — breaks on refactoring |
| **Atomic** | One outcome per test (naturally) | Often multiple assertions, complex setup |
| **Necessary** | Every test demands production code | Tests focus on what was already coded |
| **Fast** | Isolation pressure → no real I/O | Often hit real files, databases, services |

See [Good Test Properties](good-test-properties.md) for full treatment.

### Test as Specification
A test written first is an executable specification. It documents what the code should do from a user's perspective. The code may change; the specification changes only when requirements change.

### Double-Entry Bookkeeping
[Dave Farley](../entities/dave-farley.md) draws the analogy: a test and its implementation are two independent paths to the same answer. If both agree (test passes), confidence is high. Without this, the programmer is "only guessing, however good they are."

## Test First vs. Test Coverage
Coverage is a result of test-first development, not a target:

> "If you don't write a line of code until you've got a failing test, you're going to have great coverage. But coverage is a lousy target to chase." — Dave Farley

Teams that chase coverage as a metric often produce tests with no assertions ("liars"). See [TDD Smells](tdd-smells.md).

## Test First and Courage (Beck)
TDD is a way of managing fear. Fear of complex problems makes programmers tentative, uncommunicative, avoidant of feedback. Test-first development converts:
- Tentativeness → concrete learning quickly
- Clamming up → clearer communication
- Avoiding feedback → seeking helpful feedback

## Robert Martin's Three Laws
The strongest formulation of test-first:
1. No production code without a failing test
2. Write only enough test code to fail
3. Write only enough production code to pass

This creates a tight cycle: seconds between each law, not minutes or hours.

## Empirical Evidence on Test-First Ordering

Fucci et al. 2017 found that strict test-first sequencing was **not a significant predictor** of quality or productivity in their regression models. The granularity and uniformity of cycles mattered more. This challenges the dogma that the test must come literally before the code -- the discipline of small, consistent cycles may be the actual mechanism. See [TDD Process Granularity](tdd-process-granularity.md) for the full treatment and [TDD Empirical Evidence](tdd-empirical-evidence.md) for the broader research synthesis.

This does not invalidate test-first as a practice. Test-first may provide long-term benefits (requirements discovery, design formalization, courage) that short-term studies cannot capture. But it suggests that teams struggling with strict test-first should focus on step size rather than ordering.

## Related Pages

- [Red-Green-Refactor](red-green-refactor.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
- [Good Test Properties](good-test-properties.md)
- [TDD Empirical Evidence](tdd-empirical-evidence.md) -- what the research actually says about TDD effectiveness
- [TDD Process Granularity](tdd-process-granularity.md) -- Fucci et al.'s finding that cycle granularity trumps sequencing
- [BDD](bdd.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Clean Code](../sources/clean-code-robert-martin.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Mutation Testing](mutation-testing.md) -- verifies that tests written first actually catch regressions by injecting faults
