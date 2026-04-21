---
title: Nat Pryce
type: entity
tags: [nat-pryce, london-school, mock-objects, jmock, goos]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

Nat Pryce is co-author of [Growing Object-Oriented Software, Guided by Tests](../sources/growing-oo-software-freeman-pryce.md), co-creator of jMock, and a pioneer of the [London school of TDD](../concepts/london-school-tdd.md).

## Key Contributions

- **GOOS** — co-authored the defining text of the London/Mockist school of TDD (2009)
- **jMock / DynaMock** — created the mock objects library that introduced protocol-focused expectations, Hamcrest-style constraints, and expressive failure messages
- **Protocol-based thinking** — brought emphasis on communication protocols between objects from his PhD work at Imperial College
- **London XP Day** — founding organizer
- **2006 Gordon Pask Award** — joint winner with [[steve-freeman]] for contributions to agile development

## Background

- PhD from Imperial College (protocols between components)
- Worked across sports reportage, marketing, retail, telecoms, and finance
- Early adopter of Extreme Programming
- Contributed to several open-source TDD libraries

## Key Ideas

- **Expectations over assertions** — shifted mock objects from asserting parameter values to asserting messages sent between objects (protocols)
- **Constraint objects** — introduced the concept that evolved into Hamcrest matchers; constraints describe what went wrong, not just that something failed
- **Descriptive failure messages** — test failures should immediately explain the problem; constraints self-describe their mismatch

## Influence on Mock Objects

Nat's Ruby implementation of mock objects (later ported to Java) changed the emphasis from verifying parameter values to verifying communication protocols. This conceptual shift — from "did it receive the right data?" to "did it send the right message?" — became the foundation of the London school approach.

## Related Pages

- [[steve-freeman]]
- [[london-school-tdd]]
- [[outside-in-tdd]]
- [[mocking]]
- [[test-doubles]]
- [[growing-oo-software-freeman-pryce]]
- [[kent-beck]]
