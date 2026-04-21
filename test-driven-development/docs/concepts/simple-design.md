---
title: Simple Design (Four Rules)
type: concept
tags: [design, xp, tdd, coupling, cohesion, tidying]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/Tidy First.md]
---

Simple Design refers to Kent Beck's Four Rules of Simple Design from Extreme Programming: code that (1) passes all tests, (2) reveals intention, (3) has no duplication, and (4) has the fewest elements. TDD naturally drives toward simple design by preventing over-engineering and continuously removing duplication.

## The Four Rules (in priority order)

1. **Passes all the tests** — correctness is non-negotiable; this is what TDD guarantees
2. **Reveals intention** — code communicates its purpose clearly to readers
3. **No duplication** — every piece of knowledge has a single, unambiguous representation (DRY)
4. **Fewest elements** — remove anything that doesn't serve the first three rules

The rules are ordered by priority. You never sacrifice correctness for clarity, or clarity for DRY, or DRY for minimalism.

## Connection to TDD

TDD produces simple design through mechanical pressure:

### Rule 1: Tests Pass
The red-green-refactor cycle ensures tests always pass after the green step. You cannot proceed without correctness.

### Rule 2: Reveals Intention
Writing the test first forces you to name things from the caller's perspective. Test names document intent. The refactor step improves clarity.

### Rule 3: No Duplication
The refactor step in [[red-green-refactor]] specifically targets duplication. Beck's "fake it 'til you make it" technique introduces duplication deliberately in green, then removes it in refactor — making duplication visible and forcing its removal.

### Rule 4: Fewest Elements
TDD's YAGNI discipline (You Aren't Gonna Need It) prevents adding unused classes, methods, or abstractions. You only write code that a test demands.

## Origins

[[kent-beck]] introduced the rules in the context of [[extreme-programming]]. Ward Cunningham influenced the thinking — the concept connects to his idea of paying down technical debt and keeping code in a state where change is easy.

## Martin Fowler's "Is Design Dead?"

Fowler's 2004 essay addressed the concern that XP/TDD meant abandoning design. His conclusion: design isn't dead, but it shifts from up-front prediction to continuous evolutionary improvement. Simple Design + [[refactoring]] + TDD enables this evolutionary approach:

- You don't need to predict future requirements
- You design for today's needs
- Refactoring keeps the design clean as requirements evolve
- Tests give you the courage to change the design later

## Relationship to YAGNI

YAGNI (You Aren't Gonna Need It) is the XP principle that reinforces Rule 4. Don't add functionality until a test demands it. In TDD:

- No test = no code
- No failing test = no new production code
- The simplest thing that passes = no over-engineering

YAGNI is often misunderstood as "don't think about design." The correct interpretation: don't *implement* features you don't need yet, but *do* keep the design clean enough that adding them later is easy.

## J.B. Rainsberger's Interpretation

Rainsberger simplified the four rules to two: "Remove duplication and improve names." His argument: if you relentlessly remove duplication and name things clearly, good design emerges naturally. This is the refactor step of TDD distilled to its essence.

## Simple Design vs. Easy Design

Simple design is not the same as easy or obvious design:
- **Easy** = familiar, comfortable, requires little thought
- **Simple** = few concepts, few moving parts, orthogonal components

A design with many small, well-named functions is simpler than a design with one large function — even though the one-function version looks "easier."

## Connection to Tidyings and Coupling Economics

[[kent-beck]]'s [Tidy First?](../sources/tidy-first-kent-beck.md) (2023) provides the economic foundation that Simple Design implicitly assumes. Beck's argument:

### Tidyings as Simple Design in Practice
The [[tidyings]] catalog is Simple Design's four rules made into concrete daily moves:
- **Rule 2 (Reveals intention)** -> Explaining Variables, Explaining Constants, Explaining Comments, Reading Order
- **Rule 3 (No duplication)** -> Normalize Symmetries, Extract Helper, Cohesion Order
- **Rule 4 (Fewest elements)** -> Dead Code, Delete Redundant Comments, One Pile

Rule 1 (Passes tests) is the prerequisite that makes all tidyings safe.

### Coupling Economics
Beck frames Simple Design's value through [Constantine's Equivalence](coupling-and-cohesion.md): `cost(software) ~= coupling`. The four rules systematically reduce coupling:
- Tests reveal coupling (hard-to-test code is over-coupled)
- Clear intention reduces *cognitive* coupling (readers don't need external context)
- No duplication eliminates *change* coupling (change one place, not two)
- Fewest elements avoids *structural* coupling (fewer relationships to maintain)

### Optionality
Simple Design creates *options* in the financial sense. A system that follows the four rules is cheap to change in any direction, which makes every possible future behavior change more valuable — even before you know which changes will be needed. In volatile environments, this optionality dominates the time-value argument for shipping features faster.

## Related Pages

- [[extreme-programming]]
- [[red-green-refactor]]
- [[refactoring]]
- [[kent-beck]]
- [[tdd-by-example-kent-beck]]
- [[tidy-first-kent-beck]]
- [[tidyings]]
- [[coupling-and-cohesion]]
- [[solid-principles]]
- [[good-test-properties]]
