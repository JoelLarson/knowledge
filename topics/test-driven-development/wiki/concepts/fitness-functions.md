---
title: Fitness Functions
type: concept
tags: [architecture, testing, fitness-functions, governance, continuous-delivery]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Software Architecture_ The Hard Parts.md]
---

Architecture fitness functions are automated checks that verify architectural characteristics — essentially TDD applied to architecture. Defined in *Building Evolutionary Architectures* (Ford, Parsons, Kua, 2017) as: **any mechanism that performs an objective integrity assessment of some architecture characteristic or combination of architecture characteristics.**

## Definition Breakdown

### Any Mechanism
Fitness functions can be implemented as:

- Unit-test-style assertions (JDepend, ArchUnit, NetArchTest)
- Monitors and metrics (performance thresholds, error rates)
- Chaos engineering experiments (resilience, fault tolerance)
- Static analysis tools (SonarQube, linters)
- Security scanners (dependency vulnerability checks)

### Objective Integrity Assessment
The characteristic must be measurable. "High performance" is not a fitness function; "p99 latency < 200ms" is. Composite characteristics like "agility" must be decomposed into measurable parts: deployability, testability, cycle time.

### Scope: Atomic and Holistic
- **Atomic** — tests a single characteristic in isolation (e.g., no component cycles)
- **Holistic** — tests a combination of characteristics that interact (e.g., security changes that affect performance; scalability versus elasticity)

## Fitness Functions as TDD for Architecture

The parallel to TDD is direct:

| TDD | Fitness Functions |
|-----|-------------------|
| Unit tests verify **domain behavior** | Fitness functions verify **architecture characteristics** |
| Failing test drives implementation | Failing fitness function drives architectural correction |
| Tests run in CI on every commit | Fitness functions run in CI on every commit |
| Tests document intended behavior | ADRs + fitness functions document intended architecture |
| Test pain reveals design problems | Fitness function failures reveal architectural drift |

The separation guideline from the book: "Is domain knowledge required to execute this test?" If yes, it's a unit/functional/acceptance test. If no, it's a fitness function.

## Examples

### Structural Governance
```java
// ArchUnit: enforce layer dependencies
layeredArchitecture()
  .layer("Controller").definedBy("..controller..")
  .layer("Service").definedBy("..service..")
  .layer("Persistence").definedBy("..persistence..")
  .whereLayer("Controller").mayNotBeAccessedByAnyLayer()
  .whereLayer("Service").mayOnlyBeAccessedByLayers("Controller")
  .whereLayer("Persistence").mayOnlyBeAccessedByLayers("Service")
```

### Dependency Cycle Detection
```java
// JDepend: fail build on component cycles
@Test void testAllPackages() {
    Collection packages = jdepend.analyze();
    assertEquals("Cycles exist", false, jdepend.containsCycles());
}
```

### Security Governance
When a zero-day exploit is discovered, insert a fitness function into every team's deployment pipeline that checks for the vulnerable framework version and fails the build if found.

## Connection to DORA Metrics

Fitness functions support the four DORA metrics:

- **Deployment frequency** — fitness functions in CI enable confident, frequent deployment
- **Lead time for changes** — automated governance replaces slow manual review boards
- **Change failure rate** — catching architectural violations before production
- **Time to restore service** — fitness functions for resilience (chaos engineering) reduce blast radius

## Best Practices

- Run continuously, not on demand
- Treat as an executable checklist of *important but not urgent* principles
- Don't overuse — avoid creating an "impossibly complex, interlocking set" that frustrates developers
- Distinguish between static (structure at compile time) and dynamic (behavior at runtime) fitness functions
- Most should be automated; some (legal review, compliance) may be manual stages in the deployment pipeline

## Connection to TDD Practice

Fitness functions extend the TDD mindset beyond unit and acceptance tests:

- [Red-Green-Refactor](red-green-refactor.md) governs code-level design
- Fitness functions govern architecture-level design
- Both use fast automated feedback to prevent drift
- Both encode decisions as executable specifications

When practicing TDD, developers naturally write tests that serve as atomic fitness functions: tests that verify [Dependency Injection](dependency-injection.md) is used correctly, that [Ports and Adapters](ports-and-adapters.md) boundaries are respected, that coupling between modules stays within bounds. Making this explicit through dedicated fitness function libraries (ArchUnit, NetArchTest) elevates it from implicit to intentional.

## Related Pages

- [Software Architecture: The Hard Parts](../sources/software-architecture-hard-parts.md)
- [Neal Ford](../entities/neal-ford.md)
- [Continuous Delivery](continuous-delivery.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Coupling and Cohesion](coupling-and-cohesion.md)
- [Bounded Context](bounded-context.md)
- [Integration Testing](integration-testing.md)
