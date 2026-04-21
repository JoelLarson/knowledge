---
title: "Accelerate: The Science of Lean Software and DevOps — Nicole Forsgren, Jez Humble, Gene Kim"
type: source
tags: [research, devops, metrics, delivery-performance]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md"]
---

Accelerate presents four years of DORA research (2014-2017) proving that software delivery performance -- measured by four key metrics -- predicts organizational performance, and that 24 specific capabilities (including test automation, CI, and trunk-based development) drive that performance.

## Publication Details

- **ISBN-13:** 9781942788331
- **Publisher:** IT Revolution Press
- **Buy from publisher:** [IT Revolution Press](https://itrevolution.com/product/accelerate/)

## Book Overview

- **Authors**: Nicole Forsgren (PhD, CEO of DORA), [Jez Humble](../entities/jez-humble.md) (co-author of Continuous Delivery), Gene Kim (co-author of The Phoenix Project)
- **Published**: 2018, IT Revolution Press
- **Research basis**: 23,000+ survey responses from 2,000+ organizations across four years
- **Methodology**: Cross-sectional survey design with Likert-type psychometric constructs, cluster analysis, and inferential predictive statistics (not just correlation)
- **Foreword by**: [Martin Fowler](../entities/martin-fowler.md)

## The Four Key Metrics (DORA Metrics)

The book defines software delivery performance using four metrics (see [DORA Metrics](../concepts/dora-metrics.md)):

1. **Deployment frequency** -- proxy for batch size
2. **Lead time for changes** -- code commit to code running in production
3. **Mean time to restore service (MTTR)** -- how quickly service is restored after incident
4. **Change failure rate** -- percentage of changes that result in degraded service

Key finding: there is **no tradeoff** between speed and stability. High performers excel at all four metrics simultaneously.

### 2017 Performance Profiles

| Metric | High Performers | Medium | Low |
|--------|----------------|--------|-----|
| Deploy frequency | On demand (multiple/day) | Weekly to monthly | Weekly to monthly |
| Lead time | < 1 hour | 1 week to 1 month | 1 week to 1 month |
| MTTR | < 1 hour | < 1 day | 1 day to 1 week |
| Change failure rate | 0-15% | 0-15% | 31-45% |

High performers vs. low performers in 2017: 46x more frequent deploys, 440x faster lead time, 170x faster MTTR, 5x lower change failure rate.

## The 24 Capabilities

The research identifies 24 capabilities across five categories that drive delivery performance:

### Continuous Delivery Capabilities
1. Version control
2. Deployment automation
3. **Continuous integration** (see [Continuous Integration](../concepts/continuous-integration.md))
4. Trunk-based development
5. **Test automation** (see [Test Automation at Scale](../concepts/test-automation-at-scale.md))
6. Test data management
7. Shift left on security
8. Continuous delivery (see [Continuous Delivery](../concepts/continuous-delivery.md))

### Architecture Capabilities
9. Loosely coupled architecture
10. Empowered teams

### Product and Process Capabilities
11. Customer feedback
12. Value stream
13. Working in small batches
14. Team experimentation

### Lean Management and Monitoring Capabilities
15. Change approval processes
16. Monitoring
17. Proactive notification
18. WIP limits
19. Visualizing work

### Cultural Capabilities
20. Westrum organizational culture (generative)
21. Supporting learning
22. Collaboration among teams
23. Job satisfaction
24. Transformational leadership

## Research Methodology

The DORA research uses **inferential predictive analysis** -- theory-driven hypotheses tested with statistical methods (multiple linear regression, partial least squares). This goes beyond correlation to prediction: the research can say that capabilities *drive* or *predict* outcomes, not merely that they co-occur.

Key methodological features:

- **Latent constructs**: Multiple Likert-type questions per concept, validated for discriminant validity, convergent validity, and reliability
- **Cluster analysis**: Data-driven grouping of performers (no a priori bias toward "good" or "bad")
- **Capabilities model, not maturity model**: Continuous improvement rather than static levels

## Relevance to TDD

### Test Automation as Key Capability

The book provides statistical evidence that test automation predicts delivery performance. Specifically:

- **Reliable automated tests**: When tests pass, teams are confident software is releasable. Flaky tests destroy this confidence.
- **Developers own the tests**: Having automated tests created and maintained by developers (not separate QA) is correlated with IT performance. Tests created by outsourced parties or separate QA teams showed *no* correlation with performance.
- **TDD is explicitly cited**: "Test-driven development (TDD) is an important practice -- it forces developers to create more testable designs." When developers write tests, code becomes more testable; when developers own tests, they invest more in maintaining them.
- **Continuous testing**: Automated unit and acceptance tests run against every commit. Developers get fast feedback from comprehensive test suites daily.

### CI Depends on Fast Tests

[Continuous Integration](../concepts/continuous-integration.md) requires that every commit triggers a build with fast automated tests. Without TDD producing fast, reliable unit tests, CI breaks down. The book finds that trunk-based development (branches < 1 day, merged frequently) combined with CI predicts delivery performance -- and this combination requires the kind of test suite that TDD produces.

### CD Requires Test Confidence

[Continuous Delivery](../concepts/continuous-delivery.md) is defined as the ability to deploy on demand with fast feedback on quality. The five CD principles map directly to TDD values:

1. **Build quality in** (Deming's 3rd point) -- TDD builds quality in rather than inspecting it afterward
2. **Work in small batches** -- TDD's small red-green-refactor cycles
3. **Automate repetitive tasks** -- regression testing automated as side effect of TDD
4. **Relentlessly pursue continuous improvement** -- TDD's refactoring step
5. **Everyone is responsible** -- developers own quality, not a separate QA department

### Quality Impact

High performers spend 49% of time on new work vs. 38% for low performers. Low performers spend 27% on unplanned rework vs. 21% for high performers. CD (enabled by test automation) predicts lower unplanned work.

### Architecture and Testability

Two architectural characteristics predict high performance:

1. **Testability**: "We can do most of our testing without requiring an integrated environment"
2. **Deployability**: "We can deploy independently of other applications"

These align directly with TDD's emphasis on [Dependency Injection](../concepts/dependency-injection.md), [Test Doubles](../concepts/test-doubles.md), and [Ports and Adapters](../concepts/ports-and-adapters.md) to enable testing in isolation.

## Westrum Organizational Culture

The book measures culture using Ron Westrum's typology (pathological / bureaucratic / generative). Generative culture -- high cooperation, messengers trained, shared risks, failure leads to inquiry, novelty implemented -- predicts both delivery performance and organizational performance. CD practices *drive* generative culture: "You can act your way to a better culture."

## Change Advisory Boards Don't Work

A striking finding: external change approval (CABs) is **negatively correlated** with delivery performance and has **no correlation** with stability. Peer review combined with deployment pipeline automation is more effective.

## Related Pages

- [DORA Metrics](../concepts/dora-metrics.md)
- [Test Automation at Scale](../concepts/test-automation-at-scale.md)
- [Continuous Integration](../concepts/continuous-integration.md)
- [Continuous Delivery](../concepts/continuous-delivery.md)
- [Jez Humble](../entities/jez-humble.md)
- [Dave Farley](../entities/dave-farley.md)
- [Martin Fowler](../entities/martin-fowler.md)
- [Extreme Programming](../concepts/extreme-programming.md)
