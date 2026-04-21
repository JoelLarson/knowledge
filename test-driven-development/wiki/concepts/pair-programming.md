---
title: Pair Programming
type: concept
tags: [xp, practice, collaboration]
created: 2026-04-20
updated: 2026-04-20
sources: [raw/tdd-by-example-kent-beck-v2.md]
---

Pair programming is the XP practice of two developers working together at one workstation. One person (the driver) types while the other (the navigator) reviews, thinks ahead, and provides feedback. It connects to TDD through ping-pong pairing, where one developer writes the failing test and the other makes it pass.

## Roles

### Driver
- Controls the keyboard and mouse
- Focuses on the tactical, immediate code being written
- Thinks about syntax, implementation details, current line of code

### Navigator
- Observes, reviews, and thinks strategically
- Considers the bigger picture: design, upcoming obstacles, alternative approaches
- Catches typos and logical errors in real-time
- Keeps track of the overall goal and next steps

Roles switch frequently — every few minutes to every hour depending on the pair's rhythm.

## Ping-Pong Pairing (TDD Connection)

The most natural pairing style for TDD practitioners:

1. **Developer A** writes a failing test (Red)
2. **Developer B** makes it pass (Green) and refactors
3. **Developer B** writes the next failing test (Red)
4. **Developer A** makes it pass (Green) and refactors
5. Repeat

This creates a game-like dynamic where each developer challenges the other with tests. It ensures both partners are engaged and that the [Red-Green-Refactor](red-green-refactor.md) discipline is maintained. [Kent Beck](../entities/kent-beck.md) wrote *TDD by Example* imagining pair programming sessions.

## Benefits

- **Real-time code review** — defects caught immediately rather than in async review
- **Knowledge sharing** — no single point of failure; both developers understand the code
- **Focus and discipline** — social pressure prevents distractions and shortcuts
- **Better design** — explaining decisions to a partner forces clearer thinking
- **Onboarding** — new team members learn codebase and practices simultaneously

## Mob/Ensemble Programming

An evolution of pair programming where the entire team works together on one task:

- One driver, multiple navigators
- Driver rotates on a timer (typically 5-15 minutes)
- All decisions made collectively
- Especially effective for complex design decisions, onboarding, and establishing team standards

The same TDD discipline applies: the mob writes a failing test together, then makes it pass together.

## Common Objections and Responses

| Objection | Response |
|-----------|----------|
| "Two people doing one person's work" | Research shows pairs produce fewer defects; total cost (including rework) is often lower |
| "I work better alone" | Pairing is a skill that improves with practice; solo work has its place too |
| "Too exhausting for all day" | Agreed — most teams pair for focused sessions, not 8 hours |
| "Not suitable for all tasks" | Correct — mechanical tasks, research spikes, and personal exploration benefit less |

## Pairing and TDD Reinforcement

Pair programming reinforces TDD discipline because:
- It's harder to skip tests when someone is watching
- The navigator catches when the driver takes too large a step
- Ping-pong pairing makes the red-green-refactor cycle explicit and shared
- Disagreements about design surface immediately rather than in code review

## Related Pages

- [Extreme Programming](extreme-programming.md)
- [Red-Green-Refactor](red-green-refactor.md)
- [Kent Beck](../entities/kent-beck.md)
- [TDD by Example (Beck)](../sources/tdd-by-example-kent-beck.md)
- [Simple Design](simple-design.md)
