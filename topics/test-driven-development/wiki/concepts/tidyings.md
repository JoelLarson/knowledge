---
title: Tidyings
type: concept
tags: [refactoring, design, tidying, kent-beck]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/Tidy First.md]
---

Tidyings are small, safe structural improvements to code — a strict subset of [Refactoring](refactoring.md) that [Kent Beck](../entities/kent-beck.md) describes as "the cute, fuzzy little refactorings that nobody could possibly hate on." They are the concrete moves for TDD's refactor step, designed to be individually trivial but collectively powerful through chaining and compounding.

## The Catalog

Beck's 15 tidyings, grouped by purpose:

### Simplify Control Flow
- **Guard Clauses** — Replace nested `if (condition) { ...all code... }` with early returns: `if (!condition) return`. Flattens code, makes preconditions explicit.
- **Dead Code** — Delete unreachable code. Version control remembers it. Log usage first if unsure.

### Normalize Structure
- **Normalize Symmetries** — When the same pattern (e.g., lazy initialization) appears in multiple forms, pick one and convert all variants to it. Consistency enables pattern recognition.
- **New Interface, Old Implementation** — Create the interface you wish existed and implement it by delegating to the old one. The micro-scale essence of software design.

### Improve Reading
- **Reading Order** — Reorder code in the order a reader would prefer to encounter it. No single ordering is perfect; use recent experience as a guide.
- **Cohesion Order** — Move coupled elements closer together: routines in a file, files in a directory, code in a repository.
- **Move Declaration and Initialization Together** — Keep variables near their initialization, respecting data dependencies.

### Name Things
- **Explaining Variables** — Extract subexpressions into named variables that document intent.
- **Explaining Constants** — Replace magic numbers and strings with symbolic constants. Be careful: the same literal in two places can mean different things.
- **Explicit Parameters** — Surface hidden dependencies (parameter maps, environment variables) as explicit function parameters. Makes code easier to read, test, and analyze.

### Organize
- **Chunk Statements** — Add a blank line between logical sections. The simplest tidying; often the first step toward Extract Helper.
- **Extract Helper** — Pull a block with obvious purpose into a named helper function. Name it after *what* it does, not *how*. Special case: extract the part you need to change, change it, optionally inline it back.
- **One Pile** — When code has been over-split into pieces that hinder understanding, inline everything back into one pile, then re-split along better seams. Counterintuitive but powerful.

### Document
- **Explaining Comments** — Record what wasn't obvious from the code. Write to someone specific, even if unlike you.
- **Delete Redundant Comments** — Remove comments that exactly restate the code. Often becomes possible after other tidyings (e.g., guard clauses make old context-restoring comments redundant).

## The "Tidy First?" Decision Framework

When facing messy code that needs a behavior change, ask:

| Option | When |
|--------|------|
| **Tidy First** | Pays off immediately in comprehension or cheaper behavior changes; you know what and how |
| **Tidy After** | You'll change this area again soon; cheaper to tidy now than later; cost proportional to behavior change |
| **Tidy Later** | Big batch without immediate payoff; put it on the "Fun List" for when you have energy but no big task |
| **Never Tidy** | Code will never change again; nothing to learn from improving the design |

**General bias: tidy first.** The tidyings are deliberately tiny so the cost of a wrong decision is near zero.

## Chaining: How Tidyings Compound

Tidyings set up further tidyings:

- Guard clause -> explaining helper or explaining variable
- Dead code removal -> reading order or cohesion order becomes visible
- Normalize symmetries -> reading order (parallel code groups naturally)
- Chunk statements -> explaining comments or extract helper
- Extract helper -> guard clause, explaining constants, delete redundant comments
- One pile -> chunk statements, explaining comments, extract helper

Beck calls this "avalanches" — small tidyings compound until a large simplification becomes trivial.

## Relationship to TDD's Refactor Step

Tidyings give concrete content to the often-underspecified "refactor" step of [Red-Green-Refactor](red-green-refactor.md):

1. **Red** — write a failing test (behavior intent)
2. **Green** — make it pass as quickly as possible (behavior implementation)
3. **Refactor** — apply tidyings to improve structure without changing behavior

The test suite is the safety net that makes tidying safe. Without tests, tidyings carry risk of accidental behavior change. With tests, each tidying can be verified instantly.

**Author's note:** Tidyings are exactly the right description of what the "refactor" in Red-Green-Refactor was always meant to be. They make the refactor step concrete and actionable rather than vague. This is why [refactoring should never be a separate ticket](refactoring.md#authors-position-refactoring-is-building-not-a-separate-activity) — tidyings are small enough to do in every cycle, and they compound.

### Separate Structure from Behavior
Beck insists on separate commits/PRs for tidyings and behavior changes. This mirrors TDD's discipline of never changing structure and behavior in the same step. In the TDD cycle:

- Green -> Refactor is a structure change (tests still pass)
- Refactor -> Red is a behavior change (new failing test)

## Managing Tidyings

### Batch Size
Keep tidying batches small. Costs that rise with batch size: merge collisions, accidental behavior changes, speculative tidying. If review overhead forces large batches, reduce review cost (e.g., skip review for tidying-only PRs in high-trust teams).

### Rhythm
Tidying is a minutes-to-an-hour activity. More than an hour suggests scope creep. Behavior changes cluster (80% in 20% of files), and tidyings cluster in exactly those hot spots — so tidying effort naturally concentrates where it matters most.

## Economic Foundation

Beck frames tidying in terms of two competing economic forces:

- **Time value of money** — earn sooner, spend later (favors tidy after)
- **Optionality** — structure creates options; options are more valuable in uncertain environments (favors tidy first)

When `cost(tidying) + cost(change after) < cost(change without tidying)`, always tidy first. When the inequality is reversed, the decision requires judgment about future option value. See [Coupling and Cohesion](coupling-and-cohesion.md) for how coupling drives the cost of software.

## Related Pages

- [Refactoring](refactoring.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Simple Design](simple-design.md)
- [Coupling and Cohesion](coupling-and-cohesion.md)
- [Kent Beck](../entities/kent-beck.md)
- [Tidy First? (Beck)](../sources/tidy-first-kent-beck.md)
- [Refactoring (Fowler)](../sources/refactoring-martin-fowler.md)
