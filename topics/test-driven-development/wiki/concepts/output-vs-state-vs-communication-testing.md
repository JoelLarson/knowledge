---
title: "Output-Based vs State-Based vs Communication-Based Testing"
type: concept
tags: [testing, unit-testing, styles, functional-programming]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

[Vladimir Khorikov](../entities/vladimir-khorikov.md)'s taxonomy of unit testing styles, ranked by quality using the [four pillars framework](four-pillars-of-good-tests.md). Output-based testing produces the best tests; state-based is second; communication-based is the most fragile and costly.

## The Three Styles

### Output-Based (Functional) Testing

Feed an input to the SUT and verify the return value. The SUT has no side effects — no global state changes, no internal mutation, no calls to external dependencies.

```csharp
// Pure function: input -> output, nothing else
decimal discount = sut.CalculateDiscount(product1, product2);
Assert.Equal(0.02m, discount);
```

**Characteristics:**

- Only applicable to pure functions (no side effects)
- Tests are short and concise — supply input, check output
- No out-of-process dependencies
- Naturally resistant to refactoring because there are no implementation details to couple to

### State-Based Testing

Exercise the SUT, then verify the resulting state — of the SUT itself, its collaborators, or an out-of-process dependency.

```csharp
sut.AddProduct(product);
Assert.Equal(1, sut.Products.Count);
Assert.Equal(product, sut.Products[0]);
```

**Characteristics:**

- Verifies state after an operation rather than just the return value
- Assertions tend to be larger (multiple properties to check)
- More API surface area means more chance of coupling to implementation details
- Can be improved with value objects and helper methods, but still bulkier than output-based

### Communication-Based (Interaction) Testing

Use mocks to verify that the SUT communicates correctly with its collaborators.

```csharp
sut.GreetUser("user@email.com");
emailGatewayMock.Verify(
    x => x.SendGreetingsEmail("user@email.com"),
    Times.Once);
```

**Characteristics:**

- Requires setting up test doubles and interaction assertions
- Most prone to [false positives](test-fragility.md) because it couples to how objects communicate
- Highest maintenance cost due to mock setup complexity
- Legitimate only when verifying inter-system communications (side effects visible externally)

## Comparison Using the Four Pillars

| Metric | Output-based | State-based | Communication-based |
|---|---|---|---|
| **Protection against regressions** | Equal | Equal | Equal (can be worse if shallow) |
| **Resistance to refactoring** | Best | Medium | Worst |
| **Fast feedback** | Equal | Equal | Equal (slightly worse from mock overhead) |
| **Maintainability** | Best (concise) | Medium (larger assertions) | Worst (mock setup + assertions) |

All three styles score roughly equally on protection against regressions and fast feedback. The decisive differences are in resistance to refactoring and maintainability.

## Why Output-Based Is Best

Output-based tests couple only to the method signature and return value. The only way such a test can couple to implementation details is if the method itself is an implementation detail. This minimal coupling surface means:

- Fewest false positives
- Least maintenance effort
- Smallest test size
- No out-of-process dependencies to manage

## Mapping to Schools and Architectures

| School | Preferred style |
|---|---|
| **Chicago (Classical)** | State-based + output-based |
| **London (Mockist)** | Communication-based + output-based |

| Architecture | Testing style it enables |
|---|---|
| **Functional architecture** | Output-based (functional core has no collaborators) |
| **Hexagonal architecture** | State-based for domain, communication-based for boundaries |
| **Object-oriented (typical)** | State-based + communication-based |

## Transitioning Toward Output-Based Testing

You cannot always write output-based tests — they require pure functions. But you can restructure code to enable more of them:

1. **Apply functional architecture** — separate business logic (functional core) from side effects (mutable shell/controllers)
2. **Use the [Humble Object pattern](humble-object.md)** — extract logic from hard-to-test code into pure, testable components
3. **Push side effects to the edges** — read data, make decisions (pure), write results

The functional core becomes testable with output-based style. The controllers (thin orchestrators) are tested with integration tests.

### Limitations

Functional architecture is not always feasible:

- **Performance** — pushing all reads/writes to the edges may cause unnecessary I/O
- **Code size** — the separation adds boilerplate
- **Not all domains are pure** — some business logic inherently involves side effects

When functional architecture doesn't fit, state-based testing is the second-best option. Communication-based testing should be reserved for verifying side effects visible to external systems.

## Related Pages

- [Four Pillars of a Good Test](four-pillars-of-good-tests.md)
- [Test Fragility](test-fragility.md)
- [Mocking](mocking.md)
- [Humble Object](humble-object.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [TDD in Functional Programming](tdd-in-functional-programming.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Unit Testing (Khorikov)](../sources/unit-testing-khorikov.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
