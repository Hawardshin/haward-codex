# Open-Source Harness Application Review For Presentation-Agent

## Summary

The right immediate move for `presentation-agent` is not installing a large agent benchmark. It is a small quality harness that repeatedly checks `deck-spec`, generated HTML decks, and PPTX outputs. External harnesses should be adopted in this order:

1. Internal Python static quality harness: immediate.
2. Playwright HTML render smoke tests: after installation audit.
3. `@axe-core/playwright` accessibility checks: together with Playwright.
4. Playwright screenshot regression: after rendering environment rules.
5. promptfoo/DeepEval/Inspect AI: after prompt-driven generation stabilizes.

## Fit With Current Structure

- `html_deck.py` and unit tests already validate the generation path.
- `deck-spec` stores script beats, speaker notes, and evidence sources, so static quality checks can add real value.
- HTML output must work in a browser, so Playwright is a natural fit.
- PPTX output currently uses the artifact-tool path, so structure/text/notes preservation is more practical than pixel-faithful checks for now.

## Recommended Application Structure

### Step 1: No-Install Static Harness

- `presentation-agent/src/presentation_agent/quality_harness.py`
- `presentation-agent/tests/test_quality_harness.py`
- Checks:
  - required metadata and slide fields
  - `script_beat`, `speaker_notes`, and `evidence_sources`
  - slide count and layout diversity
  - title length and body density
  - remote assets and unknown-license assets
  - likely ungrounded factual claims

### Step 2: Browser Smoke

- Candidate: Playwright
- Checks:
  - generated HTML opens at desktop and mobile-like viewports
  - slides are not blank
  - keyboard navigation and progress work
  - print stylesheet and presenter notes exist

### Step 3: Accessibility

- Candidate: `@axe-core/playwright`
- Checks:
  - automatically detectable contrast, label, duplicate ID, and aria violations
  - manual or rubric review remains necessary for presentation rhythm, emotional arc, and persuasion

### Step 4: Visual Regression

- Candidate: Playwright screenshot comparisons
- Prerequisites:
  - fixed OS/browser/font/viewport
  - baseline update approval rules
  - dynamic element hide/normalize policy
  - CI or equivalent local environment

### Step 5: LLM/Prompt Regression

- Candidates: promptfoo, DeepEval, Inspect AI, OpenAI Evals pattern
- Adoption timing:
  - after presentation brief input and `deck-spec` output contracts stabilize
  - after model-output comparison becomes necessary
  - after cost, API-key, and privacy policies are settled

## Candidate Status

Detailed candidates and adoption gates are recorded in `presentation-agent/configs/evaluation/harness-candidates.json`.

## Evidence Sources

- Inspect AI: https://inspect.aisi.org.uk/
- OpenAI Evals cookbook: https://developers.openai.com/cookbook/examples/evaluation/getting_started_with_openai_evals
- promptfoo: https://github.com/promptfoo/promptfoo
- DeepEval: https://github.com/confident-ai/deepeval
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- AgentLab: https://github.com/ServiceNow/AgentLab
- PPTAgent: https://arxiv.org/abs/2501.03936
- SlideAudit: https://arxiv.org/abs/2508.03630
- PresentBench: https://arxiv.org/abs/2603.07244
