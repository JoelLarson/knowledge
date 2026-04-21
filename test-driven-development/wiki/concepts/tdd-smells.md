---
title: TDD Smells (Anti-Patterns)
type: concept
tags: [tdd, anti-patterns, smells, dave-farley, test-quality]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

Common TDD anti-patterns that signal underlying design problems. TDD smells are diagnostic: they tell you something is wrong with the design, not just the tests.

## The Feedback Loop

TDD smells arise from a feedback loop: Developer → Test → Design → Code → Learning. Plugging into this loop and listening for signals is the point. A smell in a test is often a smell in the code.

## The Liar

A test that passes all tests but makes no actual assertions. The coverage metrics say green; nothing is verified.

**Cause:** Chasing coverage as a metric. Common in teams that incentivize test coverage numbers.

**Problem:** Gives the illusion of test coverage. Coverage tools say code was executed, but the test proves nothing.

**Correction:** Delete these tests. Practice red-green-refactor (see red before green) — a test that was never failing cannot be meaningful. [Test First](test-first.md) development prevents this entirely.

## Excessive Setup

A test that requires enormous amounts of work to get the code into a testable state.

**Cause:** Poor separation of concerns; tight coupling in the system under test.

**Problem:** The system is fragile and increasingly coupled. Projects slow down over time. Code is hard to understand and maintain.

**Correction:** Improve abstraction in the system under test. Improve separation of concerns. Practice test-first — writing the test first forces you to simplify setup because you won't make your own life difficult.

## The Giant

A test with many lines of code and multiple assertions, hiding multiple test cases in one.

**Cause:** Typically written after the code (test-after). Almost never arises organically in test-first.

**Problem:** Intent is hard to determine. Doesn't document behavior usefully. Highly coupled to implementation. Breaks on any change. Projects slow down as tests and code concretize together.

**Correction:** Decompose into multiple single-outcome test cases. Assert one outcome per test.

```
// Prefer: nine separate test cases (one assertion each)
// Not:    one test case with nine assertions
```

## The Mockery

A test that uses so many mocks and stubs that the system under test isn't actually tested.

```java
// WRONG
Engine mockEngine = mock(Engine.class);
Car mockCar = mock(Car.class);  // mocking the thing you're supposed to be testing!
when(mockCar.getEngine()).thenReturn(mockEngine);
when(mockCar.start()).thenAnswer(/* ... */);
// No production code is being tested here. Pure waste.
```

**Cause:** Excessive setup problem; tight coupling; testing implementations rather than behavior.

**Problem:** Not actually testing anything. Not readable. Highly coupled to implementation. Projects slow down.

**Correction:** Review design — improve abstraction and separation of concerns. Practice test-first.

## The Inspector

A test that violates encapsulation of the system under test to make assertions — accessing private state to verify something.

**Cause:** Chasing 100% coverage. Anemic objects (data-only, no behavior). Poor dependency injection.

**Problem:** Very tight coupling. Both test and production code are fragile.

**Correction:** Never compromise encapsulation for testing. Work through the public interface. If you have no measurement point, rethink the design — introduce [dependency injection](dependency-injection.md) or expose a result through the proper interface.

## The Secret Catcher

A test that makes no assertions but relies on an exception being thrown to cause failure.

```java
// WRONG: if code is refactored to not throw, this still passes
@Test
void shouldNotStartInGear() {
    selectGear(1);
    startCar(); // relies on exception being thrown, no assertion
}

// CORRECT
@Test
void shouldNotStartInGear() {
    selectGear(1);
    startCar();
    assertFalse(car.isRunning()); // explicit assertion
}
```

**Cause:** Lazy test design.

**Problem:** If code is refactored to remove the exception, test passes when it should fail.

**Correction:** Assert the expected failure explicitly. Think about the goal of every test and express it.

## The Dodger

A test that asserts minor, easy-to-check side effects but never tests the core behavior.

**Cause:** Lazy test design. Developers don't fully understand the problem. Sometimes coupled to implementation.

**Problem:** Gives illusion of coverage. Never catches important bugs. Tests are fragile (coupled to implementation details).

**Correction:** Write the test first. Focus on what the code must do, not what's easy to check.

## Summary Table

| Smell | Root Cause | Fix |
|-------|-----------|-----|
| Liar | Coverage chasing, no TDD | Delete; use test-first |
| Excessive Setup | Poor coupling/separation | Improve design; test-first |
| Giant | Test after code | Decompose; one assertion per test |
| Mockery | Poor coupling; mocking SUT | Fix design; test-first |
| Inspector | Coverage chasing | Use public interface; add DI |
| Secret Catcher | Lazy design | Explicit assertions |
| Dodger | Lazy design | Test core behavior first |

## See Also: Meszaros's Comprehensive Smell Catalog

Farley's smells above focus on developer anti-patterns visible in individual tests. For a broader, more systematic taxonomy — including Behavior Smells (Erratic Test, Fragile Test, Slow Tests), Code Smells (Obscure Test, Conditional Test Logic), and Project Smells (High Test Maintenance Cost, Developers Not Writing Tests) — see [Test Smells Catalog](test-smells-catalog.md).

Meszaros treats smells as symptoms with multiple possible root causes, providing a diagnostic framework: detect the smell, diagnose the root cause, apply the appropriate pattern.

## Related Pages

- [Test Smells Catalog](test-smells-catalog.md)
- [Test First](test-first.md)
- [Mocking](mocking.md)
- [Dependency Injection](dependency-injection.md)
- [Good Test Properties](good-test-properties.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
