# Plan: Bounded Clarification Loop

## Work Mode

- `governance`

## Evidence

- Microsoft Copilot Studio guidance uses clarification questions to narrow ambiguous user intent and provides fallback/handoff when options do not fit.
- TaskLint research shows that task-instruction ambiguity can affect task accuracy.
- CLAM research proposes selective clarification before answering ambiguous questions.
- The existing platform rewrites vague instructions into task briefs, but the question budget and termination rules were too implicit.

## Steps

1. Check web evidence and existing profile/workflow/prompt.
2. Add `REQ-WS-046` and write requirement change/review records.
3. Update `ai-usage-gap-profile.json`, operating model, workflow, and prompt.
4. Update persistent instructions, AGENTS, and memory bootstrap.
5. Create spec, web search record, research note, request summary, trace, timing, and evaluation.
6. Run config, memory, docs, naming, structure, and evaluator checks.
7. Commit and push.
