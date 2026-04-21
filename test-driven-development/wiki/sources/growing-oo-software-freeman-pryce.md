---
title: "Growing Object-Oriented Software, Guided by Tests"
type: source
tags: [tdd, oo-design, mocking, london-school]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

The definitive text on the London/Mockist school of TDD. Demonstrates how mock objects are not merely a testing convenience but a design tool that drives the discovery of object roles, responsibilities, and communication protocols.

## Book Metadata

- **Authors:** [Steve Freeman](../entities/steve-freeman.md), [Nat Pryce](../entities/nat-pryce.md)
- **Publisher:** Addison-Wesley (Pearson), 2009
- **ISBN:** 978-0-321-50362-6
- **Foreword by:** [Kent Beck](../entities/kent-beck.md)
- **Afterword by:** Tim Mackinnon (history of mock objects)

## Key Themes

1. **Software as a growing organism** — systems should be grown incrementally, always working, always well-structured. "A complex system that works is invariably found to have evolved from a simple system that works."
2. **Objects communicate via messages** — OO design is about the communication protocols between objects, not class hierarchies. Roles and interfaces matter more than classification.
3. **Mock objects as design tools** — mocks reveal the communication structure between objects; they are not just for test isolation but for discovering interfaces ("interface discovery").
4. **[Outside-in development](../concepts/outside-in-tdd.md)** — start from acceptance tests at the system boundary, drive inward through layers using mock objects to discover collaborators.
5. **[Walking skeleton](../concepts/walking-skeleton.md)** — begin every project with a thin end-to-end slice that proves the build/deploy/test cycle works.
6. **[Tell, Don't Ask](../concepts/tell-dont-ask.md)** — objects should send commands to collaborators rather than querying their state. This makes code more testable and flexible.
7. **[Ports and Adapters](../concepts/ports-and-adapters.md)** — isolate the domain from infrastructure; "only mock types that you own."
8. **Listen to the tests** — difficulty in testing is feedback about design quality. Hard-to-test code is hard-to-change code.

## Chapter-by-Chapter Summary

### Part I: Introduction (Ch 1-3)
- **Ch 1:** TDD as feedback-driven development. Nested feedback loops from seconds to months. Distinction between external quality (does it work for users?) and internal quality (is it easy to change?). The "double loop" of acceptance tests + unit tests.
- **Ch 2:** OO as a "web of objects" communicating via messages. Values vs. objects distinction. [Tell, Don't Ask](../concepts/tell-dont-ask.md) principle. Mock objects enable testing interaction-based designs without exposing internal state.
- **Ch 3:** Tool introduction — JUnit 4, Hamcrest matchers, jMock2.

### Part II: The Process of TDD (Ch 4-8)
- **Ch 4:** [Walking Skeleton](../concepts/walking-skeleton.md) — kick-start TDD by building the thinnest end-to-end slice. Deploy early, expose uncertainty early, avoid Big Design Up Front.
- **Ch 5:** Maintaining the cycle — start features with acceptance tests, develop from inputs to outputs, unit-test behavior not methods, "listen to the tests."
- **Ch 6:** OO style — separation of concerns, higher abstraction, encapsulation, [Tell Don't Ask](../concepts/tell-dont-ask.md), object peer stereotypes (dependencies, notifications, adjustments), "composite simpler than the sum of its parts," context independence.
- **Ch 7:** Achieving OO design through TDD — communication over classification, interface discovery via mocks, "budding off" new collaborators, compose objects to describe behavior, building DSLs.
- **Ch 8:** Third-party code — "only mock types that you own," write adapter layers, focused integration tests for adapters.

### Part III: A Worked Example (Ch 9-19)
An extended example building an "Auction Sniper" (online bidding agent) demonstrating:

- End-to-end acceptance tests driving development
- Incremental feature addition with the double loop
- Interface discovery through mock-driven unit tests
- Refactoring to separate concerns (extracting `AuctionMessageTranslator`, `XMPPAuctionHouse`, `SniperLauncher`)
- Real-world complexities: Swing UI, XMPP messaging, multi-threading

### Part IV: Sustainable TDD (Ch 20-24)
- **Ch 20:** "Listening to the Tests" — test smells as design feedback. Singletons are hidden dependencies, logging is a feature, don't mock concrete classes, don't mock values, bloated constructors signal missing abstractions.
- **Ch 21:** Test readability — names describe features, canonical test structure, streamlined code.
- **Ch 22:** Test data builders for complex object construction.
- **Ch 23:** Test diagnostics — design tests to fail clearly.
- **Ch 24:** Test flexibility — test information not representation, precise assertions.

### Part V: Advanced Topics (Ch 25-27)
- **Ch 25:** Testing persistence — isolation, explicit transactions.
- **Ch 26:** Unit testing and threads — separate functionality from concurrency.
- **Ch 27:** Asynchronous code — sampling vs. listening, synchronizing test threads.

### Afterword: A Brief History of Mock Objects
Tim Mackinnon recounts the origin of mock objects at Connextra in London (late 1999), the "No Getters" principle that drove the discovery, the Extreme Tuesday Club (XTC), and the evolution through DynaMock to jMock. Key insight: mock objects grew from the desire to maintain OO purity (no getters) while still testing effectively.

## Key Principles and Heuristics

| Principle | Description |
|-----------|-------------|
| Only mock types you own | Don't mock third-party APIs; write adapters |
| Interface discovery | Use mocks to pull new interfaces into existence |
| No And's, Or's, or But's | Single responsibility — describe a class without conjunctions |
| Composite simpler than sum of parts | A composed object's API should be simpler than its components |
| Context independence | Objects should not have built-in knowledge of their environment |
| Write the test you'd want to read | Clarity first; build infrastructure to support the test |
| Watch the test fail | Always verify the failure message is helpful before making it pass |

## Relationship to Other Wiki Sources

- **[TDD by Example (Beck)](tdd-by-example-kent-beck.md)** — Beck's book defines the Chicago/Classical school (state-based testing). GOOS defines the London/Mockist school (interaction-based). Beck wrote the foreword acknowledging "a different style" from his own.
- **[Modern Software Engineering (Farley)](modern-software-engineering-dave-farley.md)** — Farley's emphasis on testability, feedback, and "listening to the code" directly descends from GOOS principles.
- **[Dave Farley 302 Course](dave-farley-302-course.md)** — Farley's TDD course teaches GOOS concepts (ports and adapters, measurement points, mock-as-design-tool).
- **[Clean Code](clean-code-robert-martin.md)** — Martin praised GOOS as exposing "the deep symbiosis between TDD and OOD."
- **[Refactoring (Fowler)](refactoring-martin-fowler.md)** — GOOS uses continuous refactoring; the "walking skeleton" shares the same incremental philosophy.

## Related Pages

- [London School TDD](../concepts/london-school-tdd.md)
- [Outside-In TDD](../concepts/outside-in-tdd.md)
- [Walking Skeleton](../concepts/walking-skeleton.md)
- [Tell, Don't Ask](../concepts/tell-dont-ask.md)
- [Ports and Adapters](../concepts/ports-and-adapters.md)
- [Mocking](../concepts/mocking.md)
- [Test Doubles](../concepts/test-doubles.md)
- [Dependency Injection](../concepts/dependency-injection.md)
- [ATDD](../concepts/atdd.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Steve Freeman](../entities/steve-freeman.md)
- [Nat Pryce](../entities/nat-pryce.md)
- [Kent Beck](../entities/kent-beck.md)
