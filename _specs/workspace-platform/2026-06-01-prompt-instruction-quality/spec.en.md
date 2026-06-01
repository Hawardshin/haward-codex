# Spec: Prompt And Instruction Quality Gate

## Requirement

- `REQ-WS-043`

## Problem

LLMs are probabilistic output generators sensitive to prompt and context. If vague, biased, or conclusion-seeking instructions are executed as-is, they can produce fluent but distorted or hard-to-check results.

## Scope

- Connect question/instruction quality rules to persistent instructions, operating model, prompt router, workflow, prompt, and memory bootstrap
- Use `ai-usage-gap-profile.json` bad instruction patterns and instruction rewrite contract as the shared standard
- Record requirements, web search, research notes, plan, evaluation, and history

## Non-Scope

- Dedicated prompt scoring UI
- A tool that directly measures internal LLM probability distributions
- A workflow that stops every user instruction to ask questions

## Acceptance Criteria

- The rule detects and rewrites vagueness, bias, leading framing, missing output contracts, and deterministic truth-machine assumptions before execution.
- The rewritten task brief contains goal, context, constraints, output format, success criteria, counterevidence, and verification path.
- Future sessions can discover the rule from operational docs and configs.
- External evidence and internal change evidence are linked from traceability and evaluation.
