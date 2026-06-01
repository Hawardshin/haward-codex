# Web Search Record: Prompt And Instruction Quality Gate

## User Request Summary

The user stated that effective AI use depends on asking and instructing well, and that biased or poor instructions are common failure modes. The user framed LLMs as probabilistic machines where better questions produce better answers, and asked to reflect that principle in the platform.

## Search Queries

- `OpenAI prompt engineering best practices clear instructions context examples`
- `Google prompt engineering guide clear specific instructions examples evaluation`
- `Anthropic prompt engineering clear instructions examples context guide`
- `Microsoft Azure OpenAI prompt engineering clear specific instructions official`
- `NIST AI Risk Management Framework Generative AI Profile bias prompt risks`
- `NIST generative AI profile bias prompt risks hallucination`
- `language models predict next token probabilistic machine Stanford CS224N language modeling`

## Sources Checked

| Source | Type | What Was Checked | Impact |
| --- | --- | --- | --- |
| [OpenAI Help: Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) | official | Separating instructions from context and giving clear formats | Instruction quality and output contract rules in `ai-usage-gap-profile.json` |
| [OpenAI Academy: Prompting fundamentals](https://openai.com/academy/prompting/) | official | Good prompts clarify task, purpose, and desired result through iteration | Operating model framing that questions condition the answer distribution |
| [Anthropic: Prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct) | official | Instructions should be specific enough for a minimally informed colleague to follow | Task brief rewrite criteria |
| [Microsoft Learn: Prompt engineering techniques](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering) | official | Few-shot examples, cues, clear syntax, task decomposition, validation, grounding data, recency bias | Output contracts, phase separation, verification paths |
| [NIST AI RMF Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | official | Bias, stereotyping, and harmful output should be measured and documented | Bias neutralization and counterevidence requirements |
| [NIST: Towards a Standard for Identifying and Managing Bias in AI](https://www.nist.gov/publications/towards-standard-identifying-and-managing-bias-artificial-intelligence) | official | AI bias is a risk to identify and manage | Records bias as a managed risk, not a mere opinion |
| [Stanford CS224N Language Modeling lecture](https://cs224n.stanford.edu/slides/cs224n-spr2024-lecture05-rnnlm.pdf) | course | Language modeling predicts a probability distribution over the next word | Probabilistic prompt-conditioned LLM mental model |

## Weak Sources Ignored

- SEO prompt-template lists, source-free "magic phrase" articles, and simple Reddit/blog tips were treated as weaker than official, educational, and standards-oriented sources.
- Community content can help discover user pain points, but it was not used as factual proof for this requirement.

## Plan Impact

- Add `REQ-WS-043` as an explicit question/instruction quality requirement.
- Use bad instruction patterns and the instruction rewrite contract in `ai-usage-gap-profile.json` as a pre-execution gate.
- Rewrite biased or leading instructions into neutral task briefs with counterevidence and verification requirements.
- Treat fluent LLM output as not proving factual truth; attach source/test/review grounding.

## Uncertainty

- Model-specific prompt sensitivity and best practices change, so future model-specific optimization should recheck current official docs.
- "LLMs are probabilistic" is a practical operating mental model here; specific model/system implementation details can vary.
