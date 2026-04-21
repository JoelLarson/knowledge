---
title: "xUnit Test Patterns: Refactoring Test Code — Gerard Meszaros"
type: source
tags: [testing, patterns, test-smells, test-doubles, xunit]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

The definitive pattern catalog for xUnit-based test automation. Meszaros formalizes vocabulary (SUT, DOC, test double taxonomy), catalogs test smells, and provides 68+ patterns for writing maintainable automated tests.

## Book Metadata

- **Author:** Gerard Meszaros
- **Published:** 2007, Addison-Wesley (Martin Fowler Signature Series)
- **ISBN:** 978-0-13-149505-0
- **Pages:** ~900
- **Focus:** Pattern language for automated developer testing with xUnit frameworks

## Structure

The book is organized into four parts:

### Part I — The Narratives (Chapters 1–14)
Narrative introductions to key topics: test smells, goals of test automation, philosophy, principles, strategy, xUnit basics, fixture management, result verification, test doubles, test organization, database testing, and a roadmap.

### Part II — The Test Smells (Chapters 15–17)
Comprehensive smell catalog organized into three categories:
- **Code Smells** (Ch. 15): Obscure Test, Conditional Test Logic, Hard-to-Test Code, Test Code Duplication, Test Logic in Production
- **Behavior Smells** (Ch. 16): Assertion Roulette, Erratic Test, Fragile Test, Frequent Debugging, Manual Intervention, Slow Tests
- **Project Smells** (Ch. 17): Buggy Tests, Developers Not Writing Tests, High Test Maintenance Cost, Production Bugs

### Part III — The Patterns (Chapters 18–27)
The pattern catalog, organized by concern:
- **Test Strategy Patterns** (Ch. 18): Recorded Test, Scripted Test, Data-Driven Test, Test Automation Framework, Minimal Fixture, Standard Fixture, Fresh Fixture, Shared Fixture, Back Door Manipulation, Layer Test
- **xUnit Basics Patterns** (Ch. 19): Test Method, [Four-Phase Test](../concepts/four-phase-test.md), Assertion Method/Message, Testcase Class, Test Runner, Test Suite Object, Test Discovery, Test Enumeration, Test Selection
- **Fixture Setup Patterns** (Ch. 20): In-line Setup, Delegated Setup, Creation Method, Implicit Setup, Prebuilt Fixture, Lazy Setup, Suite Fixture Setup, Setup Decorator, Chained Tests
- **Result Verification Patterns** (Ch. 21): State Verification, Behavior Verification, Custom Assertion, Delta Assertion, Guard Assertion, Unfinished Test Assertion
- **Fixture Teardown Patterns** (Ch. 22): Garbage-Collected Teardown, Automated Teardown, In-line Teardown, Implicit Teardown
- **Test Double Patterns** (Ch. 23): Test Double, Test Stub, Test Spy, Mock Object, Fake Object, Configurable Test Double, Hard-Coded Test Double, Test-Specific Subclass
- **Test Organization Patterns** (Ch. 24): Named Test Suite, Test Utility Method, Parameterized Test, Testcase Class per Class/Feature/Fixture, Testcase Superclass, Test Helper
- **Database Patterns** (Ch. 25): Database Sandbox, Stored Procedure Test, Table Truncation Teardown, Transaction Rollback Teardown
- **Design-for-Testability Patterns** (Ch. 26): Dependency Injection, Dependency Lookup, [Humble Object](../concepts/humble-object.md), Test Hook
- **Value Patterns** (Ch. 27): Literal Value, Derived Value, Generated Value, Dummy Object

### Part IV — Appendixes
Test Refactorings, xUnit Terminology, xUnit Family Members, Tools, Goals & Principles summary, Smells/Aliases/Causes, Patterns/Aliases/Variations, Glossary.

## Key Contributions

### Formalized Test Double Taxonomy
Meszaros defined the canonical vocabulary for [[test-doubles]]: Dummy Object, Test Stub, Test Spy, Mock Object, and Fake Object. This taxonomy resolved the confusion in earlier literature where "mock" was used loosely for all test doubles.

### Test Smell Catalog
Extended the concept of "code smells" (from Fowler's Refactoring) to test code. See [[test-smells-catalog]] for the full catalog.

### SUT and DOC Terminology
Formalized [System Under Test (SUT) and Depended-On Component (DOC)](../concepts/sut-and-doc.md) as standard vocabulary for discussing test structure.

### Four-Phase Test
Defined the canonical test structure: Setup, Exercise, Verify, Teardown. See [[four-phase-test]].

### Humble Object Pattern
A design-for-testability pattern that extracts logic from hard-to-test contexts (UI, threading, containers) into testable components. See [[humble-object]].

### Fixture Strategy Patterns
Comprehensive treatment of [[test-fixture-strategies]]: Fresh vs Shared Fixture, setup patterns (inline, implicit, delegated), teardown approaches.

## Philosophy

Meszaros advocates:
- **Write the Tests First** — TDD produces more testable designs
- **Isolate the SUT** — test one thing at a time
- **Verify One Condition per Test** — single-condition tests for defect localization
- **Use the Front Door First** — prefer testing through the public API
- **Don't Modify the SUT** — avoid test hooks in production code
- **Keep Tests Independent** — no inter-test dependencies
- **Communicate Intent** — tests as documentation
- **Minimize Untestable Code** — use Humble Object and DI

## Related Pages

- [[gerard-meszaros]]
- [[test-doubles]]
- [[test-smells-catalog]]
- [[four-phase-test]]
- [[test-fixture-strategies]]
- [[sut-and-doc]]
- [[humble-object]]
- [[test-organization-patterns]]
- [[xunit]]
