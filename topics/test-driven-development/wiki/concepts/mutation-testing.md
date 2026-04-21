---
title: Mutation Testing
type: concept
tags: [testing, quality, mutation]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

Mutation testing evaluates test suite quality by introducing small code changes (mutants) into production code and checking whether the test suite detects them. If a mutant survives (tests still pass), the test suite has a gap. It provides a more meaningful quality metric than line coverage alone.

## How It Works

1. **Start with passing tests** — the existing test suite must be green
2. **Generate mutants** — the tool makes small changes to production code:
   - Replace `>` with `>=`
   - Change `+` to `-`
   - Remove a method call
   - Replace `true` with `false`
   - Change return values
3. **Run tests against each mutant** — if tests fail, the mutant is "killed" (good); if tests pass, the mutant "survived" (gap found)
4. **Report mutation score** — `killed / total mutants * 100%`

## Mutation Score vs. Line Coverage

| Metric | What It Measures | Weakness |
|--------|-----------------|----------|
| Line coverage | Which lines were executed during testing | Executed != verified; a line can be covered without meaningful assertions |
| Mutation score | Whether tests actually detect changes | Computationally expensive; slow for large codebases |

A test suite can have 100% line coverage but a 60% mutation score — meaning 40% of code changes would go undetected. Mutation testing reveals "tests that don't test anything."

## Frameworks

| Language | Tool |
|----------|------|
| Java/Kotlin | PIT (pitest.org) |
| Python | mutmut, cosmic-ray |
| JavaScript/TypeScript | Stryker |
| C# | Stryker.NET |
| Ruby | mutant |
| Rust | cargo-mutants |

## Relationship to TDD

TDD practitioners might assume their test suites are strong because they never write code without a test. Mutation testing validates this assumption:

- **Well-practiced TDD** typically produces high mutation scores because every behavior was driven by a test that specifically demanded it
- **Sloppy TDD** (writing tests that pass too easily, or skipping the "see it fail" step) produces lower mutation scores
- **Test-after** code often has poor mutation scores because tests confirm the code exists rather than verifying specific behaviors

Mutation testing is a quality check on your TDD discipline: if you always write a test that fails for the right reason before making it pass, mutants in that code will be caught.

## Equivalent Mutants

Some mutants don't actually change behavior (e.g., changing the order of independent statements). These "equivalent mutants" inflate survival rates and cannot be killed. Modern tools try to minimize them but cannot eliminate them entirely.

## Practical Usage

Mutation testing is too slow to run on every commit for large codebases. Common strategies:

- Run on changed files only (incremental mutation testing)
- Run nightly or weekly on the full codebase
- Run on critical modules where correctness matters most
- Use as a periodic audit rather than a gate

## What Surviving Mutants Reveal

When a mutant survives, investigate:

- **Missing assertion** — the test exercises the code but doesn't check the result
- **Missing test case** — no test covers this specific behavior
- **Dead code** — the mutated code isn't actually needed (consider removing it)
- **Equivalent mutant** — the change doesn't affect observable behavior

## Related Pages

- [Good Test Properties](good-test-properties.md)
- [TDD Smells](tdd-smells.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Test First](test-first.md)
- [Continuous Delivery](continuous-delivery.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
