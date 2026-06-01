# Research Note: Question/Instruction Quality And LLM Mental Model

## Summary

Questions and instructions are core inputs that shape LLM output quality. Official prompt guidance commonly emphasizes clear instructions, context, output format, examples, task decomposition, and validation. Bias-oriented standards and profiles treat bias as a risk to manage, while language modeling educational material describes models as predicting probability distributions over next words/tokens.

## Reusable Principles

- Fix poor instructions before execution.
- A "good question" is input design with goal, context, constraints, output contract, and verification path, not just nicer wording.
- Rewrite biased or leading instructions by separating facts from preferences and requiring alternatives plus counterevidence.
- Fluent output is not proof; attach web/source/test/evaluator/human review grounding.

## Minimum Good Task Brief Fields

- goal
- context
- constraints
- output format
- acceptance criteria
- counterevidence or alternatives
- verification path
- assumptions or questions

## Sources

- OpenAI Help, prompt engineering best practices: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
- OpenAI Academy, prompting fundamentals: https://openai.com/academy/prompting/
- Anthropic prompting best practices: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct
- Microsoft Learn, prompt engineering techniques: https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering
- NIST AI RMF Generative AI Profile: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- NIST bias guidance: https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence
- Stanford CS224N language modeling: https://cs224n.stanford.edu/slides/cs224n-spr2024-lecture05-rnnlm.pdf

## Applied In

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/operating-models/ai-usage-gap-operating-model.en.md`
