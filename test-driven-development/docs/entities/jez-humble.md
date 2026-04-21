---
title: Jez Humble
type: entity
tags: [jez-humble, continuous-delivery, devops, dora, accelerate]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Accelerate The Science of Lean Software and DevOps Building and Scaling High Performing Technology Organizations by Nicole Forsgren Jez Humble Gene Kim.md"]
---

Jez Humble is co-author of _Continuous Delivery_ (with [[dave-farley]]), _Accelerate_ (with [[nicole-forsgren]] and Gene Kim), _Lean Enterprise_, and _The DevOps Handbook_. A key researcher behind the DORA program that provided statistical evidence for the practices underlying DevOps and continuous delivery.

## Key Contributions

- **Continuous Delivery** (2010, with [[dave-farley]]) -- the foundational text on deployment pipelines, automated testing, and always-releasable software. Won the Jolt Award.
- **DORA Research** (2014-2017) -- co-led the four-year research program that surveyed 23,000+ respondents to identify the 24 capabilities that drive software delivery performance. Published as the annual _State of DevOps Report_ and synthesized in [[accelerate-forsgren-humble-kim]].
- **The DevOps Handbook** (2016, with Gene Kim, Patrick Debois, John Willis) -- practical companion to _The Phoenix Project_.
- **Lean Enterprise** -- applying Lean and continuous delivery principles to large organizations.
- **Teaching** -- instructor at UC Berkeley, researching high-performing teams.

## Career

- First job after college was at a startup in London (2000)
- Spent a decade at ThoughtWorks (2005-2015) as infrastructure specialist, developer, and product manager
- Co-founded DevOps Research and Assessment (DORA) LLC
- DORA was later acquired by Google

## Connection to TDD

Humble's work provides the statistical backbone for why TDD matters at the organizational level:

- **Test automation** is one of the 24 key capabilities. Accelerate explicitly cites TDD as the reason developers should own automated tests: it forces more testable designs.
- **[[continuous-integration]]** -- a core CI principle requires automated tests on every commit, which TDD naturally produces.
- **[[continuous-delivery]]** -- Humble's central thesis is that always-releasable software requires comprehensive automated testing. TDD is the practice that produces these tests as a side effect of design.
- The DORA research proved that speed and stability are not in tension ([[dora-metrics]]), validating what TDD practitioners experience: fast feedback loops and comprehensive tests enable both rapid delivery and low failure rates.

## Relationship to Dave Farley

Humble and [[dave-farley]] co-authored _Continuous Delivery_ (2010), which established deployment pipelines and the principle that software should always be in a releasable state. Farley subsequently wrote _Modern Software Engineering_ and focused on TDD as a design discipline. The Accelerate research provided rigorous statistical evidence for the practices Farley and Humble had advocated based on experience.

## Related Pages

- [[accelerate-forsgren-humble-kim]]
- [[dora-metrics]]
- [[continuous-delivery]]
- [[continuous-integration]]
- [[test-automation-at-scale]]
- [[dave-farley]]
- [[martin-fowler]]
- [[extreme-programming]]
