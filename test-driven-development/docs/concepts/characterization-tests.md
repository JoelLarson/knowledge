---
title: Characterization Tests
type: concept
tags: [characterization-tests, legacy-code, testing, michael-feathers, safety-net]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

A characterization test is a test that characterizes the actual behavior of a piece of code — not what code *should* do, but what it *does*. Used to create a safety net before refactoring [[legacy-code]].

## Core Idea

Traditional tests verify correctness against a specification. Characterization tests have no "moral authority" — they simply document what the system actually does right now. Their purpose is to **detect change**, not prove correctness. When you later modify the code, any difference from the characterized behavior will surface as a test failure.

> "We aren't trying to find bugs right now. We are trying to put in a mechanism to find bugs later, bugs that show up as differences from the system's current behavior." — [Michael Feathers](../entities/michael-feathers.md)

## Algorithm for Writing Characterization Tests

1. Use a piece of code in a test harness
2. Write an assertion that you know will fail
3. Let the failure tell you what the behavior is
4. Change the test so that it expects the behavior the code produces
5. Repeat

**Example:**
```java
void testGenerator() {
    PageGenerator generator = new PageGenerator();
    assertEquals("fred", generator.generate()); // deliberately wrong
}
// Failure: expected:<fred> but was:<>
// Now change to:
void testGenerator() {
    PageGenerator generator = new PageGenerator();
    assertEquals("", generator.generate()); // documents actual behavior
}
```

## When to Write Characterization Tests

Characterization tests are the **fourth step** of the [[legacy-code-change-algorithm]]:
1. Identify change points
2. Find test points
3. Break dependencies
4. **Write tests** (characterization tests)
5. Make changes and refactor

Write them before you modify code to ensure your modifications don't accidentally break existing behavior.

## Characterization Tests vs. Approval Tests

Characterization tests and [approval tests](approval-testing.md) are closely related:
- **Characterization tests** (Feathers): typically unit-level, written by hand, using standard assertions
- **Approval tests**: often capture larger output snapshots (strings, files) and compare against a saved "approved" version

Both share the same philosophy: capture existing behavior as a baseline for detecting unintended changes.

## Heuristics for Writing Characterization Tests

1. Write tests for the area where you will make changes. Write as many cases as you need to understand the behavior.
2. Look at the specific things you will change and write tests targeting those paths.
3. If extracting or moving functionality, verify existence and correct connection of behaviors on a case-by-case basis. Exercise conversions.

### The Method Use Rule

> Before you use a method in a legacy system, check to see if there are tests for it. If there aren't, write them. When you do this consistently, you use tests as a medium of communication.

## Characterizing Classes — Exploration Heuristics

1. Look for tangled logic; introduce sensing variables to verify execution of specific paths
2. List things that can go wrong and write tests that trigger them
3. Explore extreme input values
4. Identify invariants (conditions that should always hold) and test for them

## Targeted Testing

After writing general characterization tests, focus on the specific code you'll change:
- Verify the branch you're modifying is actually exercised by at least one test
- Use sensing variables or debugger to confirm path coverage
- Pick input values that exercise conversions (e.g., avoid values where int-to-double truncation is invisible)
- The most valuable tests exercise a specific path AND exercise each conversion along that path

## When You Find Bugs

If the system has never been deployed: fix the bug. If deployed: analyze whether anyone depends on the "buggy" behavior. Mark suspicious behavior in test code and escalate for analysis.

## Relationship to TDD

Characterization tests are **not** TDD — they document existing behavior rather than driving new design. But they create the safety net that enables subsequent TDD:

1. Characterize existing code (characterization tests)
2. Refactor to improve structure (protected by characterization tests)
3. Write all new code with TDD

## Related Pages

- [[legacy-code]]
- [[legacy-code-change-algorithm]]
- [[approval-testing]]
- [[seams]]
- [[dependency-breaking-techniques]]
- [[refactoring]]
- [[michael-feathers]]
- [[working-effectively-legacy-code-feathers]]
