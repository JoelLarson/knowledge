---
title: SUT and DOC (System Under Test / Depended-On Component)
type: concept
tags: [terminology, xunit, gerard-meszaros, test-structure]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md]
---

Standard vocabulary formalized by [[gerard-meszaros]] in [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md) for discussing the structure of any test. SUT is the thing being tested; DOC is anything the SUT depends on.

## System Under Test (SUT)

The SUT is "whatever thing we are testing." Its scope depends on the type of test:

| Test Level | SUT |
|-----------|-----|
| Unit test | A single class or method |
| Component test | A module or subsystem |
| Integration test | Multiple components working together |
| Customer/acceptance test | The entire application |

The SUT is always defined *relative to a specific test*. The same class can be the SUT in one test and a DOC in another.

## Depended-On Component (DOC)

A DOC is any component that the SUT calls or depends on during the test. DOCs are part of the test fixture. They provide:
- **Indirect inputs** — values returned to the SUT (via method returns, callbacks)
- **Indirect outputs** — calls the SUT makes to the DOC (method invocations, messages sent)

## The SUT–DOC Relationship

```
Test → exercises → SUT → depends on → DOC
                         ← returns  ←
```

A unit test isolates the SUT from its DOCs by replacing DOCs with [[test-doubles]]:
- **Test Stub** — controls indirect inputs (what the DOC returns to the SUT)
- **Mock Object / Test Spy** — observes indirect outputs (what the SUT sends to the DOC)
- **Dummy Object** — fills a parameter slot when the DOC isn't actually used

## Nested SUT/DOC Relationships

An object is only the SUT with respect to a specific test. In a layered system:
- Unit1 is the SUT for Unit1's tests
- Unit1 is a DOC for Unit2's tests (if Unit2 depends on Unit1)
- Both Unit1 and Unit2 are part of the Component SUT for component-level tests

This is why [[test-doubles]] exist: to isolate each layer so it can be tested independently.

## Why This Vocabulary Matters

Before Meszaros, authors used inconsistent terminology:
- "object under test," "class under test," "module under test"
- "collaborator," "dependency," "mock target"

SUT and DOC provide a consistent, level-independent vocabulary that works whether discussing unit tests or system tests.

## Indirect Inputs and Outputs

### Indirect Inputs
Values the SUT receives from its DOCs (return values, callback data, exceptions thrown). To control these in tests, replace the DOC with a **Test Stub** that returns predetermined values.

### Indirect Outputs
Calls the SUT makes to its DOCs (method invocations, messages, database writes). To verify these in tests, replace the DOC with a **Mock Object** or **Test Spy** that records the calls for later assertion.

## Related Pages

- [[test-doubles]]
- [[four-phase-test]]
- [[test-fixture-strategies]]
- [[mocking]]
- [[dependency-injection]]
- [[xunit-test-patterns-meszaros]]
- [[gerard-meszaros]]
