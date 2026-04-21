---
title: Test Doubles
type: concept
tags: [test-doubles, mock, stub, fake, spy, dummy, gerard-meszaros, london-school, michael-feathers]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md", raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md, raw/Working.Effectively.with.Legacy.Code.md]
---

Test doubles are objects that stand in for real dependencies during testing. The umbrella term was formally defined by [Gerard Meszaros](../entities/gerard-meszaros.md) in [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md) (2007), which established the canonical taxonomy: Dummy, Stub, Fake, Mock, and Spy. Before Meszaros, "mock" was used loosely for all kinds of test substitutes.

## Taxonomy

| Type | What It Does | Verification |
|------|-------------|-------------|
| **Dummy** | Fills a parameter slot; never actually used | None — just satisfies the type system |
| **Stub** | Returns canned responses to calls | No verification — only provides inputs |
| **Fake** | Working implementation simplified for testing (e.g., in-memory DB) | Tested via outputs, not interactions |
| **Mock** | Records interactions; verifies they happened correctly | Post-hoc verification of interactions |
| **Spy** | A real object that also records interactions | Hybrid: real behavior + interaction recording |

## When to Use Each

### Dummy
Use when a method signature requires an argument you don't care about in this test. Example: passing `null` or an empty implementation for a logger in a test that doesn't test logging.

### Stub
Use when the code under test needs a dependency to return specific values. Example: a stub repository that returns a hardcoded user object.

### Fake
Use when the real dependency is too slow or external but you need realistic behavior. Example: an in-memory database instead of PostgreSQL for integration tests.

### Mock
Use when you need to verify that the code under test *interacted* with a dependency correctly. Example: verifying that a calculator called `display.show("1 + 2 = 3")`. See [Mocking](mocking.md).

### Spy
Use when you want real behavior but also need to observe interactions. Less common than mocks.

## Test Doubles and Design

The need for test doubles is a design signal:

- **Too many doubles needed** → the unit has too many dependencies ([SRP violation](solid-principles.md))
- **Complex mock setup** → tight coupling ([Excessive Setup](tdd-smells.md))
- **Mocking the thing you're testing** → confused test design ([The Mockery](tdd-smells.md))

Test doubles work through [Dependency Injection](dependency-injection.md) — the dependency is injected as an interface, and the double implements that interface.

## Beck's Patterns

In [TDD by Example](../sources/tdd-by-example-kent-beck.md), Beck describes several related patterns:

- **Mock Object** — fake version of expensive/complex dependency
- **Self Shunt** — the test class itself implements the interface and records interactions
- **Log String** — record a log of method calls for later assertion
- **Crash Test Dummy** — fake that throws exceptions to test error handling

## Meszaros's Formal Definitions

In [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md), Meszaros defines test doubles in terms of [SUT and DOC](sut-and-doc.md) relationships:

- **Dummy Object** — "We pass an object that has no implementation as an argument of a method called on the SUT." Used only to fill parameter slots.
- **Test Stub** — "We replace a real object with a test-specific object that feeds the desired indirect inputs into the SUT." Controls what the DOC returns.
- **Test Spy** — "We use a Test Double to capture the indirect output calls made to another component by the SUT for later verification by the test." Records calls for later assertion.
- **Mock Object** — "We replace an object the SUT depends on with a test-specific object that verifies it is being used correctly by the SUT." Pre-programmed with expectations.
- **Fake Object** — "We replace a component that the SUT depends on with a much lighter-weight implementation." Has working behavior (e.g., in-memory database).

### Configuration Patterns
- **Configurable Test Double** — A reusable double configured with values to return or verify during fixture setup
- **Hard-Coded Test Double** — Return values and expected calls are hard-coded into the double
- **Test-Specific Subclass** — Expose state or behavior needed by the test via a subclass of the SUT

### Installation Methods
The test double must be installed in place of the real DOC. Meszaros documents three approaches:

1. **[Dependency Injection](dependency-injection.md)** — the client provides the DOC to the SUT
2. **Dependency Lookup** — the SUT asks a registry/factory for the DOC; the test replaces the registry entry
3. **Test-Specific Subclass** — override a factory method in the SUT that creates the DOC

## The Overuse Problem

> "The Mockery — a test that uses so many mocks and stubs that the system under test isn't actually tested at all." — Dave Farley

Test doubles are powerful but dangerous. When the majority of test code is setting up doubles, the test has lost its value. The fix is always in the production design, not in more sophisticated doubles.

## GOOS Perspective: Test Doubles and Design Discovery

[Growing Object-Oriented Software](../sources/growing-oo-software-freeman-pryce.md) uses test doubles differently from the classical school. In the [London school](london-school-tdd.md):

- **Mocks drive interface discovery** — you mock a collaborator that doesn't exist yet, defining its interface through expectations. The mock is a specification of a role.
- **The "mockery" context** — jMock uses a context object that manages all mock objects, expectations, and verifications for a test. The structure is: create mocks, create real objects, specify expectations, trigger behavior, verify.
- **Object peer stereotypes** determine what to double:
  - **Dependencies** — required services (mock these to isolate)
  - **Notifications** — fire-and-forget listeners (mock to verify messages sent)
  - **Adjustments** — strategy/policy objects (mock to control behavior)
- **Don't mock values** — values are immutable; just instantiate them
- **Don't mock types you don't own** — write adapters for third-party code

The key distinction: in GOOS, test doubles are not primarily about isolation from slow resources. They are about **making communication protocols visible and testable**.

## Sensing and Separation (Feathers)

[Michael Feathers](../entities/michael-feathers.md) identifies **two distinct purposes** for test doubles in legacy code work, which he calls _sensing_ and _separation_:

### Sensing

We break dependencies to **sense** when we can't access values our code computes. A fake object captures effects that would otherwise be invisible.

**Example:** A `Sale` class sends text to a hardware display. We can't observe what the display shows in a test. Solution: inject a `FakeDisplay` that records the text sent to it.

```java
public class FakeDisplay implements Display {
    private String lastLine = "";
    public void showLine(String line) { lastLine = line; }
    public String getLastLine() { return lastLine; }
}
```

The fake has **two sides**: one side faces the code under test (implements the interface), the other faces the test (provides query methods for assertions).

### Separation

We break dependencies to **separate** when we can't even get code into a test harness to run. The double's purpose is to stand in for something that is hard to create, not to sense anything.

**Example:** A class requires a `DBConnection` in its constructor. We don't care about the database in this test — we just need the constructor to work. An interface + null implementation lets us instantiate the class.

### The Sensing Variable Technique

For cases where you can't easily introduce a fake: add a temporary variable to the production code that records whether a path was executed. Use it in tests to verify coverage of specific branches, then remove it when no longer needed. A pragmatic legacy-code-specific technique.

## Related Pages

- [Mocking](mocking.md)
- [Dependency Injection](dependency-injection.md)
- [TDD Smells](tdd-smells.md)
- [SOLID Principles](solid-principles.md)
- [London School TDD](london-school-tdd.md)
- [Tell, Don't Ask](tell-dont-ask.md)
- [Seams](seams.md)
- [Dependency-Breaking Techniques](dependency-breaking-techniques.md)
- [Legacy Code](legacy-code.md)
- [Michael Feathers](../entities/michael-feathers.md)
- [Working Effectively with Legacy Code (Feathers)](../sources/working-effectively-legacy-code-feathers.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
- [SUT and DOC](sut-and-doc.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Gerard Meszaros](../entities/gerard-meszaros.md)
