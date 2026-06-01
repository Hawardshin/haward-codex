# Presentation Quality Harness Workflow

## Purpose

Keep repeatable quality checks for `deck-spec`, HTML deck, and PPTX outputs so presentation-agent results are not judged only by manual inspection.

## Default Sequence

1. Run static `deck-spec` checks first.
   - Check required metadata and slide fields.
   - Check missing `script_beat`, `speaker_notes`, and `evidence_sources`.
   - Check slide count, layout distribution, title length, text density, and remote or unknown-license assets.
2. Run existing Python unit tests and catalog validation.
3. Regenerate the HTML deck and statically check that it does not depend on remote assets.
4. After Playwright adoption, verify desktop/mobile-like viewports, keyboard navigation, nonblank slides, and print structure.
5. After axe-core adoption, scan for automatically detectable accessibility violations, while keeping manual review for real presentation quality.
6. Promote visual regression to blocking only after browser, OS, font, viewport, and snapshot update rules are fixed.
7. Use LLM and agent evaluation harnesses only after prompt input/output contracts are stable enough for prompt drift and evidence-grounding regression tests.

## Adoption Priority

- Priority 1: Python no-install `deck-spec` quality harness.
- Priority 2: Playwright HTML render smoke tests.
- Priority 3: `@axe-core/playwright` accessibility scans.
- Priority 4: Playwright screenshot baselines.
- Priority 5: LLM/agent evaluation harnesses such as promptfoo, DeepEval, and Inspect AI.

## Deferral Criteria

- Defer a harness if it adds dependencies without matching current outputs.
- Keep visual regression advisory if font or OS differences create noisy failures.
- Do not use LLM judge output as a presentation quality standard if it only expresses ungrounded preference.
- Treat research benchmarks as references until translated into local rubrics.

## Related Settings

- `presentation-agent/configs/evaluation/harness-candidates.json`
- `presentation-agent/docs/research/2026-06-01-open-source-harness-review.en.md`
