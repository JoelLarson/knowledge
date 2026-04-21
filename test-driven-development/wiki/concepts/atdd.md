---
title: Acceptance Test Driven Development (ATDD)
type: concept
tags: [atdd, acceptance-tests, bdd, dave-farley, continuous-delivery, feature-level, london-school]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

ATDD applies the TDD discipline at the feature/user story level. Acceptance tests are written before development begins and define when a feature is complete. Together with fine-grained TDD, they form a comprehensive test strategy.

## What Acceptance Tests Do

Fine-grained TDD tests answer: "Does the code do what I (the developer) think it does?"

Acceptance tests answer: "Does this change do what our users need it to do?"

Both questions are necessary. Neither alone is sufficient.

## Acceptance Tests as Executable Specifications

Acceptance tests are:
- Written before development begins (test-first, at feature level)
- Expressed in the language of the problem domain
- Treated as an **automated definition of done**
- Owned by developers (even if written by anyone with knowledge of the outcome)

> "When those tests pass, we're finished. That's a very nice property to have." — Dave Farley

## Developers Must Own Acceptance Tests

A common anti-pattern is having a separate QA team own acceptance tests. This doesn't work:
- QA teams cannot affect the changes that break tests
- Developers who commit breaking changes cannot fix them quickly
- The feedback loop is broken

> "A separate QA or testing team owning responsibility for these tests is a kind of toxic anti-pattern that has been tried for decades and doesn't really work." — Dave Farley

## The Four-Layer Structure

Good acceptance tests are organized in four layers:

1. **Test Cases (Executable Specifications)** — express outcomes in problem domain language, independent of implementation. "Place an order. Check for feedback message."

2. **Domain-Specific Language (DSL)** — vocabulary for expressing scenarios: "place_order", "check_feedback", "time_travel(4 weeks)"

3. **Translation Layer** — translates DSL into actual system interactions (HTTP calls, UI actions, database operations)

4. **System Under Test** — the real application

**Why this matters:** If the system changes, fix it in one place (translation layer) rather than thousands of test cases.

This is essentially the **ports and adapters** pattern for tests.

## Test Isolation in Acceptance Tests

### System Isolation
Test each service at its natural boundaries. Stub out upstream/downstream dependencies. For integration tests between services, use **contract-based testing** — write your assumptions of the integration as tests and share them with the other team.

### Temporal Isolation
Tests that share state with themselves (e.g., creating the same book twice) can be made isolated by using unique identifiers per test run. The test infrastructure manages the name mapping.

### Time Travel
Systems that depend on time should inject a controllable clock. Tests can "time travel" by advancing the clock, enabling scenarios like "overdue by 4 weeks" in milliseconds.

### Parallel Execution
Tag tests: destructive, time-travel, hardware-specific. Farm common tests across parallel hosts; give time-travel tests dedicated instances.

## ATDD + Fine-Grained TDD Together

Recommended strategy:
1. Start a new feature by writing acceptance tests that capture user-visible examples
2. Use [BDD](bdd.md)-flavored fine-grained TDD to evolve the code until acceptance tests pass
3. Fine-grained tests provide fast feedback during development; acceptance tests provide functional correctness

Neither alone is as good as both together.

## Real Examples (Financial Exchange)

From Farley's experience:
```
"place_order(IBM, 100, BUY)"
"wait_for_feedback_message()"
"assert_execution_report(IBM, 100, BUY, FILLED)"
```

Traders recognize these terms. The language of the problem domain makes the tests readable by non-technical stakeholders.

## GOOS: Acceptance Tests in the Double Loop

[Growing Object-Oriented Software](../sources/growing-oo-software-freeman-pryce.md) places acceptance tests at the center of the development process through [double-loop TDD](outside-in-tdd.md):

### Start Every Feature with an Acceptance Test
> "We start work on a new feature by writing failing acceptance tests that demonstrate that the system does not yet have the feature we're about to write and track our progress towards completion." — Freeman & Pryce

### End-to-End, Not Just Edge-to-Edge
GOOS insists acceptance tests should exercise the **full deployed system** through external access points — not just instantiate internal objects. A horror story: a team had passing acceptance tests but `// TODO implement this` in their entry point because tests only exercised internal objects.

### Domain Language Only
Acceptance tests use terminology from the application's domain, not underlying technologies. This:
- Shields tests from infrastructure changes (FTP to web services)
- Forces the team to understand what users actually need
- Keeps tests as living documentation

### Two Acceptance Test Suites
- **In-progress** — tests for the current feature; expected to fail until done
- **Regression** — tests for completed features; must always pass

This separation clearly tracks progress and catches regressions independently.

### The Walking Skeleton Connection
The [Walking Skeleton](walking-skeleton.md) establishes the acceptance test infrastructure. Without it, you cannot write meaningful end-to-end acceptance tests. GOOS solves the "first-feature paradox" by building the thinnest end-to-end slice first.

## Limitations and When Not to Use

ATDD carries significant infrastructure cost. The four-layer architecture (test cases, DSL, translation layer, system under test) requires building and maintaining a custom domain-specific language and its translation machinery before you write a single meaningful test. On small or simple projects -- a CRUD app with straightforward requirements, an internal tool with a handful of users -- this investment rarely pays back. The overhead of designing and maintaining the DSL exceeds the value of the executable specifications it produces.

As features evolve, acceptance tests become a maintenance burden. Every change to user-facing behavior can cascade through the DSL and translation layer. Teams that lack discipline in keeping the translation layer thin end up with brittle test suites that break on routine refactors. Slow acceptance test suites compound the problem: if end-to-end tests take 30+ minutes, they block CI pipelines and erode the fast feedback loop that TDD depends on. Parallel execution and tagging help, but they add yet more infrastructure to maintain.

The coordination overhead between developers and product stakeholders is real. Acceptance tests are most valuable when product owners contribute to defining scenarios, but in practice this collaboration is difficult to sustain. Product teams context-switch away, leaving developers to write and maintain both the scenarios and the code, which removes much of the "shared understanding" benefit ATDD promises. If your team cannot sustain cross-role collaboration on test scenarios, the practice degrades into developers writing acceptance tests alone -- at which point simpler [integration testing](integration-testing.md) approaches deliver equivalent confidence with less ceremony.

## Related Pages

- [BDD](bdd.md)
- [Test First](test-first.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Legacy Code](legacy-code.md)
- [Approval Testing](approval-testing.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [Continuous Delivery](continuous-delivery.md)
- [Dependency Injection](dependency-injection.md)
- [Good Test Properties](good-test-properties.md)
- [Outside-In TDD](outside-in-tdd.md)
- [Walking Skeleton](walking-skeleton.md)
- [London School TDD](london-school-tdd.md)
- [Dave Farley](../entities/dave-farley.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Integration Testing](integration-testing.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
