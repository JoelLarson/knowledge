---
title: Dependency Injection
type: concept
tags: [dependency-injection, design, testability, coupling, dave-farley, london-school, michael-feathers]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md", raw/Working.Effectively.with.Legacy.Code.md]
---

A design technique where dependencies are passed into a component rather than created inside it. Essential for testability, loose coupling, and enabling [[mocking]].

## Core Idea

Instead of:
```java
class Calculator {
    Display display = new ConcreteDisplay(); // hard-coded dependency
}
```

Use:
```java
class Calculator {
    Calculator(Display display) { // injected dependency
        this.display = display;
    }
}
```

The first version cannot be tested without instantiating the real `ConcreteDisplay`. The second accepts any `Display` implementation — including a fake or mock.

## Why It Matters for TDD

Dependency injection is the mechanism that makes code **testable in isolation**. Without it:
- Tests must instantiate real dependencies (databases, file systems, network)
- Tests become slow, flaky, and hard to set up
- The [Excessive Setup](tdd-smells.md) smell appears

With it:
- Dependencies can be replaced with fakes or [mocks](mocking.md) in tests
- Tests run in isolation, fast and repeatably
- You can test edge cases that are impossible with real dependencies

## Measurement Points

> "This display is a measurement point that allows us to check that our code is talking to the things it depends upon in the way that we expect." — Dave Farley

A dependency injected as an interface creates a **measurement point**: you can observe what your code does by examining the fake/mock after the code runs.

## Forms of Dependency Injection

### Constructor Injection (preferred)
Dependencies provided at creation time. Makes dependencies explicit and the object ready to use immediately.

### Method/Parameter Injection
Dependencies provided per-call. Useful for optional or per-operation dependencies.

### Property/Setter Injection
Dependencies set after construction. Less preferred — leaves object in incomplete state between creation and configuration.

## DI and Interface Design

Good dependency injection drives good interface design:
- Dependencies should be expressed as **interfaces** (or abstract types), not concrete classes
- The interface expresses what the component needs, not what it gets
- This is the "ports and adapters" or hexagonal architecture pattern

## DI in the Test Context

Farley's String Calculator exercise illustrates:
```java
// Interface (port)
interface Display { void show(String result); }

// Test (uses mock display)
Display mockDisplay = mock(Display.class);
Calculator calc = new Calculator(mockDisplay);
calc.calculate("1,2");
verify(mockDisplay).show("1 + 2 = 3");
```

The `Display` interface is an abstraction that both the production display and the test mock implement.

## Connection to Design Quality

Dependency injection is a consequence of striving for:
- **Loose coupling** — the component doesn't know which implementation it gets
- **Separation of concerns** — the component does its job; the display does its job
- **Information hiding** — the component knows only the Display interface

These are core [Modern Software Engineering](../sources/modern-software-engineering-dave-farley.md) properties.

## GOOS: Context Independence and Constructor Injection

[Growing Object-Oriented Software](../sources/growing-oo-software-freeman-pryce.md) elevates dependency injection to a core design principle called **context independence**: an object should have no built-in knowledge about the system in which it executes. Whatever it needs must be passed in.

### GOOS Rules for Dependencies
- **Dependencies are required** — pass them through the constructor. An object should not exist without its dependencies.
- **Notifications and adjustments are optional** — can use safe defaults (null objects, empty collections) and provide setters.
- **Partially constructed objects are brittle** — setter injection leaves objects in invalid states.

### Connection to Mock Objects
In the [London school](london-school-tdd.md), DI is the mechanism that enables **interface discovery**:
1. To test an object, you must pass in its dependencies
2. This forces dependencies to be explicit (visible in the constructor)
3. Each dependency is expressed as an interface (a "port")
4. Tests inject mocks through these ports
5. The mock expectations define the communication protocol

> "To construct an object for a unit test, we have to pass its dependencies to it, which means that we have to know what they are. This encourages context independence." — Freeman & Pryce

### Origin Story
The "No Getters" rule at Connextra (1999) — the precursor to mock objects — was fundamentally about dependency injection. Instead of adding getters to observe internal state for testing, they injected collaborators through constructors and verified interactions on those injected objects.

## Feathers' Perspective: DI as Dependency Breaking

In [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md), [Michael Feathers](../entities/michael-feathers.md) shows that dependency injection is the **formalization of creating enabling points for object [[seams]]**. Many of his [[dependency-breaking-techniques]] are essentially ways to introduce DI into code that wasn't designed for it:

- **Parameterize Constructor** — add a constructor parameter for a dependency that was previously hard-coded internally. Provide a convenience constructor that uses the default. This is the most direct form of introducing DI into legacy code.
- **Parameterize Method** — add a method parameter for a per-call dependency.
- **Extract Interface** — create an interface from an existing concrete dependency, enabling substitution of fakes.
- **Adapt Parameter** — when an existing parameter type is too broad (e.g., `HttpServletRequest` with 23+ methods), create a narrow interface that expresses only what you need.

### The Legacy DI Pattern

```java
// Before: hard-coded dependency, untestable
public InvoiceUpdateResponder(DBConnection connection) { ... }

// After: Extract Interface enables substitution
public InvoiceUpdateResponder(IDBConnection connection) { ... }
```

In legacy contexts, you often can't do "clean" DI from the start. The [[legacy-code-change-algorithm]] uses dependency breaking as step 3 — introduce DI just enough to get tests in place, then improve the design later.

> "Move toward interfaces that communicate responsibilities rather than implementation details. This makes code easier to read and easier to maintain." — Michael Feathers

## Related Pages

- [[mocking]]
- [[test-doubles]]
- [[solid-principles]]
- [[ports-and-adapters]]
- [[good-test-properties]]
- [[tdd-smells]]
- [[refactoring]]
- [[atdd]]
- [[london-school-tdd]]
- [[tell-dont-ask]]
- [[outside-in-tdd]]
- [[seams]]
- [[dependency-breaking-techniques]]
- [[legacy-code]]
- [[michael-feathers]]
- [[working-effectively-legacy-code-feathers]]
- [[dave-farley-302-course]]
- [[growing-oo-software-freeman-pryce]]
