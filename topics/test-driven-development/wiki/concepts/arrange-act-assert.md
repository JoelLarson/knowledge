---
title: Arrange-Act-Assert (AAA)
type: concept
tags: [aaa, test-structure, test-anatomy, khorikov, meszaros]
created: 2026-04-21
updated: 2026-04-21
sources: ["raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md", "raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md"]
---

Arrange-Act-Assert (AAA) is the most widely used formulation of test structure: set up the preconditions, execute the behavior, verify the result. It is equivalent to the first three phases of Meszaros's [Four-Phase Test](four-phase-test.md) and maps directly to [BDD](bdd.md)'s Given/When/Then.

## The Three Sections

### Arrange (Given)
Set up the system under test and its dependencies in the desired initial state. Create objects, configure fakes, prepare input data.

### Act (When)
Execute the single behavior being tested. This should typically be one method call or one operation — if you need multiple acts, you may be testing multiple behaviors.

### Assert (Then)
Verify that the expected outcome occurred. Check return values, inspect state changes, or verify interactions with [test doubles](test-doubles.md).

## Equivalence to Other Formulations

| AAA | Four-Phase Test (Meszaros) | BDD (Given/When/Then) |
|-----|---------------------------|----------------------|
| Arrange | Setup | Given |
| Act | Exercise | When |
| Assert | Verify | Then |
| *(implicit)* | Teardown | *(implicit)* |

Meszaros adds **Teardown** as an explicit fourth phase because persistent [test fixtures](test-fixture-strategies.md) require cleanup. In modern frameworks with fresh fixtures and garbage collection, teardown is often implicit. See [Four-Phase Test](four-phase-test.md) for the full treatment.

## Khorikov's Guidelines

[Vladimir Khorikov](../entities/vladimir-khorikov.md) provides specific guidance on AAA structure in [Unit Testing: Principles, Practices, and Patterns](../sources/unit-testing-khorikov.md):

- **One Act per test.** Multiple act sections in a unit test indicate the test verifies multiple behaviors. Split it.
- **Arrange is the largest section.** Complex arrange sections can be extracted into factory methods or [Object Mother](test-organization-patterns.md) patterns.
- **Assert should be focused.** Multiple assertions are fine if they verify different facets of the *same* outcome. Multiple assertions verifying *different* outcomes suggest multiple tests.
- **Integration tests are an exception.** Multiple act sections are acceptable in integration tests when verifying multi-step workflows, since the cost of setup makes separate tests impractical.

## Connection to BDD

The AAA pattern and [BDD](bdd.md)'s Given/When/Then are structurally identical. The difference is vocabulary:

- AAA uses implementation language (arrange, act, assert)
- Given/When/Then uses behavioral language (given context, when action, then outcome)

BDD's vocabulary is preferred in this wiki because it encourages behavioral thinking — describing what the system *does*, not how the test is *structured*. But the underlying pattern is the same.

## Related Pages

- [Four-Phase Test](four-phase-test.md)
- [BDD](bdd.md)
- [Good Test Properties](good-test-properties.md)
- [Test Fixture Strategies](test-fixture-strategies.md)
- [Test Organization Patterns](test-organization-patterns.md)
- [Output vs. State vs. Communication Testing](output-vs-state-vs-communication-testing.md)
- [SUT and DOC](sut-and-doc.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
- [Gerard Meszaros](../entities/gerard-meszaros.md)
- [Unit Testing (Khorikov)](../sources/unit-testing-khorikov.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
