---
title: TDD in Legacy Systems
type: concept
tags: [legacy-code, refactoring, michael-feathers, dave-farley, strangler-pattern, dependency-breaking]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/Working.Effectively.with.Legacy.Code.md]
---

Strategies for introducing TDD practices into pre-existing codebases that were not designed with testability in mind. Requires different approaches than greenfield TDD.

## What Is Legacy Code?

> "To me, legacy code is simply code without tests." — [Michael Feathers](../entities/michael-feathers.md), _[Working Effectively with Legacy Code](../sources/working-effectively-legacy-code-feathers.md)_

By this definition, most production code is legacy code. The challenge: making it testable often requires structural changes, which are risky without tests. This is the **Legacy Code Dilemma**:

> "When we change code, we should have tests in place. To put tests in place, we often have to change code."

Code without tests is bad code regardless of how well-written it is. With tests, we can change behavior quickly and verifiably. Without them, we don't know if our code is getting better or worse.

## The Legacy Code Change Algorithm (Feathers)

The systematic approach to making safe changes in legacy code. See [[legacy-code-change-algorithm]] for full details.

1. **Identify change points** — where does the change go?
2. **Find test points** — where can you observe the effects?
3. **Break dependencies** — using [[dependency-breaking-techniques]]
4. **Write tests** — [[characterization-tests]] documenting actual behavior
5. **Make changes and refactor** — with the safety net in place

The day-to-day goal: make functional changes that deliver value **while bringing more of the system under test**. Over time, tested areas grow like islands rising from the ocean into continents.

## Core Concepts (Feathers Framework)

### Seams

A [seam](seams.md) is a place where you can alter behavior without editing code at that point. The key mechanism for making untestable code testable. Types: object seams, link seams, preprocessing seams.

### Sensing and Separation

Two reasons to break dependencies:
- **Sensing** — you can't access values your code computes (need to observe effects)
- **Separation** — you can't even get code into a test harness to run

### Characterization Tests

[Characterization tests](characterization-tests.md) document what code *actually does*, not what it should do. They create the safety net for refactoring. Algorithm: write a deliberately wrong assertion, let the failure tell you the actual value, then encode that value as the expected result.

## Safe Change Techniques

When you can't get the whole method/class under test, use additive techniques:

- **[Sprout Method](sprout-method.md)** — write new code in a new tested method; call from old code
- **Sprout Class** — write new code in a new tested class
- **Wrap Method** — rename old method, create new method that calls old + new
- **Wrap Class** — decorator around existing class

These ensure all new code is tested even when you can't test the existing code yet.

## Strategy: Don't Chase Coverage

> "It's almost never worth going for full coverage in legacy code. Cost versus benefit doesn't work in our favour." — Dave Farley

Instead, make **tactical decisions**:
- Focus on areas where you want to do new work
- Be led by business value
- Treat the "adding tests" project as improving the design in valuable areas

## Recommended Process (Farley)

### 1. Establish Defensive Tests
Use [approval tests](approval-testing.md) or [[characterization-tests]] to capture the current behavior of the code you'll change. These tests don't verify correctness — they verify that your changes don't accidentally break existing behavior.

Use coverage tools to confirm your tests cover the code you'll touch.

### 2. Remove Clutter
Delete commented-out code. Remove comments that don't add meaning. The structure of the code becomes clearer.

### 3. Reduce Complexity
Use Extract Function on the bodies of if/else/loop statements. Name the extracted functions well. This reveals duplication and structure.

Progressively reduce cyclomatic complexity. Each extraction makes the code more readable and testable.

### 4. Compose Methods
Work toward code that tells its own story. Try reading it out loud — would a non-technical person understand what it's doing?

### 5. Write New Code with TDD
Once the area is isolated and cleaner:
> "All new work is then developed with test driven development." — Dave Farley

## The Strangler Pattern

Named after a vine that grows around a tree and eventually replaces it.

1. Identify the core problem domain within the legacy code
2. Use Domain-Driven Design principles to identify good interface boundaries
3. Define **anti-corruption layers** — defensive walls that insulate the area of new work
4. Write acceptance tests at those boundaries
5. Replace the code behind the walls using TDD, gradually

You won't end up with a beautiful system. You may end up with a workable one.

## Two Approaches to Change (Feathers)

- **Edit and Pray** — make changes carefully and hope nothing breaks. Industry standard but dangerous.
- **Cover and Modify** — put tests in place first, then change with confidence. Tests act as a "software vise" holding behavior fixed.

## Acceptance Tests vs. Unit Tests for Legacy Code

> "Unit tests are hard to retrofit to pre-existing code, so don't." — Dave Farley

[Acceptance tests](atdd.md) are more effective as a defensive strategy:
- They test at the boundary of visible behavior (not internal structure)
- They survive major internal refactoring
- They confirm that refactoring preserved user-visible behavior

However, Feathers argues that unit tests are essential for rapid feedback and error localization. The two approaches are complementary.

## The Boy Scout Rule

From Clean Code: "Leave the campground cleaner than you found it." Applied to legacy systems:

> "Always leave code in a better state after every commit." — Dave Farley

Small, continuous improvements compound. Don't attempt to fix everything at once.

## Related Pages

- [[legacy-code-change-algorithm]]
- [[seams]]
- [[characterization-tests]]
- [[dependency-breaking-techniques]]
- [[sprout-method]]
- [[approval-testing]]
- [[atdd]]
- [[refactoring]]
- [[strangler-pattern]]
- [[tdd-smells]]
- [[red-green-refactor]]
- [[michael-feathers]]
- [[working-effectively-legacy-code-feathers]]
- [[dave-farley-302-course]]
