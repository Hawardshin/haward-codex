# AI Usage Gap Operating Model

## Purpose

The difference between weak and strong AI use is treated as a repeatable work-system difference, not as a personal talent judgment. This platform does not stop at helping the user write better prompts; it turns effective AI-use patterns into requirements, specs, research, validation, tools, skills, and history.

## Core Observation

Weak AI use often shows these patterns:

- The goal and success criteria are unclear.
- The user does not distinguish where AI is useful from where it is risky.
- The first answer is either trusted blindly or abandoned immediately.
- Outputs are used without evidence, tests, sources, or contrary checks.
- Useful prompts and workflows are not saved, so each task starts over.
- Repeatable work is not promoted into tools or templates.
- AI use stays hidden, preventing project-level or organizational learning.

Strong AI users behave differently:

- They define purpose, audience, constraints, input material, and success criteria first.
- They use AI as an explorer, drafter, critic, transformer, and verification assistant rather than as an oracle.
- They split work into planning, evidence gathering, implementation, validation, and evaluation.
- They combine AI with web search, official docs, tests, local files, evaluators, and human judgment.
- They assume AI capability is uneven across tasks and changes over time.
- They promote repeated useful patterns into prompts, workflows, templates, tools, and skills.

## Bridging The Gap

1. Improve the request: add goal, context, constraints, examples, and success criteria.
2. Check task fit: decide whether AI should draft, search, code, test, critique, or defer to human judgment.
3. Avoid one-shot work: run short draft, critique, revise, and verify loops.
4. Attach evidence: sources for factual claims, tests for code, and unit/base/timeframe/method for numbers.
5. Save repeatable patterns: promote useful patterns into the smallest durable asset.

## Platform Integration

- Config: `agent-platform/configs/usage/ai-usage-gap-profile.json`
- Workflow: `_ops/workflows/59-bridge-ai-usage-gap.md`
- Prompt: `_ops/prompts/89-bridge-ai-usage-gap.md`
- Memory: warm anchor in `agent-platform/configs/memory/bootstrap-manifest.json`

## Operating Principles

- Do not blame the user. Treat gaps as literacy, context, verification, work-structure, tooling, or learning-loop gaps.
- Do not block unnecessarily on vague requests. For low-risk work, make reasonable assumptions and record them with verification paths.
- For high-risk or preference-sensitive ambiguity, use `clarification_needed`.
- Effective AI-use patterns should not remain in chat; they should become repository assets.
