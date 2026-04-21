---
title: Neal Ford
type: entity
tags: [neal-ford, architecture, fitness-functions, evolutionary-architecture]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Software Architecture_ The Hard Parts.md]
---

Neal Ford is a software architect at Thoughtworks and co-author of *Software Architecture: The Hard Parts* (2021) and *Building Evolutionary Architectures* (2017). He is a primary proponent of architecture fitness functions — automated governance checks that extend TDD's feedback-driven approach to architectural characteristics.

## Key Contributions

- **Architecture Fitness Functions** — co-defined (with Rebecca Parsons and Patrick Kua) in *Building Evolutionary Architectures* as "any mechanism that performs an objective integrity assessment of some architecture characteristic." This concept applies TDD's core insight (fast automated feedback) to architecture governance.
- **Software Architecture: The Hard Parts** — co-authored with Mark Richards, Pramod Sadalage, and Zhamak Dehghani. Focuses on trade-off analysis for distributed architectures: decomposition patterns, coupling analysis, data management, and saga patterns.
- **Fundamentals of Software Architecture** — co-authored with Mark Richards. Established terminology including "architecture quantum" and the Second Law of Software Architecture: "Why is more important than how."
- **Trade-off analysis framework** — advocates that architects should seek the "least worst" combination of trade-offs rather than "best" solutions. Emphasizes that every architectural decision involves trade-offs that must be documented (via ADRs) and governed (via fitness functions).

## Relevance to TDD

Ford's work bridges the gap between code-level TDD and architecture-level governance:
- [Fitness Functions](../concepts/fitness-functions.md) are TDD for architecture — automated, continuous, objective verification
- Modularity drivers (maintainability, testability, deployability) connect architectural decisions directly to testability
- The architecture quantum concept clarifies what can be tested and deployed independently

## Sources in this Wiki

- [Software Architecture: The Hard Parts](../sources/software-architecture-hard-parts.md)

## Related Pages

- [Fitness Functions](../concepts/fitness-functions.md)
- [Coupling and Cohesion](../concepts/coupling-and-cohesion.md)
- [Bounded Context](../concepts/bounded-context.md)
- [Continuous Delivery](../concepts/continuous-delivery.md)
- [Kent Beck](kent-beck.md)
