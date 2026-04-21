---
title: Red-Green-Refactor
type: concept
tags: [tdd, core-cycle, process, kent-beck, dave-farley]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

The core TDD cycle: write a failing test (Red), make it pass minimally (Green), then improve the code (Refactor). The "mantra" of TDD according to [Kent Beck](../entities/kent-beck.md).

## The Three Steps

### RED — Write a Failing Test
Write a test before any production code exists. Run it and see it fail. This step:

- Forces you to think about what you actually want the code to do
- Designs the public interface from the consumer's perspective
- Verifies that the test infrastructure works
- Tests the test itself (a passing test that was never red may not be asserting anything)
- Acts as a mini experiment in interface design: if the test is painful to write, the interface design is poor

**Mindset:** Focus exclusively on (1) the desired behavioral outcome and (2) the ideal public interface design. Do not think about implementation yet.

### GREEN — Make It Pass (Simply)
Write the minimum code to make the test pass — even if it means hard-coding return values or making naive assumptions.

> "Make the test work quickly, committing whatever sins necessary in the process." — Kent Beck

**Why dumb code is okay here:** The system is in an unstable state. The single goal is to return to stability. Elegant code comes in Refactor. Hard-coded returns ("fake it 'til you make it") are a legitimate step — Beck calls this the "Fake It" pattern (Beck, [TDD by Example](../sources/tdd-by-example-kent-beck.md), Ch. 1).

**Mindset:** Single-minded path to passing the test. Fastest route to green.

### REFACTOR — Improve Without Changing Behavior
With the test passing, improve both the code and the test. Refactoring is specifically a **behavior-preserving change**.

> "If it changes the behavior of your system, it wasn't refactoring."

Goals:

- Eliminate duplication introduced in Green
- Make code simpler, more readable, more concise, more general
- Improve modularity, cohesion, separation of concerns
- Keep both code and test as expressive as possible

Work in tiny steps. Run tests after each micro-change. Experts take smaller steps than beginners — this is the key distinguishing characteristic (Farley, [302 Course](../sources/dave-farley-302-course.md)).

**Rule:** Always refactor on Green, never on Red (Beck, [TDD by Example](../sources/tdd-by-example-kent-beck.md); Farley, [302 Course](../sources/dave-farley-302-course.md)). If you notice a refactoring opportunity while writing a new test, pause the new test, do the refactoring while passing tests hold, then re-enable the new failing test.

## Commit Point

The end of a complete red-green-refactor cycle is the ideal time to commit. The code is stable, tests pass, and the change is coherent.

## The Ratchet Metaphor (Beck)

Tests are the teeth of a ratchet. Once a test works, it is always working. Each passing test is one step closer to having everything work. The harder the problem, the finer the teeth (smaller steps) should be.

## Relationship to Design Quality

The refactor step is where the [Modern Software Engineering](../sources/modern-software-engineering-dave-farley.md) design principles get applied:

- Modularity
- Cohesion
- Separation of Concerns
- Abstraction / Information Hiding
- Loose Coupling

## Common Mistakes

- Skipping red (writing code first, then writing tests to pass it — not TDD)
- Staying in green too long (not refactoring)
- Refactoring on red (risky; unclear which breakage came from where)
- Taking too large steps in green (over-designing during the unstable phase)

See also [TDD Smells](tdd-smells.md) for anti-patterns.

## Related Pages

- [Test First](test-first.md)
- [Refactoring](refactoring.md)
- [TDD Smells](tdd-smells.md)
- [Good Test Properties](good-test-properties.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
- [TDD Empirical Evidence](tdd-empirical-evidence.md) -- empirical research on TDD effectiveness; the cycle's granularity is a key finding
- [TDD Process Granularity](tdd-process-granularity.md) -- Fucci et al.'s evidence that cycle size matters more than strict ordering
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Simple Design](simple-design.md)
- [Pair Programming](pair-programming.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
