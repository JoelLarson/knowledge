---
title: Eric Evans
type: entity
tags: [eric-evans, ddd, ubiquitous-language, bounded-context, foundational]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md]
---

Eric Evans is the creator of Domain-Driven Design and author of the foundational "blue book" (2003). His work defines the vocabulary and patterns that shape how test boundaries, naming, and architecture are approached in complex domains.

## Key Contributions

- **Domain-Driven Design** — coined the term and defined the discipline in [Domain-Driven Design: Tackling Complexity in the Heart of Software](../sources/domain-driven-design-evans.md) (2003)
- **Ubiquitous Language** — the practice of using a shared vocabulary between developers and domain experts in code, tests, and conversation. See [Ubiquitous Language](../concepts/ubiquitous-language.md).
- **Bounded Context** — the strategic pattern defining where a model is consistent. See [Bounded Context](../concepts/bounded-context.md).
- **Aggregates** — clusters of objects with invariants enforced at transaction boundaries. See [Aggregates](../concepts/aggregates.md).
- **Value Objects** — immutable, identity-less objects. See [Value Objects](../concepts/value-objects.md).
- **Anti-Corruption Layer** — translation mechanism protecting a model from external influence
- **Refactoring Toward Deeper Insight** — elevating refactoring from code mechanics to model improvement

## Connection to TDD

Evans explicitly assumes Agile/XP practices and automated testing:
- "A suite of automated unit tests allows relatively safe experimentation with the code"
- Repositories should allow "easy substitution of a dummy implementation, for use in testing"
- The iterative cycle of knowledge crunching, model refinement, and code refactoring depends on test safety nets
- Endorsed by [Kent Beck](kent-beck.md): "This book belongs on the shelf of every thoughtful software developer"

## Legacy

Evans' work influenced:
- [Vaughn Vernon](vaughn-vernon.md)'s [Implementing DDD](../sources/implementing-ddd-vernon.md) (2013) — the practical companion
- [BDD](../concepts/bdd.md) — BDD's emphasis on domain language in tests traces directly to ubiquitous language
- Hexagonal Architecture / [Ports and Adapters](../concepts/ports-and-adapters.md) — Evans' separation of domain from infrastructure
- Modern microservices — bounded contexts became the basis for service boundaries

## Related Pages

- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Vaughn Vernon](vaughn-vernon.md)
- [Ubiquitous Language](../concepts/ubiquitous-language.md)
- [Bounded Context](../concepts/bounded-context.md)
- [Aggregates](../concepts/aggregates.md)
- [Value Objects](../concepts/value-objects.md)
- [Domain Events](../concepts/domain-events.md)
- [Kent Beck](kent-beck.md)
- [Martin Fowler](martin-fowler.md)
