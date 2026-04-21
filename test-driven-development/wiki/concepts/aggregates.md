---
title: Aggregates
type: concept
tags: [ddd, aggregates, eric-evans, vaughn-vernon, testing, invariants, transactional-consistency]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Domain-Driven Design_ Tackling Complexity in the Heart of Software.md, raw/Implementing Domain-Driven Design.md]
---

An Aggregate is a cluster of domain objects treated as a single unit for data changes. The aggregate root is the sole entry point. Aggregates are the natural unit of testing in DDD — they define transaction boundaries, enforce invariants, and encapsulate internal structure.

## Core Rules (Evans)

1. The **root Entity** has global identity. Internal entities have local identity only.
2. Nothing outside the aggregate can hold a persistent reference to anything inside, except the root.
3. Only aggregate roots can be obtained via database queries. Internal objects are found by traversal.
4. Objects within an aggregate can reference other aggregate roots.
5. A delete removes everything within the aggregate boundary.
6. When any change is committed, all invariants of the entire aggregate must be satisfied.

## Why Aggregates Are the Natural Test Unit

### Invariants Define Assertions

An aggregate's invariants are consistency rules that must hold after every transaction. These invariants are exactly what tests should assert:

```
// The aggregate enforces: order total = sum of line items
order.addLineItem(product, quantity: 3, price: 10.00)
assert order.total() == 30.00

// The aggregate enforces: cannot exceed credit limit
assertThrows(() => order.addLineItem(expensiveProduct))
```

### Root as Test Entry Point

All interaction goes through the aggregate root. This means:
- Tests have a single, clear entry point
- Internal structure is encapsulated (tests don't depend on internals)
- The public API of the root defines the test surface

### Transaction Boundary = Test Boundary

Each test operates on one aggregate transaction. Test setup creates the aggregate, the test performs operations through the root, and assertions verify the invariants hold.

## Aggregate Design Guidance (Vernon)

### Prefer Small Aggregates

> "Smaller Aggregates not only perform and scale better, they are also biased toward transactional success."

Small aggregates are easier to test:
- Less setup required
- Fewer states to cover
- Invariants are clearer
- Faster test execution

### Protect True Invariants, Not False Ones

Only cluster objects that genuinely must be consistent within a single transaction. False invariants lead to oversized aggregates that are hard to test and slow to run.

### Use Domain Events Between Aggregates

When consistency between aggregates can be eventual rather than immediate, use [Domain Events](domain-events.md) to communicate. Test the event publication from one aggregate and the event handling in another, independently.

## Testing Patterns for Aggregates

### Direct Invariant Testing
Test that the aggregate rejects invalid state transitions and maintains consistency rules.

### Event-Based Testing
Assert that command methods publish the correct [Domain Events](domain-events.md):
```
backlogItem.commitToSprint(sprint)
assertPublished(BacklogItemCommitted(backlogItemId, sprintId))
```

### Factory Method Testing
Aggregates often have factory methods on the root for creating internal entities. Test that these enforce aggregate rules.

### Repository-Based Testing
Use in-memory repository implementations to test aggregate persistence round-trips without infrastructure. See [Ports and Adapters](ports-and-adapters.md).

## Connection to TDD Workflow

Vernon prescribes test-first development of aggregates:
1. Write a test showing how a client uses the aggregate
2. Create minimal code to compile
3. Refactor until the test represents proper domain usage
4. Implement until the test passes
5. Verify with domain experts that the [Ubiquitous Language](ubiquitous-language.md) is correct

## Related Pages

- [Domain Model Testing](domain-model-testing.md)
- [Domain Events](domain-events.md)
- [Value Objects](value-objects.md)
- [Bounded Context](bounded-context.md)
- [Ubiquitous Language](ubiquitous-language.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Test First](test-first.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Domain-Driven Design (Evans)](../sources/domain-driven-design-evans.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)

## Worked Example: Order Aggregate with Test-First Workflow

This example follows Vernon's test-first approach: write a test showing how a client uses the aggregate, create minimal code to compile, then implement until the test passes.

### The Domain Rules (Invariants)

1. An `Order` has line items. Each line item has a product name, quantity, and unit price.
2. `order.total` always equals the sum of `quantity * unit_price` across all line items.
3. An order may not contain more than 5 line items (a business constraint to keep orders manageable for fulfillment).
4. Adding a line item publishes an `OrderLineItemAdded` domain event.

### Step 1: Write Tests First (Red)

Following Vernon, we start by writing tests that show how a client should interact with the aggregate. These tests will not compile yet -- that is expected.

```python
# test_order.py

import pytest
from order import Order, OrderLineItemAdded

class TestOrderInvariants:
    """Direct invariant testing — verify the aggregate rejects invalid
    state transitions and maintains consistency rules."""

    def test_new_order_has_zero_total(self):
        order = Order(order_id="ORD-1")
        assert order.total == 0

    def test_total_reflects_single_line_item(self):
        order = Order(order_id="ORD-1")
        order.add_line_item(product="Widget", quantity=3, unit_price=10.00)
        assert order.total == 30.00

    def test_total_reflects_multiple_line_items(self):
        order = Order(order_id="ORD-1")
        order.add_line_item(product="Widget", quantity=3, unit_price=10.00)
        order.add_line_item(product="Gadget", quantity=1, unit_price=24.99)
        assert order.total == 54.99

    def test_rejects_line_item_beyond_max(self):
        order = Order(order_id="ORD-1")
        for i in range(5):
            order.add_line_item(product=f"Item-{i}", quantity=1, unit_price=1.00)
        with pytest.raises(ValueError, match="cannot exceed 5 line items"):
            order.add_line_item(product="One Too Many", quantity=1, unit_price=1.00)

    def test_rejects_zero_quantity(self):
        order = Order(order_id="ORD-1")
        with pytest.raises(ValueError, match="Quantity must be at least 1"):
            order.add_line_item(product="Widget", quantity=0, unit_price=10.00)


class TestOrderEvents:
    """Event-based testing — assert that command methods publish
    the correct domain events."""

    def test_add_line_item_publishes_event(self):
        order = Order(order_id="ORD-1")
        order.add_line_item(product="Widget", quantity=2, unit_price=5.00)

        assert len(order.domain_events) == 1
        event = order.domain_events[0]
        assert isinstance(event, OrderLineItemAdded)
        assert event.order_id == "ORD-1"
        assert event.product == "Widget"
        assert event.quantity == 2
        assert event.unit_price == 5.00

    def test_rejected_item_publishes_no_event(self):
        order = Order(order_id="ORD-1")
        for i in range(5):
            order.add_line_item(product=f"Item-{i}", quantity=1, unit_price=1.00)
        order.domain_events.clear()  # reset so we only observe the next attempt

        with pytest.raises(ValueError):
            order.add_line_item(product="Overflow", quantity=1, unit_price=1.00)

        assert len(order.domain_events) == 0  # no event on failure


class TestOrderFactory:
    """Factory method testing — the root creates internal entities
    and enforces aggregate rules during creation."""

    def test_create_order_with_initial_items(self):
        order = Order.create(
            order_id="ORD-2",
            items=[
                {"product": "Widget", "quantity": 2, "unit_price": 10.00},
                {"product": "Gadget", "quantity": 1, "unit_price": 7.50},
            ],
        )
        assert order.total == 27.50
        assert order.line_item_count == 2

    def test_factory_rejects_too_many_items(self):
        items = [
            {"product": f"Item-{i}", "quantity": 1, "unit_price": 1.00}
            for i in range(6)
        ]
        with pytest.raises(ValueError, match="cannot exceed 5 line items"):
            Order.create(order_id="ORD-3", items=items)
```

### Step 2: Create Minimal Code to Compile (Green)

Now we implement just enough to make every test pass.

```python
# order.py

from __future__ import annotations
from dataclasses import dataclass, field

# ---------- Domain Event ----------

@dataclass(frozen=True)
class OrderLineItemAdded:
    order_id: str
    product: str
    quantity: int
    unit_price: float

# ---------- Internal Entity (Value Object for simplicity) ----------

@dataclass(frozen=True)
class LineItem:
    product: str
    quantity: int
    unit_price: float

    def subtotal(self) -> float:
        return self.quantity * self.unit_price

# ---------- Aggregate Root ----------

MAX_LINE_ITEMS = 5

class Order:
    """Aggregate root. All interaction goes through this class."""

    def __init__(self, order_id: str) -> None:
        self._order_id = order_id
        self._items: list[LineItem] = []
        self._domain_events: list[object] = []

    # -- Queries --

    @property
    def order_id(self) -> str:
        return self._order_id

    @property
    def total(self) -> float:
        return round(sum(item.subtotal() for item in self._items), 2)

    @property
    def line_item_count(self) -> int:
        return len(self._items)

    @property
    def domain_events(self) -> list[object]:
        return self._domain_events

    # -- Commands --

    def add_line_item(self, product: str, quantity: int, unit_price: float) -> None:
        if quantity < 1:
            raise ValueError("Quantity must be at least 1")
        if len(self._items) >= MAX_LINE_ITEMS:
            raise ValueError(f"Order cannot exceed {MAX_LINE_ITEMS} line items")

        item = LineItem(product=product, quantity=quantity, unit_price=unit_price)
        self._items.append(item)

        self._domain_events.append(
            OrderLineItemAdded(
                order_id=self._order_id,
                product=product,
                quantity=quantity,
                unit_price=unit_price,
            )
        )

    # -- Factory --

    @classmethod
    def create(cls, order_id: str, items: list[dict]) -> Order:
        order = cls(order_id=order_id)
        for item in items:
            order.add_line_item(**item)
        return order
```

### Step 3: Verify with Domain Experts (Refactor)

At this point all nine tests pass. We review the [Ubiquitous Language](ubiquitous-language.md) with domain experts:

- **Order**, **line item**, **total**, **add line item** -- do these terms match what fulfillment staff actually say?
- Is the 5-item limit correct, or should it be configurable per customer tier?
- Should `OrderLineItemAdded` carry the new total for downstream listeners?

Any refinements discovered here feed back into the tests first, then the implementation -- maintaining the test-first loop.

### What the Tests Cover

| Test category | What it verifies |
|---|---|
| **Invariant tests** | Total calculation, max-items constraint, quantity guard |
| **Event tests** | Correct event published on success; no event on failure |
| **Factory tests** | Convenience creation, invariant enforcement during creation |

Each test interacts exclusively through the aggregate root (`Order`), never reaching into `LineItem` directly. This mirrors the DDD rule that nothing outside the aggregate boundary references internal objects.
