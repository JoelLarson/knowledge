---
title: London School TDD (Mockist/Interaction-Based)
type: concept
tags: [london-school, mockist, interaction-testing, outside-in, steve-freeman, nat-pryce]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

The London School (also called Mockist or Interaction-Based TDD) is a style of test-driven development that emphasizes testing the communication between objects rather than their resulting state. Its defining text is [Growing Object-Oriented Software, Guided by Tests](../sources/growing-oo-software-freeman-pryce.md) by [Steve Freeman](../entities/steve-freeman.md) and [Nat Pryce](../entities/nat-pryce.md).

## London vs. Chicago Schools

| Dimension | London (Mockist) | Chicago (Classical) |
|-----------|-----------------|-------------------|
| **What tests verify** | Interactions between objects (messages sent) | State/output of the object under test |
| **Test doubles** | Heavy use of mocks to isolate each object | Minimal mocking; prefer real collaborators |
| **Design direction** | Outside-in (acceptance test drives unit tests) | Inside-out (start with domain model) |
| **Discovery** | Interfaces discovered through mock expectations | Classes discovered through state assertions |
| **Key text** | GOOS (Freeman & Pryce, 2009) | TDD by Example (Beck, 2002) |
| **Origin** | London Extreme Tuesday Club (XTC), late 1990s | Kent Beck, [Ward Cunningham](../entities/ward-cunningham.md), Smalltalk community |

## Core Ideas

### 1. Mock Objects as a Design Tool
Mocks are not merely for isolating slow dependencies. They are a technique for **discovering the roles and interfaces** between objects. When you write a mock expectation, you are defining the communication protocol between the object under test and its collaborator.

> "Our original motivation for writing the book was to finally explain the technique of using mock objects, which we often see misunderstood." — Freeman & Pryce

### 2. Focus on Messages, Not State
Following Alan Kay's vision of OO as "messaging," the London school tests what messages objects send to each other. This drives designs where objects have clear responsibilities expressed through narrow interfaces.

### 3. Outside-In Development
Start with a failing end-to-end acceptance test, then drive implementation inward layer by layer, using mocks to stand in for undiscovered collaborators. See [[outside-in-tdd]].

### 4. Interface Discovery
When implementing an object, you discover it needs a service. You create an interface, mock it in your test, and later provide a real implementation. The test drives the interface into existence from the client's perspective.

### 5. Only Mock Types You Own
Don't mock third-party APIs directly. Write adapter layers that translate between your domain and external code. Mock your own adapter interfaces.

## Origins

The London school emerged from the London Extreme Tuesday Club (XTC) in the late 1990s-early 2000s. Key figures:
- **Tim Mackinnon** — originated the "No Getters" rule and the concept of mock objects at Connextra (1999)
- **[[steve-freeman]]** — recognized the paper-worthy nature of the technique; co-wrote the XP2000 paper
- **[[nat-pryce]]** — brought protocol-focused thinking from his PhD work; built DynaMock/jMock
- **Joe Walnes** — coined "Only mock types you own"; saw mocks as interface design drivers

## When to Use London Style

- Object-oriented systems with clear communication patterns
- Event-driven or message-passing architectures
- When you want to design interfaces from the consumer's perspective
- When you want to enforce [[tell-dont-ask]] and information hiding

## Criticisms and Tradeoffs

- Tests can become tightly coupled to implementation (fragile if communication patterns change)
- Over-mocking leads to tests that pass but don't prove the system works (the [Mockery](tdd-smells.md) smell)
- Requires discipline: must also have end-to-end tests to verify real integration
- The Chicago school argues that testing state is more robust to refactoring

## Related Pages

- [[outside-in-tdd]]
- [[walking-skeleton]]
- [[tell-dont-ask]]
- [[mocking]]
- [[test-doubles]]
- [[dependency-injection]]
- [[ports-and-adapters]]
- [[tdd-vs-unit-testing]]
- [[red-green-refactor]]
- [[steve-freeman]]
- [[nat-pryce]]
- [[kent-beck]]
- [[chicago-vs-london]]
- [[growing-oo-software-freeman-pryce]]
