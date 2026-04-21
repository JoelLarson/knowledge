---
title: London School TDD (Mockist/Interaction-Based)
type: concept
tags: [london-school, mockist, interaction-testing, outside-in, steve-freeman, nat-pryce]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

The London School (also called Mockist or Interaction-Based TDD) is a style of test-driven development that emphasizes testing the communication between objects rather than their resulting state. Its defining text is [Growing Object-Oriented Software, Guided by Tests](../sources/growing-oo-software-freeman-pryce.md) by [Steve Freeman](../entities/steve-freeman.md) and [Nat Pryce](../entities/nat-pryce.md). For a side-by-side comparison with the Classical approach, see [Chicago vs. London Schools](chicago-vs-london.md).

## Core Ideas

### 1. Mock Objects as a Design Tool — The Interface Discovery Workflow

Mocks are not merely for isolating slow dependencies. They are the central technique for **discovering the roles, protocols, and interfaces** between objects. When you write a mock expectation, you are simultaneously defining *what* a collaborator must do and *how* the object under test will communicate with it (Freeman & Pryce, GOOS Ch. 2 and Ch. 6).

> "Our original motivation for writing the book was to finally explain the technique of using mock objects, which we often see misunderstood." — Freeman & Pryce (GOOS, Preface)

The interface discovery workflow proceeds step by step:

1. **Start from a need.** You are implementing an object and realize it cannot fulfil its responsibility alone — it needs help from a collaborator that does not yet exist.
2. **Write the expectation first.** In your test, you declare a mock for the collaborator and specify the exact message (method name, arguments, return value) the object under test should send. At this point, the collaborator interface has no real implementation — the mock *is* the first draft of the protocol.
3. **Let the compiler guide you.** The test will not compile because the interface does not exist. Create the minimal interface (or protocol/trait) that satisfies the expectation. You have now discovered the collaborator's role from the *client's* perspective rather than the *provider's* perspective. This is what Freeman and Pryce call "need-driven development" (GOOS Ch. 6).
4. **Make the test pass.** Implement just enough production code in the object under test so that it sends the expected message. The test turns green.
5. **Move inward.** The newly discovered interface becomes the subject of the *next* test. Write a test for its implementation, which may in turn discover further collaborators. Repeat the cycle layer by layer.
6. **Refine the protocol.** As you implement the real collaborator, you may find the first-draft interface needs adjustment. Update the expectation, the interface, and the production code together — each change is a deliberate, tested design decision.

This cycle has a crucial consequence: **interfaces emerge shaped by their consumers, not their implementors.** The result is narrow, role-based interfaces that express exactly the communication each client needs — nothing more.

### 2. Focus on Messages, Not State

Following Alan Kay's vision of OO as "messaging," the London school tests what messages objects send to each other. This drives designs where objects have clear responsibilities expressed through narrow interfaces (Freeman & Pryce, GOOS Ch. 2).

### 3. Outside-In Development

Start with a failing end-to-end acceptance test, then drive implementation inward layer by layer, using mocks to stand in for undiscovered collaborators. Each layer's tests verify the messages sent to the next layer. See [Outside-In TDD](outside-in-tdd.md).

### 4. Only Mock Types You Own

Don't mock third-party APIs directly. Write adapter layers that translate between your domain and external code. Mock your own adapter interfaces. This rule was articulated by Joe Walnes within the London XTC community (Freeman & Pryce, GOOS Ch. 8).

## Origins

The London school emerged from the London Extreme Tuesday Club (XTC) in the late 1990s and early 2000s. The foundational ideas were first published in "Endo-Testing: Unit Testing with Mock Objects" (Mackinnon, Freeman, Craig, 2000), presented at XP2000. Key figures:

- **Tim Mackinnon** — originated the concept of mock objects as a design technique at Connextra (1999) and the "No Getters" rule (Mackinnon, Freeman, Craig, 2000).
- **[Steve Freeman](../entities/steve-freeman.md)** — recognized the paper-worthy nature of the technique; co-authored the XP2000 paper and later co-wrote GOOS.
- **[Nat Pryce](../entities/nat-pryce.md)** — brought protocol-focused thinking from his PhD work on interaction patterns; built DynaMock and jMock (Freeman & Pryce, GOOS Ch. 1).
- **Joe Walnes** — coined "Only mock types you own" and articulated how mocks serve as interface design drivers rather than mere test isolation tools.

## When to Use London Style

- Object-oriented systems with clear communication patterns between collaborating objects
- Event-driven or message-passing architectures
- When you want to design interfaces from the consumer's perspective
- When you want to enforce [Tell, Don't Ask](tell-dont-ask.md) and information hiding

## Limitations and When Not to Use

The London school is powerful for interface-rich, collaborator-heavy designs, but it carries real costs that teams should weigh honestly.

**Test fragility.** Because tests specify the exact messages sent between objects, any change to a communication pattern — even a behavior-preserving refactoring — can break many tests at once. This is the core tradeoff: the same coupling that makes protocols explicit also makes tests brittle when those protocols evolve.

**Mock maintenance overhead.** Each mock expectation is a line of setup code that must be kept in sync with production interfaces. As the system grows, the volume of expectation wiring can rival or exceed the production code it exercises, making tests expensive to maintain.

**Difficult failure diagnosis.** When a mock-heavy test fails, the error message often reports a missed or unexpected method call deep in a chain of interactions. Tracing that failure back to a meaningful cause — especially when multiple mocks interact — can be significantly harder than reading a simple state assertion mismatch.

**Risk of testing implementation, not behavior.** It is easy to write tests that merely mirror the production code's call sequence, proving nothing beyond "the code does what the code does." Without discipline, mock-based tests degenerate into change detectors rather than behavior specifications.

**Learning curve.** Teams unfamiliar with interaction testing often struggle with the mental shift from "assert what came out" to "specify what messages are sent." Getting value from the London style requires understanding interface discovery, need-driven development, and the distinction between roles and implementations — concepts that take deliberate practice to internalize.

## Related Pages

- [Outside-In TDD](outside-in-tdd.md)
- [Walking Skeleton](walking-skeleton.md)
- [Tell, Don't Ask](tell-dont-ask.md)
- [Mocking](mocking.md)
- [Test Doubles](test-doubles.md)
- [Dependency Injection](dependency-injection.md)
- [Ports and Adapters](ports-and-adapters.md)
- [TDD vs. Unit Testing](tdd-vs-unit-testing.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Steve Freeman](../entities/steve-freeman.md)
- [Nat Pryce](../entities/nat-pryce.md)
- [Kent Beck](../entities/kent-beck.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
