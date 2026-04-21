---
title: Dan North
type: entity
tags: [dan-north, bdd, given-when-then, naming]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

Dan North is the primary creator of Behaviour-Driven Development (BDD), alongside Chris Matts. He identified that TDD practitioners were systematically misunderstanding TDD due to poor vocabulary, and proposed better words.

## Key Contributions

- **Behaviour-Driven Development (BDD)** — the insight that "test" should be "specification," "test case" should be "scenario," and tests should use the word "should" to force behavioral thinking. See [BDD](../concepts/bdd.md).
- **Given/When/Then** — the scenario structuring pattern that separates context, action, and assertion. Widely adopted beyond BDD itself (used in Gherkin/Cucumber).
- **JBehave** — the first BDD framework (Java), created to demonstrate the vocabulary shift.
- **"Introducing BDD" blog post (2006)** — the original BDD manifesto.

## The Core Insight

> "BDD came from striving to find better words to express ideas." — Dave Farley

The problem wasn't that TDD was wrong. The problem was that the word "test" led practitioners to focus on checking existing code rather than specifying desired behavior before writing code.

North and Matts proposed:
- **Specification** instead of test
- **Scenario** instead of test case
- **Should** prefix to force behavioral framing

## Relationship to TDD

BDD is a refinement of TDD, not a replacement:
- Fine-grained BDD = TDD with better naming conventions
- Large-scale BDD = acceptance testing with domain language (Cucumber, SpecFlow)
- Both levels apply the same principle: focus on behavioral outcomes

## Related Pages

- [BDD](../concepts/bdd.md)
- [ATDD](../concepts/atdd.md)
- [Ubiquitous Language](../concepts/ubiquitous-language.md)
- [Dave Farley](dave-farley.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
