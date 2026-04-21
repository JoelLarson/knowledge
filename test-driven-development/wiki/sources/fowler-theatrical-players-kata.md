---
title: "Fowler Theatrical Players Refactoring Kata"
type: source
tags: [kata, refactoring, approval-testing, emily-bache, martin-fowler]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/code-samples/fowler-theatrical-players/]
---

A multi-language refactoring kata created by Emily Bache, based on the example from Chapter 1 of Martin Fowler's _Refactoring_ (2nd edition). Excellent practice ground for combining approval testing with TDD refactoring.

## Source Details

- **Repository:** [emilybache/Theatrical-Players-Refactoring-Kata](https://github.com/emilybache/Theatrical-Players-Refactoring-Kata)
- **Based on:** Chapter 1 of Refactoring (2nd Edition) by Martin Fowler

## Origin

Martin Fowler's book uses a Theatrical Players billing system as the worked example in Chapter 1. Emily Bache extracted this into a public kata repository with implementations in many languages. See [Refactoring (Fowler)](refactoring-martin-fowler.md).

## The Problem Domain

A company of theatrical players charges customers for performances. The starting code is a monolithic `statement()` function that:

- Reads plays (JSON: `plays.json`)
- Reads invoice/performances data (JSON: `invoices.json`)
- Computes charges based on play type (tragedy/comedy) and audience size
- Returns a formatted plain-text billing statement

**What to change:**

1. Add HTML output capability (alongside existing plain-text)
2. Add new play types (history, pastoral, etc.)

## Starting Code Structure

```
plays.json         — play catalog: {playID: {name, type}}
invoices.json      — invoice data: {customer, performances: [{playID, audience}]}
statement()        — monolithic function with switch on play type
```

## Testing Approach: Approval Testing

Fowler notes that the first step in refactoring is always establishing tests. Emily Bache used [Approval Testing](../concepts/approval-testing.md) for this kata. Approval tests:

- Capture a "golden" output for the current code
- Re-run and compare on every change
- Pass if output is identical; fail if anything changes

This provides a safety net for refactoring without knowing all the rules in advance.

## Available Languages

The repository provides starting points in: C, C++, C#, Dart, Delphi, Go, Java, JavaScript, PHP, Python, Ruby, Rust, and more. Each includes approval tests pre-wired.

## Key Files

- `README.md` — overview and instructions
- `javascript/src/statement.js` — canonical starting point
- `javascript/test/statement.test.js` — Jest-based approval tests
- Language subdirectories each have: source, tests, approved output files

## Learning Objectives

1. Understand what approval/characterization tests are and how to use them
2. Practice extract-function and other refactoring moves safely under test
3. Experience making structural changes (split phase, polymorphism) with confidence
4. Learn to add new play types without modifying existing logic

## Related Pages

- [Approval Testing](../concepts/approval-testing.md)
- [Refactoring](../concepts/refactoring.md)
- [Refactoring (Fowler)](refactoring-martin-fowler.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Martin Fowler](../entities/martin-fowler.md)
- [Emily Bache](../entities/emily-bache.md)
