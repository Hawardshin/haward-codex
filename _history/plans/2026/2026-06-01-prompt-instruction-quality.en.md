# Plan Record: Prompt And Instruction Quality Gate

## Initial Instruction Summary

The user stated that good questions and instructions are required, and that biased or poor instructions are common failure modes. The user framed LLMs as probabilistic systems where better questions produce better answers, and asked to reflect that principle in the platform.

## Work Mode

- `governance`

## Search Questions

- OpenAI/Anthropic/Microsoft prompt engineering best practice
- NIST generative AI bias risk
- Stanford language modeling probabilistic next-word framing

## Plan

1. Check official prompt guidance plus bias/language modeling evidence.
2. Add `REQ-WS-043` without duplicating the broader AI usage gap structure.
3. Keep `ai-usage-gap-profile.json` as the source of truth for the question/instruction quality gate.
4. Make the pre-execution rewrite rule discoverable from persistent instructions, operating model, router, workflow, prompt, and memory bootstrap.
5. Save spec/history/evaluation/timing records, verify, commit, and push.

## Plan Evidence

- Clear instructions and output formats are common recommendations in official prompt guidance.
- NIST documents treat bias as a measurable and manageable risk.
- The probabilistic language-model mental model supports the operating rule that wording, context, examples, and order affect output.
