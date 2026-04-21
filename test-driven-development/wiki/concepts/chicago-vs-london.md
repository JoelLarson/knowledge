---
title: Chicago vs. London Schools of TDD
type: concept
tags: [tdd, schools, debate]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md", raw/tdd-by-example-kent-beck-v2.md, raw/dave-farley-302-tdd-and-bdd-design-through-testing/, "raw/Unit Testing Principles Practices Patterns - Vladimir Khorikov 2020.md"]
---

The two major schools of TDD represent different philosophies about what tests should verify, how dependencies should be handled, and which direction development should flow. The Chicago (Classical) school emphasizes state verification with real collaborators; the London (Mockist) school emphasizes behavior verification with mock collaborators.

## The Two Schools Compared

| Dimension | Chicago / Classical | London / Mockist |
|-----------|-------------------|-----------------|
| **Key figure** | [Kent Beck](../entities/kent-beck.md) | [Steve Freeman](../entities/steve-freeman.md), [Nat Pryce](../entities/nat-pryce.md) |
| **Key text** | *TDD by Example* (2002) | *GOOS* (2009) |
| **What tests verify** | State and output of the SUT | Messages sent to collaborators |
| **Collaborators in tests** | Real objects (or fakes for slow deps) | Mocked interfaces |
| **Design direction** | Inside-out (start with domain model) | Outside-in (start with acceptance test) |
| **Interface discovery** | Emerges from state assertions | Driven by mock expectations |
| **Refactoring impact** | Tests survive internal restructuring | Tests break if communication patterns change |
| **Origins** | Smalltalk community, Ward Cunningham | London XP Tuesday Club (XTC), late 1990s |

## Chicago School (Classical/State-Based)

The classical approach, as practiced by Beck:

1. Start with the simplest domain object
2. Write a test asserting the expected output or state
3. Use real collaborators wherever practical
4. Only use [Test Doubles](test-doubles.md) for slow/external dependencies (databases, networks)
5. Build outward from the domain model to the boundaries

**Strength:** Tests are resilient to refactoring. Changing how objects communicate internally doesn't break tests as long as the final state is correct.

**Weakness:** Integration problems discovered late. Can build domain logic that's difficult to wire into the actual system.

## London School (Mockist/Interaction-Based)

The approach codified in [GOOS](london-school-tdd.md):

1. Start with a failing acceptance test at the system boundary
2. Work inward layer by layer using [Outside-In TDD](outside-in-tdd.md)
3. Mock collaborators that don't exist yet — mock expectations define the interface
4. Each layer's tests verify the messages sent to the next layer
5. "Pull" interfaces into existence from client needs

**Strength:** Interfaces are designed from the consumer's perspective. Coupling between layers is explicit and testable. Never builds features that can't be reached from the outside.

**Weakness:** Tests coupled to implementation. Refactoring communication patterns (even behavior-preserving changes) can break many tests.

## Martin Fowler's "Mocks Aren't Stubs"

Fowler's influential 2004 essay clarified the terminology confusion and named the schools:

- The "classicist" uses state verification: exercise the SUT, then inspect its state
- The "mockist" uses behavior verification: set expectations on mocks, exercise the SUT, verify interactions happened
- The choice between them is not just a testing technique but a **design philosophy**

Fowler himself identifies as a classicist but acknowledges the London school's design benefits.

## When to Use Which

### Prefer Chicago When:
- Building domain logic with few external dependencies
- Working with [Value Objects](value-objects.md) and pure computations
- Refactoring frequently and wanting tests that survive internal changes
- The team is new to TDD (simpler mental model)

### Prefer London When:
- Building systems with many collaborating objects and services
- Wanting to design interfaces from the consumer's perspective
- Following [Tell, Don't Ask](tell-dont-ask.md) and information hiding principles
- Working on event-driven or message-passing architectures
- Using [Outside-In TDD](outside-in-tdd.md) with acceptance tests driving development

### The Pragmatic Middle
Most experienced practitioners use both styles situationally:

- London style at architectural boundaries and for service interactions
- Chicago style for domain logic, value objects, and pure computations
- Acceptance tests (a London school idea) wrapping Chicago-style unit tests

## The Key Insight From Each School

**From Chicago:** Tests should verify *what* the system does (outcomes), not *how* it does it (implementation). This makes tests resilient.

**From London:** The communication patterns between objects *are* the design. Making them explicit through mock expectations is itself valuable design documentation.

## Khorikov's Argument for the Classical School

[Vladimir Khorikov](../entities/vladimir-khorikov.md) takes an explicit stance favoring the classical (Chicago) school in [Unit Testing: Principles, Practices, and Patterns](../sources/unit-testing-khorikov.md). His argument is built on the [four pillars framework](four-pillars-of-good-tests.md), particularly the pillar of **resistance to refactoring**:

1. **The London school doesn't distinguish intra-system from inter-system communications.** It mocks all dependencies except immutable ones, treating internal class collaborations the same as external system interactions.
2. **Intra-system communications are implementation details.** How classes collaborate internally to achieve a result is not part of observable behavior. Mocking these communications couples tests to implementation details.
3. **Coupling to implementation details causes false positives.** Tests break when code is refactored (behavior preserved), destroying resistance to refactoring — the non-negotiable pillar.
4. **The classical school naturally avoids this trap.** By only substituting shared dependencies (almost always out-of-process), classical tests verify end results rather than communication patterns.

Khorikov acknowledges the classical school is not perfect either — it can also overuse mocks for out-of-process dependencies that are fully managed (e.g., an application's own database). His refined rule: **only mock unmanaged dependencies** whose side effects are visible to the external world.

This position extends the Chicago school's argument beyond "prefer state verification" to a principled framework: the reason classical tests are better is that they produce fewer false positives and thus maintain higher test accuracy over the project's lifetime.

## Worked Example: Same Feature, Two Schools

Consider a simple feature: **placing an order sends a confirmation email**. The system has an `OrderService` that coordinates between an `Inventory`, a `PriceCalculator`, and an `EmailSender`. The same feature, tested two different ways, reveals the core trade-offs.

### The Domain Objects (Shared by Both Approaches)

```python
class Product:
    def __init__(self, name: str, price: float, stock: int):
        self.name = name
        self.price = price
        self.stock = stock


class Order:
    def __init__(self, product: Product, quantity: int, total: float):
        self.product = product
        self.quantity = quantity
        self.total = total
        self.confirmed = False
```

### Chicago Approach: Real Collaborators, Assert on State

The Chicago test uses real objects for `Inventory` and `PriceCalculator`. Only the
`EmailSender` is faked, because it hits an external system (a network call). The test
asserts on the **final state** of the order and inventory — it does not care *how* the
service arrived at that state internally.

```python
# --- Production code ---

class Inventory:
    def __init__(self):
        self._products: dict[str, Product] = {}

    def add(self, product: Product):
        self._products[product.name] = product

    def reserve(self, product_name: str, quantity: int) -> Product:
        product = self._products[product_name]
        if product.stock < quantity:
            raise ValueError("Insufficient stock")
        product.stock -= quantity
        return product


class PriceCalculator:
    def total(self, price: float, quantity: int) -> float:
        discount = 0.10 if quantity >= 10 else 0.0
        return round(price * quantity * (1 - discount), 2)


class EmailSender:
    def send_confirmation(self, order: Order) -> None:
        ...  # real implementation sends over the network


class OrderService:
    def __init__(self, inventory: Inventory, calculator: PriceCalculator,
                 email_sender: EmailSender):
        self.inventory = inventory
        self.calculator = calculator
        self.email_sender = email_sender

    def place_order(self, product_name: str, quantity: int) -> Order:
        product = self.inventory.reserve(product_name, quantity)
        total = self.calculator.total(product.price, quantity)
        order = Order(product, quantity, total)
        order.confirmed = True
        self.email_sender.send_confirmation(order)
        return order


# --- Chicago-style test ---

class FakeEmailSender(EmailSender):
    """Fake only the external dependency — keeps a log for later assertion."""
    def __init__(self):
        self.sent_orders: list[Order] = []

    def send_confirmation(self, order: Order) -> None:
        self.sent_orders.append(order)


def test_place_order_chicago():
    # Arrange — real collaborators, fake only the network boundary
    inventory = Inventory()
    inventory.add(Product("Widget", price=25.00, stock=100))
    calculator = PriceCalculator()
    email = FakeEmailSender()
    service = OrderService(inventory, calculator, email)

    # Act
    order = service.place_order("Widget", quantity=3)

    # Assert on STATE — what happened, not how
    assert order.confirmed is True
    assert order.total == 75.00          # 25 * 3, no discount
    assert order.product.stock == 97     # 100 - 3
    assert len(email.sent_orders) == 1   # email was sent (state of the fake)
```

Notice: the test never mentions `PriceCalculator` or `Inventory` by name in its
assertions. If you later merged them into a single object or changed the internal call
order, this test would still pass. **Refactoring resilience** is the Chicago payoff.

### London Approach: Mock Collaborators, Verify Interactions

The London test mocks every collaborator. Each mock carries **expectations** — the test
verifies that `OrderService` sent the right messages to the right objects in the right
order. This makes the communication design explicit and testable.

```python
from unittest.mock import Mock, call

def test_place_order_london():
    # Arrange — mock every collaborator
    inventory = Mock()
    calculator = Mock()
    email_sender = Mock()

    fake_product = Product("Widget", price=25.00, stock=100)
    inventory.reserve.return_value = fake_product
    calculator.total.return_value = 75.00

    service = OrderService(inventory, calculator, email_sender)

    # Act
    order = service.place_order("Widget", quantity=3)

    # Assert on INTERACTIONS — which messages were sent
    inventory.reserve.assert_called_once_with("Widget", 3)
    calculator.total.assert_called_once_with(25.00, 3)
    email_sender.send_confirmation.assert_called_once()

    # The order itself is still checked for correctness
    assert order.confirmed is True
    assert order.total == 75.00
```

Notice: the test spells out the exact calls `OrderService` must make. This is
**interface documentation** — you can read the test to learn how the service interacts
with its collaborators. But if you refactor `OrderService` to call `calculator.total`
with a `Product` instead of a raw price, the test breaks even though behavior is
preserved. **Coupling to implementation** is the London trade-off.

### Side-by-Side Trade-off Summary

| What happens when you...               | Chicago test        | London test         |
|-----------------------------------------|---------------------|---------------------|
| Rename an internal method               | Passes              | Breaks              |
| Change collaborator call order          | Passes              | Breaks              |
| Introduce a bug in `PriceCalculator`    | Fails (catches it)  | Passes (mock hides it) |
| Add a new collaborator internally       | Passes              | Needs updating      |
| Read the test to understand design      | Shows outcomes       | Shows communication |

The Chicago test catches integration bugs because it uses the real `PriceCalculator`.
The London test documents the design but can miss bugs hidden behind mocks. Most
experienced practitioners combine both styles: London at architectural boundaries,
Chicago for domain logic. See [the pragmatic middle](#the-pragmatic-middle) above.

## Related Pages

- [London School TDD](london-school-tdd.md)
- [Outside-In TDD](outside-in-tdd.md)
- [Mocking](mocking.md)
- [Test Doubles](test-doubles.md)
- [Tell, Don't Ask](tell-dont-ask.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Kent Beck](../entities/kent-beck.md)
- [Steve Freeman](../entities/steve-freeman.md)
- [Nat Pryce](../entities/nat-pryce.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
- [Unit Testing (Khorikov)](../sources/unit-testing-khorikov.md)
- [Four Pillars of a Good Test](four-pillars-of-good-tests.md)
- [Vladimir Khorikov](../entities/vladimir-khorikov.md)
