---
title: DORA Metrics
type: concept
tags: [metrics, devops, delivery-performance, dora, measurement]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md"]
---

The four DORA metrics -- deployment frequency, lead time for changes, mean time to restore (MTTR), and change failure rate -- are the statistically validated measures of software delivery performance identified by the DORA research program (2014-2017) and published in [Accelerate](../sources/accelerate-forsgren-humble-kim.md).

## The Four Metrics

### 1. Deployment Frequency
How often an organization deploys code to production. Used as a proxy for batch size (smaller batches = more frequent deployments). High performers deploy on demand, multiple times per day.

### 2. Lead Time for Changes
The time from code committed to code successfully running in production. This measures the delivery part of lead time (not the "fuzzy front end" of design). High performers achieve lead times of less than one hour.

### 3. Mean Time to Restore Service (MTTR)
How long it takes to restore service after an incident (unplanned outage, service impairment). In complex systems, failure is inevitable -- the key question is how quickly you recover. High performers restore service in less than one hour.

### 4. Change Failure Rate
The percentage of production changes that result in degraded service or require remediation (hotfix, rollback, fix-forward, patch). High performers achieve 0-15% failure rates.

## Tempo and Stability

The first two metrics (deployment frequency, lead time) measure **tempo**. The second two (MTTR, change failure rate) measure **stability**. A critical finding: these are not in tension. High performers excel at both simultaneously.

## Performance Profiles (2017)

| Metric | Elite/High | Medium | Low |
|--------|-----------|--------|-----|
| Deploy frequency | On demand (multiple/day) | Weekly to monthly | Weekly to monthly |
| Lead time | < 1 hour | 1 week - 1 month | 1 week - 1 month |
| MTTR | < 1 hour | < 1 day | 1 day - 1 week |
| Change failure rate | 0-15% | 0-15% | 31-45% |

The gap between high and low performers widened year over year, particularly on stability metrics. High performers continuously improve; those who fail to improve fall further behind.

## Statistical Validity

The four metrics were identified using **cluster analysis** -- a data-driven technique that groups responses without prior assumptions about what counts as "good" or "bad." Every year, the analysis found significantly different clusters of performance.

Note: when the researchers attempted to combine all four metrics into a single construct, only lead time, deployment frequency, and MTTR passed all validity/reliability tests. Change failure rate is strongly correlated with the other three but is technically measured separately.

## Why These Metrics Matter for TDD

Test automation -- the natural output of TDD practice -- enables improvement across all four metrics:

### Deployment Frequency
TDD produces a comprehensive, fast test suite. This suite gives teams confidence to deploy frequently because regressions are caught automatically. Without this safety net, teams deploy less often to reduce risk.

### Lead Time for Changes
The [Red-Green-Refactor](red-green-refactor.md) cycle produces small, tested increments that flow through CI pipelines quickly. Fast automated tests mean the commit-to-production pipeline completes in minutes, not days.

### MTTR
When something breaks, a strong test suite helps teams:
- Quickly identify what changed (small commits from TDD)
- Write a failing test that reproduces the bug
- Fix forward with confidence
- Deploy the fix rapidly through an automated pipeline

### Change Failure Rate
TDD directly reduces change failure rate by catching defects at the point of creation. The Accelerate research found that high performers spend less time on unplanned rework (21% vs. 27% for low performers), and continuous delivery -- enabled by test automation -- predicts lower rework.

## How to Measure

The DORA metrics can be measured by:
1. **Surveying teams** using Likert-type scales (as in the original research)
2. **Instrumenting delivery pipelines** to capture timestamps at each stage
3. **Tracking incidents** for MTTR and change failure rate

The Accelerate authors recommend using these metrics carefully: "In pathological and bureaucratic organizational cultures, measurement is used as a form of control, and people hide information." A generative culture is a prerequisite for honest measurement.

## Anti-Patterns in Measurement

The book explicitly rejects several common productivity metrics:
- **Lines of code** -- rewards bloated software
- **Velocity** -- a capacity planning tool, not a productivity metric; gaming it destroys its value
- **Utilization** -- high utilization eliminates slack, causing lead times to approach infinity (queue theory)

The DORA metrics avoid these traps by focusing on **global outcomes** (not individual output) and **outcomes** (not outputs).

## Related Pages

- [Accelerate](../sources/accelerate-forsgren-humble-kim.md)
- [Continuous Delivery](continuous-delivery.md)
- [Continuous Integration](continuous-integration.md)
- [Test Automation at Scale](test-automation-at-scale.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Jez Humble](../entities/jez-humble.md)
- [Nicole Forsgren](../entities/nicole-forsgren.md) -- co-creator of the DORA metrics and lead researcher of the program
