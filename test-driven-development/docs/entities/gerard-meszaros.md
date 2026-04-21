---
title: Gerard Meszaros
type: entity
tags: [person, author, xunit, test-patterns, test-doubles]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

Author of [xUnit Test Patterns: Refactoring Test Code](../sources/xunit-test-patterns-meszaros.md) (2007). A pioneer in the patterns community and early adopter of eXtreme Programming who formalized the vocabulary and patterns of automated test development.

## Key Contributions

### Test Double Taxonomy
Defined the canonical [[test-doubles]] vocabulary: Dummy Object, Test Stub, Test Spy, Mock Object, Fake Object. This resolved widespread confusion in the testing community where "mock" was used loosely for all types of test substitutes.

### Test Smell Catalog
Extended the "code smell" concept (from Fowler's _Refactoring_) to test code, creating the comprehensive [[test-smells-catalog]]: Code Smells, Behavior Smells, and Project Smells.

### SUT/DOC Terminology
Formalized [System Under Test (SUT) and Depended-On Component (DOC)](../concepts/sut-and-doc.md) as standard vocabulary for all levels of testing.

### Pattern Catalog
Documented 68+ patterns across test strategy, xUnit basics, fixture setup, result verification, fixture teardown, test doubles, test organization, database testing, design-for-testability, and value patterns.

### Humble Object Pattern
Created the [[humble-object]] pattern for making hard-to-test code (UI, threading, containers) testable by extracting logic into decoupled components.

### Four-Phase Test
Codified the [[four-phase-test]] structure (Setup, Exercise, Verify, Teardown) as the canonical test method pattern.

## Background

- Software development consultant at ClearStream Consulting (Calgary, Canada)
- Pioneer in the patterns community (active at PLoP conferences since 1994)
- Early adopter of eXtreme Programming (1999, shortly after OOPSLA where Kent Beck presented XP)
- Discovered key test automation patterns (Creation Method, Fragile Test, Anonymous Creation Method) on his first XP project circa 2000
- First presented test patterns at XP2001 conference
- Maintained xunitpatterns.com as a living reference

## Context in TDD History

Meszaros occupies a unique position: he formalized the *testing infrastructure* vocabulary that underlies TDD practice. While [[kent-beck]] defined TDD itself and [[martin-fowler]] defined refactoring, Meszaros defined how to talk about and structure the tests themselves.

His work was endorsed by both Fowler (who wrote the Foreword and included the book in his signature series) and Robert C. Martin (who reviewed early drafts).

## Related Pages

- [[xunit-test-patterns-meszaros]]
- [[test-doubles]]
- [[test-smells-catalog]]
- [[four-phase-test]]
- [[humble-object]]
- [[sut-and-doc]]
- [[xunit]]
- [[kent-beck]]
