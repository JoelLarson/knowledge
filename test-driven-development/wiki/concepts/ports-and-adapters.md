---
title: Ports and Adapters (Hexagonal Architecture)
type: concept
tags: [ports-and-adapters, hexagonal, architecture, testability, alistair-cockburn, london-school]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

Ports and Adapters (also called Hexagonal Architecture, coined by [Alistair Cockburn](../entities/alistair-cockburn.md)) is an architectural pattern where the application core is isolated from external concerns through ports (interfaces) and adapters (implementations). This pattern is a natural consequence of TDD and a prerequisite for effective [Dependency Injection](dependency-injection.md).

## Core Structure

```
        ┌─────────────────────┐
        │   Application Core  │
        │   (business logic)  │
        │                     │
  Port ←│→ Interface          │← Port
        └─────────────────────┘
           ↑            ↑
       Adapter       Adapter
     (real DB)     (mock DB in tests)
```

- **Port** — an interface that defines what the application needs from the outside world (or what it offers to the outside world)
- **Adapter** — a concrete implementation: the real database, a REST controller, or a test double

## Why It Matters for TDD

The pattern makes code testable by construction:
- The application core depends only on ports (interfaces), not on concrete adapters
- Tests inject test doubles (mocks, stubs, fakes) through the same ports
- No test needs a real database, filesystem, or network

This is [Dependency Injection](dependency-injection.md) at the architectural level.

## Ports and Adapters for Tests (Farley)

Farley uses the ports and adapters pattern specifically for [acceptance test](atdd.md) architecture:

> "We can raise the level of abstraction of the tests, introduce a level of indirection beneath them and fake out those interactions. Now if the system changes, we can fix it in one place by fixing the abstraction."

The four-layer acceptance test structure (test cases → DSL → translation layer → SUT) is ports and adapters applied to testing.

## Connection to SOLID

- **Dependency Inversion Principle** — high-level modules depend on abstractions (ports), not concretions (adapters)
- **Interface Segregation** — ports should be narrow, focused on what the consumer needs
- **Open/Closed** — new adapters can be added without modifying the core

See [SOLID Principles](solid-principles.md).

## GOOS: Ports and Adapters as Natural Architecture

[Growing Object-Oriented Software](../sources/growing-oo-software-freeman-pryce.md) argues that consistently applying separation of concerns and higher levels of abstraction naturally pushes code toward a ports-and-adapters architecture.

### The GOOS Formulation
> "The code for the business domain is isolated from its dependencies on technical infrastructure, such as databases and user interfaces. We write interfaces to describe its relationships with the outside world in its terminology (Cockburn's ports). Then we write bridges between the application core and each technical domain (Cockburn's adapters)." — Freeman & Pryce

### "Only Mock Types You Own"
This is the key GOOS heuristic for ports and adapters:
- Never mock third-party APIs directly (you don't fully understand their behavior)
- Write adapter objects that implement your domain interfaces using the third-party API
- Keep adapters **thin** to minimize hard-to-test code
- Test adapters with focused integration tests
- Mock your own domain interfaces (ports) in unit tests

### Adapter Objects for Events
When external libraries deliver events (callbacks), the adapter:
1. Receives external events in the library's format
2. Translates them into domain events
3. Calls back to application objects through domain-defined interfaces

In tests, you mock the application callback interfaces to verify the adapter translates correctly.

### Connection to Context Independence
GOOS's "context independence" principle says objects should not know about the system they run in. Ports and adapters enforces this at the architectural level: domain objects only know about ports (interfaces in their own vocabulary), never about the infrastructure behind them.

## DDD's Anti-Corruption Layer

In Domain-Driven Design, the Anti-Corruption Layer (ACL) is a specialized application of Ports and Adapters at [Bounded Context](bounded-context.md) boundaries. When your domain model must integrate with an external system or a different bounded context, the ACL translates between models.

Evans defines it as "a mechanism that translates conceptual objects and actions from one model and protocol to another." It is implemented as a combination of Facades, Adapters, and translators — the same adapter pattern at a strategic level.

### Testing Implications

The ACL is a natural test seam:
- **Stub the ACL** to test your domain model in complete isolation from external contexts
- **Contract-test the ACL** against the remote system's API to verify the translation
- **Integration-test through the ACL** to verify end-to-end communication

Vernon recommends implementing ACLs as Domain Services or behind Repository interfaces. Either way, they follow the port/adapter pattern and are substitutable with [Test Doubles](test-doubles.md) in tests.

### Example Architecture

```
Your Bounded Context
  └─ Domain Model (tested with in-memory adapters)
  └─ Anti-Corruption Layer (port)
       └─ REST Client Adapter (real, for production)
       └─ Stub Adapter (for testing)
           └─ Returns domain-translated objects
```

This extends hexagonal architecture from "isolate from infrastructure" to "isolate from other domains" — a higher-level application of the same principle.

See [Bounded Context](bounded-context.md), [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md), [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md).

## Related Pages

- [Alistair Cockburn](../entities/alistair-cockburn.md)
- [Dependency Injection](dependency-injection.md)
- [SOLID Principles](solid-principles.md)
- [ATDD](atdd.md)
- [Strangler Pattern](strangler-pattern.md)
- [Mocking](mocking.md)
- [Test Doubles](test-doubles.md)
- [Tell, Don't Ask](tell-dont-ask.md)
- [London School TDD](london-school-tdd.md)
- [Outside-In TDD](outside-in-tdd.md)
- [Bounded Context](bounded-context.md)
- [Aggregates](aggregates.md)
- [Domain Model Testing](domain-model-testing.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
