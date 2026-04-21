# Test-Driven Development Wiki

Content catalog for the Test-Driven Development wiki. Each entry links to a page with a one-line summary.

---

## Meta

- [Schema & Conventions](schema.md) — Wiki structure, frontmatter format, tagging conventions (2026-04-19)
- [Overview](overview.md) — High-level synthesis of TDD knowledge across all sources (2026-04-20)

---

## Concepts

### TDD Core

- [Red-Green-Refactor](concepts/red-green-refactor.md) — The TDD core cycle: failing test → minimal pass → behavior-preserving improvement
- [Test First](concepts/test-first.md) — Writing tests before code; the defining discipline of TDD vs. unit testing
- [TDD vs. Unit Testing](concepts/tdd-vs-unit-testing.md) — Why test-first produces structurally different (and better) tests than test-after
- [TDD Process Granularity](concepts/tdd-process-granularity.md) — Cycle size matters more than test-first ordering; Fucci et al.'s key finding on small steps
- [Simple Design (Four Rules)](concepts/simple-design.md) — XP's four rules: passes tests, reveals intention, no duplication, fewest elements
- [TDD Empirical Evidence](concepts/tdd-empirical-evidence.md) — Synthesis of what research says about TDD effectiveness: defect reduction, productivity, quality/speed tradeoff

### Schools & Approaches

- [Chicago vs. London Schools](concepts/chicago-vs-london.md) — The two major TDD schools compared: state vs. behavior verification, inside-out vs. outside-in
- [London School TDD](concepts/london-school-tdd.md) — Mockist/interaction-based TDD: outside-in, mock-heavy, protocol-focused
- [Outside-In TDD](concepts/outside-in-tdd.md) — Double-loop TDD: acceptance test drives unit tests from boundary inward
- [BDD (Behaviour-Driven Development)](concepts/bdd.md) — Better vocabulary for TDD: specs not tests, "should" naming, Given/When/Then
- [ATDD (Acceptance Test Driven Development)](concepts/atdd.md) — TDD at the feature level; executable definition of done; four-layer architecture
- [Walking Skeleton](concepts/walking-skeleton.md) — Thinnest end-to-end slice to bootstrap build/deploy/test infrastructure
- [TDD in Functional Programming](concepts/tdd-in-functional-programming.md) — Pure functions, no mocking, property-based testing as natural complement

### Test Design & Quality

- [Good Test Properties (UMRANGS+F)](concepts/good-test-properties.md) — Eight dimensions of test quality; how TDD produces superior tests vs. test-after
- [Four Pillars of a Good Test](concepts/four-pillars-of-good-tests.md) — Khorikov's framework: protection against regressions, resistance to refactoring, fast feedback, maintainability
- [Output vs State vs Communication Testing](concepts/output-vs-state-vs-communication-testing.md) — Khorikov's taxonomy: output-based (best), state-based, communication-based (worst)
- [Four-Phase Test](concepts/four-phase-test.md) — Canonical test structure: Setup, Exercise, Verify, Teardown
- [Test Fixture Strategies](concepts/test-fixture-strategies.md) — Fresh vs Shared Fixture, setup patterns, teardown approaches
- [Test Organization Patterns](concepts/test-organization-patterns.md) — Testcase Class strategies, naming, suites, code reuse
- [Parameterized Tests](concepts/parameterized-tests.md) — Running the same test logic with different data inputs; table-driven tests
- [SUT and DOC](concepts/sut-and-doc.md) — System Under Test and Depended-On Component: formal test vocabulary

### Test Doubles & Isolation

- [Test Doubles](concepts/test-doubles.md) — Umbrella term: mocks, stubs, fakes, spies, dummies — objects that replace real dependencies
- [Mocking](concepts/mocking.md) — Fake objects that record interactions; powerful tool that can become the Mockery smell
- [Dependency Injection](concepts/dependency-injection.md) — Passing dependencies in rather than creating them; enables test isolation and mocking
- [Humble Object](concepts/humble-object.md) — Extract logic from hard-to-test contexts into testable components
- [Tell, Don't Ask](concepts/tell-dont-ask.md) — Objects tell collaborators what to do, not query their state; key to testability

### Test Smells & Fragility

- [Test Fragility](concepts/test-fragility.md) — Tests that break on refactoring but not on bugs; caused by coupling to implementation details
- [TDD Smells](concepts/tdd-smells.md) — Seven anti-patterns: Liar, Giant, Mockery, Inspector, Excessive Setup, Secret Catcher, Dodger
- [Test Smells Catalog (Meszaros)](concepts/test-smells-catalog.md) — Comprehensive smell catalog: Code, Behavior, and Project Smells with root causes

### Testing at Scale

- [Integration Testing](concepts/integration-testing.md) — Testing component boundaries and external dependencies; the testing pyramid
- [Property-Based Testing](concepts/property-based-testing.md) — Generating random inputs to verify invariants; QuickCheck, Hypothesis, fast-check
- [Mutation Testing](concepts/mutation-testing.md) — Evaluating test suite quality by introducing code mutants and checking detection
- [Approval Testing](concepts/approval-testing.md) — Capturing current behavior as baseline; the safety net for refactoring legacy code
- [Test Automation at Scale](concepts/test-automation-at-scale.md) — Accelerate's evidence that reliable, developer-owned test suites predict elite delivery performance

### Refactoring & Legacy Code

- [Refactoring](concepts/refactoring.md) — Behavior-preserving code improvement; the third step of RGR; essential in legacy work
- [Tidyings](concepts/tidyings.md) — Beck's catalog of small structural improvements: guard clauses, dead code, extract helper, and the "tidy first?" decision framework
- [Legacy Code](concepts/legacy-code.md) — Strategies for introducing TDD in pre-existing codebases: strangler, approval tests, tactical coverage
- [Legacy Code Change Algorithm](concepts/legacy-code-change-algorithm.md) — Five-step process: identify, find test points, break deps, write tests, change
- [Characterization Tests](concepts/characterization-tests.md) — Tests documenting actual behavior as safety net before refactoring legacy code
- [Seams](concepts/seams.md) — Places to alter behavior without editing code; object/link/preprocessing types; key to testability
- [Sprout Method](concepts/sprout-method.md) — Add new tested code in a new method; call from legacy code without modifying it
- [Dependency-Breaking Techniques](concepts/dependency-breaking-techniques.md) — Catalog of 24 techniques for making untested code testable
- [Strangler Pattern](concepts/strangler-pattern.md) — Incremental legacy migration: anti-corruption layers + gradual replacement

### Design Principles

- [SOLID Principles](concepts/solid-principles.md) — SRP, OCP, LSP, ISP, DIP — five design principles that make code testable and flexible
- [Ports and Adapters](concepts/ports-and-adapters.md) — Hexagonal architecture: isolate the core via interfaces; testable by construction
- [Coupling and Cohesion](concepts/coupling-and-cohesion.md) — Fundamental design forces; Beck's economic framing; how TDD reveals coupling through test pain
- [Fitness Functions](concepts/fitness-functions.md) — Automated checks verifying architectural characteristics; TDD applied to architecture governance

### Domain-Driven Design

- [Ubiquitous Language (DDD)](concepts/ubiquitous-language.md) — Use problem-domain vocabulary in code, tests, and conversations
- [Bounded Context](concepts/bounded-context.md) — DDD boundary within which a model is consistent; defines test scope and mock boundaries
- [Aggregates](concepts/aggregates.md) — Cluster of objects as a unit for data changes; the natural unit of testing in DDD
- [Domain Events](concepts/domain-events.md) — Events as first-class model elements; enable event-driven testing and temporal assertions
- [Value Objects](concepts/value-objects.md) — Immutable, identity-less objects; trivially testable, ideal for property-based testing
- [Domain Model Testing](concepts/domain-model-testing.md) — Testing rich domain models: aggregate invariants, event assertions, domain language in tests

### Engineering Practices

- [Extreme Programming (XP)](concepts/extreme-programming.md) — The agile methodology where TDD was born; pair programming, CI, simple design
- [Pair Programming](concepts/pair-programming.md) — Two developers at one workstation; ping-pong pairing as TDD practice
- [Continuous Integration](concepts/continuous-integration.md) — Trunk-based development, short-lived branches, automated build+test on every commit; depends on TDD for fast tests
- [Continuous Delivery](concepts/continuous-delivery.md) — Always-releasable software through automated pipelines; TDD is a prerequisite
- [DORA Metrics](concepts/dora-metrics.md) — The 4 key metrics of delivery performance: deployment frequency, lead time, MTTR, change failure rate

---

## Entities

- [Kent Beck](entities/kent-beck.md) — Inventor of TDD and XP; author of _TDD by Example_; creator of xUnit architecture
- [Martin Fowler](entities/martin-fowler.md) — Author of _Refactoring_; Theatrical Players example; "tests before refactoring" rule
- [Robert C. Martin](entities/robert-martin.md) — Author of _Clean Code_; Three Laws of TDD; F.I.R.S.T.; SOLID principles
- [Dave Farley](entities/dave-farley.md) — Author of _Modern Software Engineering_ and _Continuous Delivery_; TDD-as-design advocate
- [Michael Feathers](entities/michael-feathers.md) — Author of _Working Effectively with Legacy Code_; "legacy code = code without tests"
- [Steve Freeman](entities/steve-freeman.md) — Co-author of GOOS; co-creator of mock objects; London school pioneer
- [Nat Pryce](entities/nat-pryce.md) — Co-author of GOOS; co-creator of jMock; protocol-based mock expectations
- [Dan North](entities/dan-north.md) — Primary creator of BDD; Given/When/Then; "get the words right"
- [Gerard Meszaros](entities/gerard-meszaros.md) — Author of _xUnit Test Patterns_; formalized test double taxonomy and test smell catalog
- [Vladimir Khorikov](entities/vladimir-khorikov.md) — Author of _Unit Testing: Principles, Practices, and Patterns_; four pillars framework; classical school advocate
- [Eric Evans](entities/eric-evans.md) — Creator of Domain-Driven Design; author of the foundational "blue book"
- [Vaughn Vernon](entities/vaughn-vernon.md) — Author of Implementing DDD; test-first DDD workflow; domain events as building blocks
- [Emily Bache](entities/emily-bache.md) — Creator of the Theatrical Players Refactoring Kata; approval testing practitioner
- [Jez Humble](entities/jez-humble.md) — Co-author of _Accelerate_ and _Continuous Delivery_; DORA researcher; deployment pipelines and CD
- [Nicole Forsgren](entities/nicole-forsgren.md) — DORA researcher, _Accelerate_ co-author; connected software delivery practices to organizational performance
- [Neal Ford](entities/neal-ford.md) — Co-author of Software Architecture: The Hard Parts; fitness functions concept
- [Alistair Cockburn](entities/alistair-cockburn.md) — Creator of Hexagonal Architecture (Ports and Adapters); Agile Manifesto co-author
- [Ward Cunningham](entities/ward-cunningham.md) — Co-creator of XP; inventor of the wiki; coined "technical debt"; CRC cards; FIT framework
- [xUnit](entities/xunit.md) — The testing architecture pattern underlying JUnit, pytest, NUnit, and most modern frameworks

---

## Sources

- [TDD by Example — Kent Beck](sources/tdd-by-example-kent-beck.md) — Foundational TDD text: two worked examples + patterns catalog
- [Refactoring — Martin Fowler](sources/refactoring-martin-fowler.md) — Catalog of behavior-preserving changes; Theatrical Players example in Ch. 1
- [Clean Code — Robert C. Martin](sources/clean-code-robert-martin.md) — Naming, functions, tests, design as professional craftsmanship
- [The Art of Clean Code — Christian Mayer](sources/art-of-clean-code-mayer.md) — 17 clean code principles; complexity, 80/20, YAGNI, simplicity
- [Modern Software Engineering — Dave Farley](sources/modern-software-engineering-dave-farley.md) — Software as empirical design; five quality properties framework
- [Dave Farley 302 Course: TDD and BDD](sources/dave-farley-302-course.md) — Comprehensive TDD/BDD course: RGR, design, smells, ATDD, legacy
- [Fowler Theatrical Players Kata](sources/fowler-theatrical-players-kata.md) — Multi-language refactoring kata with approval tests; 12+ language implementations
- [Growing OO Software, Guided by Tests — Freeman & Pryce](sources/growing-oo-software-freeman-pryce.md) — Defining text of London/Mockist TDD: outside-in, mock-driven design, walking skeleton
- [xUnit Test Patterns — Gerard Meszaros](sources/xunit-test-patterns-meszaros.md) — Definitive pattern catalog for xUnit testing: 68+ patterns, smell catalog, test double taxonomy
- [Working Effectively with Legacy Code — Michael Feathers](sources/working-effectively-legacy-code-feathers.md) — Canonical text on getting untested code under test: seams, characterization tests, dependency breaking
- [Unit Testing: Principles, Practices, and Patterns — Vladimir Khorikov](sources/unit-testing-khorikov.md) — Four pillars framework, testing styles taxonomy, mocking philosophy, classical school advocacy
- [Domain-Driven Design — Eric Evans](sources/domain-driven-design-evans.md) — Foundational DDD text: ubiquitous language, bounded contexts, aggregates, refactoring toward deeper insight
- [Implementing Domain-Driven Design — Vaughn Vernon](sources/implementing-ddd-vernon.md) — Practical DDD: testing aggregates, domain events, CQRS/ES, bounded context integration
- [Accelerate — Forsgren, Humble, Kim](sources/accelerate-forsgren-humble-kim.md) — DORA research: 4 key metrics, 24 capabilities, statistical evidence that test automation and CI drive delivery performance
- [Tidy First? — Kent Beck](sources/tidy-first-kent-beck.md) — Tidying catalog, structure/behavior distinction, coupling economics, the "tidy first?" decision framework
- [Software Architecture: The Hard Parts — Ford, Richards, Sadalage, Dehghani](sources/software-architecture-hard-parts.md) — Architecture trade-off analysis, fitness functions, modularity drivers, service decomposition
- [Realizing Quality Improvement Through TDD — Nagappan et al. 2008](sources/tdd-quality-improvement-nagappan-2008.md) — Industrial case study: 40-90% defect reduction at Microsoft/IBM with 15-35% time increase
- [A Dissection of the Test-Driven Development Process — Fucci et al. 2017](sources/dissection-of-tdd-fucci-2017.md) — Granularity and uniformity of cycles matter more than test-first ordering
- [Why Research on TDD is Inconclusive — Ghafari et al. 2020](sources/why-tdd-research-inconclusive-ghafari-2020.md) — Five categories of factors explaining contradictory TDD study results
