---
title: Approval Testing
type: concept
tags: [approval-testing, characterization-tests, legacy-code, emily-bache, refactoring]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/code-samples/fowler-theatrical-players/]
---

Approval testing (also called characterization testing) captures the current output of a system and uses it as the expected output in future test runs. The test passes if output is identical to what was previously "approved."

## How It Works

1. Run the code against a known input.
2. Capture the output (a string, file, rendered report, etc.).
3. Save that output as the "approved" file.
4. On subsequent runs: compare current output to the approved file.
5. If identical → pass. If different → fail.

This is useful when you don't know what the "correct" output should be in principle — you only know that nothing should change.

## Primary Use Cases

### Refactoring Safety Net (Legacy Code)
When working on code without tests, approval tests let you establish a baseline before you change anything. After a refactoring, if output is identical, the refactoring was behavior-preserving. This is the core use in [[legacy-code]] work.

> "Approval tests are a great tool that allows us to really start work in a legacy codebase when we don't yet know too well what's going on." — Dave Farley

### Refactoring Kata
The [[fowler-theatrical-players-kata]] uses approval tests to provide test coverage for the Theatrical Players billing code before you begin refactoring. You review and approve the output once, then the tests guard your refactoring.

## Limitations

- Approval tests only verify that behavior hasn't *changed* — they don't verify that the original behavior was *correct*.
- They're a safety net for refactoring, not a specification for new behavior.
- Output must be deterministic; non-deterministic output (timestamps, random IDs) requires special handling.

## Workflow in Legacy Systems

```
1. Write approval tests over area to be changed
2. Run coverage tools to verify coverage of area
3. Refactor: each change that preserves output → approval tests pass
4. Gradually replace with explicit TDD tests as you understand the domain
```

## Tools

- **ApprovalTests** (C++, C#, Java, Python, etc.) — Emily Bache's preferred library, included in the theatrical players kata
- **Jest snapshots** (JavaScript) — snapshot testing is a form of approval testing
- **Verify** (C#/.NET) — modern approval testing library

## Comparison to Regular TDD Tests

| | Approval Tests | TDD Tests |
|--|---------------|-----------|
| **Written before or after?** | After (captures existing behavior) | Before (specifies desired behavior) |
| **What they verify** | No regression from baseline | Correct implementation of specification |
| **When to use** | Legacy code, complex outputs | All new code |
| **Failure means** | Behavior changed | Behavior doesn't meet spec |

## Related Pages

- [[legacy-code]]
- [[refactoring]]
- [[fowler-theatrical-players-kata]]
- [[atdd]]
- [[emily-bache]]
- [[dave-farley-302-course]]
