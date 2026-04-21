---
title: Event Sourcing
type: concept
tags: [event-sourcing, architecture, ddd, testing, vaughn-vernon, domain-events]
created: 2026-04-21
updated: 2026-04-21
sources: [raw/Implementing Domain-Driven Design.md]
---

Event sourcing persists the state of an [aggregate](aggregates.md) as a sequence of [domain events](domain-events.md) rather than as a current-state snapshot. The aggregate's state at any point in time is reconstructed by replaying its event history. This approach maps naturally to Given/When/Then testing and the [BDD](bdd.md) specification style.

## Core Idea

Instead of storing `Order { status: "shipped", total: 42.00 }`, an event-sourced system stores:

```
OrderPlaced { orderId: 123, items: [...], total: 42.00 }
PaymentReceived { orderId: 123, amount: 42.00 }
OrderShipped { orderId: 123, trackingNumber: "ABC" }
```

The current state is derived by replaying these events through the aggregate's event handlers.

## Testing Event-Sourced Aggregates

Event sourcing makes the Given/When/Then pattern concrete and literal:

- **Given** — a history of past events (the aggregate's prior state)
- **When** — a command is issued
- **Then** — new events are emitted (or the command is rejected)

```python
def test_order_can_be_shipped_after_payment():
    # Given
    history = [
        OrderPlaced(order_id="123", items=["widget"], total=42.00),
        PaymentReceived(order_id="123", amount=42.00),
    ]
    order = Order.from_events(history)

    # When
    order.ship(tracking_number="ABC")

    # Then
    assert order.uncommitted_events == [
        OrderShipped(order_id="123", tracking_number="ABC")
    ]


def test_order_cannot_be_shipped_without_payment():
    # Given
    history = [
        OrderPlaced(order_id="123", items=["widget"], total=42.00),
    ]
    order = Order.from_events(history)

    # When / Then
    with pytest.raises(PaymentRequiredError):
        order.ship(tracking_number="ABC")
```

This testing style is pure [Chicago school](chicago-vs-london.md): no mocks, no stubs — just events in, events out. The aggregate is a pure function from `(history, command) → new_events`.

## Why Event Sourcing Aligns With TDD

1. **Tests are naturally behavioral.** You specify what happened (given), what the user does (when), and what should result (then). No implementation details leak into the test.

2. **No database needed for unit tests.** The aggregate reconstructs from events in memory. Unit tests are fast and isolated.

3. **Temporal assertions.** You can test time-dependent behavior by including or omitting events in the history. "Given an order placed 30 days ago with no payment" tests overdue logic without time-travel infrastructure.

4. **Audit trail is built-in.** Every state change is recorded as an event. Tests can assert on the complete history, not just the final state.

## Projection Testing

The read side of an event-sourced system uses projections — handlers that consume events and update denormalized views. Test projections separately:

- **Given** a sequence of events
- **When** the projection handler processes them
- **Then** the read model contains expected data

Projection tests are often [integration tests](integration-testing.md) because they involve database writes. See [CQRS](cqrs.md) for the full read/write separation.

## Related Pages

- [Domain Events](domain-events.md)
- [Aggregates](aggregates.md)
- [Domain Model Testing](domain-model-testing.md)
- [CQRS](cqrs.md)
- [BDD](bdd.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Value Objects](value-objects.md)
- [Bounded Context](bounded-context.md)
- [Vaughn Vernon](../entities/vaughn-vernon.md)
- [Implementing DDD (Vernon)](../sources/implementing-ddd-vernon.md)
