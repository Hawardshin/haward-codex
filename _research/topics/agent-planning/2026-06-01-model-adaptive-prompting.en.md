# Model-Adaptive Prompting Research Note

## Conclusion

For weak or non-reasoning models, relying on a single answer is often less robust than using two independent attempts, multi-sample comparison, or a draft-critique-revise loop. For strong reasoning models, duplicate calls should not be the first move; clear task framing, constraints, success criteria, and verification usually matter more.

## Evidence

- Self-consistency: sampling multiple reasoning paths and selecting a consistent answer improved results on several reasoning benchmarks, suggesting that a single greedy response can underuse model capability.
- Self-Refine: initial output, feedback, and refinement loops can outperform one-step generation on multiple evaluated tasks.
- Reflexion: agents can preserve feedback from prior trials as verbal memory and use it for better subsequent decisions.
- OpenAI reasoning best practices: reasoning and GPT model families behave differently and may require different prompts.
- Microsoft prompt engineering: model behavior can differ, and some prompt techniques are not recommended for reasoning models.

## Operating Rule

- `weak_or_uncertain_model`: decompose the task; when cost and latency allow, use two-pass or draft-critique-revise loops.
- `general_or_non_reasoning_model`: make examples, output contracts, and constraints explicit; use compare/merge loops for high-variance tasks.
- `reasoning_model`: improve goal, context, constraints, success criteria, and verification before repeating the same call.
- All profiles: repeated agreement is not proof; use sources, tests, tools, evaluators, or human judgment.

## Integration Points

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.en.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/instructions/persistent-instructions.en.md`

## Future Improvements

- Split model-specific cost/latency profiles into a separate config.
- Add an evaluator prompt or local tool that compares two-pass outputs automatically.
- Connect before/after quality, time, and cost to work timing and evaluator records.
