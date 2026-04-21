---
title: Alistair Cockburn
type: entity
tags: [person, architecture, agile]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/modern-software-engineering-dave-farley.md]
---

Alistair Cockburn is the creator of the Hexagonal Architecture (Ports and Adapters) pattern and a co-author of the Agile Manifesto. His Ports and Adapters concept is foundational to testable architecture and a natural outcome of TDD-driven design.

## Key Contributions

- **Hexagonal Architecture (Ports and Adapters)** — architectural pattern that isolates business logic from infrastructure through interfaces (ports) and implementations (adapters); makes code testable by construction (see [Ports and Adapters](../concepts/ports-and-adapters.md))
- **Agile Manifesto** — co-author (2001); helped establish the values and principles that underpin TDD's adoption
- **Crystal methodology** — a family of lightweight agile methodologies emphasizing communication and simplicity

## Key Ideas

### Ports and Adapters for Testability

Cockburn's core insight: an application should work identically whether driven by a user, a test harness, or a batch script. By defining ports (interfaces in domain language) and adapters (concrete implementations), the application core becomes testable in complete isolation.

Freeman and Pryce describe the connection in GOOS:

> "We write interfaces to describe its relationships with the outside world in its terminology (Cockburn's ports). Then we write bridges between the application core and each technical domain (Cockburn's adapters)."

This makes Cockburn's pattern the architectural foundation for:
- [Dependency Injection](../concepts/dependency-injection.md) at the system level
- The "only mock types you own" heuristic from [London School TDD](../concepts/london-school-tdd.md)
- [Test Doubles](../concepts/test-doubles.md) substitution through ports

### Symmetry of the Hexagon

The hexagonal shape represents the idea that there is no inherent difference between "driving" adapters (UI, tests, APIs that call into the application) and "driven" adapters (databases, external services that the application calls out to). Both connect through ports. This symmetry is what makes test doubles work seamlessly as replacements for real infrastructure.

## Related Pages

- [Ports and Adapters](../concepts/ports-and-adapters.md)
- [Dependency Injection](../concepts/dependency-injection.md)
- [SOLID Principles](../concepts/solid-principles.md)
- [London School TDD](../concepts/london-school-tdd.md)
- [Test Doubles](../concepts/test-doubles.md)
- [Outside-In TDD](../concepts/outside-in-tdd.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
