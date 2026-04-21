---
title: Choosing Test Levels
type: concept
tags: [guides, test-levels, unit-test, integration-test, acceptance-test, testing-pyramid, outside-in, workflow]
created: 2026-04-21
updated: 2026-04-21
sources: ["raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md", raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md", "raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md"]
---

When faced with a piece of behavior to verify, you have a choice: unit test, integration test, or acceptance test. Each has different costs, different strengths, and catches different categories of defects. Choosing wrong means either slow feedback loops (too many integration tests) or false confidence (unit tests that pass while the system is broken).

This guide provides a decision framework for choosing the right test level, then describes the acceptance-first workflow where user stories become executable tests that drive unit-level TDD.

## The Testing Pyramid

```
        /  Acceptance / E2E  \         Few, slow, high confidence
       /──────────────────────\
      /   Integration Tests    \       Moderate number, moderate speed
     /──────────────────────────\
    /       Unit Tests           \     Many, fast, focused
   /──────────────────────────────\
```

The pyramid is a heuristic, not a law. It says: push verification down to the cheapest level that can catch the defect. Unit tests are cheapest (fast, isolated, precise failure messages). Integration tests cost more (slower, broader failure surface). Acceptance tests cost most (slowest, most infrastructure, hardest to diagnose failures).

The goal is not to avoid integration or acceptance tests — it's to avoid using them for things unit tests can catch.

## What Each Level Verifies

| Test Level | What It Proves | What It Cannot Prove |
|-----------|---------------|---------------------|
| **Unit** | Business logic and domain rules are correct | Components connect correctly |
| **Integration** | Components connect correctly across boundaries (DB, APIs, queues) | Feature works end-to-end from user's perspective |
| **Acceptance** | Feature works as the user expects through external interfaces | Which internal component is broken when it fails |

Each level catches defects the others miss:

- A unit test catches a wrong calculation, but can't tell you the database query returns the wrong rows
- An integration test catches a broken database query, but can't tell you the API returns the wrong HTTP status
- An acceptance test catches a broken user flow, but can't tell you *where* in the stack it broke

## The Decision Heuristic

When deciding which level a test should be, ask:

**1. Am I verifying business logic or domain rules?**
Unit test. Domain logic — calculations, validations, state transitions, invariants — should be tested in isolation, with many edge cases. These tests run in milliseconds and point directly at the broken rule when they fail.

See [Domain Model Testing](../concepts/domain-model-testing.md) for patterns around testing [Aggregates](../concepts/aggregates.md), [Value Objects](../concepts/value-objects.md), and [Domain Events](../concepts/domain-events.md).

**2. Am I verifying that components connect correctly?**
Integration test. Database queries, HTTP client/server contracts, message serialization, configuration loading — these are boundary concerns. A unit test with mocked dependencies can't catch them because the mock *is* the assumption you're trying to verify.

**3. Am I verifying that a feature works from the user's perspective?**
Acceptance test. The user doesn't care about your internal architecture. They care that "when I place an order, I get a confirmation." This is the [ATDD](../concepts/atdd.md) level.

**4. Could a simpler test catch this defect?**
If yes, push down. If a unit test can catch it, don't write an integration test for it. If an integration test can catch it, don't write an acceptance test for it.

## Khorikov's Managed vs. Unmanaged Dependencies

[Vladimir Khorikov](../entities/vladimir-khorikov.md) introduces a distinction that sharpens integration test decisions. See [Integration Testing](../concepts/integration-testing.md) for the full treatment.

**Managed dependencies** — only your application accesses them (e.g., your application database). Use real instances in integration tests. Mocking them removes the regression protection that makes the test valuable.

**Unmanaged dependencies** — their side effects are visible to external systems (e.g., SMTP server, payment gateway, message bus). Replace with mocks to verify the communication contract without triggering real side effects.

| Dependency Type | Example | In Integration Tests |
|----------------|---------|---------------------|
| Managed | Application database | Use real instance |
| Unmanaged | Email service, payment API | Mock it |
| Both (shared DB) | Tables read by other systems | Mock the shared part, use real for private part |

**Khorikov's balance rule:** Check as many edge cases as possible with unit tests. Use integration tests to cover one happy path per business scenario, plus edge cases that unit tests cannot reach. For the happy path, select the longest path that exercises interactions with all out-of-process dependencies.

## The Acceptance-First Workflow

The most effective way to connect test levels is the [Outside-In TDD](../concepts/outside-in-tdd.md) double loop: start with an acceptance test, then write unit tests until it passes.

### How It Works

1. **Start with the user story.** "As a customer, I can see the total price of items in my cart."

2. **Write a failing acceptance test** that expresses this story through the system's external interface:

    ```python
    def test_cart_shows_total_price():
        client = app.test_client()
        client.post("/cart/items", json={"sku": "WIDGET-1", "qty": 2})
        client.post("/cart/items", json={"sku": "GADGET-9", "qty": 1})
        response = client.get("/cart/total")
        assert response.json["total"] == 39.97
    ```

    This test uses domain language ("cart", "items", "total"), not implementation language ("CartService", "ProductRepository"). It defines *done* — when this test passes, the story is complete.

3. **Drop into unit-level TDD.** The acceptance test is red. Now write unit tests to drive the implementation one layer at a time:

    - **Boundary layer** (HTTP handler): mock the service, verify the route wires correctly
    - **Service layer** (business logic): mock the repository, verify the calculation
    - **Domain layer** (pure logic): no mocks needed, verify the rules directly

    Each unit test cycle follows [Red-Green-Refactor](../concepts/red-green-refactor.md). Each cycle makes the acceptance test *closer* to passing without changing the acceptance test itself.

4. **Wire the layers together.** When all unit tests pass, connect the real implementations. Run the acceptance test — it should go green.

5. **Add integration tests for boundaries.** If the cart reads prices from a database, write one integration test verifying the database query works with real data. The unit tests already cover the logic; the integration test covers the connection.

### Why This Ordering Works

- **The acceptance test prevents gold-plating.** You stop when the user story is satisfied, not when you run out of ideas for unit tests.
- **Unit tests provide fast feedback during development.** You don't wait for a slow acceptance test on every cycle — you run the fast unit tests and only run the acceptance test when you think you're done.
- **The test levels don't overlap.** Acceptance tests verify the feature works. Unit tests verify the logic is correct. Integration tests verify the boundaries connect. Each test has a unique job.
- **Refactoring is safe.** The acceptance test holds the user-visible behavior. You can restructure internals freely as long as the acceptance test still passes.

### The Sequence

```
User Story
  ↓
Acceptance Test (RED) ──────────────────────── Acceptance Test (GREEN)
  │                                                  ▲
  │   ┌─ Unit test: boundary ────── GREEN ───────────┤
  │   ├─ Unit test: service  ────── GREEN ───────────┤
  │   └─ Unit test: domain   ────── GREEN ───────────┤
  │                                                  │
  └── Integration test: DB query ── GREEN ───────────┘
```

## When to Break the Pyramid

The pyramid is a default, not a dogma. Some situations warrant different proportions:

**CRUD applications with little domain logic:** The domain layer is thin. Integration tests at the API boundary may provide more value than unit tests on trivial pass-through logic. See Khorikov's quadrant model — code with many collaborators but little logic ("controllers") is best covered by integration tests.

**Legacy codebases:** [Characterization tests](../concepts/characterization-tests.md) and [approval tests](../concepts/approval-testing.md) at the acceptance level are often the first viable tests because they don't require understanding internal structure.

**UI-heavy applications:** Component tests and visual regression tests supplement the pyramid. The acceptance level may include screenshot comparisons or accessibility checks.

**Data pipelines:** [Property-based testing](../concepts/property-based-testing.md) at the unit level and integration tests with real data transformations may be more valuable than traditional acceptance tests. See [TDD by Context](../concepts/tdd-by-context.md).

## Common Mistakes

**Testing implementation instead of behavior.** A unit test that asserts a method was called three times with specific arguments is coupled to implementation. A unit test that asserts the output is correct given an input is coupled to behavior. The second survives refactoring; the first breaks on any internal change. See [Output vs. State vs. Communication Testing](../concepts/output-vs-state-vs-communication-testing.md).

**Mocking managed dependencies.** Mocking your own database in integration tests removes the thing you're trying to verify — that the query works. Use real instances for managed dependencies. See [Mocking](../concepts/mocking.md) for when mocks are and aren't appropriate.

**No acceptance tests because "unit tests are enough."** Unit tests verify pieces work in isolation. They can all pass while the system is broken because the pieces don't connect correctly. The acceptance test is the only test that verifies the feature works from the user's perspective.

**Too many acceptance tests.** Acceptance tests are slow and expensive to maintain. Use them as **smoke tests for critical flows** — the paths where a production failure would be an emergency. They are not for edge-case coverage; push that down to unit and integration levels. See the [Author's Position on ATDD](../concepts/atdd.md#authors-position-acceptance-tests-as-critical-flow-smoke-tests).

## Related Pages

- [Integration Testing](../concepts/integration-testing.md)
- [ATDD](../concepts/atdd.md)
- [Outside-In TDD](../concepts/outside-in-tdd.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Domain Model Testing](../concepts/domain-model-testing.md)
- [Output vs. State vs. Communication Testing](../concepts/output-vs-state-vs-communication-testing.md)
- [Mocking](../concepts/mocking.md)
- [Test Doubles](../concepts/test-doubles.md)
- [Property-Based Testing](../concepts/property-based-testing.md)
- [Characterization Tests](../concepts/characterization-tests.md)
- [Approval Testing](../concepts/approval-testing.md)
- [TDD by Context](../concepts/tdd-by-context.md)
- [Four Pillars of Good Tests](../concepts/four-pillars-of-good-tests.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
- [Greenfield Guide](greenfield.md)
- [Brownfield Guide](brownfield.md)
