---
title: Continuous Integration
type: concept
tags: [continuous-integration, ci, trunk-based-development, devops, delivery-performance]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md", "raw/modern-software-engineering-dave-farley.md"]
---

Continuous integration (CI) is the practice of merging all developer working copies to a shared mainline frequently -- at least daily -- with each change triggering an automated build and test process. The DORA research ([Accelerate](../sources/accelerate-forsgren-humble-kim.md)) identifies CI as one of 24 key capabilities that drive software delivery performance.

## Core Practices

As defined in Accelerate, CI requires:

1. **Short-lived branches**: Less than one day's work before merging to trunk/master. High-performing teams maintain fewer than three active branches at any time.
2. **Trunk-based development**: Developing off trunk rather than long-lived feature branches. No "code freeze" or stabilization periods.
3. **Automated build and test on every commit**: Each merge triggers compilation, unit tests, static analysis, and fast feedback.
4. **Fix failures immediately**: If any part of the build/test process fails, developers fix it as their top priority. A red pipeline stops all feature work.

## The Accelerate Evidence

The DORA research found that trunk-based development combined with CI predicts higher software delivery performance. These results held independent of team size, organization size, or industry.

Specific findings:
- Teams with branches living less than one day and integration periods less than one day perform significantly better
- Long-lived branches discourage both refactoring and intra-team communication
- The "GitHub Flow" workflow (developing on branches, periodically merging) is suitable for open-source contributors who aren't full-time, but not for teams practicing CI

## How CI Depends on TDD

CI is only effective when backed by a fast, reliable automated test suite. Without such tests, CI degenerates into "continuous compilation" -- it detects syntax errors but not behavioral regressions.

TDD provides exactly what CI needs:

| CI Requirement | What TDD Provides |
|---------------|-------------------|
| Fast automated tests | [Red-Green-Refactor](red-green-refactor.md) produces tests that run in milliseconds |
| Comprehensive coverage | Every behavior is specified by a test before implementation |
| Reliable tests | Tests written against behavior (not implementation) produce fewer false positives |
| Small, integrable commits | TDD's small steps produce small, focused commits ideal for frequent merging |
| Developer ownership | Developers write and maintain their own tests as a natural part of the workflow |

Without fast tests, the feedback loop breaks:
- Slow tests (minutes, hours) make developers avoid running them
- Developers batch up changes to avoid waiting
- Larger batches mean more merge conflicts
- More conflicts mean longer integration periods
- Longer integration periods mean less frequent deployment

This is the death spiral that CI is designed to prevent -- but only TDD produces the test suite that makes CI viable.

## CI as Part of Continuous Delivery

CI is one of eight [Continuous Delivery](continuous-delivery.md) capabilities identified by DORA. The deployment pipeline extends CI:

```
Commit Stage          -> fast unit tests, compilation, static analysis (CI)
Acceptance Test Stage -> acceptance tests in production-like environments
Performance Stage     -> load testing, capacity verification
Production            -> deployment (automated or with manual gate)
```

The commit stage (CI proper) must complete in minutes -- [Dave Farley](../entities/dave-farley.md) recommends under 5 minutes. This is only achievable with the kind of fast unit tests that TDD produces.

## CI and Refactoring

Long-lived branches discourage [Refactoring](refactoring.md) because:
- Refactoring touches many files, increasing merge conflict probability
- The longer a branch lives, the more the trunk has diverged
- Developers avoid refactoring to minimize merge pain

Trunk-based development with CI removes this obstacle. Small refactorings merge immediately, keeping the codebase healthy. This is essential for the "refactor" step of [Red-Green-Refactor](red-green-refactor.md).

## CI and Architecture

The Accelerate research found that loosely coupled architecture is the biggest contributor to continuous delivery (even larger than test and deployment automation). Teams that can test and deploy independently achieve better CI because:
- Tests run in isolation (no integrated test environment needed)
- Deploys don't require coordinating with other teams
- Failures are localized and quickly diagnosed

This maps directly to TDD design principles: [Dependency Injection](dependency-injection.md), [Ports and Adapters](ports-and-adapters.md), and [Test Doubles](test-doubles.md) enable both testability and deployability.

## Common Anti-Patterns

- **Feature branches lasting days or weeks**: Defeats the purpose of CI. Integration becomes a painful, risky event rather than a routine activity.
- **"CI server" without CI practices**: Running a build server doesn't mean you're doing CI. If developers don't merge to trunk at least daily, it's just an automated build.
- **Slow test suites**: A 30-minute build makes developers avoid pushing. Fast tests (< 5 min for commit stage) are essential.
- **Ignoring broken builds**: If the team doesn't stop and fix a red build immediately, CI loses its value as a feedback mechanism.

## Related Pages

- [Accelerate](../sources/accelerate-forsgren-humble-kim.md)
- [DORA Metrics](dora-metrics.md)
- [Test Automation at Scale](test-automation-at-scale.md)
- [Continuous Delivery](continuous-delivery.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Refactoring](refactoring.md)
- [Extreme Programming](extreme-programming.md)
- [Dave Farley](../entities/dave-farley.md)
- [Jez Humble](../entities/jez-humble.md)
- [Continuous Delivery](continuous-delivery.md)
