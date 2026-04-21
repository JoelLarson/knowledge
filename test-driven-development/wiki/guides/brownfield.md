---
title: "Brownfield: Testing an Existing Codebase"
type: concept
tags: [guides, brownfield, legacy-code, adoption, characterization-tests, dependency-breaking]
created: 2026-04-21
updated: 2026-04-21
sources: [raw/Working.Effectively.with.Legacy.Code.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, raw/modern-software-engineering-dave-farley.md]
---

Most professional software work is brownfield — modifying code that already exists, often without tests. Introducing TDD to a brownfield codebase is harder than greenfield because you face the [Legacy Code Dilemma](../concepts/legacy-code.md): you need tests to change code safely, but you need to change code to make it testable.

This guide walks through how to break that dilemma and progressively bring an existing system under test.

## The Wrong Approach: Test Everything First

The instinct when facing an untested codebase is to "add tests" as a project — write tests for the whole system, then start doing TDD. This fails for predictable reasons:

- It takes months and the effort burns out before delivering value
- Tests written against code you don't intend to change are low-value
- Retrofitting unit tests onto tightly coupled code produces brittle, mock-heavy tests
- The team spends time testing stable code instead of the code they're actively changing

> "It's almost never worth going for full coverage in legacy code. Cost versus benefit doesn't work in our favour." — Dave Farley

The right approach: **test what you're about to touch.**

## The Legacy Code Change Algorithm

Every change to legacy code should follow [Feathers' algorithm](../concepts/legacy-code-change-algorithm.md):

1. **Identify change points** — where does the change need to go?
2. **Find test points** — where can you observe the effects of the change?
3. **Break dependencies** — make the code testable at the test points
4. **Write tests** — [characterization tests](../concepts/characterization-tests.md) documenting actual behavior
5. **Make changes and refactor** — with the safety net in place

This is not a one-time process. It's the algorithm for *every* change. Over time, the tested surface area grows organically around the code that changes most — exactly where test coverage is most valuable.

## Phase 1: Characterize Before Changing

Before modifying any code, write [characterization tests](../concepts/characterization-tests.md) that document what it actually does. Not what it *should* do — what it *does*.

The algorithm for writing a characterization test:

1. Call the code from a test harness
2. Write an assertion you know is wrong
3. Let the failure tell you the actual behavior
4. Fix the assertion to match reality
5. Repeat for each path you care about

```python
# Step 1: deliberately wrong assertion
def test_compute_price_regular():
    result = compute_price(base=25.00, qty=2, customer_type="regular", promo_code=None)
    assert result == 0  # will fail — we want to see the real value

# Step 2: failure says "assert 50.0 == 0" — now we know the behavior
def test_compute_price_regular():
    result = compute_price(base=25.00, qty=2, customer_type="regular", promo_code=None)
    assert result == 50.0  # characterized: base * qty, no discount
```

See the [full worked example](../concepts/characterization-tests.md#worked-example-characterizing-a-legacy-pricing-function) on the Characterization Tests page.

**Key discipline:** Use a coverage tool to confirm your characterization tests actually exercise the code paths you're about to modify. Characterization tests that don't cover the change point provide a false sense of safety.

For complex outputs (HTML pages, API responses, report files), [Approval Testing](../concepts/approval-testing.md) is a variant of characterization testing that captures the entire output as a golden file rather than writing individual assertions.

## Phase 2: Break Dependencies

Legacy code resists testing because of tight coupling. You can't instantiate a class without bringing in a database, a web server, a message queue, and three other services.

[Dependency-Breaking Techniques](../concepts/dependency-breaking-techniques.md) are small, conservative refactorings designed to be safe without tests. They crack open the coupling just enough to get code into a test harness. Common techniques:

- **Extract Interface** — introduce an interface for a concrete dependency so you can substitute a test double
- **Parameterize Constructor** — pass dependencies in rather than hard-coding them
- **Subclass and Override Method** — override the problematic method in a test subclass
- **Extract and Override Call** — isolate the external call into a method you can override

These are not design improvements yet. They're surgical interventions to make the code testable. Design improvement comes later, in the refactoring step, once you have tests.

[Seams](../concepts/seams.md) are the conceptual framework: a seam is any place where you can alter behavior without editing the code at that point. Object seams (polymorphism), link seams (swapping libraries at link time), and preprocessing seams (conditional compilation) each apply in different language contexts.

## Phase 3: Add New Code with TDD

Once you can test the area around your change, write all new code with [Red-Green-Refactor](../concepts/red-green-refactor.md). The key techniques for adding tested code alongside untested code:

**[Sprout Method](../concepts/sprout-method.md):** Write the new logic in a separate method, fully test-driven. Call it from the legacy code. The new method is tested; the old code is unchanged.

```python
# Legacy code (untested)
def process_order(order):
    # ... 200 lines of coupled logic ...
    total = sum(item.price for item in order.items)  # existing calculation
    # ... more coupled logic ...

# Sprout method (fully tested)
def apply_discount(total, customer_tier):
    """New logic lives here, tested independently."""
    if customer_tier == "gold":
        return total * 0.85
    return total
```

**Sprout Class:** Same idea at a larger scale — new behavior lives in a new, tested class.

**Wrap Method / Wrap Class:** When you need to run new behavior before or after existing behavior without modifying the original.

The discipline: every new method, class, or function gets written test-first, even if the surrounding code has no tests. Over time, the tested code grows as islands that eventually connect into continents.

## Phase 4: Refactor Under the Safety Net

With characterization tests protecting existing behavior and TDD tests covering new behavior, you can start improving the design:

1. **Remove clutter** — delete commented-out code, remove meaningless comments
2. **Reduce complexity** — extract methods from long conditionals and loops, name them well
3. **Compose methods** — work toward code that tells its own story when read aloud
4. **Extract boundaries** — move toward [Ports and Adapters](../concepts/ports-and-adapters.md) so domain logic is decoupled from infrastructure

Each refactoring is a small, behavior-preserving change. Run tests after each change. If a characterization test breaks, you've changed behavior — revert and take a smaller step.

As the design improves, replace characterization tests with proper unit tests. Characterization tests are scaffolding — they document what code does, not what it should do. Once you understand the behavior well enough to write intent-revealing tests, the characterization tests have served their purpose.

## Phase 5: Establish Acceptance Tests at Boundaries

Once the internal structure is cleaner, add [acceptance tests](../concepts/atdd.md) at the system's natural boundaries — API endpoints, message handlers, CLI entry points. These tests:

- Survive major internal refactoring (they test through external interfaces)
- Confirm that refactoring preserved user-visible behavior
- Serve as the outer loop for [Outside-In TDD](../concepts/outside-in-tdd.md) on future features

> "Unit tests are hard to retrofit to pre-existing code, so don't." — Dave Farley

Acceptance tests are often more effective as the first defensive layer because they don't couple to internal structure. Unit-level TDD then drives the implementation of new features within the tested boundaries.

For large-scale replacement of legacy subsystems, the [Strangler Pattern](../concepts/strangler-pattern.md) provides a strategy: build the replacement behind an interface, route traffic incrementally, retire the old code when the replacement is proven.

## The Brownfield Mindset

The key mental shift for brownfield TDD:

- **You are not "adding tests."** You are making targeted investments in safety around the code you are actively changing.
- **Coverage is a result, not a goal.** Chase behavior verification, not percentage points.
- **Every commit should leave the code better tested than you found it.** The Boy Scout Rule applied to test coverage.
- **Patience.** The [TDD Adoption Path](../concepts/tdd-adoption-path.md) takes months or years at organizational scale. The individual practice starts paying back on the first change.

## The Brownfield Sequence (Summary)

```
Phase 1: Characterize the code you're about to touch
  ↓
Phase 2: Break dependencies to make it testable
  ↓
Phase 3: Write all new code with TDD (sprout method/class)
  ↓
Phase 4: Refactor under the safety net; replace characterization tests
  ↓
Phase 5: Add acceptance tests at boundaries for future features
```

## Related Pages

- [Legacy Code](../concepts/legacy-code.md)
- [Legacy Code Change Algorithm](../concepts/legacy-code-change-algorithm.md)
- [Characterization Tests](../concepts/characterization-tests.md)
- [Approval Testing](../concepts/approval-testing.md)
- [Seams](../concepts/seams.md)
- [Dependency-Breaking Techniques](../concepts/dependency-breaking-techniques.md)
- [Sprout Method](../concepts/sprout-method.md)
- [Strangler Pattern](../concepts/strangler-pattern.md)
- [TDD Adoption Path](../concepts/tdd-adoption-path.md)
- [Ports and Adapters](../concepts/ports-and-adapters.md)
- [ATDD](../concepts/atdd.md)
- [Outside-In TDD](../concepts/outside-in-tdd.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Michael Feathers](../entities/michael-feathers.md)
- [Greenfield Guide](greenfield.md)
- [Choosing Test Levels Guide](choosing-test-levels.md)
