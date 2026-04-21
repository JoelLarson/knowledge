---
title: The Legacy Code Change Algorithm
type: concept
tags: [legacy-code, algorithm, testing, michael-feathers, refactoring]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

The five-step algorithm from [[michael-feathers]]' [Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md) for making safe, test-supported changes in legacy systems. The central process of the entire book.

## The Algorithm

1. **Identify change points** — Where in the code do you need to make your change?
2. **Find test points** — Where can you write tests to cover the change?
3. **Break dependencies** — Remove obstacles that prevent testing (using [[dependency-breaking-techniques]])
4. **Write tests** — Write [[characterization-tests]] that document current behavior
5. **Make changes and refactor** — Implement the change, then improve the design

## Philosophy

The day-to-day goal is to make functional changes that deliver value **while bringing more of the system under test**. After each programming episode, you should be able to point to:
- Code that provides a new feature
- Tests for that code

> "Over time, tested areas of the code base surface like islands rising out of the ocean. Work in these islands becomes much easier. Eventually, you'll be able to work in continents of test-covered code." — Michael Feathers

## Step Details

### 1. Identify Change Points

Understand where in the architecture the change belongs. If you don't understand the design well enough, use techniques like:
- Scratch refactoring (refactor to understand, then discard)
- Notes and sketching
- Telling the story of the system

### 2. Find Test Points

Determine where to write tests that will cover your change. This requires understanding effect propagation — how changes in one place affect observable behavior in another. Key concepts:
- **Interception points** — places where you can detect effects of a change
- **Pinch points** — narrow places in effect flow where a single test can cover many changes

### 3. Break Dependencies

The most technically challenging step. Dependencies manifest as:
- Difficulty instantiating objects in test harnesses
- Difficulty running methods in test harnesses

Use [[dependency-breaking-techniques]] from the catalog. The key insight: these refactorings are designed to be done **without tests**, in the service of putting tests in place. They must be performed conservatively.

> "When you break dependencies in legacy code, you often have to suspend your sense of aesthetics a bit. Some dependencies break cleanly; others end up looking less than ideal from a design point of view. They are like the incision points in surgery."

### 4. Write Tests

Write [[characterization-tests]] — tests that document what the code actually does. Not what it should do. These serve as a safety net for step 5.

Use [[seams]] to substitute dependencies and enable testing without the full runtime environment.

### 5. Make Changes and Refactor

Use TDD to add new features. The tests from step 4 protect existing behavior while you modify the code. After the change, use the test coverage to refactor toward better design.

## The Legacy Code Dilemma

> "When we change code, we should have tests in place. To put tests in place, we often have to change code."

This circular dependency is why step 3 (break dependencies) exists — you make minimal, conservative changes to enable testing, then use tests to make larger, safer changes.

## Tactics for Time Pressure

When you can't afford the full algorithm, use safe additive techniques:
- [[sprout-method]] — write new code in a tested method, call it from old code
- Sprout Class — write new code in a tested class
- Wrap Method — rename old method, create new method that calls old + new
- Wrap Class — decorator pattern around existing class

These add tested code without modifying untested code.

## Related Pages

- [[legacy-code]]
- [[seams]]
- [[characterization-tests]]
- [[dependency-breaking-techniques]]
- [[sprout-method]]
- [[refactoring]]
- [[michael-feathers]]
- [[working-effectively-legacy-code-feathers]]
