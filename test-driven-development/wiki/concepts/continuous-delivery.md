---
title: Continuous Delivery
type: concept
tags: [continuous-delivery, cd, ci, dave-farley, jez-humble, deployment-pipeline]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/modern-software-engineering-dave-farley.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md"]
---

Continuous Delivery is the practice of keeping software always in a releasable state through automated pipelines. Co-authored by [Dave Farley](../entities/dave-farley.md) and [Jez Humble](../entities/jez-humble.md). TDD is a foundational practice enabling CD. The DORA research ([Accelerate](../sources/accelerate-forsgren-humble-kim.md)) provides statistical evidence that CD predicts delivery performance, organizational performance, and generative culture.

## Core Idea

Every commit should produce a release candidate that has passed through an automated deployment pipeline: build → unit tests → integration tests → acceptance tests → staging → production readiness.

The key constraint: if the pipeline is red, the team's top priority is fixing it.

## Connection to TDD

TDD is a prerequisite for effective CD:

1. **Fast feedback** — [Red-Green-Refactor](red-green-refactor.md) gives developers immediate local feedback. CI gives team-level feedback within minutes.
2. **Test confidence** — CD requires automated tests that actually verify correctness. TDD produces these as a side effect.
3. **Small commits** — TDD's small steps produce small, focused commits ideal for CI pipelines.
4. **Commit on green** — Farley's advice to commit at the end of each RGR cycle aligns perfectly with trunk-based development.

Without comprehensive automated tests (produced by TDD), the deployment pipeline is a formality — it can't catch regressions.

## The Deployment Pipeline

```
Commit Stage          → fast unit tests, compilation, static analysis
Acceptance Test Stage → [acceptance tests](atdd.md) in production-like environments
Performance Stage     → load testing, capacity verification
Production            → deployment (manual gate or fully automated)
```

## Continuous Delivery Principles (from the 302 course)

Farley's Module 2 starts with CD principles as the broader context for TDD:
- Work in small batches
- Automate everything
- Build quality in (not inspect it in afterward)
- Work so that everyone can see the state of the system
- Pursue continuous improvement

## CD Without TDD

A deployment pipeline without good tests is a "testing theater" — it provides the illusion of safety without the substance. TDD produces the tests that make the pipeline meaningful.

## Accelerate's Statistical Evidence

The DORA research program (2014-2017, published in [Accelerate](../sources/accelerate-forsgren-humble-kim.md)) measured CD as both a set of component capabilities and as a first-order construct. The findings provide rigorous statistical evidence for what practitioners had long observed:

### CD Drives Performance
Teams practicing CD achieve:
- Higher software delivery performance across all [DORA Metrics](dora-metrics.md) (lead time, deployment frequency, MTTR)
- Lower change failure rates
- A generative, performance-oriented Westrum culture

### CD Improves Quality
High performers (who practice CD) spend 49% of their time on new work vs. 38% for low performers. CD predicts lower unplanned rework and fewer defects.

### CD Makes Work Sustainable
The research found that CD practices reduce:
- **Deployment pain** -- deployments become routine, not feared events
- **Team burnout** -- investments in technology are investments in people

### The 8 CD Capabilities
Accelerate identifies eight capabilities that drive CD:
1. Version control (including system and application config)
2. Deployment automation
3. [Continuous Integration](continuous-integration.md) (trunk-based development, short-lived branches)
4. Trunk-based development (branches < 1 day)
5. [Test automation](test-automation-at-scale.md) (reliable, developer-owned)
6. Test data management
7. Shift left on security
8. Continuous delivery itself (deploy on demand, fast quality feedback)

### Architecture Matters
In 2017, loosely coupled architecture was the **biggest contributor** to CD -- even larger than test and deployment automation. Teams that can test and deploy independently of other teams achieve the best outcomes.

### CABs Don't Help
External change approval boards (CABs) are negatively correlated with delivery performance and have no correlation with stability. Peer review plus automated pipelines is more effective.

## Related Pages

- [Dave Farley](../entities/dave-farley.md)
- [Jez Humble](../entities/jez-humble.md)
- [ATDD](atdd.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Test First](test-first.md)
- [Extreme Programming](extreme-programming.md)
- [Modern Software Engineering (Farley)](../sources/modern-software-engineering-dave-farley.md)
- [Dave Farley 302 Course](../sources/dave-farley-302-course.md)
- [Accelerate](../sources/accelerate-forsgren-humble-kim.md)
- [DORA Metrics](dora-metrics.md)
- [Continuous Integration](continuous-integration.md)
- [Test Automation at Scale](test-automation-at-scale.md)
