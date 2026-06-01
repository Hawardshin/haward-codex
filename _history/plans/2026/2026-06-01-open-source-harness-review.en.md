# Plan: Open-Source Harness Application Review

## Purpose

Research popular open-source harnesses and decide how they should apply to `presentation-agent`.

## Selected Work Mode

`standard`

## Plan Evidence

- The request is research-centered, but it changes durable project requirements and application structure.
- The presentation agent already has `deck-spec`, HTML, and PPTX outputs, so harness candidates can be connected to project validation.
- No installation is required yet; settings, docs, requirements, and specs should come first.

## Execution Plan

1. Use web search to separate LLM/agent eval, browser/visual/accessibility, and presentation-specific benchmark sources.
2. Compare the candidates against the current `presentation-agent` structure.
3. Add `REQ-PA-014`.
4. Add `harness-candidates.json` for candidates, gates, and priorities.
5. Record research notes, workflow, spec, history, and evaluation.
6. Run validation that does not require new dependencies.

## Application Judgment

- Immediate: no-install `deck-spec` quality harness.
- Next: Playwright HTML smoke tests.
- Then: axe-core accessibility scans.
- Later: visual regression and promptfoo/DeepEval/Inspect AI.
- Reference: PPTAgent, SlideAudit, and PresentBench rubrics/taxonomies.
