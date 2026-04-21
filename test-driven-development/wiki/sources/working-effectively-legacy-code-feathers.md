---
title: "Working Effectively with Legacy Code — Michael Feathers"
type: source
tags: [legacy-code, testing, refactoring, dependency-breaking]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

The canonical book on getting pre-existing, untested code under test so it can be safely changed. Provides a systematic framework (the [[legacy-code-change-algorithm]]) and a catalog of 25 [[dependency-breaking-techniques]] for making legacy code testable.

## Book Metadata

- **Title:** Working Effectively with Legacy Code
- **Author:** [Michael C. Feathers](../entities/michael-feathers.md)
- **Publisher:** Prentice Hall (Robert C. Martin Series)
- **Year:** 2004 (First printing September 2004)
- **ISBN:** 0-13-117705-2
- **Foreword by:** [Robert C. Martin](../entities/robert-martin.md)

## Central Thesis

> "To me, legacy code is simply code without tests."

Code without tests is bad code regardless of how well-written, pretty, or well-encapsulated it is. With tests, we can change behavior quickly and verifiably. Without them, we don't know if our code is getting better or worse.

The book is not about testing per se — it is about being able to **confidently make changes in any code base**.

## Key Themes

1. **The Legacy Code Dilemma** — When we change code, we should have tests in place. To put tests in place, we often have to change code. Breaking this circular dependency is the core challenge.

2. **Cover and Modify vs. Edit and Pray** — Two approaches to changing code. "Edit and Pray" relies on care alone; "Cover and Modify" uses tests as a safety net. Tests act as a "software vise" holding behavior fixed while you change one thing at a time.

3. **[[seams]]** — Places where you can alter behavior without editing code at that point. The fundamental mechanism for getting untestable code under test. Types: preprocessing seams, link seams, object seams.

4. **Sensing and Separation** — The two reasons to break dependencies: *sensing* (accessing values our code computes) and *separation* (getting code into a test harness to run at all).

5. **[[characterization-tests]]** — Tests that document what code actually does (not what it should do). The safety net you build before refactoring.

6. **Adding code safely** — [[sprout-method]], Sprout Class, Wrap Method, Wrap Class — techniques for adding new tested code to legacy systems without modifying untested code.

## The Legacy Code Change Algorithm

See [[legacy-code-change-algorithm]] for full details. The five steps:

1. Identify change points
2. Find test points
3. Break dependencies
4. Write tests
5. Make changes and refactor

## Structure

- **Part I: The Mechanics of Change** (Chapters 1-5) — Core concepts: reasons to change software, feedback, sensing/separation, the seam model, tools
- **Part II: Changing Software** (Chapters 6-24) — FAQ-format chapters addressing specific situations (e.g., "I Can't Get This Class into a Test Harness," "I Don't Have Much Time and I Have to Change It")
- **Part III: Dependency-Breaking Techniques** (Chapter 25) — Catalog of 24 techniques designed to be performed without tests, in the service of putting tests in place

## Dependency-Breaking Techniques Catalog

See [[dependency-breaking-techniques]] for the full catalog. Key techniques include:

- Adapt Parameter
- Break Out Method Object
- Extract Interface
- Extract and Override Call/Factory Method/Getter
- Parameterize Constructor / Parameterize Method
- Subclass and Override Method
- Encapsulate Global References
- Introduce Static Setter
- Replace Function with Function Pointer (for C)

## Four Reasons to Change Software

1. Adding a feature
2. Fixing a bug
3. Improving the design (refactoring)
4. Optimizing resource usage

The most important distinction: **adding new behavior** vs. **changing old behavior**. Behavior is what users depend on.

## Unit Test Qualities (Feathers' Definition)

A test is NOT a unit test if it:
- Talks to a database
- Communicates across a network
- Touches the file system
- Requires special environment configuration

Good unit tests: (1) run fast, (2) help localize problems. A unit test that takes 1/10th of a second is a *slow* unit test.

## Related Pages

- [[legacy-code]]
- [[legacy-code-change-algorithm]]
- [[seams]]
- [[characterization-tests]]
- [[dependency-breaking-techniques]]
- [[sprout-method]]
- [[michael-feathers]]
- [[refactoring]]
- [[test-doubles]]
- [[dependency-injection]]
- [[robert-martin]]
