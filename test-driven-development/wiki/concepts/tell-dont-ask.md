---
title: "Tell, Don't Ask"
type: concept
tags: [tell-dont-ask, oo-design, law-of-demeter, information-hiding, london-school]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce.md"]
---

"Tell, Don't Ask" is an object-oriented design principle stating that objects should tell collaborators what to do rather than querying their state and making decisions for them. It is a key principle in [GOOS](../sources/growing-oo-software-freeman-pryce.md) connecting OO design to testability.

## The Principle

> "The calling object should describe what it wants in terms of the role that its neighbor plays, and let the called object decide how to make that happen." — Freeman & Pryce

Instead of asking an object for its data and then acting on it:
```java
// ASK (bad) — "train wreck" code
master.getModelisable()
      .getDockablePanel()
      .getCustomisationController()
      .getSaveItem()
      .setEnabled(true);
```

Tell the object what you want:
```java
// TELL (good)
master.allowSavingOfCustomisations();
```

## Why It Matters

### For Design
- **Hides information** — clients don't need to know internal structure
- **Reduces coupling** — changes to internal structure don't ripple outward
- **Makes relationships explicit** — forces you to name interactions (the shorter version above is clearer about intent)
- **Enforces encapsulation** — objects manage their own state transitions

### For Testability
- Objects that follow Tell, Don't Ask have clear, message-based interfaces
- These interfaces are naturally mockable — you can verify messages were sent
- This is why the [London school](london-school-tdd.md) uses mock objects: they verify that the right messages were sent to collaborators
- Without Tell, Don't Ask, you'd need to test by querying internal state (harder, more fragile)

## The Connection to Mock Objects

Freeman and Pryce argue that Tell, Don't Ask creates a design problem for testing: if objects only send commands and don't expose state, how do you assert correctness?

Their answer: **mock objects**. Replace collaborators with mocks that verify the right messages were sent. This makes the communication protocol the thing under test, which is exactly what Tell, Don't Ask emphasizes.

## But Sometimes Ask

The principle is a guideline, not an absolute rule:
- **Values and collections** — ask for data from immutable values
- **Factories** — ask for new objects
- **Searching/filtering** — sometimes you must query

The key is to ask questions that express intent ("is the carriage full?") rather than implementation ("give me the seat count so I can check it myself").

> "We try to be sparing with queries on objects (as opposed to values) because they can allow information to 'leak' out of the object." — Freeman & Pryce

## Relationship to Law of Demeter

Tell, Don't Ask is closely related to the Law of Demeter ("only talk to your immediate friends"). Both prevent reaching through chains of objects. The "train wreck" anti-pattern violates both principles simultaneously.

## Related Pages

- [London School TDD](london-school-tdd.md)
- [Mocking](mocking.md)
- [Dependency Injection](dependency-injection.md)
- [SOLID Principles](solid-principles.md)
- [Outside-In TDD](outside-in-tdd.md)
- [Ports and Adapters](ports-and-adapters.md)
- [Chicago vs. London Schools](chicago-vs-london.md)
- [Growing OO Software (Freeman & Pryce)](../sources/growing-oo-software-freeman-pryce.md)
