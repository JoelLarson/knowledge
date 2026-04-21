---
title: Robert C. Martin ("Uncle Bob")
type: entity
tags: [robert-martin, uncle-bob, clean-code, solid, three-laws-tdd]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/clean-code-robert-martin.md]
---

Robert C. Martin ("Uncle Bob") is author of _Clean Code_, _The Clean Coder_, _Clean Architecture_, and _Agile Software Development: Principles, Patterns, and Practices_. Creator of the SOLID principles and the Three Laws of TDD.

## Key Contributions

- **Clean Code** — handbook of agile software craftsmanship; naming, functions, testing, design
- **SOLID Principles** — Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Three Laws of TDD** — the most rigorous formulation of test-first development

## Three Laws of TDD

1. You may not write production code until you have written a failing unit test.
2. You may not write more of a unit test than is sufficient to fail (not compiling = failing).
3. You may not write more production code than is sufficient to pass the currently failing test.

These enforce a tighter loop than Beck's formulation: seconds, not minutes, between each law.

## F.I.R.S.T. Test Properties

From Chapter 9 of Clean Code:
- **Fast** — tests must run quickly
- **Independent** — tests must not depend on each other
- **Repeatable** — tests must work in any environment
- **Self-Validating** — boolean pass/fail
- **Timely** — written just before production code

Closely related to [Farley's UMRANGS+F framework](../concepts/good-test-properties.md).

## "We Are Authors"
Code is read far more than written. Programmers are authors. Clean code is code written for readers, not machines.

## Sources in this Wiki

- [[clean-code-robert-martin]] — comprehensive source summary

## Related Pages

- [[test-first]]
- [[good-test-properties]]
- [[refactoring]]
- [[solid-principles]]
- [[kent-beck]]
- [[dave-farley]]
- [[martin-fowler]]
- [[michael-feathers]]
- [[clean-code-robert-martin]]
