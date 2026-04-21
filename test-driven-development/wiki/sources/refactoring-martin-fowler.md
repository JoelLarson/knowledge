---
title: "Refactoring: Improving the Design of Existing Code (2nd Edition)"
type: source
tags: [refactoring, martin-fowler, kent-beck, code-quality, theatrical-players]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/refactoring-martin-fowler.md]
---

The canonical reference on refactoring by Martin Fowler, with contributions from Kent Beck. The second edition (2019) uses JavaScript and introduces the Theatrical Players example that became a widely-used refactoring kata.

## Bibliographic Info

- **Author:** Martin Fowler (with contributions by Kent Beck)
- **Publisher:** Addison-Wesley, 2019 (2nd edition)
- **ISBN:** 978-0-13-475759-9

## Core Thesis

Refactoring — improving the internal structure of code without changing its external behavior — is a foundational software development discipline. The first step before refactoring is always establishing a solid set of automated tests.

## Chapter 1: The Starting Point — Theatrical Players

The Theatrical Players example is introduced as the book's worked example:

- A company of theatrical players charges customers based on audience size and play type (tragedy/comedy)
- Bills include "volume credits" as loyalty rewards
- Starting code is a monolithic `statement()` function with a switch statement
- Refactoring goal: extract code to support HTML output and new play types

This example directly spawned Emily Bache's [Theatrical Players Refactoring Kata](fowler-theatrical-players-kata.md).

### Key Refactorings Applied in Chapter 1
1. **Extract Function** — pull out `amountFor()` from the switch
2. **Inline Variable** — remove unnecessary temporaries
3. **Replace Temp with Query** — convert locals to function calls
4. **Extract Function** for `volumeCreditsFor()`
5. **Split Phase** — separate statement computation from rendering
6. **Replace Conditional with Polymorphism** — use classes for play types

### Fowler's First Rule
> "The first step in refactoring is always the same — make sure you have a solid set of tests for that section of code."

## Catalog of Refactorings

The book contains an extensive catalog of named refactorings including:
- Extract Function / Inline Function
- Extract Variable / Inline Variable
- Rename Variable/Function/Class
- Move Function/Field
- Split Loop
- Replace Conditional with Polymorphism
- Introduce Parameter Object
- Replace Error Code with Exception

## Connection to TDD

Refactoring is the third step of [Red-Green-Refactor](../concepts/red-green-refactor.md). You can only refactor safely when tests are in place. The Theatrical Players kata exists specifically to practice the TDD + refactoring combination with approval tests.

## Related Pages

- [Refactoring](../concepts/refactoring.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Approval Testing](../concepts/approval-testing.md)
- [Theatrical Players Kata](fowler-theatrical-players-kata.md)
- [Martin Fowler](../entities/martin-fowler.md)
- [Kent Beck](../entities/kent-beck.md)
