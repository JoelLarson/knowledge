---
title: Outside-In TDD (Double-Loop TDD)
type: concept
tags: [outside-in, double-loop, acceptance-tests, london-school, tdd]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

Outside-in TDD starts from the outermost layer of the system (acceptance tests at the boundary) and drives inward, discovering collaborators and interfaces at each layer. It uses two nested feedback loops: an outer acceptance test loop and an inner unit test loop.

## The Double Loop

```
┌───��─────────────────────────────────────────────┐
│  OUTER LOOP: Failing Acceptance Test            │
│  (measures demonstrable progress)               │
│                                                 │
│    ┌───────────────────────────────────────┐    │
│    │  INNER LOOP: Unit Test Cycle          │    │
│    │  Red → Green → Refactor → ...         │    │
│    │  (supports developers)                │    │
│    └───────────────────────────────────────┘    │
│                                                 │
│  Acceptance test passes → feature complete      │
└─────────────────────────────────────────────────┘
```

- The **outer loop** is a failing acceptance test that exercises the system end-to-end. It defines what "done" means for a feature.
- The **inner loop** is the standard [Red-Green-Refactor](red-green-refactor.md) cycle at the unit level, driving implementation of each layer until the acceptance test passes.

## How It Works

1. **Write a failing acceptance test** — exercises the system through its external interfaces (UI, API, messages). Uses only domain terminology, not technical details.
2. **Develop from inputs to outputs** — start with objects at the system boundary that receive external events. Discover what services they need.
3. **Use mocks to stand in for undiscovered collaborators** — when an object needs a service, define an interface and mock it. This is "interface discovery."
4. **Implement discovered interfaces** — write the next layer's objects, discovering further collaborators.
5. **Continue inward** until all layers connect to existing objects or external systems.
6. **Acceptance test passes** — the feature is complete.

## Develop from the Inputs to the Outputs

> "We start developing a feature by considering the events coming into the system that will trigger the new behavior... we work our way through the system: from the objects that receive external events, through the intermediate layers, to the central domain model, and then on to other boundary objects." — Freeman & Pryce

This contrasts with starting at the domain model and trying to hook it into the system later, which risks:

- Building unnecessary functionality
- Integration problems discovered late
- Wrong feedback driving design decisions

## Interface Discovery

The signature technique of [London school TDD](london-school-tdd.md):

1. Object A needs a service → define interface X
2. Mock X in A's unit test → write expectations for how A will use X
3. The mock expectations define X's protocol from A's perspective
4. Later, implement a real class for X, discovering what services *it* needs
5. Repeat

This "pulls" interfaces into existence from client needs rather than "pushing" features out from implementation.

## Relationship to Acceptance Tests

Outside-in TDD gives acceptance tests two distinct roles:

- **In-progress acceptance tests** — represent work yet to be done; expected to fail
- **Regression acceptance tests** — represent completed features; must always pass

This separation tracks progress and catches regressions independently. See [ATDD](atdd.md).

## Author's Position: Outside-In TDD as the Default Workflow

This wiki treats outside-in TDD as the standard development workflow. The double loop — a failing acceptance test driving unit-level TDD cycles — provides the "acceptance test defines done" benefit without requiring the full [ATDD](atdd.md) ceremony (custom DSL, translation layer, four-layer architecture). A simple acceptance test at the API or system boundary (`client.get("/cart/total")`) is enough to anchor the outer loop. See the [Author's Position on ATDD](atdd.md#authors-position-acceptance-tests-as-critical-flow-smoke-tests) for when full ATDD infrastructure earns its keep.

## When Outside-In Works Best

- Systems with clear external boundaries (web apps, APIs, message-driven systems)
- When the team wants to discover domain interfaces rather than design them up front
- When end-to-end testing infrastructure exists (from the [Walking Skeleton](walking-skeleton.md))
- When the [Tell, Don't Ask](tell-dont-ask.md) style is desired

## Worked Example: Double Loop in Practice

Feature: **A user can check the total price of items in their shopping cart via an API endpoint.** We will write one outer-loop acceptance test, then three inner-loop unit test cycles to make it pass.

### Outer Loop: Write the Failing Acceptance Test

The acceptance test exercises the system from the outside — an HTTP request in, a JSON
response out. It uses only domain language and does not mention internal classes.

```python
# test_acceptance.py
import json
from app import create_app

def test_cart_total():
    """Outer loop — this test will stay RED until all inner layers are built."""
    app = create_app()
    client = app.test_client()

    # Add two items to the cart
    client.post("/cart/items", json={"sku": "WIDGET-1", "quantity": 2})
    client.post("/cart/items", json={"sku": "GADGET-9", "quantity": 1})

    # Request the total
    response = client.get("/cart/total")
    body = json.loads(response.data)

    assert response.status_code == 200
    assert body["total"] == 39.97  # (2 * 9.99) + (1 * 19.99)
```

Running this test now gives an import error — `create_app` does not exist yet. The outer
loop is red. We drop into the inner loop to build what is needed.

### Inner Loop, Cycle 1: The Cart Route (Boundary Layer)

We start at the input boundary — the HTTP handler. It needs a `CartService` that does
not exist yet, so we mock it to discover its interface.

```python
# test_cart_route.py
from unittest.mock import Mock

def test_get_total_returns_service_result():
    cart_service = Mock()
    cart_service.total.return_value = 39.97

    from cart_route import make_cart_blueprint
    import json, flask

    app = flask.Flask(__name__)
    app.register_blueprint(make_cart_blueprint(cart_service))
    client = app.test_client()

    response = client.get("/cart/total")
    body = json.loads(response.data)

    assert response.status_code == 200
    assert body["total"] == 39.97
    cart_service.total.assert_called_once()
```

Green this test with a minimal route:

```python
# cart_route.py
from flask import Blueprint, jsonify

def make_cart_blueprint(cart_service):
    bp = Blueprint("cart", __name__)

    @bp.post("/cart/items")
    def add_item():
        from flask import request
        data = request.get_json()
        cart_service.add_item(data["sku"], data["quantity"])
        return "", 204

    @bp.get("/cart/total")
    def get_total():
        total = cart_service.total()
        return jsonify({"total": total})

    return bp
```

Inner cycle 1 is green. The mock expectations told us `CartService` needs `add_item(sku, quantity)` and `total()` — interface discovery in action.

### Inner Loop, Cycle 2: The Cart Service (Middle Layer)

Now we implement `CartService`. It needs a `ProductCatalog` to look up prices — another
interface we discover through mocking.

```python
# test_cart_service.py
from unittest.mock import Mock
from cart_service import CartService

def test_total_sums_item_prices():
    catalog = Mock()
    catalog.price_for.side_effect = lambda sku: {
        "WIDGET-1": 9.99,
        "GADGET-9": 19.99,
    }[sku]

    service = CartService(catalog)
    service.add_item("WIDGET-1", quantity=2)
    service.add_item("GADGET-9", quantity=1)

    assert service.total() == 39.97
    catalog.price_for.assert_any_call("WIDGET-1")
    catalog.price_for.assert_any_call("GADGET-9")
```

Green it:

```python
# cart_service.py

class CartService:
    def __init__(self, catalog):
        self._catalog = catalog
        self._items: list[tuple[str, int]] = []

    def add_item(self, sku: str, quantity: int):
        self._items.append((sku, quantity))

    def total(self) -> float:
        result = 0.0
        for sku, quantity in self._items:
            result += self._catalog.price_for(sku) * quantity
        return round(result, 2)
```

Inner cycle 2 is green. We now know `ProductCatalog` needs a `price_for(sku)` method.

### Inner Loop, Cycle 3: The Product Catalog (Domain Layer)

This is a leaf object with no collaborators — a straightforward Chicago-style test
asserting on returned values.

```python
# test_product_catalog.py
from product_catalog import ProductCatalog

def test_price_for_known_sku():
    catalog = ProductCatalog({"WIDGET-1": 9.99, "GADGET-9": 19.99})
    assert catalog.price_for("WIDGET-1") == 9.99

def test_price_for_unknown_sku_raises():
    catalog = ProductCatalog({})
    try:
        catalog.price_for("NOPE")
        assert False, "Expected KeyError"
    except KeyError:
        pass
```

Green it:

```python
# product_catalog.py

class ProductCatalog:
    def __init__(self, prices: dict[str, float]):
        self._prices = prices

    def price_for(self, sku: str) -> float:
        return self._prices[sku]
```

Inner cycle 3 is green.

### Back to the Outer Loop: Wire Everything Together

All inner layers are built. Now we connect them in `create_app` and re-run the
acceptance test.

```python
# app.py
from flask import Flask
from cart_route import make_cart_blueprint
from cart_service import CartService
from product_catalog import ProductCatalog

def create_app():
    catalog = ProductCatalog({"WIDGET-1": 9.99, "GADGET-9": 19.99})
    cart_service = CartService(catalog)

    app = Flask(__name__)
    app.register_blueprint(make_cart_blueprint(cart_service))
    return app
```

Run `test_acceptance.py` again — **green**. The outer loop closes.

### What Just Happened

```
Outer loop (RED) ──────────────────────────────────────────────────── Outer loop (GREEN)
  │                                                                     ▲
  ▼                                                                     │
  Inner cycle 1: cart_route     (mock CartService)        ── GREEN ─────┤
  Inner cycle 2: cart_service   (mock ProductCatalog)     ── GREEN ─────┤
  Inner cycle 3: product_catalog (no mocks, leaf object)  ── GREEN ─────┘
```

Each inner cycle discovered the interface of the next layer through mock expectations,
exactly as described in [Interface Discovery](#interface-discovery). The outermost test
never changed — it defined "done" from the start and stayed red until all layers
connected. This is the double loop: the outer loop measures progress, the inner loops
drive the implementation one layer at a time.

## Related Pages

- [London School TDD](london-school-tdd.md)
- [Walking Skeleton](walking-skeleton.md)
- [ATDD](atdd.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Mocking](mocking.md)
- [Dependency Injection](dependency-injection.md)
- [Tell, Don't Ask](tell-dont-ask.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Integration Testing](integration-testing.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
