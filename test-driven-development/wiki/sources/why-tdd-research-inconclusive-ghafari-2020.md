---
title: "Why Research on Test-Driven Development is Inconclusive — Ghafari et al. 2020"
type: source
tags: [empirical-research, meta-analysis, methodology, literature-review, tdd, esem]
created: 2026-04-20
updated: 2026-04-20
sources: ["raw/Why Research on TDD is Inconclusive - Ghafari 2020.md"]
---

ESEM 2020 meta-analysis identifying five categories of factors that make TDD research results contradictory and inconclusive: TDD definition, participants, task, type of project, and comparison baseline.

## Citation

Ghafari, M., Gross, T., Fucci, D., & Felderer, M. (2020). Why Research on Test-Driven Development is Inconclusive? In _ESEM '20: ACM/IEEE International Symposium on Empirical Software Engineering and Measurement_, Bari, Italy. ACM.

## Motivation

Despite two decades of TDD research, results are contradictory. Some studies show quality improvement, others show none. Some show productivity gains, others show losses. This paper examines *why* the studies disagree rather than trying to resolve the disagreement.

## Methodology

Three-step literature study:
1. **Secondary studies:** Analyzed nine systematic reviews and meta-analyses on TDD (Karac & Turhan 2018, Bissi et al. 2016, Munir et al. 2014, Rafique & Misic 2013, Causevic et al. 2011, Shull et al. 2010, Turhan et al. 2010, Kollanus 2010, Siniaalto 2006)
2. **Primary studies (2009-2017):** Backward snowballing from secondary studies; iterative analysis with saturation criterion; 10 primary studies analyzed in depth
3. **Recent studies (2018-2020):** Manual search of top SE venues; 10 additional papers

## The Five Categories of Factors

### 1. TDD Definition
**Problem:** There is no commonly shared definition of TDD. Most studies reduce TDD to "writing tests before production code" and neglect other characteristics.

Key observations:
- Two common styles: classical TDD (no upfront design, tests drive everything) vs. design-aware TDD (design known before development)
- Refactoring is supposedly key to TDD, but some studies measure it explicitly while others ignore it entirely
- Beller et al. (2019) observed 2,443 developers over 2.5 years: only **2.2% of test execution sessions** contained strict TDD patterns
- Borle et al. (2018): TDD practiced in only **0.8% of 256,572 GitHub projects** with test files

### 2. Participants
**Problem:** Study participants (both students and professionals) typically have very little TDD experience.

| Experience Level | Studies |
|-----------------|---------|
| Less than 1 week | Tosun et al., Fucci et al. 2017, Thomson et al., Santos et al. 2018, Tosun et al. 2019 |
| 1 week to 6 months | Fucci et al. 2018, Kazerouni et al., Romano et al., Scanniello et al., Dogsa & Batic, Fucci & Turhan, Karac et al. |
| 6 months to 1 year | Pancur & Ciglaric |
| More than 1 year | Buchan et al. |

Industrial studies typically max out at ~20 participants; academic studies reach 40+. Santos et al. (2018) found that **larger experience with unit testing correlates with better ITL performance** relative to TDD -- suggesting the comparison is confounded by testing skill, not TDD skill per se.

### 3. Task Selection
**Problem:** Most studies use synthetic coding katas, not real-world tasks.

- Synthetic tasks dominate even in industrial experiments
- Task granularity and complexity affect outcomes (Karac et al. 2019: more granular task descriptions improve TDD quality outcomes for novices)
- TDD is often studied only for code generation; how TDD performs during **bug fixing or large-scale refactoring** is barely explored
- Marchenko et al. (2009): a team using TDD for 3 years at Nokia reported TDD was "not suitable for bug fixing, especially for bugs that are difficult to reproduce"

### 4. Type of Project
**Problem:** Research overwhelmingly focuses on greenfield (new) projects, not brownfield (existing codebase) projects.

- Of the studies analyzed, only Buchan et al. and Scanniello et al. involved brownfield projects
- This is problematic because most professional development work involves modifying existing code
- TDD's applicability in legacy systems depends on test suite availability and software testability
- Generalizing greenfield results to brownfield contexts "may not be valid"

### 5. Comparison Baseline
**Problem:** What TDD is compared against varies wildly and determines results.

| Comparison | Studies |
|-----------|---------|
| Iterative Test Last (ITL) | Tosun et al., Pancur & Ciglaric, Kazerouni et al., Fucci et al. 2017, Santos et al., Tosun et al. 2019 |
| Test Last (unspecified) | Dogsa & Batic, Fucci & Turhan, Bannerman & Martin, Fucci et al. 2017 |
| "Your way" (no guideline) | Fucci et al. 2018, Thomson et al., Romano et al., Santos et al. 2018, Beller et al., Buchan et al., Scanniello et al., Borle et al. |
| TDD vs. TDD (different settings) | Karac et al. |

A critical insight: **much of TDD's apparent superiority in older studies comes from comparison with coarse-grained waterfall processes**, not with fine-grained iterative alternatives. Pancur & Ciglaric (2011) controlled for granularity and found no sequencing effect -- supporting [Fucci et al.'s](dissection-of-tdd-fucci-2017.md) findings.

## Outcomes Under Study

The paper notes that TDD research examines:
- **External code quality:** functional correctness, requirements coverage (user stories implemented)
- **Internal code quality:** coupling, cohesion, complexity -- mixed results across studies
- **Test quality:** mutation scores, code coverage -- Tosun et al. (2018) found TDD tests have higher mutation score and branch coverage than ITL tests
- **Productivity:** code generation speed, effort to fix bugs

A key gap: research deals with **short-term impact** rather than long-term benefits and drawbacks. Test suites can grow faster than production code (Sundelin et al. 2018, studying a financial system over 8 years), but test maintenance costs are barely studied.

## Implications

### For Practitioners
- Use the five factors as a checklist when evaluating TDD research for decision-making
- Be aware that most studies use novice TDD practitioners and synthetic tasks
- The benefits observed in studies may not transfer to your specific context (brownfield, bug-fixing, different team experience)

### For Researchers
- Design studies with TDD-proficient participants, not novices
- Compare TDD against fine-grained iterative alternatives (ITL), not waterfall
- Study brownfield projects and maintenance scenarios
- Investigate long-term effects, including test suite management costs
- Be explicit about which TDD definition is being used

## Notable Observation

The paper notes that **major testing venues have lost interest in TDD** -- no papers at ICST, ISSTA, ICSE, or FSE in recent years, and no submissions to STVR between 2013 and 2020. The authors call for a "renaissance" of TDD research addressing the identified methodological gaps.

## Significance for the Wiki

This paper is essential reading for anyone citing TDD research. It explains *why* the evidence is contradictory rather than adding another data point. The five factors provide a framework for critically evaluating any TDD study. When the wiki states "research shows X about TDD," this paper reminds us to ask: which definition? which participants? which tasks? which comparison?

## Related Pages

- [[tdd-empirical-evidence]] -- synthesis of what research says about TDD effectiveness
- [[tdd-process-granularity]] -- the granularity factor is central to why results vary
- [[tdd-quality-improvement-nagappan-2008]] -- industrial case study (subject to several factors identified here)
- [[dissection-of-tdd-fucci-2017]] -- co-authored by Fucci; directly addresses comparison and definition factors
- [[test-first]] -- the dimension that may be less important than assumed
- [[legacy-code]] -- brownfield gap identified in this paper
