---
title: SOLID Principles
type: concept
tags: [solid, design, robert-martin, srp, ocp, lsp, isp, dip]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/clean-code-robert-martin.md, raw/art-of-clean-code.md]
---

Five design principles that produce code that is testable, maintainable, and flexible. Coined and popularized by [Robert C. Martin](../entities/robert-martin.md). Deeply connected to TDD — code following SOLID is naturally easier to test.

## The Five Principles

### S — Single Responsibility Principle (SRP)
A class should have one, and only one, reason to change.

This is the most impactful principle for TDD. A class with one responsibility is easy to test with focused tests. A class with multiple responsibilities requires complex setup and produces the [Excessive Setup](tdd-smells.md) smell.

Martin: "Classes should be small — measured in responsibilities, not lines."

Mayer (Principle 10): "Each function, class, or module should have one clear job."

Farley: "One method, one thing. One class, one thing. This is one of the most powerful driving forces to guide us to what is simple, readable, clear, concise code."

### O — Open/Closed Principle (OCP)
Software entities should be open for extension, closed for modification.

In the [Theatrical Players Kata](../sources/fowler-theatrical-players-kata.md), Replace Conditional with Polymorphism implements OCP: new play types can be added by extending (adding a class) without modifying existing code.

### L — Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types without altering program correctness.

Critical for [Dependency Injection](dependency-injection.md): when a mock replaces a real dependency, it must honor the same contract. If the mock violates LSP, the test passes but production breaks.

### I — Interface Segregation Principle (ISP)
No client should be forced to depend on methods it does not use.

When interfaces are too broad, test setup becomes complicated because mocks must implement methods irrelevant to the test. Narrow interfaces lead to simpler [Mocking](mocking.md).

### D — Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions.

This is the theoretical foundation of [Dependency Injection](dependency-injection.md). By depending on abstractions (interfaces), code becomes testable: test doubles can be injected in place of real implementations.

## SOLID and Testability

The relationship is circular and reinforcing:
- SOLID code is easier to test → TDD succeeds
- TDD pressure forces SOLID design → code quality improves

When tests are hard to write, it's usually a SOLID violation:
- Hard to isolate → DIP/DI violation
- Complex setup → SRP violation
- Fragile to changes → OCP violation
- Mock overload → ISP violation

## Related Pages

- [Robert C. Martin](../entities/robert-martin.md)
- [Clean Code](../sources/clean-code-robert-martin.md)
- [The Art of Clean Code](../sources/art-of-clean-code-mayer.md)
- [Dependency Injection](dependency-injection.md)
- [Mocking](mocking.md)
- [TDD Smells](tdd-smells.md)
- [Refactoring](refactoring.md)
