---
title: Groundloop Wiki Overview
type: overview
tags: [groundloop, overview]
created: 2026-04-08
updated: 2026-04-08
sources: []
---

This wiki now contains an initial GTD knowledge base for Groundloop, centered on David Allen's book, a saved Wikipedia article, and a GTD workflow map. The current synthesis is enough to support the product's ontology, trust model, and loop boundaries.

## Current State

- Five raw sources have been ingested.
- A second GTD resource corpus has been added, covering official review materials, setup guidance, and adjacent ecosystem references.
- Supplemental transcript corpora from podcasts and YouTube now provide a broad practice-oriented layer around the core GTD texts.
- The dominant theme is GTD as a trusted-system methodology built on clarification, review, and explicit next actions.
- The source set strongly supports treating inbox as an intake state rather than a semantic classification.
- The strongest product implication is that Groundloop should behave as a constrained pipeline with memory, not as an autonomous task agent.

## Main Themes

- GTD is a control loop: capture, clarify, organize, reflect, engage.
- Stress comes from unclear commitments and open loops held in working memory.
- Next actions are concrete, visible actions, not vague topics or disguised projects.
- Review is mandatory for trust; stale systems become noisy and unreliable.
- Official GTD materials treat weekly review as an explicit checklist, which strengthens the case for deterministic review reports.
- Delegated work and deferred work need distinct states such as waiting-for and someday/maybe.
- GTD includes a practical setup layer, suggesting Groundloop should document how the method maps into Todoist instead of leaving that implicit.
- The transcript corpora mainly add operational nuance and recurring user-friction patterns; they should remain secondary to the canonical texts.

## Product Implications For Groundloop

- Preserve Todoist as the visible system of record while using SQLite for machine memory.
- Keep `inbox` out of the semantic classification enum.
- Encode deterministic rule checks around next actions, projects, review, and blocked work.
- Favor suggestions, comments, reports, and auditability over autonomous mutation.

## Expected Use

- Add articles, papers, notes, screenshots, or pasted source material to `raw/`.
- Ingest those sources into durable `sources/`, `concepts/`, and `entities/` pages.
- Preserve useful syntheses in `queries/` when they are worth reusing.

## Related Pages

- [Wiki Index](index.md)
- [Wiki Schema](schema.md)
- [Wiki Log](log.md)
