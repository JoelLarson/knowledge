---
title: Nicole Forsgren
type: entity
tags: [person, researcher, dora, devops, accelerate, empirical-research]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md]
---

DORA researcher and co-author of _Accelerate_ who brought statistical rigor to the connection between software delivery practices and organizational performance. PhD in Computer Science.

## Key Contributions

### DORA (DevOps Research and Assessment)
Co-founded and led the research program that produced the annual State of DevOps reports. DORA's research established that software delivery performance (measured by four key metrics) predicts organizational outcomes including profitability, market share, and productivity.

### The Four Key Metrics
Forsgren's DORA research identified four metrics that distinguish high-performing software delivery teams:
1. **Lead time** -- time from commit to production
2. **Deployment frequency** -- how often the team deploys to production
3. **Change failure rate** -- percentage of deployments causing failures
4. **Mean time to recovery (MTTR)** -- how quickly the team recovers from failures

### _Accelerate_ (2018)
Co-authored with Jez Humble and Gene Kim. The book synthesizes four years of DORA research covering 23,000+ survey responses. Key finding: speed and stability are **not** a tradeoff -- high performers excel at both. Practices that drive performance include [Continuous Delivery](../concepts/continuous-delivery.md), test automation, trunk-based development, and loosely coupled architecture.

### Statistical Methodology
Forsgren brought rigorous statistical methods (cluster analysis, structural equation modeling) to software engineering research, which had historically relied on anecdotal evidence and case studies. This rigor is what gives DORA's conclusions their weight.

## Relevance to TDD

Forsgren's work provides the organizational-level evidence for practices that TDD enables:
- **Test automation** is one of DORA's key technical capabilities. TDD is the most disciplined form of test automation.
- **Continuous delivery** requires comprehensive automated tests as a prerequisite. TDD naturally produces these.
- The finding that speed and stability coexist echoes the [TDD research finding](../concepts/tdd-empirical-evidence.md) that quality improvement (defect reduction) is worth the modest time investment.

While Forsgren's research does not isolate TDD specifically, it establishes the ecosystem in which TDD operates: teams that automate testing, deploy frequently, and maintain fast feedback loops outperform those that do not.

## Background

- PhD in Computer Science
- Research in management information systems and DevOps
- VP of Research & Strategy at GitHub (following DORA's acquisition by Google Cloud)
- Keynote speaker and influential voice in the DevOps and software engineering community

## Related Pages

- [Continuous Delivery](../concepts/continuous-delivery.md) -- a core DORA capability that TDD enables
- [TDD Empirical Evidence](../concepts/tdd-empirical-evidence.md) -- empirical evidence specifically about TDD
- [Extreme Programming](../concepts/extreme-programming.md) -- the agile methodology where TDD and CI were born
