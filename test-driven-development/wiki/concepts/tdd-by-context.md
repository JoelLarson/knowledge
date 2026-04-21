---
title: TDD by Context
type: concept
tags: [tdd, practices, domain-specific, adaptation]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/modern-software-engineering-dave-farley.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

TDD principles are universal but their application varies by domain, language, and system constraints. This page maps how cycle time, test strategy, and tooling adapt across contexts.

## By Domain

| Domain | Typical Cycle Time | Primary Testing Style | Key Adaptation |
|--------|-------------------|----------------------|----------------|
| Web backends | 2-5 min | [Chicago school](chicago-vs-london.md) | [Integration tests](integration-testing.md) at API boundaries |
| Frontend / UI | 5-15 min | Component tests + E2E | Visual regression and snapshot testing supplement TDD |
| Data pipelines | 10-30 min | [Property-based](property-based-testing.md) + integration | Test data generation is the hard part |
| Embedded / firmware | 5-15 min | Hardware abstraction layers as [seams](seams.md) | Cross-compilation adds feedback delay |
| Microservices | 2-5 min per service | Contract tests at boundaries | [London school](london-school-tdd.md) natural for service interactions |
| CLI tools | 1-3 min | Output-based testing | [Approval tests](approval-testing.md) for complex output |

## By Language Family

**Dynamic (Python, Ruby, JS):** Easy mocking via monkey-patching gives fast feedback. Type errors are caught by tests rather than the compiler, making thorough [test coverage](good-test-properties.md) more critical.

**Static OO (Java, C#):** Interfaces serve as natural [seams](seams.md). [Dependency injection](dependency-injection.md) frameworks are widespread. The compiler catches some errors that TDD would otherwise need to find, letting tests focus on behavior.

**Functional (Haskell, Elixir, Clojure):** Pure functions minimize the need for [mocking](mocking.md). [Property-based testing](property-based-testing.md) is a natural fit since functions map inputs to outputs without side effects. See [TDD in Functional Programming](tdd-in-functional-programming.md) for a deeper treatment.

**Systems (Rust, C, C++):** Compilation time directly affects cycle length. Unsafe code and manual memory management demand extra test discipline. See [Seams](seams.md) for C/C++ techniques like link-time and preprocessor seams.

## By Team Maturity

| Maturity Level | Recommended Approach |
|---------------|---------------------|
| **New to TDD** | Start with [Chicago school](chicago-vs-london.md) on pure logic. 10-15 min cycles are fine. Avoid [mocking](mocking.md) early on. |
| **Intermediate** | Introduce [London school](london-school-tdd.md) for boundary code. Shorten cycles to 5-10 min. Add [property-based testing](property-based-testing.md). |
| **Advanced** | [Outside-in TDD](outside-in-tdd.md), [ATDD](atdd.md), sub-5-min cycles. Test infrastructure is a first-class concern. |

## The Universal Constants

Regardless of domain, language, or team experience, these hold:

1. **Tests before code** -- the failing test comes first ([Red-Green-Refactor](red-green-refactor.md))
2. **Small steps** -- each cycle changes as little as possible ([TDD Process Granularity](tdd-process-granularity.md))
3. **Fast feedback** -- if the loop is slow, shorten it before continuing
4. **Refactor on green** -- improve design only when tests pass ([Refactoring](refactoring.md))

## Related Pages

- [Chicago vs. London Schools](chicago-vs-london.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [TDD Process Granularity](tdd-process-granularity.md)
- [Seams](seams.md)
- [TDD in Functional Programming](tdd-in-functional-programming.md)
- [Property-Based Testing](property-based-testing.md)
- [Approval Testing](approval-testing.md)
- [Outside-In TDD](outside-in-tdd.md)
- [ATDD](atdd.md)
- [Integration Testing](integration-testing.md)
