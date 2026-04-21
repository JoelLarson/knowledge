---
title: Michael Feathers
type: entity
tags: [michael-feathers, legacy-code, working-effectively, characterization-tests, seams]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/Working.Effectively.with.Legacy.Code.md]
---

Michael C. Feathers is a software consultant, author, and pioneer in the field of legacy code rehabilitation. He is the author of _[Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md)_ (2004), the canonical text on getting untested code under test. He worked at Object Mentor alongside [Robert C. Martin](robert-martin.md) and contributed to the broader Clean Code / Agile craftsmanship movement.

## Key Contributions

### _Working Effectively with Legacy Code_ (2004)

Published as part of the Robert C. Martin Series (Prentice Hall). The book provides:

- **The definition of legacy code:** "Code without tests." By this definition, most production code is legacy code.
- **The [Legacy Code Change Algorithm](../concepts/legacy-code-change-algorithm.md)** — a five-step process for making safe changes in legacy systems
- **The [Seam Model](../concepts/seams.md)** — the concept that code has "seams" where behavior can be altered without editing. Types: object seams, link seams, preprocessing seams. The fundamental insight enabling legacy code testing.
- **[Characterization Tests](../concepts/characterization-tests.md)** — tests that document what code actually does (not what it should do), providing a safety net before refactoring
- **Sensing and Separation** — the two reasons to break dependencies: to observe effects (sensing) and to get code running in isolation (separation)
- **[Sprout/Wrap techniques](../concepts/sprout-method.md)** — safe ways to add new tested code to legacy systems without modifying existing untested code
- **[Dependency-Breaking Techniques](../concepts/dependency-breaking-techniques.md)** — a catalog of 24 techniques for making code testable, designed to be performed without tests

### Philosophical Contributions

- **The Legacy Code Dilemma:** "When we change code, we should have tests in place. To put tests in place, we often have to change code."
- **The Surgery Metaphor:** Dependency breaking is like surgery — incisions may leave scars, but what's beneath can heal.
- **Cover and Modify vs. Edit and Pray:** Two paradigms for changing code. Tests serve as a "software vise" holding behavior fixed.
- **Islands of tested code:** Over time, tested areas grow from islands into continents. Work becomes progressively easier.

## Background

Feathers began programming in college, teaching himself C and becoming addicted to the craft. He joined Object Mentor where he worked with [Robert C. Martin](robert-martin.md), helping teams adopt Extreme Programming practices. He discovered that most client teams had large, untested code bases and needed systematic techniques to get them under control — a problem that XP's greenfield orientation didn't address. This experience led directly to the book.

## Influence on TDD Practice

Feathers' work bridges the gap between ideal TDD practice (greenfield, test-first) and reality (most code is legacy). His framework shows how to:

1. Get legacy code under test incrementally
2. Use TDD for all new code even in legacy contexts
3. Treat dependency breaking as a skill to be mastered
4. Build momentum through gradual improvement

Dave Farley builds on Feathers' approach in his [Dave Farley 302 Course](../sources/dave-farley-302-course.md) (TDD course), referencing his definition of legacy code and his techniques as the foundation for working with existing systems.

## Key Quote

> "Code without tests is bad code. It doesn't matter how well written it is; it doesn't matter how pretty or object-oriented or well-encapsulated it is. With tests, we can change the behavior of our code quickly and verifiably. Without them, we really don't know if our code is getting better or worse."

## Sources in this Wiki

- [Working Effectively with Legacy Code (Feathers)](../sources/working-effectively-legacy-code-feathers.md) — full source summary

## Related Pages

- [Legacy Code](../concepts/legacy-code.md)
- [Legacy Code Change Algorithm](../concepts/legacy-code-change-algorithm.md)
- [Seams](../concepts/seams.md)
- [Characterization Tests](../concepts/characterization-tests.md)
- [Dependency-Breaking Techniques](../concepts/dependency-breaking-techniques.md)
- [Sprout Method](../concepts/sprout-method.md)
- [Approval Testing](../concepts/approval-testing.md)
- [Strangler Pattern](../concepts/strangler-pattern.md)
- [Refactoring](../concepts/refactoring.md)
- [Robert C. Martin](robert-martin.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
