---
title: Domain Events
type: concept
tags: [ddd, domain-events, vaughn-vernon, eric-evans, event-sourcing, cqrs, testing]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md, raw/Implementing Domain-Driven Design.md]
---

Domain Events are first-class model elements representing something significant that happened in the domain. They sit alongside Entities and [Value Objects](value-objects.md) as building blocks. Events enable event-driven testing, temporal assertions, decoupled integration, and audit verification.

## Core Concept

A domain event captures a state change that domain experts care about. It is named as a past-tense verb phrase in the [Ubiquitous Language](ubiquitous-language.md):

- `TenantProvisioned`
- `OrderPlaced`
- `BacklogItemCommitted`
- `UserPasswordChanged`

Events are immutable facts. Once published, they cannot be changed.

## Why Domain Events Matter for TDD

### Event-Based Assertions

Instead of inspecting aggregate internal state, assert that the correct events were published:

```
// Instead of peeking at internal state:
backlogItem.commitToSprint(sprint)
assertPublished(BacklogItemCommitted(backlogItemId, sprintId))
```

This tests behavior (what happened) rather than state (what it looks like inside), aligning with [BDD](bdd.md) principles.

### Decoupled Integration Testing

Events decouple bounded contexts. Test each side independently:

1. **Publisher side:** Assert the aggregate publishes the right event with correct data
2. **Subscriber side:** Given an event, assert the receiving context handles it correctly

No need to wire two contexts together in a unit test.

### Temporal and Audit Testing

Events carry timestamps and capture the full history of state changes. Tests can verify:

- Correct ordering of events
- Time-based business rules
- Complete audit trails
- Regulatory compliance (every change tracked)

### Event Sourcing Testing

When using Event Sourcing (persisting events instead of current state):

- **Given** a stream of past events
- **When** a command is executed
- **Then** new events are produced

This maps perfectly to Given/When/Then ([BDD](bdd.md)) and makes tests highly readable.

## Domain Events in Architecture (Vernon)

### CQRS Integration

With CQRS, the command model publishes events and the query model subscribes:

- Command-side tests: verify event publication
- Query-side tests: given events, verify projection/view updates
- Tests for each side are independent and fast

### Pipes and Filters

Events flow through processing pipelines. Each filter:

- Receives an event
- Processes it
- Publishes a new event

Each filter is testable in isolation with simple input/output assertions.

### Long-Running Processes (Sagas)

Multi-step business processes are orchestrated via events. Test each step independently:

- Step receives event, performs action, publishes next event
- Saga completion is verifiable by asserting all expected events were published

## Event Design Principles

- **Immutable** — events are facts; never modify after creation
- **Named in ubiquitous language** — domain experts should recognize event names
- **Self-contained** — carry enough data for subscribers to act without callbacks
- **Past tense** — they represent something that already happened
- **Domain-scoped** — not technical events (like "RowInserted"), but business events

## Connection to TDD Practice

Domain events provide natural assertion points that are:

- Behavioral (what happened, not how)
- Decoupled (no need to inspect internal state)
- Readable (named in domain language)
- Composable (test complex workflows step-by-step)

They bridge [Aggregates](aggregates.md) (which publish events) and [Bounded Context](bounded-context.md) integration (which consumes events), providing testable contracts at every boundary.

## Related Pages

- [Aggregates](aggregates.md)
- [Bounded Context](bounded-context.md)
- [Domain Model Testing](domain-model-testing.md)
- [Value Objects](value-objects.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [BDD](bdd.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
