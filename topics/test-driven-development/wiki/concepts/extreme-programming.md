---
title: Extreme Programming (XP)
type: concept
tags: [xp, agile, kent-beck, tdd, pair-programming, continuous-integration]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md]
---

Extreme Programming is the agile methodology created by [Kent Beck](../entities/kent-beck.md) (with [Ward Cunningham](../entities/ward-cunningham.md)) in which TDD is a core practice. XP takes proven development practices and pushes them to their logical extremes.

## Core Practices (relevant to TDD)

- **Test-Driven Development** — the practice of writing tests before code; see [Test First](test-first.md)
- **Pair Programming** — two developers at one workstation; Beck wrote TDD by Example imagining pair programming sessions
- **Continuous Integration** — integrate and test multiple times per day; [Dave Farley](../entities/dave-farley.md) extended this into Continuous Delivery
- **Refactoring** — continuously improve code structure; see [Refactoring](refactoring.md)
- **Simple Design** — do the simplest thing that could possibly work
- **Small Releases** — release early and often

## XP and TDD

TDD was born within XP. Beck describes the relationship in TDD by Example:

> "Readers of my book Extreme Programming Explained will notice a difference in tone. XP says, 'Here are things you must be able to do to be prepared to evolve further.' TDD is a little fuzzier. TDD is an awareness of the gap between decision and feedback during programming, and techniques to control that gap."

XP prescribes a set of practices as a package. TDD can be adopted independently (and often is), but within XP it works alongside pair programming, CI, and simple design as a mutually reinforcing system.

## XP Values

1. **Communication** — TDD forces communication through executable specifications
2. **Simplicity** — TDD encourages writing only what's needed (YAGNI)
3. **Feedback** — TDD provides immediate feedback; [Red-Green-Refactor](red-green-refactor.md) is a feedback loop
4. **Courage** — TDD provides the safety net to make bold changes
5. **Respect** — clean, tested code respects teammates and future maintainers

## Simple Design Rules (Beck)

1. Passes all the tests
2. Reveals intention (readable)
3. No duplication (DRY)
4. Fewest elements (classes, methods, etc.)

Rule 1 connects directly to TDD. Rule 3 is what the Refactor step eliminates.

## Related Pages

- [Kent Beck](../entities/kent-beck.md)
- [Ward Cunningham](../entities/ward-cunningham.md)
- [Test First](test-first.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Refactoring](refactoring.md)
- [Simple Design](simple-design.md)
- [Pair Programming](pair-programming.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Continuous Delivery](continuous-delivery.md)
