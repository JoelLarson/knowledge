---
title: Behaviour-Driven Development (BDD)
type: concept
tags: [bdd, naming, given-when-then, dan-north, dave-farley, specification]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

BDD began as a better way to teach TDD. It addresses the widespread failure of TDD adoption by providing better vocabulary that focuses on behavioral outcomes rather than implementation detail.

## Origin

BDD emerged from a consulting group that observed practitioners systematically misunderstanding TDD. They would hear "write automated tests" and conclude: write lots of unit tests after the code is finished. Coverage became the metric, not behavior specification.

Dan North and Chris Matts drove the key ideas: **TDD was right, but using the wrong words.**

> "Test is the wrong word, should be specification. Test case is the wrong word, we're trying to capture scenarios." — Dave Farley

## Key Vocabulary Shift

| TDD Word | BDD Word |
|----------|----------|
| Test | Specification / Scenario |
| Test case | Scenario |
| Assert | Should |
| Test class | Behaviour |

## Given / When / Then

The BDD structure for expressing a test as a scenario:

- **Given** — the initial context / pre-conditions
- **When** — the action or event
- **Then** — the expected outcome

This structure forces behavioral thinking. It separates setup, stimulus, and assertion.

## The "Should" Prefix

Starting a test name with "should" forces a behavioral, outcome-focused statement:

- `should_return_zero_for_empty_string` (behavioral)
- `testEmptyString` (implementation)

English grammar: if you start a sentence with "should," you're far more likely to describe an outcome than an implementation.

## BDD is a Design Tool

> "BDD is quite widely misunderstood." — Dave Farley

BDD is not just about Cucumber or SpecFlow (though those implement BDD at acceptance test level). At its core, BDD is about:

1. Writing all tests (even fine-grained unit-level tests) focused on behavioral outcomes
2. Creating the minimum coupling between the test and the system under test
3. Designing from the outside in

**BDD at fine-grained level:** A test named `should_add_two_numbers` is BDD. It doesn't care how addition is implemented.

**BDD at acceptance level:** Cucumber/SpecFlow/Behave tests that read as user stories.

Both are BDD. The fine-grained level is often more important.

## Coverage Is a Poor Target

> "Coverage is a good outcome and a poor target." — Dave Farley

A team that chases 80% coverage may produce tests with no assertions. Coverage is automatic when you do test-first correctly. See [TDD Smells](tdd-smells.md) (The Liar).

## Naming Best Practices

Good naming is critical to BDD's value as documentation. From Farley:

- Be explicit — say what the code does
- Pick clear names, avoid abbreviations unless widely understood
- Avoid jargon from outside the problem domain
- Keep classes, functions, methods small (one thing each)
- Avoid comments — make the code express its intent
- Use the ubiquitous language of the problem domain (Eric Evans / DDD)
- Name tests for behavior, not for method-under-test

### Bad Names
`Galaxy`, `data`, `manager`, `x`, `a`, `setObjectValue`, `text` — too vague, no domain meaning.

### Good Names
`Customer`, `LineItem`, `OrderBook`, `shouldAddTwoNumbers`, `placeOrderForBook`.

## BDD vs ATDD

[Acceptance Test Driven Development](atdd.md) (ATDD) is the application of BDD principles at the feature/story level, typically written before development begins and owned by the whole team. BDD is the philosophy; ATDD is an application of it at scale.

## DDD Connection: Domain Language in Tests

BDD's insistence on domain vocabulary in tests connects directly to DDD's [Ubiquitous Language](ubiquitous-language.md). Evans (2003) established that the team must share a single language used in code, conversations, and specifications. BDD operationalizes this for testing:

- BDD test names use the same terms domain experts use
- Given/When/Then scenarios read as domain narratives
- [Aggregate](aggregates.md) behavior is expressed in domain language, not technical terms
- [Domain events](domain-events.md) (past-tense verb phrases) naturally map to "Then" clauses

Vernon explicitly connects the two: tests should be demonstrable to domain experts, and "reading the demonstrative clientlike test code must reveal the proper expressiveness using the Ubiquitous Language."

This means BDD is not just a TDD vocabulary improvement — it is the testing expression of DDD's core linguistic discipline. See [Domain Model Testing](domain-model-testing.md) for practical patterns.

## Related Pages

- [Test First](test-first.md)
- [ATDD](atdd.md)
- [Good Test Properties](good-test-properties.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [TDD Smells](tdd-smells.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [Domain Model Testing](domain-model-testing.md)
- [Aggregates](aggregates.md)
- [Domain Events](domain-events.md)
- [Dan North](../entities/dan-north.md)
- [Dave Farley](../entities/dave-farley.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
