---
title: "Clean Code: A Handbook of Agile Software Craftsmanship"
type: source
tags: [robert-martin, clean-code, naming, functions, design, solid]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/clean-code-robert-martin.md]
---

Robert C. Martin's handbook on writing clean, maintainable code. Covers naming, functions, formatting, error handling, testing, and design principles.

## Bibliographic Info

- **Author:** Robert C. Martin ("Uncle Bob") and Object Mentors team
- **Publisher:** Prentice Hall / Pearson, 2009
- **ISBN:** 978-0-13-235088-4

## Core Premise

> "Writing clean code is what you must do in order to call yourself a professional."

Clean code is fundamentally about communication — code is read far more than it is written. The author is "we authors" — we are responsible for how our code reads.

## Key Chapters and Rules

### Chapter 1: What Is Clean Code?
- Code will always exist — requirements cannot be fully specified in natural language
- Bad code: total cost of ownership grows exponentially with mess
- The Boy Scout Rule: "Leave the campground cleaner than you found it"
- Clean code: does one thing well, reads like well-written prose

### Chapter 2: Meaningful Names
- Use intention-revealing names
- Avoid disinformation (e.g., `accountList` when it's not a List)
- Make meaningful distinctions — no `a1`, `a2`, `a3`
- Use pronounceable and searchable names
- Avoid encodings (Hungarian notation, member prefixes)
- Pick one word per concept; don't pun
- Use problem domain names where appropriate

### Chapter 3: Functions
- Functions should be small (20 lines maximum is a rough guide)
- Do one thing — a function "does one thing" if you cannot extract another function from it
- One level of abstraction per function
- Use descriptive names
- Functions should have few arguments (0 ideal, 3 maximum before object is needed)
- Flag arguments are ugly — they announce that a function does two things
- No side effects

### Chapter 4: Comments
- Comments are failures to express in code
- Good comments: legal, informative, intent explanations, clarifications, warnings, TODOs
- Bad comments: redundant, misleading, mandated, journal, noise

### Chapter 9: Unit Tests (TDD Connection)
- Three Laws of TDD:
  1. You may not write production code until you have written a failing unit test
  2. You may not write more of a unit test than is sufficient to fail
  3. You may not write more production code than is sufficient to pass the failing test
- Tests must be kept as clean as production code
- F.I.R.S.T.: Fast, Independent, Repeatable, Self-Validating, Timely

### Chapter 10: Classes
- Classes should be small (measured in responsibilities, not lines)
- Single Responsibility Principle: a class should have one reason to change
- Open-Closed Principle: open for extension, closed for modification

## Connection to TDD

The Three Laws in Chapter 9 are a formalization of [[test-first]] practice. The F.I.R.S.T. properties parallel Farley's [[good-test-properties]] framework. The emphasis on small functions with one responsibility directly supports testability.

## Related Pages

- [[test-first]]
- [[good-test-properties]]
- [[solid-principles]]
- [[refactoring]]
- [[tdd-smells]]
- [[dependency-injection]]
- [[mocking]]
- [[ubiquitous-language]]
- [[bdd]]
- [[robert-martin]]
