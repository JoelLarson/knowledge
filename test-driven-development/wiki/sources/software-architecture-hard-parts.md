---
title: "Software Architecture: The Hard Parts — Ford, Richards, Sadalage, Dehghani"
type: source
tags: [architecture, coupling, modularity, fitness-functions, trade-offs, decomposition]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Software Architecture_ The Hard Parts.md]
---

A 2021 book on trade-off analysis for distributed architectures, covering service decomposition, data management, and architectural governance. Relevant to TDD through its treatment of fitness functions (automated architecture verification), modularity drivers (including testability), and coupling analysis frameworks.

## Core Thesis

Architecture has no "best practices" — only trade-offs. The architect's job is to find the *least worst* combination of trade-offs. The book provides frameworks for analyzing these trade-offs systematically, grounded in a running case study (Sysops Squad) that decomposes a monolith into services.

## Key Concepts for TDD

### Architecture Fitness Functions

Defined in *Building Evolutionary Architectures* (Ford, Parsons, Kua, 2017) as: **any mechanism that performs an objective integrity assessment of some architecture characteristic or combination of architecture characteristics.**

Key properties:

- **Any mechanism** — tests, monitors, chaos engineering, static analysis, linters
- **Objective** — must be measurable, not subjective ("high performance" is not a fitness function; "p99 latency < 200ms" is)
- **Atomic** — tests a single characteristic (e.g., no component cycles)
- **Holistic** — tests a combination of characteristics (e.g., security + performance)

Fitness functions are essentially **TDD for architecture**: automated, continuously running checks that verify structural and operational properties the way unit tests verify behavioral properties. The separation guideline: "Is domain knowledge required to execute this test?" If yes, use a unit/functional test; if no, use a fitness function.

Examples from the book:

- **JDepend cycle detection** — fails the build if component dependency cycles exist
- **ArchUnit layer enforcement** — verifies that `Controller` cannot access `Persistence` directly
- **NetArchTest** — .NET equivalent for namespace dependency rules
- **Zero-day exploit scanning** — security fitness function inserted into every team's deployment pipeline

Fitness functions should be:

- Automated and run continuously in CI/CD
- Treated like a checklist (per *The Checklist Manifesto*), not an ivory-tower governance tool
- Not overused — important but not urgent concerns only

### Architectural Decision Records (ADRs)

Short text documents recording architecture decisions with Context, Decision, and Consequences sections. ADRs complement fitness functions: the ADR captures *why* a decision was made; the fitness function ensures the decision is *enforced*.

### Architecture Quantum

An independently deployable artifact with high functional cohesion, high static coupling, and synchronous dynamic coupling. Key insight: **a shared database reduces any distributed architecture to a single quantum**, undermining independent testability and deployability.

### Modularity Drivers

The book identifies six drivers for breaking monoliths apart:

| Driver | Description | TDD Relevance |
|--------|-------------|---------------|
| **Maintainability** | Ease of adding/changing/removing functionality | Smaller units = easier to test |
| **Testability** | Ease + completeness of testing | Modularity reduces test scope for changes |
| **Deployability** | Independent, low-risk deployment | Enables continuous delivery with TDD |
| **Scalability** | Independent scaling of components | Requires test isolation |
| **Availability** | Fault tolerance through isolation | Requires failure-mode testing |
| **Fault Tolerance** | Graceful degradation | Chaos engineering as fitness functions |

On testability specifically: architectural modularity "significantly reduces the overall testing scope for changes made to a service, allowing for better completeness of testing as well as ease of testing." However, inter-service communication can *reverse* this benefit — if Service A depends on B and C at runtime, changes to A require testing all three.

### Coupling Analysis Framework

The book distinguishes:

- **Static coupling** — how things are wired together (dependencies, databases, contracts)
- **Dynamic coupling** — how things call each other at runtime (sync/async, orchestrated/choreographed, atomic/eventual)

Dynamic coupling has three dimensions: communication (sync/async), consistency (atomic/eventual), and coordination (orchestrated/choreographed). These produce eight saga patterns from "Epic Saga" (very high coupling) to "Anthology Saga" (very low coupling).

### Component-Based Decomposition Patterns

Six patterns for pulling a monolith apart, each with associated fitness functions:

1. **Identify and Size Components** — fitness functions for component size limits
2. **Gather Common Domain Components** — consolidate shared logic
3. **Flatten Components** — remove unnecessary nesting
4. **Determine Component Dependencies** — map afferent/efferent coupling
5. **Create Component Domains** — group related components
6. **Create Domain Services** — extract as independently deployable services

### Data Decomposition

Data ownership, distributed transactions, eventual consistency patterns. Key tension: microservices philosophy (bounded contexts with independent data stores) versus practical needs for transactional integrity and data access across services.

## Part II: Putting Things Back Together

Covers reuse patterns (shared libraries vs. shared services vs. sidecars), distributed transactions (saga patterns), contracts (strict vs. loose), distributed data access, workflow management (orchestration vs. choreography), and analytical data (data mesh).

## Trade-Off Analysis Framework

The book's meta-lesson for architects:

1. Find entangled dimensions
2. Analyze coupling points
3. Assess trade-offs using MECE lists, qualitative/quantitative analysis, and domain case modeling
4. Prefer bottom line over overwhelming evidence
5. Avoid snake oil and evangelism

## Connection to TDD

The book connects to TDD through several threads:

- **Fitness functions as architectural TDD** — the same red-green-refactor discipline applied to architecture characteristics rather than domain behavior
- **Testability as a modularity driver** — architectural decisions that improve testability also improve test-driven development workflows
- **Coupling analysis** — the same coupling/cohesion forces that Beck describes at the code level (in [Tidy First? (Beck)](tidy-first-kent-beck.md)) operate at the architecture level
- **ADRs as documentation** — parallel to how TDD tests document intended behavior, ADRs document intended architecture

## Related Pages

- [Neal Ford](../entities/neal-ford.md)
- [Fitness Functions](../concepts/fitness-functions.md)
- [Coupling and Cohesion](../concepts/coupling-and-cohesion.md)
- [Bounded Context](../concepts/bounded-context.md)
- [Ports and Adapters](../concepts/ports-and-adapters.md)
- [Continuous Delivery](../concepts/continuous-delivery.md)
- [Tidy First? (Beck)](tidy-first-kent-beck.md)
