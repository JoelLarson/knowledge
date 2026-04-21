---
title: Integration Testing
type: concept
tags: [testing, integration, test-levels]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md", raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md, "raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md", "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

Integration testing verifies that separately developed components work correctly together across their boundaries — databases, networks, file systems, and third-party services. It occupies the middle layer of the testing pyramid between unit tests and end-to-end acceptance tests.

## Integration vs. Unit Tests

| Dimension | Unit Test | Integration Test |
|-----------|-----------|-----------------|
| **Scope** | Single class/function in isolation | Multiple components interacting |
| **Dependencies** | Replaced with [Test Doubles](test-doubles.md) | Real (or near-real) collaborators |
| **Speed** | Milliseconds | Seconds to minutes |
| **Failure diagnosis** | Points directly to the broken unit | Indicates a boundary problem |
| **What it proves** | Logic correctness | Components connect correctly |

Unit tests verify that individual pieces work in isolation. Integration tests verify that those pieces fit together: database queries return expected results, HTTP endpoints serialize correctly, message queues deliver payloads faithfully.

## The Testing Pyramid

```
        /  E2E / Acceptance  \       ← Few, slow, high confidence
       /────────────────────────\
      /    Integration Tests     \   ← Moderate number, moderate speed
     /────────────────────────────\
    /       Unit Tests             \ ← Many, fast, focused
   /────────────────────────────────\
```

The pyramid suggests: write many fast unit tests, fewer integration tests, and a small number of end-to-end tests. Each layer catches different categories of defects.

## What Integration Tests Cover

- **Database interactions** — queries, migrations, transactions, constraints
- **External service calls** — HTTP APIs, message brokers, file storage
- **Component boundaries** — service-to-service communication within the same system
- **Serialization/deserialization** — JSON, protobuf, XML roundtrips
- **Configuration** — connection strings, environment variables, feature flags

## Integration Testing and TDD

The relationship between integration testing and TDD is debated:

### Classical TDD (Chicago School)
[Kent Beck](../entities/kent-beck.md)'s approach focuses TDD at the unit level. Integration concerns are handled by separate integration tests that are not strictly part of the red-green-refactor loop. You TDD the logic, then verify integration separately.

### London School / GOOS Approach
[Outside-In TDD](outside-in-tdd.md) starts with a failing end-to-end acceptance test (which is itself an integration test) and drives development inward. The [Walking Skeleton](walking-skeleton.md) explicitly establishes integration testing infrastructure before any feature work.

### Dave Farley's Position
Integration tests should verify that services work at their natural boundaries. Stub out upstream/downstream dependencies. Use contract-based testing to share integration assumptions between teams.

## Contract-Based Testing

When multiple services integrate, each team writes tests encoding their assumptions about the other service's behavior. These contract tests are shared, so both teams know when an assumption is violated. This avoids the combinatorial explosion of testing every service pair end-to-end.

## Integration Tests and [Bounded Context](bounded-context.md)

In DDD, bounded contexts define natural integration boundaries. Integration tests are most valuable at context boundaries — the anti-corruption layers, published languages, and shared kernels where misunderstandings between teams cause production failures.

## When Integration Tests Fail

Integration test failures typically indicate:

- A contract change that wasn't communicated
- An environment configuration problem
- A missing migration or schema change
- A network/timing issue (flaky tests)

Unlike unit test failures which point to a specific line, integration failures require investigating the boundary between components.

## Avoiding the Integration Test Trap

Over-reliance on integration tests leads to:

- Slow feedback loops (minutes instead of seconds)
- Flaky tests due to network/timing/state issues
- Difficult diagnosis when tests fail
- False confidence (passing integration tests don't prove logic correctness)

The solution is the testing pyramid: push as much verification as possible into fast unit tests, and use integration tests specifically for boundary verification.

## Accelerate's Findings on Test Automation

The DORA research ([Accelerate](../sources/accelerate-forsgren-humble-kim.md)) provides statistical evidence on the role of test automation -- including integration tests -- in driving delivery performance:

### Test Automation as Key Capability
Test automation is one of 24 capabilities that predict software delivery performance. The research found three critical properties of effective test suites:

1. **Reliability** -- when tests pass, teams are confident software is releasable; flaky tests (common in integration testing) destroy this confidence
2. **Developer ownership** -- tests created by developers (not separate QA) correlate with performance; outsourced or QA-only testing shows no correlation
3. **Continuous execution** -- every commit triggers automated tests; comprehensive acceptance tests run daily

### Testability as Architectural Characteristic
The research found that the ability to "do most of our testing without requiring an integrated environment" predicts high performance. This validates the testing pyramid: push as much verification as possible into fast unit tests, use integration tests specifically for boundary verification, and minimize dependence on expensive integrated test environments.

### Loosely Coupled Architecture Enables Testing
In 2017, loosely coupled architecture was the biggest contributor to [Continuous Delivery](continuous-delivery.md) -- even larger than test and deployment automation. Teams that can test independently of other teams achieve better results. This underscores the importance of [Test Doubles](test-doubles.md), [Ports and Adapters](ports-and-adapters.md), and [Dependency Injection](dependency-injection.md) to enable testing at boundaries without full integrated environments.

## Khorikov's Definition and Guidelines

[Vladimir Khorikov](../entities/vladimir-khorikov.md) provides a precise definition and practical guidelines in [Unit Testing: Principles, Practices, and Patterns](../sources/unit-testing-khorikov.md):

### Definition

An **integration test** is any test that is not a unit test — i.e., any test that fails to meet at least one of: (1) verifies a single unit of behavior, (2) does it quickly, (3) does it in isolation from other tests. In practice, integration tests verify how code works with out-of-process dependencies.

### What Integration Tests Cover

Integration tests cover the **controllers quadrant** — code with many collaborators but little business logic. Unit tests cover the domain model. The two quadrants together cover the code worth testing; trivial code and overcomplicated code should not be tested directly.

### The Balance Rule

> Check as many edge cases as possible with unit tests; use integration tests to cover one happy path per business scenario, plus any edge cases that can't be covered by unit tests.

For the happy path, select the **longest path** that exercises interactions with all out-of-process dependencies. If no single path covers all dependencies, add additional integration tests as needed.

### Managed vs Unmanaged Dependencies

Khorikov introduces a critical distinction for integration testing:

- **Managed dependencies** (e.g., application database) — only your application accesses them. Use real instances in integration tests. Mocking them compromises resistance to refactoring.
- **Unmanaged dependencies** (e.g., SMTP server, message bus) — their side effects are visible to external systems. Replace with mocks to verify the communication contract.

If a dependency is both (e.g., a database with some tables shared with other applications), treat the shared part as unmanaged (mock it) and the private part as managed (use it directly).

### When to Skip Integration Tests

If you cannot use a real managed dependency (e.g., due to infrastructure constraints), **don't write integration tests at all**. Mocking a managed dependency produces tests that lack both resistance to refactoring and meaningful regression protection. Focus on unit testing the domain model instead.

### The Fail Fast Alternative

Some edge cases don't need integration tests if incorrect execution immediately crashes the application (preconditions, configuration validation). The **Fail Fast principle** — stopping on unexpected errors — is a viable alternative to testing certain error paths.

### Integration Testing Best Practices

- **Make domain model boundaries explicit** — clear separation aids testability
- **Reduce the number of layers** — fewer layers means simpler integration tests
- **Eliminate circular dependencies** — they complicate both production code and tests
- **Use multiple act sections sparingly** — acceptable in integration tests to verify multi-step workflows

## Related Pages

- [ATDD](atdd.md)
- [Outside-In TDD](outside-in-tdd.md)
- [Walking Skeleton](walking-skeleton.md)
- [Test Doubles](test-doubles.md)
- [Bounded Context](bounded-context.md)
- [Domain Model Testing](domain-model-testing.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Continuous Delivery](continuous-delivery.md)
- [London School TDD](london-school-tdd.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Four Pillars of a Good Test](four-pillars-of-good-tests.md)
- [Mocking](mocking.md)
- [Humble Object](humble-object.md)
- [Unit Testing (Khorikov)](../sources/unit-testing-khorikov.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
- [Accelerate](../sources/accelerate-forsgren-humble-kim.md)
- [DORA Metrics](dora-metrics.md)
- [Test Automation at Scale](test-automation-at-scale.md)
- [Continuous Integration](continuous-integration.md)
- [Contract-Based Testing](contract-testing.md)
