---
title: "Modern Software Engineering: Doing What Works to Build Better Software Faster"
type: source
tags: [dave-farley, software-engineering, design, tdd, continuous-delivery]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/modern-software-engineering-dave-farley.md]
---

Dave Farley's comprehensive framework for software engineering as an empirical, feedback-driven discipline. Provides the theoretical underpinning for why TDD and related practices produce better software.

## Publication Details

- **ISBN-13:** 9780137314911
- **Publisher:** Addison-Wesley
- **Buy from publisher:** [Addison-Wesley](https://www.pearson.com/en-us/subject-catalog/p/modern-software-engineering-doing-what-works-to-build-better-software-faster/P200000009466/9780137314867)

## Bibliographic Info

- **Author:** David Farley
- **Publisher:** Addison-Wesley/Pearson, 2022
- **ISBN:** 978-0-13-731491-1

## Core Thesis

Software engineering is design engineering, not production engineering. Unlike manufacturing, software's "production" cost is essentially zero — we copy bits. Therefore software engineering is entirely concerned with the design process, which must be empirical, iterative, and feedback-driven.

## Key Arguments

### Engineering != Craft
Software development has historically operated more as craft than engineering. Engineering requires:

- Repeatability and accuracy of measurement
- Managing complexity at scale
- Precision in specifications
- The ability to reason about properties of designs

### Managing Complexity
The central challenge of software is complexity. Techniques for managing complexity:

- **Modularity** — divide into comprehensible pieces
- **Cohesion** — related things together, unrelated things apart
- **Separation of Concerns** — each piece focused on one role
- **Abstraction / Information Hiding** — change one part without affecting others
- **Loose Coupling** — minimize dependencies between modules

### Iterative, Feedback-Driven Development
Software engineering must optimize for learning. The faster the feedback loop, the faster we learn and correct mistakes. This is why:

- TDD (fast test feedback) improves code quality
- Continuous integration and delivery close feedback loops
- Small, frequent deployments reduce risk

## Connection to TDD

The Dave Farley 302 course explicitly references "the modern software engineering approach" as the design framework for the refactor step. The five properties above (modularity, cohesion, separation of concerns, abstraction, loose coupling) are what refactoring moves code toward.

## Related Pages

- [Refactoring](../concepts/refactoring.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Dependency Injection](../concepts/dependency-injection.md)
- [Good Test Properties](../concepts/good-test-properties.md)
- [TDD vs. Unit Testing](../concepts/tdd-vs-unit-testing.md)
- [BDD](../concepts/bdd.md)
- [ATDD](../concepts/atdd.md)
- [Legacy Code](../concepts/legacy-code.md)
- [Continuous Delivery](../concepts/continuous-delivery.md)
- [SOLID Principles](../concepts/solid-principles.md)
- [Ports and Adapters](../concepts/ports-and-adapters.md)
- [Dave Farley](../entities/dave-farley.md)
- [Dave Farley 302 Course](dave-farley-302-course.md)
