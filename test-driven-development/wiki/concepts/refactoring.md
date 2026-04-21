---
title: Refactoring
type: concept
tags: [refactoring, design, behavior-preserving, martin-fowler, dave-farley, michael-feathers, kent-beck]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/refactoring-martin-fowler.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/Working.Effectively.with.Legacy.Code.md, raw/Tidy First.md]
---

Refactoring is a behavior-preserving code change: improving the internal structure of code without changing its externally observable behavior. The third step of [Red-Green-Refactor](red-green-refactor.md), and a critical standalone skill.

## Definition

> "A behavior preserving change. If your code does something different after you've refactored it, it wasn't refactoring." — Dave Farley

Refactoring is about reshaping code to be:
- Simpler
- More readable
- More concise
- More general
- Easier to maintain

## Refactoring in the TDD Cycle

In [Red-Green-Refactor](red-green-refactor.md), refactoring is the third and often most undervalued step. It operates on a stable codebase (tests passing), allowing you to:
- Fix the "dumb" shortcuts taken in Green
- Eliminate duplication
- Make code express its intent clearly
- Apply [modern software engineering](../sources/modern-software-engineering-dave-farley.md) design principles

**The passing tests are your safety net.** Make a tiny change, run the tests, confirm nothing broke, make another tiny change.

## The Three Mindsets (Farley)

Red, Green, Refactor require distinct mindsets:
- **Red:** What do I want the code to do? What's the best interface design?
- **Green:** What is the fastest path to passing tests?
- **Refactor:** How can I make this clearer, simpler, more correct?

Never conflate mindsets. Do not try to design beautifully in Green — you're in an unstable state.

## Catalog of Key Refactoring Moves (Fowler)

### Extract Function
Select a block of code and extract it into a named function. The name documents the purpose. This is the foundation of refactoring.

### Inline Function
Replace a function call with its body when the function adds no clarity.

### Extract Variable / Inline Variable
Name a complex expression; or inline a named variable that adds no clarity.

### Split Phase
Separate code that does two distinct things into two functions/phases.

### Replace Conditional with Polymorphism
Replace type-check switch/if-else with polymorphic classes. Used extensively in the [Theatrical Players Kata](../sources/fowler-theatrical-players-kata.md).

### Move Function / Move Field
Move code to the class or module where it belongs conceptually.

### Rename Variable / Function / Class
The most common refactoring. Names are critical to readability.

## Working in Tiny Steps

> "Experts work in tiny steps and confirm their work with the test all of the time." — Dave Farley

Each refactoring step should be as small as possible. Large steps create ambiguity about what broke. Small steps plus test re-runs provide continuous validation.

## Refactoring in Legacy Code

Refactoring is doubly important when working with [Legacy Code](legacy-code.md). The strategy:
1. Establish defensive tests (approval tests or acceptance tests)
2. Use coverage tools to verify coverage of the area you'll touch
3. Remove clutter (dead code, useless comments)
4. Reduce complexity via Extract Function on if/else/loop bodies
5. Compose methods so code tells its own story
6. Work in small safe steps; run tests after every step

### The Strangler Pattern
For large legacy refactoring: introduce an anti-corruption layer around the area to change, write acceptance tests at those boundaries, then replace the internals safely using TDD.

## Separation of Concerns as a Guide

> "Is this trying to do two things or only one? If two, how do you pull them apart?" — Dave Farley

The Single Responsibility Principle guides refactoring: one method does one thing, one class does one thing. This is the most powerful driving force toward readable, clear, concise code.

## Refactoring in Legacy Code: The Feathers Approach

[Michael Feathers](../entities/michael-feathers.md)' [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md) provides a complementary perspective: refactoring code that has **no existing tests**.

### The Core Tension

In greenfield TDD, you refactor with confidence because tests already exist. In legacy code, you must first *create* the safety net. Feathers' approach:

1. Use [Dependency-Breaking Techniques](dependency-breaking-techniques.md) to get code into a test harness (these are themselves refactorings, performed without tests but designed to minimize risk)
2. Write [Characterization Tests](characterization-tests.md) to document current behavior
3. Only then refactor toward better design

### Dependency-Breaking as Refactoring

The 24 [Dependency-Breaking Techniques](dependency-breaking-techniques.md) in Feathers' catalog are technically refactorings — they preserve behavior. But unlike Fowler's refactorings, they are designed to be performed **without tests**. They prioritize safety and conservatism over elegance:

> "They are like the incision points in surgery: There might be a scar left in your code after your work, but everything beneath it can get better."

Examples: Extract Interface, Parameterize Constructor, Subclass and Override Method, Break Out Method Object.

### Scratch Refactoring

A technique for understanding legacy code: refactor freely to learn the structure, then **throw it all away**. The point is comprehension, not improvement. Once you understand the code, you can write proper characterization tests and refactor for real.

### The "Surgery" Mindset

In legacy refactoring, you cannot hold the same aesthetic standards as greenfield work. Accept that:
- Dependencies may break cleanly or leave "scars"
- Some steps temporarily make design uglier
- Beauty comes later, once tests are in place
- Don't let "best" be the enemy of "better"

## Beck's Tidying Framework (Complement to Fowler's Catalog)

[Kent Beck](../entities/kent-beck.md)'s [Tidy First?](../sources/tidy-first-kent-beck.md) (2023) introduces [Tidyings](tidyings.md) — a deliberately small subset of refactorings designed for daily, personal-scale use. Where Fowler's catalog provides comprehensive refactoring *moves*, Beck's tidying catalog provides a decision framework for *when* and *how much* to refactor.

### Tidyings as Gateway Refactorings

Beck calls tidyings "gateway refactorings" — they are intentionally tiny (guard clauses, dead code removal, explaining variables) so that the cost of a wrong decision is near zero. The philosophy: make software design so approachable that it becomes a continuous activity rather than a planned event.

### The "Tidy First?" Decision

Beck adds a timing dimension that Fowler's catalog lacks:
- **Tidy First** — when it pays off immediately in comprehension or cheaper behavior changes
- **Tidy After** — when you'll change this area again soon and it's cheaper to tidy now
- **Tidy Later** — when there's a big batch without immediate payoff (the "Fun List")
- **Never Tidy** — when code will never change again

### Structure vs. Behavior Separation

Beck insists on separate commits for structure changes (tidyings) and behavior changes. This complements Fowler's rule of "don't change behavior while refactoring" with an explicit workflow discipline: separate PRs, separate review cycles.

### Economic Framing

Where Fowler motivates refactoring through code quality and readability, Beck adds an economic argument: structure creates *options* (in the financial sense). Investing in structure is buying options on future behavior changes. The more volatile the environment, the more valuable these options become. See [Coupling and Cohesion](coupling-and-cohesion.md) for Beck's Constantine's Equivalence: `cost(software) ~= coupling`.

## Related Pages

- [Red-Green-Refactor](red-green-refactor.md)
- [Legacy Code](legacy-code.md)
- [Legacy Code Change Algorithm](legacy-code-change-algorithm.md)
- [Characterization Tests](characterization-tests.md)
- [Dependency-Breaking Techniques](dependency-breaking-techniques.md)
- [Seams](seams.md)
- [Approval Testing](approval-testing.md)
- [TDD Smells](tdd-smells.md)
- [Theatrical Players Kata](../sources/fowler-theatrical-players-kata.md)
- [Refactoring (Fowler)](../sources/refactoring-martin-fowler.md)
- [The Art of Clean Code](../sources/art-of-clean-code-mayer.md)
- [Michael Feathers](../entities/michael-feathers.md)
- [Working Effectively with Legacy Code (Feathers)](../sources/working-effectively-legacy-code-feathers.md)
- [Simple Design](simple-design.md)
- [Tidyings](tidyings.md)
- [Tidy First? (Beck)](../sources/tidy-first-kent-beck.md)
- [Coupling and Cohesion](coupling-and-cohesion.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
