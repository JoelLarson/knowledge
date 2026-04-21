---
title: Guides
type: overview
tags: [guides, learning-path, teaching, adoption]
created: 2026-04-21
updated: 2026-04-21
sources: []
---

# Guides

The wiki's concept pages are organized by topic — useful as a reference, less useful for someone asking "where do I start?" These guides provide opinionated paths through the same material, sequenced for different starting points.

## By Situation

- [Greenfield: Your First Tests](greenfield.md) — Starting a new project with TDD from day one. Covers zero-to-first-test, choosing a framework, the walking skeleton, and building the habit before the codebase punishes you for skipping it.

- [Brownfield: Testing an Existing Codebase](brownfield.md) — Introducing TDD to a monolith or microservice that has no tests. Covers characterization tests, dependency breaking, the Legacy Code Change Algorithm, and the discipline of testing what you're about to touch rather than chasing coverage.

- [Why Testing Matters](why-testing-matters.md) — For programmers new to the concept. Makes the case that automated testing is not bureaucratic overhead but a fundamental practice for writing software that works, stays working, and can be changed safely.

- [Choosing Test Levels](choosing-test-levels.md) — When should something be a unit test, an integration test, or an acceptance test? Covers the testing pyramid, Khorikov's managed/unmanaged dependency distinction, and the acceptance-first workflow where user stories become executable tests that drive unit-level TDD.

## How to Use These Guides

Each guide is a reading path through existing wiki pages. They add context, sequencing, and opinionated advice, but the deep content lives in the concept pages they link to. Follow the links when you want depth; stay in the guide when you want direction.

The guides are not mutually exclusive. A team introducing TDD to a brownfield codebase will eventually need the greenfield guide for new features. A new programmer should read "Why Testing Matters" first, then whichever situational guide matches their project.
