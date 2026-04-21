---
title: "Tidy First? — Kent Beck"
type: source
tags: [kent-beck, refactoring, design, tidying, coupling, cohesion]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Tidy First.md]
---

Kent Beck's 2023 book on small structural improvements ("tidyings") that a programmer can make before, after, or instead of behavior changes. The first volume in a planned series on empirical software design, it connects the refactor step of [Red-Green-Refactor](../concepts/red-green-refactor.md) to economics (discounted cash flows, optionality) and to the foundational coupling/cohesion theory from Yourdon and Constantine's *Structured Design*.

## Publication Details

- **ISBN-13:** 9781098151249
- **Publisher:** O'Reilly
- **Buy from publisher:** [O'Reilly](https://www.oreilly.com/library/view/tidy-first/9781098151232/)

## Core Thesis

Software creates value in two ways: what it does today (behavior) and the possibility of new things it can do tomorrow (options). Structure changes don't alter behavior but create or destroy options. The question "Tidy first?" is an economic question: does investing in structure now pay off through cheaper behavior changes?

## Part I: The Tidyings Catalog

Beck defines tidyings as "the cute, fuzzy little refactorings that nobody could possibly hate on" — a strict subset of refactorings, kept deliberately small and safe. The catalog:

1. **Guard Clauses** — Replace nested `if` with early returns to flatten control flow
2. **Dead Code** — Delete unreachable code; version control remembers it
3. **Normalize Symmetries** — Make identical patterns look identical (e.g., consistent lazy initialization)
4. **New Interface, Old Implementation** — Create the interface you wish existed; implement it by calling the old one
5. **Reading Order** — Reorder code for the reader's benefit
6. **Cohesion Order** — Move coupled elements closer together (same file, same directory, same repo)
7. **Move Declaration and Initialization Together** — Respect data dependencies but keep variables near their initialization
8. **Explaining Variables** — Extract subexpressions into named variables that document intent
9. **Explaining Constants** — Replace magic numbers/strings with symbolic constants
10. **Explicit Parameters** — Surface hidden dependencies (maps, env vars) as explicit function parameters
11. **Chunk Statements** — Add blank lines between logical sections (simplest tidying)
12. **Extract Helper** — Pull out a block with obvious purpose into a named helper function
13. **One Pile** — Inline over-split code back together, then re-split along better seams
14. **Explaining Comments** — Record non-obvious context for future readers
15. **Delete Redundant Comments** — Remove comments that simply restate the code

## Part II: Managing Tidyings

### Separate Tidying
Keep structure changes and behavior changes in separate PRs/commits. Never mix the two in a single diff.

### Chaining
Tidyings lead to more tidyings (guard clause enables explaining helper; dead code removal reveals reading order). Manage the urge — tidy only enough to enable the next behavior change.

### Batch Sizes
Trade-off between small batches (fewer collisions, less speculation) and large batches (fewer review cycles). Beck advocates reducing review cost to enable smaller batches rather than increasing batch size.

### Rhythm
Tidying is a minutes-to-an-hour activity. More than an hour suggests losing focus on the immediate need. Behavior changes cluster (Pareto: 80% of changes in 20% of files), and tidyings cluster in exactly those hot spots.

### Getting Untangled
When tidyings and behavior changes tangle together, Beck recommends discarding and re-implementing with tidying first, behavior second.

### First, After, Later, Never
The decision framework for when to tidy:

| Timing | When to use |
|--------|-------------|
| **Never** | Code will never change again; nothing to learn from improving it |
| **Later** | Big batch of tidying without immediate payoff; put it on the "Fun List" |
| **After** | Waiting until next time would be more expensive; cost proportional to behavior change |
| **First** | Pays off immediately in comprehension or cheaper behavior changes; you know what and how to tidy |

## Part III: Theory

### Beneficially Relating Elements
Beck's definition of software design: *beneficially relating elements*. Designers can only: create/delete elements, create/delete relationships, increase the benefit of a relationship.

### Structure and Behavior
Software creates value through behavior (what it does today) and options (what it could do tomorrow). Structure doesn't affect behavior but determines the cost of future behavior changes — and thus the value of options.

### Economics: Time Value and Optionality
Two financial forces in tension:

- **Time value of money** — earn sooner, spend later (favors tidy after)
- **Optionality** — options are more valuable in volatile environments (favors tidy first)

The more uncertain the future, the more valuable structure investment becomes. This resolves the apparent paradox: tidying "wastes" time now but creates options that may be worth far more.

### Constantine's Equivalence
Beck's formalization of Yourdon and Constantine's insight:

```
cost(software) ~= cost(change) ~= cost(big changes) ~= coupling
```

The cost of software is approximately the cost of its coupling. Big changes (which follow a power law distribution) dominate total cost, and big changes are expensive because of cascading coupling.

### Coupling
Two elements are coupled with respect to a particular change if changing one necessitates changing the other. Key properties:

- **1-N**: one element can be coupled to many others
- **Cascading**: changes propagate through chains of coupling
- Coupling cannot be assessed by looking at code alone — you must know which changes are likely

### Coupling Versus Decoupling
Decoupling isn't free. Reducing coupling for one class of changes can increase coupling for others. The trade-off space has no optimum — only a continuum of choices.

### Cohesion
Coupled elements should be subelements of the same container. Two approaches:

1. Extract coupled elements into their own cohesive subelement
2. Move uncoupled elements elsewhere

### Reversible Structure Changes
Structure changes are generally reversible (unlike behavior changes like sending wrong tax notices). Reversible decisions deserve less review overhead, which supports smaller tidying batches.

## Connection to TDD

Beck explicitly connects tidying to TDD's refactor step: "Tidyings are gateway refactorings." The test suite provides the safety net that makes tidying safe. The red-green-refactor cycle is the micro-scale of what Tidy First describes at slightly larger scale:

- **Red-Green** = behavior change
- **Refactor** = tidying

The tidyings catalog provides concrete moves for the refactor step that many practitioners find underspecified. Beck's "new interface, old implementation" tidying mirrors TDD's practice of starting from the test (the desired interface) and working backward.

## Related Pages

- [Kent Beck](../entities/kent-beck.md)
- [Refactoring](../concepts/refactoring.md)
- [Red-Green-Refactor](../concepts/red-green-refactor.md)
- [Simple Design](../concepts/simple-design.md)
- [Coupling and Cohesion](../concepts/coupling-and-cohesion.md)
- [Tidyings](../concepts/tidyings.md)
- [Refactoring (Fowler)](refactoring-martin-fowler.md)
