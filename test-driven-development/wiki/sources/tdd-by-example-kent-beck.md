---
title: "Test-Driven Development: By Example"
type: source
tags: [tdd, kent-beck, foundational, patterns, xunit]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md]
---

The definitive foundational text on TDD by its primary inventor. Two worked examples plus a comprehensive patterns catalog.

## Bibliographic Info

- **Author:** Kent Beck
- **Publisher:** Addison-Wesley, 2002
- **ISBN:** 0-321-14653-0
- **Pages:** 240

## Core Thesis

"Clean code that works — now." TDD resolves the apparent contradiction between code quality and development speed by following two rules:

1. Write new code only if an automated test has failed.
2. Eliminate duplication.

These generate [Red-Green-Refactor](../concepts/red-green-refactor.md): Red → Green → Refactor.

## Key Ideas

### TDD as Courage
TDD is a way of managing fear. Fear makes programmers tentative, uncommunicative, avoidant of feedback. TDD counters fear by:

- Starting learning concretely as quickly as possible
- Communicating more clearly
- Seeking helpful, concrete feedback

### The Ratchet Metaphor
Tests are the teeth of a ratchet. Once a test works, it works forever. The tougher the problem, the smaller the ground each test should cover.

### Organic Design
Design grows organically — running code provides feedback between decisions. The system must consist of many highly cohesive, loosely coupled components, just to make testing easy.

### Social Implications
- If defect density drops, QA shifts from reactive to proactive
- Accurate estimation enables real customer involvement
- Minute-by-minute collaboration becomes possible
- Shippable software with new functionality every day

## Structure

### Part I: The Money Example
Multi-currency arithmetic, driven entirely by tests. Demonstrates writing tests before code and growing a design organically through 17 chapters.

### Part II: The xUnit Example
Building a testing framework using TDD. Even smaller steps. Introduces xUnit architecture — the foundation of most programmer-oriented testing tools.

### Part III: Patterns for TDD
Comprehensive catalog including:

- **TDD Patterns:** Isolated Test, Test List, Test First, Assert First, Test Data, Evident Data
- **Red Bar Patterns:** One Step Test, Starter Test, Learning Test, Regression Test
- **Testing Patterns:** Child Test, Mock Object, Self Shunt, Log String, Crash Test Dummy
- **Green Bar Patterns:** Fake It ('Til You Make It), Triangulate, Obvious Implementation, One to Many
- **Design Patterns:** Command, Value Object, Null Object, Template Method, Factory Method, Composite
- **Refactoring Patterns:** Extract Method, Inline Method, Extract Interface, Move Method

## Chapter 32: Mastering TDD

Key questions addressed:

- How large should your steps be? (As small as needed to stay comfortable)
- What don't you have to test? (Code you don't write)
- How do you know if you have good tests? (They tell you things you don't know)
- TDD limitations: security software, subtle concurrency problems
- "Test Infected" — the mindset shift Erich Gamma described

## Related Pages

- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Test First](../concepts/test-first.md)
- [Refactoring](../concepts/refactoring.md)
- [TDD vs. Unit Testing](../concepts/tdd-vs-unit-testing.md)
- [Mocking](../concepts/mocking.md)
- [Test Doubles](../concepts/test-doubles.md)
- [Dependency Injection](../concepts/dependency-injection.md)
- [Good Test Properties](../concepts/good-test-properties.md)
- [Extreme Programming](../concepts/extreme-programming.md)
- [Kent Beck](../entities/kent-beck.md)
- [xUnit](../entities/xunit.md)
