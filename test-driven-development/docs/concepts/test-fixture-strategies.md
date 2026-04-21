---
title: Test Fixture Strategies
type: concept
tags: [fixtures, test-setup, patterns, xunit, gerard-meszaros]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

Fixture strategy patterns from [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md). A test fixture is the "before picture" — everything needed for the [SUT](sut-and-doc.md) to exhibit the expected behavior. How you build and manage fixtures is one of the most consequential decisions in test automation.

## What Is a Fixture?

The fixture consists of all objects, data, and state required to run a test. This includes:
- The SUT itself
- Any [DOCs](sut-and-doc.md) (real or [[test-doubles]])
- Database records, files, configurations
- Any state the SUT depends on

## Fresh Fixture vs. Shared Fixture

The fundamental strategic choice:

### Fresh Fixture
Each test constructs its own brand-new fixture for its own private use. Tests are completely independent.

**Advantages:** No Interacting Tests, full isolation, simple reasoning, easy parallelization.
**Disadvantage:** Potentially slower (construction overhead per test).

#### Transient Fresh Fixture
Objects exist only in memory; garbage collection handles teardown. No explicit cleanup needed.

#### Persistent Fresh Fixture
Objects persist beyond the test (database records, files). Requires explicit teardown to avoid polluting subsequent tests.

### Shared Fixture
Multiple tests reuse the same fixture instance.

**Advantages:** Faster (fixture built once), less code.
**Disadvantages:** Risk of Interacting Tests, Erratic Tests, resource conflicts, order dependence. Violates test independence.

**Rule of thumb:** Prefer Fresh Fixture. Use Shared Fixture only when fixture construction is prohibitively expensive (e.g., database schemas, external services).

## Fixture Design Patterns

### Minimal Fixture
Use the smallest and simplest fixture possible. Include only what this specific test needs. Prevents the General Fixture smell (see [[test-smells-catalog]]).

### Standard Fixture
Reuse the same fixture *design* (not instance) across many tests. Provides consistency without sharing state. Often implemented via Creation Methods.

## Setup Patterns

How fixtures are constructed:

### In-line Setup
Each Test Method builds its fixture directly in the test body. Maximum clarity — everything is visible. Can lead to Test Code Duplication.

```java
public void testEmptyList() {
    List list = new ArrayList();  // setup
    assertEquals(0, list.size()); // exercise + verify
}
```

### Implicit Setup (setUp method)
The framework's setUp method builds fixture common to all tests in the Testcase Class. Best with Testcase Class per Fixture organization.

```java
protected void setUp() {
    customer = createDefaultCustomer();
    order = createEmptyOrder(customer);
}
```

### Delegated Setup
Each test calls Creation Methods to build exactly what it needs. Hides construction mechanics behind Intent-Revealing Names. The recommended default strategy.

```java
public void testShipping() {
    Order order = createOrderWithItems(3);  // delegated
    assertEquals(STANDARD_SHIPPING, order.getShippingMethod());
}
```

### Creation Method Variants
- **Simple Creation Method** — returns a ready-to-use object with default values
- **Parameterized Creation Method** — accepts parameters for test-specific values
- **Anonymous Creation Method** — generates unique keys to avoid constraint violations
- **One Bad Attribute** — creates valid object then corrupts one attribute

### Prebuilt Fixture
Build the Shared Fixture separately from running tests (e.g., database seed scripts). Tests find and use existing objects rather than creating them.

### Lazy Setup
Use Lazy Initialization — create the fixture in the first test that needs it. Useful for expensive shared fixtures.

### Suite Fixture Setup
Build/destroy shared fixture in special methods called by the framework before/after the entire test suite (e.g., `@BeforeAll` in JUnit 5).

## Teardown Patterns

### Garbage-Collected Teardown
Let the runtime garbage collector clean up transient fixtures. The simplest approach — no explicit teardown code needed.

### Implicit Teardown (tearDown method)
The framework calls tearDown after every Test Method. Use for persistent fresh fixtures.

### Automated Teardown
Track all created resources during setup and automatically destroy them during teardown. Prevents resource leakage without manual bookkeeping.

### In-line Teardown
Include teardown logic at the end of the Test Method. Explicit but can obscure test intent.

### Transaction Rollback Teardown
Roll back the database transaction after the test. Leaves no trace in the database. Elegant for database-heavy tests.

## Fixture Strategy Decision Tree

1. Can the fixture live in memory only? → **Transient Fresh Fixture** + Garbage-Collected Teardown
2. Does the fixture require a database? → **Persistent Fresh Fixture** + Transaction Rollback or Table Truncation Teardown
3. Is fixture construction prohibitively slow? → **Shared Fixture** (with extreme care for test isolation)

## Common Fixture Smells

| Smell | Cause | Solution |
|-------|-------|----------|
| Slow Tests | Heavy fixture per test | Shared Fixture or lighter design |
| Erratic Test | Shared mutable state | Fresh Fixture |
| General Fixture | setUp has too much | Minimal Fixture, Testcase Class per Fixture |
| Obscure Test | In-line setup too long | Delegated Setup, Creation Methods |
| High Maintenance Cost | Duplicated setup code | Creation Methods, Test Helpers |

## Related Pages

- [[four-phase-test]]
- [[test-smells-catalog]]
- [[sut-and-doc]]
- [[test-doubles]]
- [[good-test-properties]]
- [[xunit-test-patterns-meszaros]]
