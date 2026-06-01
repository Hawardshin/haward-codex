# Web Search Record: Open-Source Harness Application Review

## Request

Research popular open-source harnesses and determine what can be applied to the current presentation agent and platform.

## Work Mode

`standard`

## Search Date

2026-06-01

## Search Queries

- `2026 open source AI agent evaluation harness Inspect AI promptfoo DeepEval OpenAI Evals GitHub official`
- `open source browser agent benchmark harness BrowserGym WebArena OSWorld GitHub official`
- `open source visual regression accessibility testing harness Playwright axe-core Storybook Chromatic official`
- `presentation slide evaluation benchmark PPTAgent SlideAudit PPTArena arXiv GitHub`
- `Inspect AI official evaluation framework open source GitHub UK AI Safety Institute`
- `OpenAI Evals GitHub official eval framework`
- `Playwright official end-to-end testing screenshots visual comparisons`
- `axe-core official GitHub accessibility testing engine Playwright`

## Key Sources Checked

- Inspect AI official docs: https://inspect.aisi.org.uk/
- Inspect AI GitHub: https://github.com/UKGovernmentBEIS/inspect_ai
- OpenAI Evals cookbook: https://developers.openai.com/cookbook/examples/evaluation/getting_started_with_openai_evals
- promptfoo GitHub: https://github.com/promptfoo/promptfoo
- DeepEval GitHub: https://github.com/confident-ai/deepeval
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- AgentLab GitHub: https://github.com/ServiceNow/AgentLab
- PPTAgent: https://arxiv.org/abs/2501.03936
- SlideAudit: https://arxiv.org/abs/2508.03630
- PresentBench: https://arxiv.org/abs/2603.07244

## Ignored Or Lower-Weighted Sources

- Reddit posts and SEO comparison articles were used only as adoption or discovery signals, not as factual proof.
- Chromatic is useful, but it is a SaaS-oriented option and is not the best first project-local OSS harness.
- BrowserGym/WebArena/OSWorld are meaningful browser-agent benchmarks but have low direct fit for current deck-generation quality checks.

## Judgment

- A local no-install `deck-spec` quality harness is a better first step than a new external install.
- Playwright is the most direct candidate for HTML deck validation, and axe-core fits accessibility scans.
- Playwright screenshot regression is useful but should wait for fixed OS/browser/font rules.
- promptfoo, DeepEval, and Inspect AI should wait until presentation script/design prompts become repeatable datasets.
- PPTAgent, SlideAudit, and PresentBench are best absorbed as rubric and taxonomy references for now.

## Plan Impact

- Added `presentation-agent/configs/evaluation/harness-candidates.json` to manage candidates, gates, and priorities.
- Added `REQ-PA-014` for presentation quality harness requirements.
- Next implementation candidate is `quality_harness.py` plus `test_quality_harness.py`.

## Uncertainty

- Recent papers and benchmarks need separate checks for code release and maintenance status.
- Visual regression should stay nonblocking until CI or equivalent rendering environment is stable.
