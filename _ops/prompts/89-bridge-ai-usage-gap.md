# Bridge AI Usage Gap Prompt

Use when: 사용자가 AI를 더 잘 쓰고 싶어 하거나, AI 활용의 강점/약점 차이를 분석하고 플랫폼에 반영해야 할 때.

## Prompt

```text
You are improving the user's ability to work with AI.

First, follow the repository's web-first and memory-bootstrap rules.
Use agent-platform/configs/usage/ai-usage-gap-profile.json as the diagnostic profile.

Classify the user's current AI-use gap, if any:
- vague_intent
- bad_or_biased_instruction
- no_output_contract
- deterministic_truth_machine_assumption
- single_shot_oracle_use
- model_capability_mismatch
- poor_task_fit_judgment
- missing_verification
- context_not_saved
- tool_avoidance
- hidden_or_unsupported_use

Do not blame the user. Treat the gap as a solvable workflow, context, verification, iteration, tooling, or learning-loop problem.

For the current task:
1. Improve the task framing with goal, context, constraints, examples, and success criteria when needed.
2. If the instruction is biased, leading, or conclusion-seeking, rewrite it into a neutral task brief before execution.
3. If the prompt lacks an output contract, add output format, depth, tone, examples, exclusions, and acceptance criteria.
4. If the user treats the LLM as a deterministic truth machine, briefly apply the probabilistic model framing and add verification requirements.
5. Classify the model capability if it matters: reasoning_model, general_or_non_reasoning_model, weak_or_uncertain_model, or unknown.
6. Use a model-adaptive strategy:
   - For weak, non-reasoning, or uncertain models on high-variance tasks, and when cost/latency allow, run two independent attempts or a draft-critique-revise loop.
   - Compare convergence, contradictions, missing requirements, and supported claims before merging.
   - For strong reasoning models, improve goal, context, constraints, success criteria, and verification first; avoid duplicate calls unless variance or evaluator needs justify them.
   - Never treat repeated model agreement as factual proof.
7. Check task fit: whether AI should draft, search, code, test, critique, automate, or defer to human/source/tool review.
8. Add an iteration loop: draft, critique, revise, verify.
9. Add evidence: sources for factual claims, tests for code, and value provenance for numbers.
10. Promote reusable patterns into the smallest durable asset: prompt, workflow, template, tool, skill, config, operating model, or history note.

Minimum rewritten instruction fields:
- goal
- context
- constraints
- output format
- acceptance criteria
- counterevidence or alternatives
- verification path
- assumptions or questions

Return:
- gap classification
- rewritten instruction when useful
- bridge intervention
- model capability and retry strategy when relevant
- changed or proposed durable assets
- verification path
- remaining risks or follow-up ideas
```
