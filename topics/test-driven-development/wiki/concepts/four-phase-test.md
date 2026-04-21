---
title: Four-Phase Test
type: concept
tags: [test-structure, patterns, xunit, gerard-meszaros]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

The canonical test structure pattern from [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md): every test has four distinct phases executed in sequence — Setup, Exercise, Verify, Teardown.

## The Four Phases

### 1. Setup (Fixture Setup)
Establish the "before picture" — create the test fixture, configure [Test Doubles](test-doubles.md), and put the [SUT](sut-and-doc.md) into the required pre-test state.

### 2. Exercise (Exercise SUT)
Interact with the SUT — call the method or trigger the behavior being tested. This is the single action the test is verifying.

### 3. Verify (Result Verification)
Determine whether the expected outcome was obtained. Compare actual results to expected values using assertions.

### 4. Teardown (Fixture Teardown)
Put the world back into the state in which you found it. Clean up persistent resources, restore shared state. Often handled implicitly by the framework or garbage collector.

## Why Four Phases?

The test reader must quickly determine what behavior the test is verifying. Without clear phase separation:

- Setup and exercise become interleaved, obscuring intent
- Verification mixed with exercise hides what's being asserted
- Teardown logic obscures the important test logic

Clear phase markers make tests function as documentation (see [Good Test Properties](good-test-properties.md)).

## Example

```java
public void testGetFlights_NoFlights() throws Exception {
    // Setup
    FlightFacade facade = new FlightFacade();
    BigDecimal airportId = facade.createTestAirport("1OF");

    // Exercise
    List flights = facade.getFlightsByOrigin(airportId);

    // Verify
    assertEquals(0, flights.size());

    // Teardown
    facade.removeAirport(airportId);
}
```

## Implementation Variations

### In-line (all four phases in the Test Method)
Best when using Testcase Class per Class or per Feature. All setup and teardown logic is visible in the test body.

### Implicit Setup/Teardown (setUp and tearDown methods)
The framework calls setUp before and tearDown after each test. Leaves only Exercise and Verify in the Test Method. Best when using Testcase Class per Fixture where many tests share the same fixture.

### Delegated Setup
Setup logic is extracted into Creation Methods or helper methods called from the test. The test body remains readable while hiding construction mechanics.

## Relationship to Other Patterns

| Concern | Patterns |
|---------|----------|
| Setup | In-line Setup, Implicit Setup, Delegated Setup, Creation Method |
| Exercise | Single method call on the SUT |
| Verify | State Verification, Behavior Verification, Custom Assertion |
| Teardown | Garbage-Collected, Implicit, Automated, In-line Teardown |

## The Single-Condition Rule

Each Four-Phase Test should verify one condition (one path through the SUT). Multiple exercise–verify cycles in one test is a smell ([Obscure Test](test-smells-catalog.md)). Comments marking phases provide self-discipline: it becomes obvious when a test violates single-condition structure.

## Relationship to Arrange-Act-Assert (AAA)

The "Arrange-Act-Assert" formulation (common in .NET communities) is equivalent to the first three phases. Meszaros adds Teardown as an explicit fourth phase because persistent fixtures require cleanup.

## Related Pages

- [Test Fixture Strategies](test-fixture-strategies.md)
- [SUT and DOC](sut-and-doc.md)
- [Test Smells Catalog](test-smells-catalog.md)
- [Good Test Properties](good-test-properties.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Arrange-Act-Assert (AAA)](arrange-act-assert.md)
- [xUnit Test Patterns (Meszaros)](../sources/xunit-test-patterns-meszaros.md)
