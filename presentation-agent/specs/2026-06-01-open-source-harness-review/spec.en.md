# Spec: Open-Source Harness Application Review

## Goal

Research open-source harness candidates and define the adoption order so `presentation-agent` can repeatedly validate presentation quality after generation.

## Requirements

- Add `REQ-PA-014` to the presentation-agent requirements.
- Separate harness candidates into immediate, near-term, and long-term/reference categories.
- Do not install new dependencies in this task.
- Record purpose, installation posture, adoption gates, and risks for each candidate.
- Preserve research results in paired Korean and English documents.

## Non-Goals

- Do not install Playwright, axe-core, promptfoo, DeepEval, or Inspect AI in this task.
- Do not download public benchmark datasets.
- Do not implement pixel-faithful PPTX validation in this task.

## Success Criteria

- Requirements, settings, research notes, workflow, web search record, plan, and traceability are saved.
- The next implementer can design `quality_harness.py` from a clear priority order.
