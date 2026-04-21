---
title: Characterization Tests
type: concept
tags: [characterization-tests, legacy-code, testing, michael-feathers, safety-net]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Working.Effectively.with.Legacy.Code.md]
---

A characterization test is a test that characterizes the actual behavior of a piece of code — not what code *should* do, but what it *does*. Used to create a safety net before refactoring [Legacy Code](legacy-code.md).

## Core Idea

Traditional tests verify correctness against a specification. Characterization tests have no "moral authority" — they simply document what the system actually does right now. Their purpose is to **detect change**, not prove correctness. When you later modify the code, any difference from the characterized behavior will surface as a test failure.

> "We aren't trying to find bugs right now. We are trying to put in a mechanism to find bugs later, bugs that show up as differences from the system's current behavior." — [Michael Feathers](../entities/michael-feathers.md)

## Algorithm for Writing Characterization Tests

1. Use a piece of code in a test harness
2. Write an assertion that you know will fail
3. Let the failure tell you what the behavior is
4. Change the test so that it expects the behavior the code produces
5. Repeat

**Example:**
```java
void testGenerator() {
    PageGenerator generator = new PageGenerator();
    assertEquals("fred", generator.generate()); // deliberately wrong
}
// Failure: expected:<fred> but was:<>
// Now change to:
void testGenerator() {
    PageGenerator generator = new PageGenerator();
    assertEquals("", generator.generate()); // documents actual behavior
}
```

## When to Write Characterization Tests

Characterization tests are the **fourth step** of the [Legacy Code Change Algorithm](legacy-code-change-algorithm.md):
1. Identify change points
2. Find test points
3. Break dependencies
4. **Write tests** (characterization tests)
5. Make changes and refactor

Write them before you modify code to ensure your modifications don't accidentally break existing behavior.

## Characterization Tests vs. Approval Tests

Characterization tests and [approval tests](approval-testing.md) are closely related:
- **Characterization tests** (Feathers): typically unit-level, written by hand, using standard assertions
- **Approval tests**: often capture larger output snapshots (strings, files) and compare against a saved "approved" version

Both share the same philosophy: capture existing behavior as a baseline for detecting unintended changes.

## Heuristics for Writing Characterization Tests

1. Write tests for the area where you will make changes. Write as many cases as you need to understand the behavior.
2. Look at the specific things you will change and write tests targeting those paths.
3. If extracting or moving functionality, verify existence and correct connection of behaviors on a case-by-case basis. Exercise conversions.

### The Method Use Rule

> Before you use a method in a legacy system, check to see if there are tests for it. If there aren't, write them. When you do this consistently, you use tests as a medium of communication.

## Characterizing Classes — Exploration Heuristics

1. Look for tangled logic; introduce sensing variables to verify execution of specific paths
2. List things that can go wrong and write tests that trigger them
3. Explore extreme input values
4. Identify invariants (conditions that should always hold) and test for them

## Targeted Testing

After writing general characterization tests, focus on the specific code you'll change:
- Verify the branch you're modifying is actually exercised by at least one test
- Use sensing variables or debugger to confirm path coverage
- Pick input values that exercise conversions (e.g., avoid values where int-to-double truncation is invisible)
- The most valuable tests exercise a specific path AND exercise each conversion along that path

## When You Find Bugs

If the system has never been deployed: fix the bug. If deployed: analyze whether anyone depends on the "buggy" behavior. Mark suspicious behavior in test code and escalate for analysis.

## Relationship to TDD

Characterization tests are **not** TDD — they document existing behavior rather than driving new design. But they create the safety net that enables subsequent TDD:

1. Characterize existing code (characterization tests)
2. Refactor to improve structure (protected by characterization tests)
3. Write all new code with TDD

## Related Pages

- [Legacy Code](legacy-code.md)
- [Legacy Code Change Algorithm](legacy-code-change-algorithm.md)
- [Approval Testing](approval-testing.md)
- [Seams](seams.md)
- [Dependency-Breaking Techniques](dependency-breaking-techniques.md)
- [Refactoring](refactoring.md)
- [Michael Feathers](../entities/michael-feathers.md)
- [Working Effectively with Legacy Code (Feathers)](../sources/working-effectively-legacy-code-feathers.md)

## Worked Example: Characterizing a Legacy Pricing Function

Imagine you have inherited the following pricing function. There is no specification, no comments, and no existing tests. You need to modify it, so you must first characterize what it actually does.

```python
# legacy_pricing.py  (do NOT edit yet -- characterize first)

def compute_price(base, qty, customer_type, promo_code):
    price = base * qty
    if customer_type == "wholesale":
        price = price * 0.80
    elif customer_type == "employee":
        price = price * 0.50
    if promo_code == "SAVE10":
        price = price - 10
    if price < 0:
        price = 0
    return round(price, 2)
```

We follow Feathers' algorithm: write an assertion we **know** is wrong, let the failure reveal the real behavior, then fix the assertion. Repeat until we have covered the paths we care about.

### Iteration 1: Discover baseline behavior for a regular customer

```python
# test_compute_price.py

from legacy_pricing import compute_price

def test_regular_customer_no_promo():
    # Step 1 — deliberately wrong assertion
    result = compute_price(base=25.00, qty=2, customer_type="regular", promo_code=None)
    assert result == 0  # we expect this to fail
```

Run the test:

```
AssertionError: assert 50.0 == 0
```

The failure tells us the actual behavior: `25.00 * 2 = 50.0`, no discount applied. Encode it:

```python
def test_regular_customer_no_promo():
    result = compute_price(base=25.00, qty=2, customer_type="regular", promo_code=None)
    assert result == 50.0  # characterized: base * qty, no discount
```

### Iteration 2: Discover the wholesale discount

```python
def test_wholesale_customer():
    result = compute_price(base=25.00, qty=2, customer_type="wholesale", promo_code=None)
    assert result == 0  # deliberately wrong
```

```
AssertionError: assert 40.0 == 0
```

Actual behavior: `50.0 * 0.80 = 40.0`. Encode:

```python
def test_wholesale_customer():
    result = compute_price(base=25.00, qty=2, customer_type="wholesale", promo_code=None)
    assert result == 40.0  # characterized: 20% wholesale discount
```

### Iteration 3: Discover promo code stacking with employee discount

```python
def test_employee_with_promo():
    result = compute_price(base=25.00, qty=2, customer_type="employee", promo_code="SAVE10")
    assert result == 0  # deliberately wrong
```

```
AssertionError: assert 15.0 == 0
```

Actual behavior: `50.0 * 0.50 = 25.0`, then `25.0 - 10 = 15.0`. The promo is applied **after** the employee discount and it subtracts a flat amount, not a percentage. Encode:

```python
def test_employee_with_promo():
    result = compute_price(base=25.00, qty=2, customer_type="employee", promo_code="SAVE10")
    assert result == 15.0  # characterized: employee 50% then flat $10 promo
```

### Iteration 4: Discover the floor behavior

```python
def test_price_floor_at_zero():
    result = compute_price(base=3.00, qty=1, customer_type="employee", promo_code="SAVE10")
    assert result == -8.50  # deliberately wrong — does it go negative?
```

```
AssertionError: assert 0 == -8.50
```

Actual behavior: `3.00 * 0.50 = 1.50`, then `1.50 - 10 = -8.50`, but the `if price < 0` guard clamps to `0`. Encode:

```python
def test_price_floor_at_zero():
    result = compute_price(base=3.00, qty=1, customer_type="employee", promo_code="SAVE10")
    assert result == 0  # characterized: price is floored at zero
```

### Final Characterization Suite

```python
from legacy_pricing import compute_price

class TestComputePrice:
    """Characterization tests — documents actual behavior, not desired behavior."""

    def test_regular_customer_no_promo(self):
        assert compute_price(25.00, 2, "regular", None) == 50.0

    def test_wholesale_discount(self):
        assert compute_price(25.00, 2, "wholesale", None) == 40.0

    def test_employee_discount(self):
        assert compute_price(25.00, 2, "employee", None) == 25.0

    def test_employee_with_promo_stacks(self):
        assert compute_price(25.00, 2, "employee", "SAVE10") == 15.0

    def test_price_floor_at_zero(self):
        assert compute_price(3.00, 1, "employee", "SAVE10") == 0

    def test_unknown_promo_code_ignored(self):
        assert compute_price(25.00, 2, "regular", "BOGUS") == 50.0
```

With this safety net in place, any future edit to `compute_price` that changes its observable behavior will immediately break one of these tests. We can now confidently proceed to step 5 of the [Legacy Code Change Algorithm](legacy-code-change-algorithm.md): make changes and refactor.
