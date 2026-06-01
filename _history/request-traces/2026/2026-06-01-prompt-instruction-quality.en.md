# Request-To-Outcome Trace: Prompt And Instruction Quality Gate

## Request

The user stated that people must ask and instruct well, biased or poor instructions are common failure modes, and LLMs are probabilistic systems where better questions produce better answers; the user asked to reflect that principle into the platform.

## Links

- User request: `UR-2026-06-01-032`
- Requirement: `REQ-WS-043`
- Spec: `_specs/workspace-platform/2026-06-01-prompt-instruction-quality/`
- Web search: `_history/web-searches/2026/2026-06-01-prompt-instruction-quality.en.md`
- Research note: `_research/topics/agent-planning/2026-06-01-prompt-instruction-quality.en.md`
- Evaluation: `_history/evaluations/2026/2026-06-01-prompt-instruction-quality.en.md`
- Timing record: `_history/work-timings/2026/2026-06-01-prompt-instruction-quality.json`

## Outcome

- Strengthened `ai-usage-gap-profile.json` as the source of truth for the question/instruction quality gate.
- Connected the pre-execution instruction rewrite rule to persistent instructions, operating model, workflow, prompt, router, index, and memory bootstrap.
- Documented that biased, leading, or output-contract-free instructions should be rewritten into neutral, checkable task briefs.

## Commit

- `b9349ed`
