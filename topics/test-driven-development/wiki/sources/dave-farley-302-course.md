---
title: "Dave Farley 302: TDD and BDD — Design Through Testing"
type: source
tags: [tdd, bdd, dave-farley, design, course]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

A structured video course by Dave Farley covering TDD, BDD, design, refactoring, and legacy systems. Emphasizes TDD as a design tool, not merely a testing strategy.

## Course Details

- **Platform:** Continuous Delivery Training
- **Access course:** [cd.training](https://courses.cd.training/courses/tdd-bdd-design-through-testing)

## Course URL
`https://courses.cd.training/courses/take/tdd-bdd-design-through-testing`

## Module Overview

### Module 1: Welcome
Course preview; positions TDD/BDD as a design-through-testing approach.

### Module 2: Introduction to TDD
- [Red-Green-Refactor](../concepts/red-green-refactor.md) as the TDD mantra
- TDD vs. [unit testing](../concepts/tdd-vs-unit-testing.md)
- TDD as "talent amplifier"
- [Properties of good tests](../concepts/good-test-properties.md) vs. unit-testing-after

### Module 3: How to Write Great Tests
- Properties of good tests (UMRANGS+F: Understandable, Maintainable, Repeatable, Atomic, Necessary, Granular, Fast, and First)
- Three types of tests in TDD
- [Dependency injection](../concepts/dependency-injection.md) and [Mocking](../concepts/mocking.md)
- Testing at the edges

### Module 4: TDD and BDD
- [BDD](../concepts/bdd.md) — the importance of naming
- The shape of your tests (Given/When/Then)
- How tests improve design (demo)

### Module 5: TDD Design
- Modern software engineering focus on design
- Common design problems and solutions
- [The importance of refactoring](../concepts/refactoring.md)
- [TDD in legacy systems](../concepts/legacy-code.md)
- Listening to the code
- [Common TDD smells](../concepts/tdd-smells.md)
- [Acceptance Test Driven Development](../concepts/atdd.md)
- TDD top tips

## Central Argument

> "Test driven development is really less about testing and much more about design. But the tests are really nice and a valuable resource that we create as a side effect of focusing on good design."

### TDD as Talent Amplifier
The properties that make code testable (modular, loosely coupled, cohesive, separation of concerns, information hiding) are exactly the properties that make code high quality. Therefore, working to make code testable forces quality properties into code. "TDD makes bad programmers better and great programmers greater."

### Double-Entry Bookkeeping Analogy
TDD provides the same verification that double-entry bookkeeping does for accountants — independent path analysis of results. A programmer without TDD is "only guessing."

### Hygiene Standard
Farley argues TDD is a hygiene standard for professional software development, analogous to Semmelweis's handwashing discovery.

## Key Practical Guidance

- Commit at the end of each red-green-refactor cycle
- Always refactor on green, never on red
- Work in the tiniest possible steps — this distinguishes experts from beginners
- Name tests with "should" prefix to force behavioral thinking
- Mirror the production package structure in test directories

## Related Pages

- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [BDD](../concepts/bdd.md)
- [Good Test Properties](../concepts/good-test-properties.md)
- [Refactoring](../concepts/refactoring.md)
- [Legacy Code](../concepts/legacy-code.md)
- [TDD Smells](../concepts/tdd-smells.md)
- [ATDD](../concepts/atdd.md)
- [Dependency Injection](../concepts/dependency-injection.md)
- [Mocking](../concepts/mocking.md)
- [Dave Farley](../entities/dave-farley.md)
