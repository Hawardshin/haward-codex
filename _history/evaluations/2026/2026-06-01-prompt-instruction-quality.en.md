# Work Evaluation: Prompt And Instruction Quality Gate

## Conclusion

- Status: passed
- Work mode: `governance`
- Rework needed: none

## Result Against Initial Request

- The request was to reflect question/instruction quality, the risk of biased instructions, the probabilistic nature of LLMs, and the idea that better questions produce better answers into the platform.
- The result was reflected through `REQ-WS-043`, `ai-usage-gap-profile.json`, persistent instructions, operating model, workflow, prompt, router, memory bootstrap, specs, history, and evaluation artifacts.
- Vague, biased, leading, or output-contract-free instructions now have to be rewritten into neutral, checkable task briefs before execution.

## References Checked

- OpenAI, Anthropic, and Microsoft official prompt guidance
- NIST AI RMF Generative AI Profile and bias guidance
- Stanford CS224N language modeling materials
- Internal references: `agent-platform/configs/usage/ai-usage-gap-profile.json`, `_ops/workflows/59-bridge-ai-usage-gap.md`, `_ops/prompts/89-bridge-ai-usage-gap.md`

## Verification

- JSON validity passed
- Config contract passed
- Memory bootstrap passed
- Docs/naming/structure audit passed
- Workspace index/task board freshness passed
- Workspace governance health passed
- Grounding/evaluator/work-timer passed
- `git diff --check` passed

## Remaining Improvement Ideas

- Add a prompt-brief validator CLI if repeated use proves the need.
- Add domain-specific before/after prompt examples after more real requests accumulate.
