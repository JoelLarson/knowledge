---
title: Bounded Context
type: concept
tags: [ddd, bounded-context, eric-evans, vaughn-vernon, architecture, test-boundaries]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md, raw/Implementing Domain-Driven Design.md]
---

A Bounded Context is a boundary within which a domain model is internally consistent. Different contexts may model the same real-world concept differently. It is the primary strategic pattern in DDD and defines the natural boundaries for test scope.

## Core Concept

Within a bounded context, one [Ubiquitous Language](ubiquitous-language.md) applies. The same word (e.g., "Account") can mean entirely different things in different contexts (billing vs. authentication). Each context has its own model, its own code, and its own tests.

> "Explicitly define the context within which a model applies... Name each Bounded Context, and make the names part of the UBIQUITOUS LANGUAGE." — Evans

## Why Bounded Contexts Matter for TDD

### Defining Test Scope

- **Within a context:** Full integration tests are appropriate. Objects share a consistent model and can be tested together.
- **Across contexts:** Use [Test Doubles](test-doubles.md) (mocks, stubs) at the boundary. Never let one context's tests depend on another context's internals.

### What to Mock vs. Integrate

The bounded context boundary is the clearest answer to "what should I mock?"

| Relationship | Test Strategy |
|---|---|
| Same bounded context | Integrate (real collaborators) |
| Different bounded context | Mock/stub at the anti-corruption layer |
| External system | Always mock; use contract tests |

### Anti-Corruption Layer as Test Seam

When Context A consumes Context B, an anti-corruption layer translates between their models. This layer is a natural [test seam](test-doubles.md):

- Stub the ACL to test Context A in isolation
- Contract-test the ACL against Context B's API
- See [Ports and Adapters](ports-and-adapters.md)

## Context Relationships

The following relationship patterns are defined by Evans (Evans, [DDD](../sources/domain-driven-design-evans.md), Ch. 14):

- **Shared Kernel** — two contexts share a subset of the model. Requires coordinated testing.
- **Customer-Supplier** — upstream supplies what downstream needs. Integration tests verify the contract.
- **Conformist** — downstream conforms to upstream's model. Tests verify translation.
- **Anti-Corruption Layer** — downstream protects itself with a translation layer.
- **Open Host Service / Published Language** — upstream provides a well-defined API (Evans, [DDD](../sources/domain-driven-design-evans.md), Ch. 14). Test with contract tests.

## Implementation (from Vernon)

Vernon's SaaSOvation example (Vernon, [Implementing DDD](../sources/implementing-ddd-vernon.md), Part 2) uses three bounded contexts:

- Identity and Access Context
- Collaboration Context
- Agile Project Management Context

Each has its own domain model, repository implementations, and test suite. Integration happens via REST APIs (Open Host Service) with Anti-Corruption Layers on the downstream side. The practical guidance on integration testing across these boundaries — stubbing the ACL, using contract tests at REST endpoints — comes from Vernon's treatment (Vernon, [Implementing DDD](../sources/implementing-ddd-vernon.md)).

## Bounded Contexts Are Not Modules

Evans explicitly distinguishes bounded contexts from code modules (Evans, [DDD](../sources/domain-driven-design-evans.md), Ch. 14). A bounded context may span multiple modules or even multiple applications. The boundary is linguistic and conceptual, not just a package structure.

## Continuous Integration Within a Context

Evans recommends XP-style continuous integration within a single bounded context to prevent model fragmentation (Evans, [DDD](../sources/domain-driven-design-evans.md), Ch. 14). Automated tests are the primary mechanism:

- Merge frequently
- Run all tests on every merge
- Maintain model consistency through shared test suites

## Related Pages

- [Ubiquitous Language](ubiquitous-language.md)
- [Aggregates](aggregates.md)
- [Domain Events](domain-events.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Domain Model Testing](domain-model-testing.md)
- [Test Doubles](test-doubles.md)
- [Strangler Pattern](strangler-pattern.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
- [Eric Evans](../entities/eric-evans.md)
- [Integration Testing](integration-testing.md)
- [Contract-Based Testing](contract-testing.md)
- [Vaughn Vernon](../entities/vaughn-vernon.md)
