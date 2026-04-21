---
title: Outside-In TDD (Double-Loop TDD)
type: concept
tags: [outside-in, double-loop, acceptance-tests, london-school, tdd]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

Outside-in TDD starts from the outermost layer of the system (acceptance tests at the boundary) and drives inward, discovering collaborators and interfaces at each layer. It uses two nested feedback loops: an outer acceptance test loop and an inner unit test loop.

## The Double Loop

```
┌───��─────────────────────────────────────────────┐
│  OUTER LOOP: Failing Acceptance Test            │
│  (measures demonstrable progress)               │
│                                                 │
│    ┌───────────────────────────────────────┐    │
│    │  INNER LOOP: Unit Test Cycle          │    │
│    │  Red → Green → Refactor → ...         │    │
│    │  (supports developers)                │    │
│    └───────────────────────────────────────┘    │
│                                                 │
│  Acceptance test passes → feature complete      │
└─────────────────────────────────────────────────┘
```

- The **outer loop** is a failing acceptance test that exercises the system end-to-end. It defines what "done" means for a feature.
- The **inner loop** is the standard [[red-green-refactor]] cycle at the unit level, driving implementation of each layer until the acceptance test passes.

## How It Works

1. **Write a failing acceptance test** — exercises the system through its external interfaces (UI, API, messages). Uses only domain terminology, not technical details.
2. **Develop from inputs to outputs** — start with objects at the system boundary that receive external events. Discover what services they need.
3. **Use mocks to stand in for undiscovered collaborators** — when an object needs a service, define an interface and mock it. This is "interface discovery."
4. **Implement discovered interfaces** — write the next layer's objects, discovering further collaborators.
5. **Continue inward** until all layers connect to existing objects or external systems.
6. **Acceptance test passes** — the feature is complete.

## Develop from the Inputs to the Outputs

> "We start developing a feature by considering the events coming into the system that will trigger the new behavior... we work our way through the system: from the objects that receive external events, through the intermediate layers, to the central domain model, and then on to other boundary objects." — Freeman & Pryce

This contrasts with starting at the domain model and trying to hook it into the system later, which risks:
- Building unnecessary functionality
- Integration problems discovered late
- Wrong feedback driving design decisions

## Interface Discovery

The signature technique of [London school TDD](london-school-tdd.md):

1. Object A needs a service → define interface X
2. Mock X in A's unit test → write expectations for how A will use X
3. The mock expectations define X's protocol from A's perspective
4. Later, implement a real class for X, discovering what services *it* needs
5. Repeat

This "pulls" interfaces into existence from client needs rather than "pushing" features out from implementation.

## Relationship to Acceptance Tests

Outside-in TDD gives acceptance tests two distinct roles:
- **In-progress acceptance tests** — represent work yet to be done; expected to fail
- **Regression acceptance tests** — represent completed features; must always pass

This separation tracks progress and catches regressions independently. See [[atdd]].

## When Outside-In Works Best

- Systems with clear external boundaries (web apps, APIs, message-driven systems)
- When the team wants to discover domain interfaces rather than design them up front
- When end-to-end testing infrastructure exists (from the [[walking-skeleton]])
- When the [[tell-dont-ask]] style is desired

## Related Pages

- [[london-school-tdd]]
- [[walking-skeleton]]
- [[atdd]]
- [[red-green-refactor]]
- [[mocking]]
- [[dependency-injection]]
- [[tell-dont-ask]]
- [[ports-and-adapters]]
- [[integration-testing]]
- [[chicago-vs-london]]
- [[growing-oo-software-freeman-pryce]]
