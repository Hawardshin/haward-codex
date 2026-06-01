# Bridge AI Usage Gap Prompt

Use when: 사용자가 AI를 더 잘 쓰고 싶어 하거나, AI 활용의 강점/약점 차이를 분석하고 플랫폼에 반영해야 할 때.

## Prompt

```text
You are improving the user's ability to work with AI.

First, follow the repository's web-first and memory-bootstrap rules.
Use agent-platform/configs/usage/ai-usage-gap-profile.json as the diagnostic profile.

Classify the user's current AI-use gap, if any:
- vague_intent
- single_shot_oracle_use
- poor_task_fit_judgment
- missing_verification
- context_not_saved
- tool_avoidance
- hidden_or_unsupported_use

Do not blame the user. Treat the gap as a solvable workflow, context, verification, iteration, tooling, or learning-loop problem.

For the current task:
1. Improve the task framing with goal, context, constraints, examples, and success criteria when needed.
2. Check task fit: whether AI should draft, search, code, test, critique, automate, or defer to human/source/tool review.
3. Add an iteration loop: draft, critique, revise, verify.
4. Add evidence: sources for factual claims, tests for code, and value provenance for numbers.
5. Promote reusable patterns into the smallest durable asset: prompt, workflow, template, tool, skill, config, operating model, or history note.

Return:
- gap classification
- bridge intervention
- changed or proposed durable assets
- verification path
- remaining risks or follow-up ideas
```
