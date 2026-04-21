---
title: CQRS (Command Query Responsibility Segregation)
type: concept
tags: [cqrs, architecture, ddd, testing, vaughn-vernon]
created: 2026-04-21
updated: 2026-04-21
sources: [raw/Implementing Domain-Driven Design.md, "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

CQRS separates the write model (commands that change state) from the read model (queries that return data). This separation has significant implications for testing: command-side and query-side tests have different concerns, different collaborators, and different verification strategies.

## Core Idea

In a traditional CRUD architecture, the same model handles both reads and writes. CQRS splits this into two distinct models:

- **Command model** — aggregates with command methods that enforce business rules and publish [domain events](domain-events.md). Optimized for consistency and invariant enforcement.
- **Query model** — denormalized views/projections optimized for read performance. Often derived from the event stream.

## Testing Implications

CQRS naturally aligns with the testing approaches in this wiki:

### Command-Side Testing

Commands change state and enforce invariants. Test them with [domain model testing](domain-model-testing.md) patterns:

- Verify that commands produce the expected [domain events](domain-events.md)
- Verify that invariants are enforced (rejected commands, exception cases)
- Use [Chicago-style](chicago-vs-london.md) state/output verification — assert on the aggregate's state or emitted events, not on internal method calls

Command-side tests are unit tests: fast, isolated, focused on business rules.

### Query-Side Testing

Queries read denormalized views. Test them differently:

- **Given events, verify projection state.** The projection handler receives events and updates the read model. Test that the correct view state results from a sequence of events.
- **Integration tests for query infrastructure.** The read model often involves database queries, caching, or search indexes. These are boundary concerns best tested with [integration tests](integration-testing.md) using real infrastructure.

### The Testing Benefit

CQRS makes the testing pyramid natural: complex business logic lives in the command model (unit-tested thoroughly), while the query model is simpler (fewer unit tests, more integration tests verifying the projection infrastructure works).

## Connection to CQS (Command Query Separation)

CQS is the method-level principle: a method should either change state (command) or return data (query), never both. CQRS applies this principle at the architectural level.

CQS also connects to the [mock/stub distinction](mocking.md): commands map to mocks (verify outgoing interactions), queries map to stubs (provide return values). See Khorikov's framework in [Mocking](mocking.md).

## Connection to Event Sourcing

CQRS is often paired with [event sourcing](event-sourcing.md), where the command model persists events rather than state. The query model is rebuilt by replaying events through projections. This combination (CQRS/ES) is a natural fit for event-driven testing patterns.

## Related Pages

- [Domain Events](domain-events.md)
- [Domain Model Testing](domain-model-testing.md)
- [Aggregates](aggregates.md)
- [Event Sourcing](event-sourcing.md)
- [Integration Testing](integration-testing.md)
- [Mocking](mocking.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Bounded Context](bounded-context.md)
- [Vaughn Vernon](../entities/vaughn-vernon.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
