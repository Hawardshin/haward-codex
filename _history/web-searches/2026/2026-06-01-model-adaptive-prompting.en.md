# Web Search Record: Model-Adaptive Prompting

## Search Purpose

Before turning the user's instruction into a durable operating rule, I checked evidence for multi-attempt prompting, iterative improvement, and model-specific prompting differences.

## Queries

- `Self-Consistency Improves Chain of Thought Reasoning in Language Models arxiv 2203.11171`
- `Self-Refine Iterative Refinement with Self-Feedback arxiv 2303.17651`
- `Reflexion Language Agents with Verbal Reinforcement Learning arxiv 2303.11366`
- `OpenAI reasoning models prompting guide official`
- `site:platform.openai.com/docs/guides reasoning prompting OpenAI official`
- `site:learn.microsoft.com Azure OpenAI prompt engineering techniques not recommended reasoning models o1`

## Sources Checked

| Source | Type | Checked | Applied |
| --- | --- | --- | --- |
| https://arxiv.org/abs/2203.11171 | paper | Self-consistency samples multiple reasoning paths and selects the consistent answer, reporting gains on several reasoning benchmarks. | Used as evidence for multi-sample comparison, not as factual proof. |
| https://arxiv.org/abs/2303.17651 | paper | Self-Refine uses initial output, self-feedback, and refinement loops, reporting better results than one-step generation across evaluated tasks. | Used as support for draft-critique-revise loops. |
| https://arxiv.org/abs/2303.11366 | paper | Reflexion uses linguistic feedback and episodic memory to improve subsequent trials. | Used as support for feedback-informed retry. |
| https://developers.openai.com/api/docs/guides/reasoning-best-practices | official docs | OpenAI says reasoning and GPT model families behave differently and may need different prompts. | Used to scope duplicate calls differently for strong reasoning models. |
| https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering | official docs | Microsoft says models can behave differently and some techniques are not recommended for reasoning models. | Used to support model-specific strategy branching. |

## Weak Sources Ignored

- Reddit, Hacker News, and summary blogs were treated only as adoption/discovery signals, not as primary evidence for the durable rule.
- I did not find evidence that "two calls are always better"; the evidence is task-, model-, and method-dependent.

## Plan Impact

- Encode `two-pass` as a candidate default for weak or uncertain models and high-variance tasks, not as a universal rule.
- Treat matching outputs as agreement signals, not proof.
- For strong reasoning models, prioritize goal/context/constraints/verification over duplicate calls.

## Remaining Uncertainty

- The effect size of two-pass prompting will vary by vendor, model, task, decoding settings, and evaluator quality.
- Future automation should connect model metadata, cost/latency settings, and evaluator results before applying the policy automatically.
