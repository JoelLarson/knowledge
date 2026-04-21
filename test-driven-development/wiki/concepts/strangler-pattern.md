---
title: Strangler Pattern
type: concept
tags: [strangler, legacy-code, migration, refactoring, anti-corruption-layer]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/dave-farley-302-tdd-and-bdd-design-through-testing/]
---

The Strangler Pattern is a migration strategy for [[legacy-code]] where new code gradually replaces old code behind well-defined boundaries, without a risky big-bang rewrite. Named after the strangler vine that grows around a tree and eventually replaces it.

## The Process

1. **Identify boundaries** — find the natural seams in the legacy code where you want to work. Use domain-driven design principles to identify good interface boundaries.

2. **Define anti-corruption layers** — introduce defensive walls (interfaces, adapters) that insulate the area of new work from the rest of the legacy system. These are the new contracts.

3. **Write tests at the boundaries** — write [acceptance tests](atdd.md) and [approval tests](approval-testing.md) at the anti-corruption layer interfaces. These tests verify that the system's observable behavior hasn't changed.

4. **Replace the internals** — behind the anti-corruption layer, rewrite or heavily refactor using [TDD](red-green-refactor.md). The boundary tests provide confidence that the new implementation preserves behavior.

5. **Expand gradually** — over time, more and more of the legacy system is replaced. The old code "dies" like the tree inside the vine.

## Anti-Corruption Layer

The anti-corruption layer is borrowed from Domain-Driven Design. It:
- Translates between the old system's internal models and the new system's models
- Prevents legacy concepts from leaking into new code
- Provides a stable interface for testing

## Why Not Big-Bang Rewrite?

Big rewrites fail because:
- You must reimplement everything before you can ship anything
- Requirements continue to change during the rewrite
- The old system has implicit behavior that's never documented
- There's no incremental value delivery

The strangler pattern delivers value incrementally — each replaced section works in production while the rest of the legacy system continues unchanged.

## Realistic Expectations

> "You're never going to end up with a beautiful system this way, but you might end up with a workable one and a more defensible one than you had before you began." — Dave Farley

## Related Pages

- [[legacy-code]]
- [[refactoring]]
- [[approval-testing]]
- [[atdd]]
- [[ports-and-adapters]]
- [[dave-farley-302-course]]
