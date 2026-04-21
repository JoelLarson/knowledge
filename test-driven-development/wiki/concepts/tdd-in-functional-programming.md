---
title: TDD in Functional Programming
type: concept
tags: [tdd, functional-programming, design]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

TDD in functional programming leverages pure functions, immutable data, and algebraic types to produce code that is trivially testable without mocks. The absence of shared mutable state eliminates entire categories of testing complexity, while property-based testing becomes a natural complement to example-based TDD.

## Why FP Makes TDD Easier

### Pure Functions Are Ideal Test Subjects
A pure function's output depends only on its inputs and produces no side effects. This means:
- No test setup required (no mutable state to configure)
- No teardown needed (nothing to clean up)
- Tests are perfectly [repeatable](good-test-properties.md) — same inputs always give same outputs
- No ordering dependencies between tests
- Trivial parallelization of test suites

### No Mocking Needed
In OO TDD, much complexity comes from replacing collaborators with [Test Doubles](test-doubles.md). In FP:
- Functions take data in, return data out — no collaborators to mock
- Side effects are pushed to the edges (IO boundaries)
- Core logic is pure and testable without any doubles
- Only the thin IO layer at the boundary needs integration testing

### Immutable Data Eliminates Aliasing Bugs
When data cannot be mutated, you never need to worry about:
- Another test modifying shared state
- Temporal coupling between setup and assertion
- Defensive copying in test fixtures

## Differences from OO TDD

| Dimension | OO TDD | FP TDD |
|-----------|--------|--------|
| **Unit under test** | Object (method on a class) | Function |
| **Isolation mechanism** | Dependency injection + mocks | Function composition (no mocking) |
| **Design pressure** | Toward small objects with few deps | Toward small pure functions with clear types |
| **State management** | Test must manage object lifecycle | No lifecycle; functions are stateless |
| **Refactoring** | Extract class, move method | Extract function, compose, curry |
| **Property testing** | Useful for value objects | Natural for nearly all code |

## The Chicago/London Debate Dissolves

In functional programming, the [Chicago vs. London Schools](chicago-vs-london.md) distinction largely disappears:
- No objects means no "communication between objects" to test (London concern)
- No mutable state means state verification is just comparing return values (Chicago concern)
- The test simply calls a function and asserts on the result
- The design question shifts from "object responsibilities" to "function composition"

## Property-Based Testing as Natural Complement

[Property-Based Testing](property-based-testing.md) is particularly natural in FP because:
- Pure functions have mathematical properties (commutativity, associativity, idempotency)
- Algebraic data types provide natural generators
- Equational reasoning is built into the programming model
- QuickCheck was created in Haskell for exactly this reason

## REPL-Driven Development

Many FP practitioners use REPL-driven development as a complement to TDD:
- Explore ideas interactively in the REPL
- Formalize discoveries as tests
- The REPL serves as a fast inner loop; tests serve as the permanent record

This is not a replacement for TDD but an additional feedback mechanism. The REPL gives even faster feedback than a test runner for initial exploration.

## Handling Side Effects

The challenge in FP TDD is testing code that interacts with the outside world. Common approaches:

### Effects at the Edges
Push all IO to the outermost layer. Core logic is pure and unit-testable. The thin shell handles IO and is tested via integration tests.

### Effect Types (Haskell, Scala)
Encode side effects in the type system (IO monad, ZIO, cats-effect). Test by interpreting effects against a test runtime rather than the real world.

### Functional Core, Imperative Shell
The architecture pattern where the functional core contains all business logic (tested with unit tests) and the imperative shell handles IO (tested with integration tests). Analogous to [Ports and Adapters](ports-and-adapters.md) in OO.

## Examples by Language

### Haskell
- QuickCheck for property-based testing
- HSpec for BDD-style specifications
- Type system catches many errors that would need tests in other languages

### Clojure
- clojure.test + test.check (property-based)
- REPL-driven exploration formalized into tests
- Spec for generative testing of function contracts

### Elixir
- ExUnit built into the language
- StreamData for property-based testing
- Doctests as lightweight TDD (examples in documentation are run as tests)

### F# / OCaml
- Expecto / FsCheck for property-based testing
- Type-driven development reduces the need for certain tests
- Pattern matching + algebraic types make invalid states unrepresentable

## Related Pages

- [Property-Based Testing](property-based-testing.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Test Doubles](test-doubles.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Value Objects](value-objects.md)
- [Good Test Properties](good-test-properties.md)
- [Simple Design](simple-design.md)
