# Open-Source Harness Review: Presentation-Agent Application Candidates

## Research Question

Which popular open-source evaluation or validation harnesses are worth applying to `presentation-agent` now or in the near future?

## Conclusion

The most useful immediate step is not a new install. It is a project-local, no-install `deck-spec` quality harness. The next candidates are Playwright for real browser checks of HTML decks, `@axe-core/playwright` for automated accessibility scans, then visual regression and LLM prompt regression harnesses.

## Key Sources And Judgment

| Source | Type | Checked Point | Application Judgment |
| --- | --- | --- | --- |
| Inspect AI | Official docs/repo | LLM evaluation framework from the UK AI Security Institute and Meridian Labs with datasets, solvers, scorers, agents, sandboxing, and web view. | Good structural reference if presentation generation becomes an agentic workflow. Defer install. |
| OpenAI Evals | Official cookbook/repo | Evals use dataset plus eval class/YAML patterns and can include model-graded templates. | Use as a dataset/eval-class pattern, not as an immediate dependency. |
| promptfoo | Official repo | Prompt, agent, and RAG evaluation with red teaming, CLI/CI flow, local runs, and MIT license. | Candidate for prompt regression once script/deck generation prompts stabilize. |
| DeepEval | Official repo | Pytest-like LLM app evaluation with hallucination, task completion, and answer relevancy metrics. | Fits Python workflows but API key and cost controls make it a later candidate. |
| Playwright | Official docs | Screenshot comparisons plus text/binary snapshots, with a warning that host OS/font/browser can affect output. | Strong candidate for HTML deck render smoke and navigation checks. Visual baselines only after environment rules. |
| Playwright + axe | Official docs | `@axe-core/playwright` can detect common accessibility issues such as contrast, labels, and duplicate IDs. | Candidate for HTML deck accessibility checks. Manual quality review remains necessary. |
| AgentLab/BrowserGym/WebArena/OSWorld | Official/repo | Browser and desktop agent benchmark structures with task and dependency management. | Useful later for browser-operating agents, not for current static deck generation. |
| PPTAgent/PPTEval | Paper | Treats presentation generation as reference analysis plus edit-based generation and evaluates Content, Design, and Coherence. | Useful for local rubric design. |
| SlideAudit | Paper | Provides a slide design flaw taxonomy and shows automated critique remains difficult. | Useful as a taxonomy and caution against over-trusting automated critique. |
| PresentBench | Paper | Uses fine-grained binary checklist items for slide generation evaluation. | Useful for presentation-specific acceptance criteria. |

## Application Priority

1. Add `quality_harness.py` to check required fields, speaker notes, evidence sources, layout coverage, text density, and remote asset guards in `deck-spec`.
2. After installation audit, adopt Playwright to open generated HTML and verify navigation, viewports, and nonblank slides.
3. Add axe-core with Playwright to catch automatically detectable accessibility violations.
4. Add screenshot baselines only after browser, OS, font, and viewport settings are fixed.
5. Use promptfoo or DeepEval for prompt drift only after presentation script/design prompts are stable.
6. Review Inspect AI when presentation-agent grows into a multi-tool or multi-agent evaluation scenario.

## Deferred Items

- Chromatic/Storybook fits better after a larger componentized UI exists.
- BrowserGym/WebArena/OSWorld are excessive for current HTML/PPT generation checks.
- Research benchmarks should be translated into local rubrics before becoming project acceptance criteria.

## Uncertainty

- GitHub stars, Reddit activity, and community signals are adoption signals, not correctness proof.
- Some 2026 slide benchmarks are recent and need separate checks for reproducibility, code release, and maintenance.
- Playwright screenshots can be sensitive to OS/font differences, so blocking visual checks without stable CI can create false positives.

## Suggested Next Work

- Implement `presentation-agent/src/presentation_agent/quality_harness.py` and `tests/test_quality_harness.py`.
- Add browser harnesses only after dependency audit, `package.json`, local commands, and rollback plan are prepared.
