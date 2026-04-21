---
title: TDD Adoption Path
type: concept
tags: [tdd, legacy-code, adoption, process]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md, raw/modern-software-engineering-dave-farley.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/tdd-by-example-kent-beck-v2.md]
---

The path from untested legacy code to a well-tested system is incremental, not revolutionary. This page synthesizes guidance from across the wiki into a phased adoption path that teams can follow over months or years.

## Phase 1: Establish the Safety Net

Before changing anything, understand what the code actually does. Write [Characterization Tests](characterization-tests.md) that document current behavior -- not what the code *should* do, but what it *does*. Use [Approval Testing](approval-testing.md) to capture complex outputs as golden files you can diff against.

Identify [Seams](seams.md) in the codebase: places where you can alter behavior without editing the code itself. Map the dependency graph around the areas you will change first. The goal is coverage around code you are about to touch, not the entire system.

## Phase 2: Break Dependencies

Legacy code resists testing because of tight coupling. Use [Dependency-Breaking Techniques](dependency-breaking-techniques.md) to crack it open -- extract interfaces, parameterize constructors, subclass and override methods. These refactorings are designed to be safe without tests, performed conservatively.

For new behavior that must live inside existing code, use [Sprout Method](sprout-method.md): write the new logic in a fully tested method, then call it from the legacy code. This adds tested code without modifying untested code.

Follow the [Legacy Code Change Algorithm](legacy-code-change-algorithm.md) every time you touch existing code: identify change points, find test points, break dependencies, write tests, then make changes.

## Phase 3: Introduce TDD for New Code

Once the team has practiced characterization tests and dependency breaking, shift to [Test First](test-first.md) for all new features. Every new behavior follows the [Red-Green-Refactor](red-green-refactor.md) cycle: write a failing test, make it pass with the simplest code, then refactor.

Existing code gets tests only when modified -- not before. For larger subsystems needing wholesale replacement, apply the [Strangler Pattern](strangler-pattern.md): build the new implementation behind an interface, route traffic incrementally, retire the old code when proven.

## Phase 4: Improve Architecture

As test coverage grows, architectural improvement becomes safe. Extract [Ports and Adapters](ports-and-adapters.md) boundaries so that domain logic is decoupled from infrastructure. Define [Bounded Contexts](bounded-context.md) to prevent the domain model from becoming a monolithic tangle.

Invest in [Domain Model Testing](domain-model-testing.md) -- fast, isolated tests that exercise business rules without databases, file systems, or network calls. These tests run in milliseconds and form the foundation of your test pyramid.

## Phase 5: Scale the Practice

With architecture and habits in place, expand the testing approach. Use [Outside-In TDD](outside-in-tdd.md) to drive features from the user-facing boundary inward. Write acceptance criteria as executable tests with [ATDD](atdd.md). Adopt [BDD](bdd.md) vocabulary (given/when/then) so that tests communicate intent to the whole team.

Build a [Continuous Integration](continuous-integration.md) pipeline that runs the full suite on every commit. Design your [Test Automation at Scale](test-automation-at-scale.md) strategy: parallelize slow tests, quarantine flaky ones, keep the build green.

## Common Pitfalls

- **Retrofitting tests everywhere at once.** You will burn out and the tests will be low-value. Test what you are changing.
- **Mocking too aggressively in legacy code.** Heavy mocking creates brittle tests coupled to implementation. Prefer characterization tests that exercise real code paths.
- **Letting characterization tests become permanent fixtures.** They are scaffolding. Replace them with proper unit and integration tests as you refactor.
- **Skipping the refactoring step.** Green is not done. If you skip refactoring, the design never improves and the codebase accumulates new forms of technical debt.

## Related Pages

- [Characterization Tests](characterization-tests.md)
- [Legacy Code Change Algorithm](legacy-code-change-algorithm.md)
- [Dependency-Breaking Techniques](dependency-breaking-techniques.md)
- [Sprout Method](sprout-method.md)
- [Seams](seams.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Strangler Pattern](strangler-pattern.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Outside-In TDD](outside-in-tdd.md)
- [ATDD](atdd.md)
- [BDD](bdd.md)
- [Continuous Integration](continuous-integration.md)
- [Legacy Code](legacy-code.md)
