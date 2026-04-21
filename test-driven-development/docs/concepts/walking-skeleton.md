---
title: Walking Skeleton
type: concept
tags: [walking-skeleton, deployment, end-to-end, feedback, london-school]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

A walking skeleton is an implementation of the thinnest possible slice of real functionality that can be automatically built, deployed, and tested end-to-end. It establishes the full development infrastructure before fleshing out features.

## Definition

> "A 'walking skeleton' is an implementation of the thinnest possible slice of real functionality that we can automatically build, deploy, and test end-to-end. It should include just enough of the automation, the major components, and communication mechanisms to allow us to start working on the first feature." — Freeman & Pryce

The skeleton's application functionality should be so simple that it's "obvious and uninteresting," leaving the team free to concentrate on infrastructure. Example: a database-backed web app showing a flat page with fields from the database.

## Purpose

1. **Resolve the "first-feature paradox"** — you can't write a meaningful acceptance test without build/deploy infrastructure, but you can't justify infrastructure without a feature. The walking skeleton splits this into two smaller problems.
2. **Flush out risks early** — deployment, integration, external dependencies, organizational processes. If it takes six weeks to get a database, you want to know now.
3. **Establish the full feedback loop** — automated build, deploy to production-like environment, run end-to-end tests through external access points.
4. **Front-load uncertainty** — incremental projects start unsettled then stabilize, unlike late-integration projects that start calm and collapse at the end.

## What "End-to-End" Means

For GOOS, end-to-end includes the **process**, not just the system:
- Check out latest code
- Compile and unit-test
- Integrate and package
- Deploy to a production-like environment
- Exercise through external access points

The deployment step is critical because:
- It forces automation of error-prone manual steps
- It exposes organizational dependencies (operations, vendors, signatures)
- It provides realistic feedback earlier

## Walking Skeleton vs. BDUF

A walking skeleton is NOT Big Design Up Front. It involves:
- Whiteboard-level architecture decisions only
- The minimum structure to support the first acceptance test
- Reserving the right to change everything later
- Learning through concrete implementation, not paper design

## Relationship to TDD Cycle

```
[Walking Skeleton] → [First Acceptance Test] → [Ongoing TDD]
       ↓                      ↓                      ↓
  Infrastructure         Feature tests         Red-Green-Refactor
  Build/Deploy/Test      End-to-end            Unit + Acceptance
```

The walking skeleton kick-starts the [double-loop TDD](outside-in-tdd.md) process. Once it exists, subsequent features slot into the established infrastructure.

## In Practice

From the GOOS Auction Sniper example:
- The skeleton displayed a single value in the UI and sent just a handshake message to the server
- It proved the Swing UI, XMPP messaging, and end-to-end test infrastructure all worked together
- Only then did the authors start implementing real bidding behavior

## Brownfield Adaptation

For existing systems without tests:
1. Automate the build and deploy process
2. Add end-to-end tests covering the areas you need to change
3. Start with the simplest path through the system (like a walking skeleton for legacy)
4. Gradually refactor and add unit tests under that protection

This connects to [Michael Feathers](../entities/michael-feathers.md)' work in _Working Effectively with Legacy Code_.

## Related Pages

- [[outside-in-tdd]]
- [[london-school-tdd]]
- [[atdd]]
- [[continuous-delivery]]
- [[red-green-refactor]]
- [[growing-oo-software-freeman-pryce]]
- [[steve-freeman]]
- [[integration-testing]]
- [[nat-pryce]]
