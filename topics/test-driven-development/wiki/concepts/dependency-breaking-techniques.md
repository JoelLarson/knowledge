---
title: Dependency-Breaking Techniques
type: concept
tags: [dependency-breaking, legacy-code, refactoring, testing, michael-feathers]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

A catalog of 24 techniques from [Michael Feathers](../entities/michael-feathers.md)' [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md) for breaking dependencies so that code can be placed under test. These are refactorings designed to be performed **without tests**, in the service of putting tests in place.

## Key Principles

- These techniques preserve behavior but may make design temporarily uglier
- They are performed conservatively — small, careful steps to minimize error risk
- The goal is testability, not beauty. Beauty comes later, once tests are in place
- Many rely on exploiting [Seams](seams.md) that already exist in the code

> "Safety first. Once you have tests in place, you can make invasive changes much more confidently."

## The Catalog

### Extract Interface

Create an interface from an existing class, then have the original implement it. Enables substitution of fakes/mocks through [Dependency Injection](dependency-injection.md). The most commonly used technique.

### Subclass and Override Method

Make a method virtual/protected, then subclass the class in tests and override the method. A simple way to nullify or sense behavior at an object [seam](seams.md).

### Parameterize Constructor

Add a parameter to a constructor for a dependency that was previously created internally. Provide a convenience constructor that creates the default. Enables injection of fakes.

### Parameterize Method

Add a parameter to a method for a dependency it was previously obtaining internally.

### Adapt Parameter

When a parameter type is too broad, low-level, or from a third-party API (e.g., `HttpServletRequest` with 23+ methods), create a narrow wrapper interface that provides only what you need. Decouples from the original API and makes faking trivial.

### Extract and Override Call

Extract a call to a problematic dependency into its own method, then override that method in a testing subclass.

### Extract and Override Factory Method

Extract object creation into a factory method, then override it in a testing subclass to return fakes.

### Extract and Override Getter

Extract field access into a getter, then override the getter in tests to return a fake.

### Break Out Method Object

Move a long method into a new class where it becomes an instance method. Local variables become instance variables. Often makes it easier to break further dependencies and test.

### Encapsulate Global References

When code depends on global variables, create a class to hold them. Replace global access with access through an instance of that class, which can then be substituted in tests.

### Introduce Static Setter

For singletons or static state, add a static setter that allows tests to replace the instance. Use with care — this technique trades encapsulation for testability.

### Expose Static Method

If a method on a class doesn't use instance data, make it static so it can be called without instantiating the (hard-to-create) class.

### Introduce Instance Delegator

Wrap a static method with an instance method so it can be overridden in a testing subclass.

### Link Substitution

Create alternative implementations in a test library and link against them instead of production code. A link [seam](seams.md) technique.

### Definition Completion (C/C++)

Provide alternative method definitions in a test file, linking against them instead of the production definitions. Use only in worst-case scenarios.

### Primitivize Parameter

Replace a complex parameter with a simpler type (string, int, etc.) to break a dependency on the original parameter's class.

### Pull Up Feature

Move a method or feature to a superclass so it can be tested independently from the subclass's dependencies.

### Push Down Dependency

Move problematic dependencies into a subclass, keeping the testable logic in the parent class.

### Replace Function with Function Pointer (C)

Replace a direct function call with a call through a function pointer that can be reassigned in tests.

### Replace Global Reference with Getter

Replace direct access to a global with a getter method that can be overridden.

### Supersede Instance Variable

Replace an instance variable after construction via a setter designed for testing. Less preferred than constructor injection.

### Template Redefinition (C++)

Use C++ templates to substitute dependencies at compile time.

### Text Redefinition (dynamic languages)

In languages like Ruby or Python, redefine methods at runtime for testing.

## Choosing a Technique

| Situation | Recommended Technique |
|-----------|----------------------|
| Can't create object in test harness | Parameterize Constructor, Extract Interface |
| Hidden dependency on global | Encapsulate Global References, Introduce Static Setter |
| Dependency on third-party API | Adapt Parameter, Extract Interface |
| Long method too tangled to test | Break Out Method Object, Expose Static Method |
| Can't run a method in tests | Extract and Override Call, Subclass and Override |
| Adding new behavior safely | [Sprout Method](sprout-method.md), Wrap Method |
| Non-OO code (C) | Replace Function with Function Pointer, Preprocessing seams |

## The Surgery Metaphor

> "They are like the incision points in surgery: There might be a scar left in your code after your work, but everything beneath it can get better."

These techniques may leave the code temporarily less clean. That's acceptable. The "scars" can be healed later once the code is under test and you can refactor safely.

## Related Pages

- [Legacy Code Change Algorithm](legacy-code-change-algorithm.md)
- [Seams](seams.md)
- [Legacy Code](legacy-code.md)
- [Characterization Tests](characterization-tests.md)
- [Sprout Method](sprout-method.md)
- [Dependency Injection](dependency-injection.md)
- [Test Doubles](test-doubles.md)
- [Refactoring](refactoring.md)
- [Michael Feathers](../entities/michael-feathers.md)
- [Working Effectively with Legacy Code (Feathers)](../sources/working-effectively-legacy-code-feathers.md)
