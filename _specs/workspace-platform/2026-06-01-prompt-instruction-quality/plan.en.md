# Plan: Prompt And Instruction Quality Gate

## Work Mode

- `governance`

## Evidence

- OpenAI, Anthropic, and Microsoft prompt guidance emphasizes clear instructions, structure, output format, and validation.
- NIST AI RMF Generative AI Profile and NIST bias guidance treat bias as a risk that must be managed and evaluated.
- Stanford CS224N language modeling materials describe language models as systems that predict probability distributions for next words/tokens.
- Existing `REQ-WS-042` and `ai-usage-gap-profile.json` already cover AI-use gaps, so this change makes the instruction quality gate explicit on top of that structure.

## Steps

1. Save web search records and research notes.
2. Add `REQ-WS-043` to the requirements baseline and create change/review records.
3. Update `ai-usage-gap-profile.json`, operating model, persistent instructions, workflow, prompt, router, index, and memory bootstrap.
4. Create spec, traceability, history, request summary, request trace, and timing records.
5. Run config, memory, docs, naming, structure, map, task-board, health, grounding, evaluator, and timing checks.
6. Commit and push to `origin/main`.
