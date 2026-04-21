---
title: Aggregates
type: concept
tags: [ddd, aggregates, eric-evans, vaughn-vernon, testing, invariants, transactional-consistency]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md, raw/Implementing Domain-Driven Design.md]
---

An Aggregate is a cluster of domain objects treated as a single unit for data changes. The aggregate root is the sole entry point. Aggregates are the natural unit of testing in DDD — they define transaction boundaries, enforce invariants, and encapsulate internal structure.

## Core Rules (Evans)

1. The **root Entity** has global identity. Internal entities have local identity only.
2. Nothing outside the aggregate can hold a persistent reference to anything inside, except the root.
3. Only aggregate roots can be obtained via database queries. Internal objects are found by traversal.
4. Objects within an aggregate can reference other aggregate roots.
5. A delete removes everything within the aggregate boundary.
6. When any change is committed, all invariants of the entire aggregate must be satisfied.

## Why Aggregates Are the Natural Test Unit

### Invariants Define Assertions

An aggregate's invariants are consistency rules that must hold after every transaction. These invariants are exactly what tests should assert:

```
// The aggregate enforces: order total = sum of line items
order.addLineItem(product, quantity: 3, price: 10.00)
assert order.total() == 30.00

// The aggregate enforces: cannot exceed credit limit
assertThrows(() => order.addLineItem(expensiveProduct))
```

### Root as Test Entry Point

All interaction goes through the aggregate root. This means:
- Tests have a single, clear entry point
- Internal structure is encapsulated (tests don't depend on internals)
- The public API of the root defines the test surface

### Transaction Boundary = Test Boundary

Each test operates on one aggregate transaction. Test setup creates the aggregate, the test performs operations through the root, and assertions verify the invariants hold.

## Aggregate Design Guidance (Vernon)

### Prefer Small Aggregates

> "Smaller Aggregates not only perform and scale better, they are also biased toward transactional success."

Small aggregates are easier to test:
- Less setup required
- Fewer states to cover
- Invariants are clearer
- Faster test execution

### Protect True Invariants, Not False Ones

Only cluster objects that genuinely must be consistent within a single transaction. False invariants lead to oversized aggregates that are hard to test and slow to run.

### Use Domain Events Between Aggregates

When consistency between aggregates can be eventual rather than immediate, use [Domain Events](domain-events.md) to communicate. Test the event publication from one aggregate and the event handling in another, independently.

## Testing Patterns for Aggregates

### Direct Invariant Testing
Test that the aggregate rejects invalid state transitions and maintains consistency rules.

### Event-Based Testing
Assert that command methods publish the correct [Domain Events](domain-events.md):
```
backlogItem.commitToSprint(sprint)
assertPublished(BacklogItemCommitted(backlogItemId, sprintId))
```

### Factory Method Testing
Aggregates often have factory methods on the root for creating internal entities. Test that these enforce aggregate rules.

### Repository-Based Testing
Use in-memory repository implementations to test aggregate persistence round-trips without infrastructure. See [Ports and Adapters](ports-and-adapters.md).

## Connection to TDD Workflow

Vernon prescribes test-first development of aggregates:
1. Write a test showing how a client uses the aggregate
2. Create minimal code to compile
3. Refactor until the test represents proper domain usage
4. Implement until the test passes
5. Verify with domain experts that the [Ubiquitous Language](ubiquitous-language.md) is correct

## Related Pages

- [Domain Model Testing](domain-model-testing.md)
- [Domain Events](domain-events.md)
- [Value Objects](value-objects.md)
- [Bounded Context](bounded-context.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Test First](test-first.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
