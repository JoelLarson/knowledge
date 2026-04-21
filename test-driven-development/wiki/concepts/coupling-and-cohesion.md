---
title: Coupling and Cohesion
type: concept
tags: [design, coupling, cohesion, kent-beck, architecture]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Tidy First.md, raw/Software Architecture_ The Hard Parts.md]
---

Coupling and cohesion are the fundamental forces of software design, originally formalized by Larry Constantine and Ed Yourdon in *Structured Design* (1975/1979). High cohesion and loose coupling produce testable, changeable software. TDD reveals coupling problems through test pain — when tests are hard to write, the design is too coupled.

## Coupling

Two elements are coupled with respect to a particular change if changing one necessitates changing the other. The critical nuance: you cannot say elements are "coupled" without specifying *with respect to which changes*.

### Beck's Formal Definition

```
coupled(E1, E2, delta) === delta(E1) => delta(E2)
```

If a change to E1 forces a change to E2, they are coupled with respect to that change. Elements coupled with respect to a change that never happens aren't meaningfully coupled.

### Properties That Make Coupling Dangerous

- **1-to-N** — one element can be coupled to arbitrarily many others
- **Cascading** — a change ripples from A to B, then from B to C, then C to D... The cost of cascading changes follows a power law distribution: a few massive cascades dominate total cost

### Constantine's Equivalence

[Kent Beck](../entities/kent-beck.md)'s formalization of the Yourdon/Constantine insight:

```
cost(software) ~= cost(change) ~= cost(big changes) ~= coupling
```

The cost of software is approximately the cost of its coupling. This is because:
1. Most software cost is in changing it (not building it originally)
2. Change costs follow a power law — a few big changes dominate
3. Big changes are expensive because of cascading coupling

### Coupling at Architecture Scale

[Software Architecture: The Hard Parts](../sources/software-architecture-hard-parts.md) distinguishes:
- **Static coupling** — how things are wired together (dependencies, databases, frameworks). Measurable at compile time.
- **Dynamic coupling** — how things call each other at runtime. Three dimensions: communication (sync/async), consistency (atomic/eventual), coordination (orchestrated/choreographed).

A shared database reduces any distributed architecture to a single "architecture quantum," undermining independent testability.

## Cohesion

Coupled elements should be subelements of the same containing element. That's the first implication of cohesion. The second: elements that aren't coupled should go elsewhere.

### Two Approaches to Improving Cohesion

1. **Extract a cohesive subelement** — bundle coupled elements into their own container (e.g., extract helper function from lines that change together)
2. **Move uncoupled elements elsewhere** — relocate elements that don't belong with their current siblings

### High Functional Cohesion

In architecture, high functional cohesion overlaps with DDD's [Bounded Context](bounded-context.md): behavior and data that implement a particular domain workflow belong together.

## How TDD Reveals Coupling Problems

Test pain is a coupling signal. When tests are difficult to write, it usually means the code under test is excessively coupled:

| Test Pain | Coupling Problem |
|-----------|-----------------|
| Excessive setup / too many mocks | Too many dependencies — class does too much |
| Fragile tests (break when unrelated code changes) | Hidden coupling between components |
| Slow tests (need real database/network) | Missing abstractions at boundaries ([Ports and Adapters](ports-and-adapters.md)) |
| Can't test a class in isolation | Tight coupling to concrete implementations |
| Test requires private access | Cohesion problem — internals doing too much |

TDD's discipline of writing the test first forces you to experience coupling pain *before* writing production code, when the design is still cheap to change.

## The Coupling/Decoupling Trade-Off

Decoupling isn't free. Beck observes: "The more you reduce coupling for one class of changes, the greater the coupling becomes for other classes of changes." The practical implication: don't squeeze out every last bit of coupling.

The trade-off space:
- **Cost of coupling** — cascading changes, big expensive modifications, accidental breakage
- **Cost of decoupling** — indirection, complexity, abstraction overhead
- The right point on the continuum depends on which changes are likely

## Economic Framing (Tidy First)

Beck connects coupling to economics through two forces:
- **Time value of money** — coupling is fine if changes won't happen soon (defer decoupling)
- **Optionality** — decoupling creates options for future behavior changes (invest in decoupling)

When the environment is volatile and uncertain, options are more valuable, so decoupling has higher payoff. When the system is stable, coupling is less costly.

## Connection to Simple Design

[Simple Design](simple-design.md)'s four rules attack coupling and cohesion:
1. **Passes tests** — tests expose coupling
2. **Reveals intention** — good names create cohesive abstractions
3. **No duplication** — duplication is coupling (change one, must change the other)
4. **Fewest elements** — unnecessary abstractions add coupling

## Connection to Tidyings

Several [Tidyings](tidyings.md) directly address coupling and cohesion:
- **Cohesion Order** — move coupled elements closer together
- **Extract Helper** — create cohesive subelements
- **One Pile** — collapse over-fragmented code to find better cohesion boundaries
- **Explicit Parameters** — surface hidden coupling
- **New Interface, Old Implementation** — decouple callers from implementation details

## Related Pages

- [Tidyings](tidyings.md)
- [Tidy First? (Beck)](../sources/tidy-first-kent-beck.md)
- [Software Architecture: The Hard Parts](../sources/software-architecture-hard-parts.md)
- [Simple Design](simple-design.md)
- [Refactoring](refactoring.md)
- [Dependency Injection](dependency-injection.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Bounded Context](bounded-context.md)
- [SOLID Principles](solid-principles.md)
- [Kent Beck](../entities/kent-beck.md)
- [Neal Ford](../entities/neal-ford.md)
- [Fitness Functions](fitness-functions.md)
