---
title: Test Organization Patterns
type: concept
tags: [test-organization, patterns, xunit, gerard-meszaros, naming]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

Patterns for organizing tests into classes, suites, and packages, from [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md). How you organize tests affects readability, maintainability, and the ability to run subsets efficiently.

## Testcase Class Organization

Three strategies for grouping Test Methods onto Testcase Classes:

### Testcase Class per Class
All Test Methods for one SUT class go on a single Testcase Class. Simple starting point; split when the class grows too large.

**Best for:** Small classes with few features.
**Risk:** Large Testcase Classes with diverse fixtures.

### Testcase Class per Feature
Group Test Methods by which feature of the SUT they exercise. Each Testcase Class focuses on one logical capability.

**Best for:** Customer tests against service facades; feature-oriented thinking.
**Risk:** Duplicated fixture setup across Testcase Classes.

### Testcase Class per Fixture
Group Test Methods that share the same pre-conditions (fixture) into one class. Enables use of Implicit Setup (setUp method) for the common fixture.

**Best for:** Stateful SUTs where each method must be tested in multiple states.
**Risk:** Scatters test conditions for a single feature across multiple classes.

## Choosing a Strategy

- Start with **Testcase Class per Class** for new projects
- Migrate to **Testcase Class per Fixture** when setUp becomes too complex or diverse
- Use **Testcase Class per Feature** for acceptance/integration tests and when using Prebuilt Fixtures

These strategies can be combined: different levels of testing may use different organizations.

## Test Naming Conventions

The combination of package + Testcase Class + Test Method name should convey:

- The SUT class name
- The method or feature being exercised
- Important input characteristics
- Relevant SUT state

Optionally append expected outcome prefixed by "should":

```
FlightSearch_WhenNoFlightsExist_shouldReturnEmptyList
```

## Test Suite Patterns

### Test Suite Object
A collection of Testcase Objects that implements the standard test interface. Enables running groups of related tests together (Composite pattern).

### Test Discovery
The framework automatically discovers all tests belonging to a suite (e.g., by reflection, naming convention, annotations). The modern default.

### Test Enumeration
The test automater manually writes code listing which tests belong to the suite. Older approach; gives explicit control but requires maintenance.

### Named Test Suite
A named collection of tests that can be run as a group (e.g., "smoke tests," "database tests"). Useful for selective execution.

### Test Selection
The framework selects which Test Methods to run at runtime based on attributes (annotations, tags, categories).

### Parameterized Test
Pass test data (inputs + expected outputs) to a utility method that implements the entire test lifecycle. Reduces duplication when testing the same behavior with many data points.

## Test Code Reuse Patterns

### Test Utility Method
Encapsulate reusable test logic behind a suitably named method. The generic reuse mechanism.

### Test Helper
A separate helper class that holds Test Utility Methods for reuse across multiple Testcase Classes.

### Testcase Superclass
An abstract base class that provides shared test infrastructure (Custom Assertions, Creation Methods, common setUp logic) via inheritance.

### Object Mother
A special Test Helper that provides pre-built, commonly-needed test objects. A factory of standard fixtures.

## Test File Organization

- **Test Packages** — mirror the production package structure, keeping tests close to the code they test
- **Built-in Self-Test** — tests shipped with the production code (common in libraries)
- **Separate test source tree** — tests in a parallel directory (e.g., `src/` vs `test/`)

## Related Pages

- [Four-Phase Test](four-phase-test.md)
- [Test Fixture Strategies](test-fixture-strategies.md)
- [Test Smells Catalog](test-smells-catalog.md)
- [Good Test Properties](good-test-properties.md)
- [xUnit](../entities/xunit.md)
- [Parameterized Tests](parameterized-tests.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
