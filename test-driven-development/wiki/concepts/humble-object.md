---
title: Humble Object
type: concept
tags: [design-for-testability, patterns, xunit, gerard-meszaros, architecture]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/xUnit Test Patterns_ Refactoring Test Code - by Gerard Meszaros - 2007.md, "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

A design-for-testability pattern from [xUnit Test Patterns](../sources/xunit-test-patterns-meszaros.md): extract logic from hard-to-test components into separate, easy-to-test components that are decoupled from their environment.

## The Problem

Some code is tightly coupled to frameworks, threading, or infrastructure that makes testing expensive or impossible:
- GUI widgets tied to a presentation framework
- Active objects running in their own thread
- Code inside application containers (EJBs, servlets)
- Transaction-controlling code

Developers faced with this give up on testing, resulting in Production Bugs from untested code.

## The Solution

Split the hard-to-test component into two parts:
1. **Humble Object** — a thin adapter that delegates to the testable component. Contains no logic worth testing. So simple that bugs are unlikely.
2. **Testable Component** — all the extracted logic, accessible via synchronous method calls. Easy to test with standard [[four-phase-test]] structure.

```
Framework → Humble Object → Testable Component ← Test
              (thin adapter)    (all the logic)
```

The Humble Object retrieves any needed context and passes it to the Testable Component as arguments. The Testable Component knows nothing about the framework.

## Variations

### Humble Dialog (UI)
Extract presentation logic from visual objects into a non-visual controller/presenter. The visual class becomes a thin shell that delegates decisions to the testable class.

**Example:** A form that enables/disables buttons based on validation rules. The Humble Dialog delegates validation calls to a Presenter that can be tested without instantiating the GUI framework.

### Humble Executable (Threading)
Extract logic from active objects (threads, processes) into synchronous classes. The thread merely loads the testable component and delegates. Tests call the logic directly without thread startup, delays, or coordination.

**Before (async, slow, flaky):**
```java
sut.start();
Thread.sleep(2000);
assertTrue(sut.initializedSuccessfully());
```

**After (sync, fast, deterministic):**
```java
RequestHandler handler = new RequestHandler();
handler.handleRequest(makeSimpleRequest());
assertEquals(expectedResponse, handler.getLastResponse());
```

### Humble Transaction Controller
Move business logic out of code that controls database transactions. The test can call the logic directly, verify outcomes, and roll back without committing. The Humble Object only manages commit/rollback.

### Humble Container Adapter
Design objects to be container-independent, then have a thin adapter implement the container's required interface (e.g., EJB session bean interface). The logic is testable outside the container.

## Implementation Approaches

### Poor Man's Humble Object
Extract logic into separate methods on the same class (Extract Method refactoring). Simple but the Humble Object must still be instantiable.

### True Humble Object
Extract logic into a separate class entirely (Extract Class refactoring). The Humble Object holds a reference and delegates. Most flexible; works in all circumstances.

### Subclassed Humble Object
Use inheritance to separate framework-dependent code from logic. The framework-dependent class inherits logic from a testable superclass, or delegates to abstract methods implemented by a testable subclass.

## When to Use It

Apply Humble Object when:
- You have nontrivial logic in a component that is hard to instantiate
- The component depends on a framework that's expensive to simulate
- Code runs asynchronously and tests would need delays/coordination
- You cannot inject [[test-doubles]] into the component's dependencies

## Relationship to Other Patterns

- **[[dependency-injection]]** — Humble Object is what you use when DI alone isn't enough (the environment itself is the problem)
- **[[ports-and-adapters]]** — Humble Object is the adapter in hexagonal architecture
- **MVC/MVP/MVVM** — The View is a Humble Object; the Controller/Presenter/ViewModel is the testable component
- **[Hard-to-Test Code](test-smells-catalog.md)** — Humble Object is the primary cure

## Khorikov: Humble Object as the Unifying Testability Principle

[[vladimir-khorikov]] generalizes the Humble Object pattern far beyond Meszaros's original scope in [Unit Testing: Principles, Practices, and Patterns](../sources/unit-testing-khorikov.md). He identifies it as the **unifying principle** behind multiple well-known architectural patterns:

### Code Depth vs Code Width

Khorikov frames the separation as **depth vs width**: code can be either deep (complex, domain-significant) or wide (many collaborators), but never both. The Humble Object pattern enforces this split:

- **Domain model / algorithms** — deep code with few collaborators. Unit test these with [output-based or state-based tests](output-vs-state-vs-communication-testing.md).
- **Controllers** — wide code (many collaborators) with little logic. These are humble objects. Cover with integration tests.
- **Overcomplicated code** — both deep and wide. Refactor using Humble Object to split into the above two categories.

### Four Types of Code

This separation produces Khorikov's four-quadrant model:

| | Few collaborators | Many collaborators |
|---|---|---|
| **High complexity** | Domain model / algorithms | Overcomplicated code (refactor!) |
| **Low complexity** | Trivial code (don't test) | Controllers (humble objects) |

### Architectures as Humble Object Instances

Khorikov identifies several architectures as implementations of the Humble Object pattern:

- **Hexagonal architecture** — separates business logic (domain layer) from orchestration (application services). The application services layer is the humble object.
- **Functional architecture** — goes further, separating business logic from *all* collaborators (not just out-of-process). The mutable shell is the humble object; the functional core is pure and testable with output-based tests.
- **MVC/MVP/MVVM** — the View is the humble object; the Controller/Presenter/ViewModel is testable.
- **DDD Aggregates** — reduce connectivity between classes, making the aggregate boundary the humble wrapper.

### Pushing Toward Output-Based Testing

The practical application: use Humble Object to refactor overcomplicated code so that business logic becomes pure (no collaborators), enabling [output-based testing](output-vs-state-vs-communication-testing.md) — the highest quality testing style. The controller that remains is thin enough to cover with a small number of integration tests.

## Related Pages

- [[test-smells-catalog]]
- [[four-phase-test]]
- [[dependency-injection]]
- [[ports-and-adapters]]
- [[sut-and-doc]]
- [[xunit-test-patterns-meszaros]]
- [[gerard-meszaros]]
- [[four-pillars-of-good-tests]]
- [[output-vs-state-vs-communication-testing]]
- [[unit-testing-khorikov]]
- [[vladimir-khorikov]]
