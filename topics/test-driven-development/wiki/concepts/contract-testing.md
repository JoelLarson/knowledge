---
title: Contract-Based Testing
type: concept
tags: [contract-testing, integration, microservices, boundaries, consumer-driven]
created: 2026-04-21
updated: 2026-04-21
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md", "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md", "raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md", raw/Implementing Domain-Driven Design.md]
---

Contract-based testing verifies the assumptions that services make about each other's behavior without requiring a full integrated environment. Each team writes tests encoding their assumptions about the other service, and these tests are shared so both sides know when an assumption is violated.

## The Problem It Solves

When multiple services integrate, testing every pair end-to-end creates a combinatorial explosion. A system with 10 services would need 45 pairwise integration tests — each requiring both services running, configured, and in the right state. Contract tests replace this with a linear cost: each service tests its own assumptions independently.

## How It Works

### Consumer-Driven Contracts

The consumer (client) writes tests expressing what it expects from the provider (server):

1. **Consumer team** writes tests encoding their assumptions: "When I send `GET /orders/123`, I expect a JSON response with fields `id`, `status`, and `items`."
2. **These tests are shared** with the provider team (via a shared repository, artifact, or contract broker).
3. **Provider team** runs the consumer's contract tests against their real implementation.
4. **If a contract test fails**, the provider knows they broke a consumer's assumption before deploying.

The contracts flow from consumer to provider — the consumer defines what it needs, not what the provider happens to offer. This is the "consumer-driven" part.

### Provider Verification

The provider runs all consumer contracts as part of its CI pipeline. A breaking change is detected before deployment because the consumer's tests fail against the provider's new code.

## Relationship to Integration Testing

Contract tests are a focused alternative to full [integration tests](integration-testing.md) at service boundaries:

| Dimension | Integration Test | Contract Test |
|-----------|-----------------|---------------|
| **Scope** | Both services running together | Each service tested independently |
| **Speed** | Slow (two services, real network) | Fast (provider tested against contract, consumer tested against stub) |
| **Failure diagnosis** | "Something broke between A and B" | "Service B broke the assumption that Service A depends on" |
| **Ownership** | Often unclear | Consumer owns the contract; provider verifies it |
| **Environment** | Requires integrated environment | Each side runs independently |

Contract tests don't replace integration tests entirely — they replace the need for *most* of them. A small number of end-to-end smoke tests (see [ATDD — Author's Position](atdd.md#authors-position-acceptance-tests-as-critical-flow-smoke-tests)) can verify that the services actually connect in production-like environments.

## Connection to DDD Bounded Contexts

In [Domain-Driven Design](../sources/domain-driven-design-evans.md), [bounded contexts](bounded-context.md) define natural integration boundaries. Contract tests are most valuable at these boundaries:

- **Customer-Supplier** — upstream supplies what downstream needs. Contract tests verify the agreement.
- **Open Host Service / Published Language** — upstream provides a well-defined API. Test with contract tests against the published schema.
- **Anti-Corruption Layer** — downstream translates upstream's model. Contract tests verify the translation assumptions hold.

## Connection to Khorikov's Managed vs. Unmanaged Dependencies

[Khorikov](../entities/vladimir-khorikov.md)'s framework clarifies when contract tests apply. Service-to-service APIs are **unmanaged dependencies** — their communication patterns are visible to external systems and must be preserved. This is exactly where [mocking](mocking.md) is appropriate (see [Author's Position on mocking](mocking.md#authors-position-prefer-alternatives-to-mocks)): mock the provider in consumer tests, then separately verify the provider against the consumer's contract.

## Dave Farley's Position

From [Dave Farley 302](../sources/dave-farley-302-course.md): integration tests should verify that services work at their natural boundaries. Stub out upstream/downstream dependencies. Use contract-based testing to share integration assumptions between teams. This avoids the combinatorial explosion while maintaining confidence.

## Tooling

Common contract testing frameworks include Pact (polyglot, consumer-driven), Spring Cloud Contract (JVM), and Dredd (OpenAPI-driven). The wiki does not endorse a specific tool — the pattern matters more than the implementation.

## Related Pages

- [Integration Testing](integration-testing.md)
- [Bounded Context](bounded-context.md)
- [Mocking](mocking.md)
- [Test Doubles](test-doubles.md)
- [ATDD](atdd.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
