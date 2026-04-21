---
title: Value Objects
type: concept
tags: [ddd, value-objects, eric-evans, vaughn-vernon, immutability, testing, property-based-testing]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md, raw/Implementing Domain-Driven Design.md]
---

Value Objects are immutable domain objects defined entirely by their attributes, with no conceptual identity. They are the easiest DDD building block to test: no mutable state, no identity concerns, pure functions, and ideal for property-based testing.

## Core Concept (Evans)

> "When you care only about the attributes of an element of the model, classify it as a VALUE OBJECT. Make it express the meaning of the attributes it conveys and give it related functionality. Treat the VALUE OBJECT as immutable."

Key characteristics:
- **Immutable** — once created, never changed
- **Equality by value** — two value objects are equal if all their attributes are equal
- **No identity** — no ID field, no "who"; only "what"
- **Side-effect-free operations** — methods return new values rather than mutating state
- **Conceptual whole** — attributes form a coherent unit (e.g., Address = street + city + zip, not separate fields on Person)

## Examples

- `Money(amount=10.00, currency=USD)` — not "which ten dollars" but "ten dollars"
- `Address(street, city, postalCode)` — a description, not a tracked entity
- `DateRange(start, end)` — a span of time
- `Color(r, g, b)` — a visual property
- `Route(origin, destination, waypoints)` — can reference entities but is itself a value

## Why Value Objects Are Trivially Testable

### No State Management
Since value objects are immutable, every test starts clean. No setup/teardown of mutable state. No temporal coupling between tests.

### Pure Functions
Operations on value objects are side-effect-free: given the same inputs, always the same output. This is the ideal for [repeatable tests](good-test-properties.md).

### Value Equality
Testing equality is straightforward — compare attributes. No identity confusion (are these the "same" object or "equal" objects?).

### Property-Based Testing

Value objects are ideal candidates for property-based testing because:
- Commutativity: `a.add(b) == b.add(a)` for Money
- Immutability: `operation(vo)` never changes `vo`
- Idempotency: creating the same VO twice produces equal objects
- Invariants: a DateRange always has `start <= end`

```
// Property: Money addition is commutative
forAll(money1, money2 with same currency) {
    assert money1.add(money2) == money2.add(money1)
}

// Property: Value object equality is reflexive
forAll(address) {
    assert address == Address(address.street, address.city, address.zip)
}
```

### No Mocking Required

Value objects have no dependencies to mock. They don't call services, don't access databases, don't publish events. They are self-contained computations.

## Value Objects as Aggregate Components

Value objects are frequently attributes of Entities and [Aggregates](aggregates.md). They encapsulate domain logic that would otherwise bloat the entity:

- An Order (entity) has a `ShippingAddress` (value object)
- A Product (entity) has a `Price` (value object) with currency conversion logic
- A Person (entity) has a `Name` (value object) with formatting rules

Testing the value object separately keeps aggregate tests focused on aggregate-level invariants.

## Design Guidance

- **Make them immutable** — this is non-negotiable
- **Make them replaceable** — operations return new instances
- **Make them shareable** — since they're immutable, multiple objects can reference the same instance safely
- **Keep them conceptually whole** — all attributes should belong together

## Connection to TDD Practice

Value objects are often the first things you TDD in a domain model because:
1. They have no dependencies — no setup complexity
2. They have clear, expressible behavior — easy to name tests
3. They form a foundation other objects build upon
4. They demonstrate the [Ubiquitous Language](ubiquitous-language.md) in its purest form

Start with value objects, then build entities that use them, then compose into aggregates.

## Related Pages

- [Aggregates](aggregates.md)
- [Domain Model Testing](domain-model-testing.md)
- [Domain Events](domain-events.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [Good Test Properties](good-test-properties.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
- [Property-Based Testing](property-based-testing.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
