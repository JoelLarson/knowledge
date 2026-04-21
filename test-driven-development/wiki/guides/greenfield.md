---
title: "Greenfield: Your First Tests"
type: concept
tags: [guides, greenfield, getting-started, walking-skeleton, kata, adoption]
created: 2026-04-21
updated: 2026-04-21
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

Starting a new project is the easiest time to adopt TDD — there's no legacy coupling to fight, no untested code to characterize, no team habits to unlearn. The hard part is building the discipline before the codebase is large enough to punish you for skipping it.

This guide walks through the progression from "I've never run a test" to "I'm driving features from acceptance tests inward."

## Step 0: Run a Test

Before learning TDD philosophy, remove the mechanical barrier. Every language ecosystem has a test runner. Pick one and get it working.

**The exercise:** Create a project. Install a test framework. Write a test that asserts `1 + 1 == 2`. Run it. See it pass.

This sounds trivial. It is. That's the point — after this step, "I don't know how to run tests" is no longer a blocker. The rest is learning what to test and when.

| Language | Framework to start with | Install |
|----------|------------------------|---------|
| Python | pytest | `pip install pytest` |
| JavaScript | Vitest or Jest | `npm install -D vitest` |
| TypeScript | Vitest | `npm install -D vitest` |
| Go | built-in `testing` | nothing to install |
| Rust | built-in `#[test]` | nothing to install |
| Java | JUnit 5 | add to build tool |
| C# | xUnit or NUnit | add NuGet package |

## Step 1: Learn the Cycle on Pure Logic

The [Red-Green-Refactor](../concepts/red-green-refactor.md) cycle is the heartbeat of TDD. Learn it on problems with no infrastructure dependencies — no databases, no HTTP, no file systems. Pure input-output logic.

**Recommended kata:** The String Calculator. Farley uses it in the [302 Course](../sources/dave-farley-302-course.md) as the first TDD exercise. The progression:

1. Write a test: empty string returns 0. See it fail. Make it pass.
2. Write a test: single number returns that number. See it fail. Make it pass.
3. Write a test: two comma-separated numbers returns their sum. See it fail. Make it pass.
4. Continue adding requirements one at a time: custom delimiters, negative number validation, etc.

Each cycle should take 2-5 minutes. If it takes longer, the step is too big — break it down further.

**What you're learning:**

- The discipline of writing the test *before* the code
- The feeling of seeing red before green (the test must fail first, otherwise it might not be testing anything)
- The refactoring step — green is not done; clean the code while tests hold
- [Simple Design](../concepts/simple-design.md) — write only what the failing test demands, nothing more

**Other good starter katas:** FizzBuzz, Roman Numerals, Bowling Game (Beck), the [Fowler Theatrical Players](../sources/fowler-theatrical-players-kata.md) kata (more advanced, includes refactoring an existing implementation).

See [TDD by Context](../concepts/tdd-by-context.md) for how cycle time and testing style vary across languages and domains.

## Step 2: Name Tests for Behavior

As you practice katas, shift from implementation-focused test names to behavior-focused ones. This is the core insight of [BDD](../concepts/bdd.md): the word "test" leads people toward implementation; the word "specification" leads toward behavior.

| Implementation-focused | Behavior-focused |
|----------------------|-----------------|
| `test_add_method` | `should_return_sum_of_two_numbers` |
| `test_empty_input` | `should_return_zero_for_empty_string` |
| `test_negative` | `should_reject_negative_numbers_with_message` |

The [Given/When/Then](../concepts/bdd.md#given-when-then) structure helps: Given some context, When an action occurs, Then expect an outcome. This maps directly to the [Four-Phase Test](../concepts/four-phase-test.md) pattern: Setup / Exercise / Verify / Teardown.

Good test names serve as documentation. A well-named test suite answers "what does this system do?" without reading implementation code.

## Step 3: Build the Walking Skeleton

Katas teach the TDD cycle but they don't teach how to structure a real project. The bridge is the [Walking Skeleton](../concepts/walking-skeleton.md) — "an implementation of the thinnest possible slice of real functionality that we can automatically build, deploy, and test end-to-end."

For a web application, the walking skeleton might be:

1. A single endpoint that returns a hard-coded response
2. A single database table with one column
3. A build script that compiles the code
4. A test that hits the endpoint and checks the response
5. A deployment to a staging environment (even if it's just localhost with a different port)

The walking skeleton deliberately has boring functionality — a flat page with a field from the database. The point is not the feature; the point is proving that the entire pipeline works: code compiles, tests run, app deploys, end-to-end test passes.

**Why this matters:** Without a walking skeleton, you'll build domain logic in isolation and discover integration problems late. The [GOOS](../sources/growing-oo-software-freeman-pryce.md) approach is to establish the full feedback loop — build, deploy, test end-to-end — before writing a single feature.

## Step 4: Drive Features with Acceptance Tests

With the skeleton in place, you have the infrastructure to write [acceptance tests](../concepts/atdd.md) — tests that exercise the system from the outside and define when a feature is complete.

The workflow is [Outside-In TDD](../concepts/outside-in-tdd.md) (double-loop TDD):

1. **Write a failing acceptance test** that expresses what the user needs, in domain language
2. **Drop into the inner loop:** write unit tests to drive the implementation, one layer at a time
3. **Repeat the inner loop** until the acceptance test passes
4. **Refactor** — the acceptance test holds the behavior while you improve the structure

```
Outer loop (RED) ────────────────────────────── Outer loop (GREEN)
  │                                                  ▲
  ▼                                                  │
  Inner cycle 1: boundary layer     ── GREEN ────────┤
  Inner cycle 2: service layer      ── GREEN ────────┤
  Inner cycle 3: domain layer       ── GREEN ────────┘
```

See the [worked example](../concepts/outside-in-tdd.md#worked-example-double-loop-in-practice) on the Outside-In TDD page for a concrete implementation of this pattern.

This is where the katas pay off — the inner loop is the same red-green-refactor cycle you practiced on the String Calculator, but now it's nested inside a larger acceptance test that tracks progress toward a complete feature.

## Step 5: Build the Habit

TDD is a discipline, not a technique you apply once. The adoption path from [TDD by Context](../concepts/tdd-by-context.md):

| Maturity | Approach |
|----------|---------|
| **New to TDD** | [Chicago school](../concepts/chicago-vs-london.md) on pure logic. 10-15 min cycles are fine. Avoid [mocking](../concepts/mocking.md) early on. |
| **Intermediate** | Introduce [London school](../concepts/london-school-tdd.md) for boundary code. Shorten cycles to 5-10 min. Add [property-based testing](../concepts/property-based-testing.md). |
| **Advanced** | [Outside-in TDD](../concepts/outside-in-tdd.md), [ATDD](../concepts/atdd.md), sub-5-min cycles. Test infrastructure is a first-class concern. |

The common mistake in greenfield projects: skipping TDD early because "it's a small project" or "I'll add tests later." The empirical evidence ([TDD Empirical Evidence](../concepts/tdd-empirical-evidence.md)) shows a 15-35% upfront time cost offset by 40-90% defect reduction. The time to build the habit is when the project is small and the cost of discipline is low.

## The Greenfield Sequence (Summary)

```
Step 0: Run a test (remove mechanical barrier)
  ↓
Step 1: Katas — learn Red-Green-Refactor on pure logic
  ↓
Step 2: BDD naming — shift from implementation to behavior
  ↓
Step 3: Walking Skeleton — establish the full pipeline
  ↓
Step 4: Outside-In TDD — drive features from acceptance tests inward
  ↓
Step 5: Build the habit — progress from Chicago to London to ATDD
```

## Related Pages

- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Walking Skeleton](../concepts/walking-skeleton.md)
- [Outside-In TDD](../concepts/outside-in-tdd.md)
- [ATDD](../concepts/atdd.md)
- [BDD](../concepts/bdd.md)
- [TDD by Context](../concepts/tdd-by-context.md)
- [Simple Design](../concepts/simple-design.md)
- [Four-Phase Test](../concepts/four-phase-test.md)
- [Test First](../concepts/test-first.md)
- [TDD Empirical Evidence](../concepts/tdd-empirical-evidence.md)
- [Brownfield Guide](brownfield.md)
- [Choosing Test Levels Guide](choosing-test-levels.md)
