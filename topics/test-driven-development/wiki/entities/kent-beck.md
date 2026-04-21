---
title: Kent Beck
type: entity
tags: [kent-beck, tdd, xp, xunit, foundational, tidying, design]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/Tidy First.md]
---

Kent Beck is the primary inventor and proponent of Test-Driven Development, creator of Extreme Programming (XP), and creator of the xUnit testing architecture.

## Key Contributions

- **Test-Driven Development** — defined the red-green-refactor cycle; authored [TDD by Example](../sources/tdd-by-example-kent-beck.md) (2002)
- **Extreme Programming (XP)** — agile methodology; TDD is one of its core practices
- **xUnit architecture** — the testing framework pattern underlying JUnit, NUnit, pytest, and most modern test frameworks
- **[Tidy First?](../sources/tidy-first-kent-beck.md)** (2023) — a catalog of small structural improvements ([Tidyings](../concepts/tidyings.md)) and a decision framework for when to invest in code structure. Connects the refactor step of TDD to economics (discounted cash flows, optionality) and to Yourdon/Constantine's coupling and cohesion theory. First volume in a planned *Empirical Software Design* series.
- **CRC Cards** — technique for collaborative object design
- **[Ward Cunningham](ward-cunningham.md) collaboration** — TDD grew partly from their Smalltalk work together

## Key Ideas

### Two Rules of TDD
1. Write new code only if an automated test has failed.
2. Eliminate duplication.

### Courage
TDD is a way of managing fear during programming. Fear makes programmers tentative and uncommunicative; TDD converts fear into concrete learning.

### "Clean Code That Works"
From Ron Jeffries' phrase — the goal of TDD. "Clean code that works" because:

- It's predictable to develop
- It lets you learn all the lessons the code can teach you
- It improves users' lives
- It lets teammates count on you

### "Test Infected"
Phrase coined by Erich Gamma to describe programmers who, after learning TDD, write more tests earlier and work in smaller steps than they ever dreamed would be sensible.

### Software Design as Beneficially Relating Elements
From *Tidy First?*: software design is *beneficially relating elements*. Designers can only create/delete elements, create/delete relationships, and increase the benefit of a relationship. Structure doesn't affect behavior but determines the cost of future behavior changes.

### Constantine's Equivalence
Beck's formalization: `cost(software) ~= cost(change) ~= cost(big changes) ~= coupling`. The cost of software is approximately equal to its coupling. See [Coupling and Cohesion](../concepts/coupling-and-cohesion.md).

### 3X: Explore/Expand/Extract
A framework for understanding how software development practices should vary across the lifecycle. In Explore mode, speed matters most; in Extract mode, efficiency matters most.

## Sources in this Wiki

- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md) — the foundational TDD text
- [Tidy First? (Beck)](../sources/tidy-first-kent-beck.md) — tidyings catalog, structure/behavior distinction, coupling economics
- [Refactoring (Fowler)](../sources/refactoring-martin-fowler.md) — contributed to; xUnit patterns drawn from Beck's work

## Related Pages

- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Test First](../concepts/test-first.md)
- [xUnit](xunit.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Martin Fowler](martin-fowler.md)
- [Dave Farley](dave-farley.md)
- [Robert C. Martin](robert-martin.md)
- [Ward Cunningham](ward-cunningham.md)
- [Extreme Programming](../concepts/extreme-programming.md)
- [Tidyings](../concepts/tidyings.md)
- [Coupling and Cohesion](../concepts/coupling-and-cohesion.md)
- [Simple Design](../concepts/simple-design.md)
