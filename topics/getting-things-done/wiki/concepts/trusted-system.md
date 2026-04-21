---
title: Trusted System
type: concept
tags: [gtd, trust, system-design]
created: 2026-04-08
updated: 2026-04-08
sources: [raw/Getting Things Done - David Allen.pdf, raw/Getting_Things_Done]
---

A trusted system is an external place where commitments can live reliably enough that the mind does not need to keep rehearsing them. In GTD, trust depends on completeness, clarity, and regular review.

## Why It Matters

The system fails if it is:

- incomplete
- ambiguous
- stale
- surprising

## Groundloop Implications

- no hidden mutations
- strict audit trails for every write
- deterministic policy filters
- review cadence over autonomy theater

## Architectural Consequence

Groundloop should add clarity and memory while preserving Todoist as the visible task system of record. If Groundloop makes opaque changes, it undermines the trusted-system property it is supposed to improve.

## Related Pages

- [[gtd]]
- [[review]]
- [[capture-clarify-organize-reflect-engage]]
