---
title: Domain Model Testing
type: concept
tags: [ddd, testing, aggregates, domain-events, ubiquitous-language, tdd, bdd]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md, raw/Implementing Domain-Driven Design.md]
---

Domain model testing is the practice of testing a rich domain model through its aggregate roots, asserting invariants and domain event publication, using the ubiquitous language in test names. It combines DDD's tactical patterns with TDD discipline.

## Principles

### 1. Test Through the Aggregate Root

The [aggregate root](aggregates.md) is the only public entry point. Tests should:

- Create aggregates through factories or constructors
- Invoke behavior through the root's command methods
- Assert invariants and published [Domain Events](domain-events.md)
- Never reach into internal entities or directly manipulate internal state

### 2. Use the Ubiquitous Language in Test Names

Test names should be readable by domain experts:

```
// Good: domain language
shouldRejectOrderWhenCreditLimitExceeded()
shouldPublishBacklogItemCommittedWhenSprintAssigned()
shouldCalculateShippingCostBasedOnDestinationZone()

// Bad: technical language
testAddMethodThrowsException()
testEventFired()
testSetValueUpdatesField()
```

See [Ubiquitous Language](ubiquitous-language.md) and [BDD](bdd.md).

### 3. Assert Invariants, Not Implementation

Test what must be true (business rules), not how it's achieved:

```
// Good: tests the invariant
order.addItem(product, qty=5)
assert order.total() == product.price * 5

// Bad: tests implementation detail
assert order.items.size() == 1
assert order.items[0].quantity == 5
```

### 4. Assert Domain Events for Side Effects

When an operation should notify other parts of the system, assert the event rather than checking downstream effects:

```
customer.changeAddress(newAddress)
assertPublished(CustomerAddressChanged(customerId, newAddress))
```

### 5. Test Value Objects in Isolation

[Value objects](value-objects.md) are pure, immutable, and dependency-free. Test them separately from aggregates. They're ideal for exhaustive and property-based testing.

## Testing Architecture

### In-Memory Repositories

Both Evans and Vernon recommend in-memory repository implementations for testing:

- Same interface as production repositories
- Backed by a simple collection (HashMap, List)
- No database, no I/O, instant execution
- See [Ports and Adapters](ports-and-adapters.md)

### The Test-First DDD Workflow (Vernon)

1. Write a test showing how a client uses the domain object
2. Create minimal domain object to compile
3. Refactor both until the test reflects proper domain usage
4. Implement until tests pass
5. Validate with domain experts that the ubiquitous language is correct

### Realistic Test Data

> "Test data must be realistic and support and enhance the desired expressiveness. Otherwise, domain experts cannot make a complete judgment about the implementation." — Vernon

Use domain-meaningful values, not `"test123"` or `42`. Use `Money(150.00, USD)` not `Money(1, X)`.

## Testing Patterns by DDD Building Block

| Building Block | What to Test | How to Assert |
|---|---|---|
| Value Object | Immutability, equality, computation | Direct value comparison |
| Entity | Identity, lifecycle, behavior | State + events |
| Aggregate | Invariants, transactional consistency | Root API + events |
| Domain Event | Correct publication, correct data | Event assertions |
| Domain Service | Orchestration, cross-aggregate logic | Return values + events |
| Repository | Round-trip persistence | Save then retrieve |

## Event-Sourced Testing

When using Event Sourcing, tests follow a natural Given/When/Then:

```
// Given: historical events
given(OrderCreated(orderId, customerId),
      ItemAdded(orderId, productId, qty=2))

// When: new command
when(order.addItem(anotherProduct, qty=1))

// Then: new events produced
then(ItemAdded(orderId, anotherProductId, qty=1))
```

This maps perfectly to [BDD](bdd.md)'s Given/When/Then structure.

## CQRS Testing

With CQRS, test command and query sides independently:

**Command side:**

- Test aggregate behavior and event publication
- No read model concerns

**Query side (projections):**

- Given a stream of events, assert the read model state
- Test denormalization logic in isolation

## Anti-Patterns

- **Testing across aggregate boundaries** — leads to brittle, slow tests
- **Testing internal aggregate state** — couples tests to implementation
- **Using production infrastructure in unit tests** — use in-memory adapters
- **Technical test names** — loses the documentation value of tests
- **Testing only happy paths** — aggregate invariant violations are critical to verify

## Related Pages

- [Aggregates](aggregates.md)
- [Value Objects](value-objects.md)
- [Domain Events](domain-events.md)
- [Bounded Context](bounded-context.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [BDD](bdd.md)
- [Test First](test-first.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Good Test Properties](good-test-properties.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Test Doubles](test-doubles.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Integration Testing](integration-testing.md)
- [Property-Based Testing](property-based-testing.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
