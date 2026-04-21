---
title: Need-Driven Development
type: concept
tags: [need-driven, london-school, interface-discovery, outside-in, steve-freeman, nat-pryce]
created: 2026-04-21
updated: 2026-04-21
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

Need-driven development is the design philosophy behind the [London school](london-school-tdd.md)'s interface discovery workflow. Interfaces are pulled into existence by the *needs of their clients*, not pushed out from the *capabilities of their implementors*. The term was coined by [Steve Freeman](../entities/steve-freeman.md) and [Nat Pryce](../entities/nat-pryce.md) in [Growing Object-Oriented Software, Guided by Tests](../sources/growing-oo-software-freeman-pryce.md) (Ch. 6).

## The Core Insight

In traditional development, you build a component and then figure out how to use it. In need-driven development, you discover what a component should do by writing the code that *needs* it first.

The sequence:

1. Object A is being implemented and needs help from a collaborator that doesn't exist yet
2. In A's test, you write a mock expectation describing the message A wants to send
3. The mock expectation defines the collaborator's interface — from A's perspective, not from the collaborator's internal logic
4. You create the minimal interface that satisfies the expectation
5. Later, you implement the real collaborator, discovering what *it* needs in turn

The result: interfaces shaped by their consumers, not their implementors. Each interface is narrow, role-based, and expresses exactly the communication the client needs — nothing more.

## Relationship to Outside-In TDD

Need-driven development is the design mechanism that powers [Outside-In TDD](outside-in-tdd.md). The double loop starts at the system boundary (acceptance test) and works inward. At each layer, the developer discovers what the next layer should provide by expressing their *need* for it in a test. The worked example in [Outside-In TDD](outside-in-tdd.md) demonstrates this: the cart route test discovers `CartService`, and the cart service test discovers `ProductCatalog` — each interface emerging from client need.

## Author's Position

This wiki values the *insight* of need-driven development — design from the consumer's perspective — while rejecting the London school's typical *mechanism* of mock expectations for intra-system communications. See [Author's Position on Chicago vs. London](chicago-vs-london.md#authors-position-chicago-as-default-london-as-containment).

You can practice need-driven development without mocks. Write the test that uses the interface you wish existed, implement a fake or test-specific implementation, and later build the real thing. The design benefit (consumer-shaped interfaces) comes from writing the client code first, not from the specific test double you use.

## Related Pages

- [London School TDD](london-school-tdd.md)
- [Outside-In TDD](outside-in-tdd.md)
- [Mocking](mocking.md)
- [Test Doubles](test-doubles.md)
- [Dependency Injection](dependency-injection.md)
- [Tell, Don't Ask](tell-dont-ask.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Steve Freeman](../entities/steve-freeman.md)
- [Nat Pryce](../entities/nat-pryce.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
