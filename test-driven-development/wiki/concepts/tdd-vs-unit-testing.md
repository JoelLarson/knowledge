---
title: TDD vs. Unit Testing
type: concept
tags: [tdd, unit-testing, comparison, dave-farley, test-first]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

TDD and unit testing are not the same thing. Both produce small automated tests, but TDD writes them first and they are structurally superior to tests written after code is complete.

## The Confusion

> "Test driven development is often confused with unit testing, but they're not the same thing." — Dave Farley

The outputs of TDD are things we might call unit tests. But:

- **Unit testing** = testing small pieces of code (often after writing them)
- **TDD** = using tests to drive design; Red-Green-Refactor; always writing tests before code

Unit testing is a useful practice. TDD is a more specific and more powerful discipline.

## What "Unit" Means in TDD

In classical unit testing, a "unit" is typically a function, method, or class.

In TDD, a "unit" is better thought of as a **unit of behavior** — some observable outcome the software is intended to deliver, at whatever granularity is useful. The unit is behavioral, not structural.

## Why Unit Testing After the Fact Underperforms

Evaluating traditional unit testing against [Good Test Properties](good-test-properties.md):

| Property | Unit Testing After | TDD |
|----------|-------------------|-----|
| **Understandable** | Led by implementation → opaque | Led by behavior → clear |
| **Maintainable** | Coupled to solution → breaks on refactor | Coupled to spec → survives refactor |
| **Repeatable** | Often uses real resources → flaky | Isolation pressure → stable |
| **Atomic** | Often broad, complex setup | Naturally narrow |
| **Necessary** | Tests what was coded, not what was needed | Every test demanded by failing code |
| **Granular** | Tends to grow complex over time | Small by design |
| **Fast** | Real I/O common | Isolation from I/O → fast |

## Coverage Is Not Enough

The most common misapplication of unit testing is measuring coverage. Teams may achieve 80% coverage with tests that have no assertions ("liars"). Coverage is a good byproduct of TDD; it's a poor target.

> "I once consulted for a team... more than a third of their tests had no assertions in them whatsoever." — Dave Farley

See [TDD Smells](tdd-smells.md) (The Liar).

## How TDD Produces Better Designs

Both test-first and test-after produce tests. But test-first also produces better **code**:

The properties that make code testable are the same properties that make code high quality:

- Modular → testable
- Loosely coupled → testable
- Cohesive → testable
- Separation of concerns → testable
- Information hiding → testable

Writing code test-first forces you toward these properties. Writing tests after doesn't.

> "A test driven development system is a much more habitable place." — Dave Farley

## Practical Difference

A unit-tested system: more stable than one with no automated tests.

A TDD system: far more habitable; easier to change; tests stay relevant through refactoring; code design is systematically better.

> "Test driven development allows us to change our code more effectively without invalidating the tests."

## Related Pages

- [Test First](test-first.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Good Test Properties](good-test-properties.md)
- [TDD Empirical Evidence](tdd-empirical-evidence.md) -- empirical research confirms TDD-like practices reduce defects 40-90% vs. traditional development
- [TDD Smells](tdd-smells.md)
- [BDD](bdd.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
