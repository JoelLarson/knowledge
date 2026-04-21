---
title: Test Smells Catalog (Meszaros)
type: concept
tags: [test-smells, anti-patterns, xunit, gerard-meszaros, test-quality]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

The comprehensive test smell catalog from [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md). Meszaros extended Martin Fowler's "code smell" concept to test code, organizing smells into three categories: Code Smells, Behavior Smells, and Project Smells.

## What Is a Test Smell?

A test smell is a symptom — something that tells you something may be wrong. A smell is not necessarily a problem in itself; it may have a legitimate cause. But it always warrants investigation. Smells have root causes, and addressing the cause (rather than the symptom) leads to better tests and better designs.

## Code Smells

Problems visible in the test source code itself.

### Obscure Test
The test is hard to understand at a glance. Causes include:

- **Eager Test** — verifies too much functionality in one test
- **Mystery Guest** — test depends on external resources not visible in the test
- **General Fixture** — fixture contains objects not needed by this specific test
- **Irrelevant Information** — too many details overwhelm the reader
- **Hard-Coded Test Data** — magic numbers without explanation

### Conditional Test Logic
The test contains if/else, loops, or try/catch. Tests should be strictly linear sequences (see [Four-Phase Test](four-phase-test.md)). Conditional logic hides bugs in the test itself.

### Hard-to-Test Code
The [SUT](sut-and-doc.md) is difficult to get under test. Root causes:

- Highly coupled code
- Asynchronous code
- Code that uses static/global state
- Code that creates its own dependencies (no [Dependency Injection](dependency-injection.md))

**Solution:** Apply [Humble Object](humble-object.md) pattern, introduce Dependency Injection, or use Test-Specific Subclass.

### Test Code Duplication
Copy-paste test code across multiple tests. Leads to High Test Maintenance Cost when the SUT changes. Solutions include Creation Methods, Custom Assertions, and Parameterized Tests.

### Test Logic in Production
Production code contains logic only needed for testing (e.g., test hooks, special flags). This violates separation of concerns and introduces risk.

## Behavior Smells

Problems observed when running the tests.

### Assertion Roulette
Multiple assertions in a test without Assertion Messages. When the test fails, you cannot tell which assertion failed or why. Related to the "Giant" smell in [TDD Smells](tdd-smells.md).

### Erratic Test
A test that sometimes passes and sometimes fails. Subcategories:

- **Interacting Tests** — tests affect each other through shared state
- **Interacting Test Suites** — test suites interfere with each other
- **Lonely Test** — passes alone but fails in suite (or vice versa)
- **Resource Leakage** — tests don't clean up resources
- **Resource Optimism** — test assumes resource availability without verification
- **Unrepeatable Test** — depends on date/time, random values, or external state
- **Test Run War** — parallel test runs interfere with each other
- **Nondeterministic Test** — async behavior causes sporadic failure

**Solutions:** Use [Fresh Fixtures](test-fixture-strategies.md), isolate tests, control indirect inputs with [Test Doubles](test-doubles.md).

### Fragile Test
A test that fails when unrelated functionality changes. Subcategories:

- **Interface Sensitivity** — test breaks when the SUT's API changes in irrelevant ways
- **Behavior Sensitivity** — test breaks when unrelated SUT behavior changes
- **Data Sensitivity** — test breaks when test data changes
- **Context Sensitivity** — test breaks when environment changes

**Solutions:** Use Creation Methods, Minimal Fixture, test through the Front Door (public API).

### Frequent Debugging
Tests fail but don't tell you what's wrong — you must attach a debugger. Caused by poor defect localization (tests are too coarse-grained).

### Manual Intervention
Tests require human action to run (setting up databases, starting servers, reading output). Violates the goal of Fully Automated Tests.

### Slow Tests
Tests take too long to run, discouraging frequent execution. Root causes:

- Shared Fixtures with slow setup
- Testing through the UI
- Testing against real databases/services
- Too-coarse test granularity

**Solutions:** Use Fresh Fixtures, test through the API (not UI), use [Test Doubles](test-doubles.md), apply [Humble Object](humble-object.md).

## Project Smells

Problems visible at the project/team level.

### Buggy Tests
Tests themselves contain bugs, leading to false passes or false failures. Often caused by Conditional Test Logic or complex test utilities.

### Developers Not Writing Tests
The team has abandoned testing. Usually caused by High Test Maintenance Cost or Slow Tests creating a vicious cycle.

### High Test Maintenance Cost
Excessive time spent modifying existing tests to accommodate changes. The symptom that motivated Meszaros to write the book. Root causes:

- Fragile Tests (especially interface/data sensitivity)
- Test Code Duplication
- Obscure Tests (hard to understand what needs changing)

### Production Bugs
Bugs escape to production despite having tests. Caused by:

- Untested Code (never wrote the test)
- Untested Requirements (test doesn't cover the scenario)
- Buggy Tests (test doesn't verify what it claims)

## The Smell–Cause–Solution Relationship

Meszaros emphasizes that smells are symptoms, not root causes. The process is:

1. **Detect** the smell (symptom)
2. **Diagnose** the root cause
3. **Apply** the appropriate pattern (solution)

Multiple smells may share a root cause, and a single smell may have multiple possible causes.

## Related Pages

- [TDD Smells](tdd-smells.md) — Farley's complementary smell catalog (Liar, Giant, Mockery, etc.)
- [Four-Phase Test](four-phase-test.md)
- [Test Fixture Strategies](test-fixture-strategies.md)
- [Test Doubles](test-doubles.md)
- [Humble Object](humble-object.md)
- [Good Test Properties](good-test-properties.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
- [Gerard Meszaros](../entities/gerard-meszaros.md)
