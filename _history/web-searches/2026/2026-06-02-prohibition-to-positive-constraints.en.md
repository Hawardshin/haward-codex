# Web Search Record: Prohibition-To-Positive Constraints

## Search Purpose

Before turning the user's statement, “AI does not understand prohibitions,” into a durable platform rule, I checked high-authority references about negative instructions, negation, and LLM prompt design.

## Queries

- `LLM prompt engineering negative instructions positive instructions avoid prohibitions official guidance`
- `language models negation struggle instruction following negative constraints paper`
- `prompt engineering specify what to do instead of what not to do LLM safety guidelines`
- `AI agents guardrails positive constraints allowlist denylist prompt engineering`
- `OpenAI prompt engineering instructions say what to do instead of what not to do`
- `OpenAI prompt engineering clear specific instructions constraints examples official`
- `Anthropic prompt engineering be clear direct examples negative instructions official`
- `Google prompt design best practices clear instructions examples official LLM`
- `LLMs difficulty with negation in prompts negative instructions study`
- `Large language models negation understanding paper`
- `prompt engineering use positive instructions instead of negative constraints LLM official`

## Key Sources Checked

| Source | URL | Why It Was Used |
| --- | --- | --- |
| OpenAI Help - How to prompt ChatGPT | https://help.openai.com/en/articles/6654000-how-to-prompt-chatgpt | Checked official guidance that prompts should state what to do, not only what not to do. |
| OpenAI Academy - Understanding prompt engineering | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/articles/understanding-prompt-engineering | Checked official guidance around clear instructions, context, and examples. |
| OpenAI Cookbook - GPT-4.1 prompting guide | https://cookbook.openai.com/examples/gpt4-1_prompting_guide | Checked current official guidance on explicit instructions and persistence for agentic workflows. |
| arXiv - This is not a Dataset: A Large Negation Benchmark to Challenge Large Language Models | https://arxiv.org/abs/2310.15941 | Checked research evidence that LLMs can struggle with negation. |
| ACL Anthology - Language models are not naysayers | https://aclanthology.org/2023.starsem-1.10/ | Checked benchmark analysis of language model limitations around negation. |

## Weak Sources Ignored

- Unattributed prompt-tip articles, personal blog posts without evidence, and pure social-media claims were not used as policy evidence.
- Community advice can be a discovery signal, but official documentation and papers were sufficient for this change.

## Plan Impact

- The user's phrase was converted into a cautious operating rule: prohibition-heavy instructions are fragile controls, so the platform rewrites them into positive behavior contracts and structural verification gates.
- Added `prohibition_rewrite_contract` to `ai-usage-gap-profile.json`.
- Added the philosophy principle “Prohibition Is Not A Behavior Goal” and connected it through philosophy traceability.
- Updated the workflow and prompt so prohibition-heavy input becomes positive target behavior, allowed actions, replacement action, examples, and verification/enforcement gates.

## Remaining Uncertainty

- It would be too broad to claim that every model always fails every prohibition. The durable rule is narrower: do not rely on prohibition-only instructions as stable behavior control.
- Model behavior differs by model and task, so high-risk domains need schema, allowlists, evaluators, tests, and permission gates rather than prompt wording alone.
