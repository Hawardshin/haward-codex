# AI Usage Gap Operating Model

## Purpose

The difference between weak and strong AI use is treated as a repeatable work-system difference, not as a personal talent judgment. This platform does not stop at helping the user write better prompts; it turns effective AI-use patterns into requirements, specs, research, validation, tools, skills, and history.

## Core Observation

Weak AI use often shows these patterns:

- The goal and success criteria are unclear.
- Questions and instructions are vague, biased, or framed to force a desired conclusion.
- The user does not distinguish where AI is useful from where it is risky.
- The first answer is either trusted blindly or abandoned immediately.
- Outputs are used without evidence, tests, sources, or contrary checks.
- Useful prompts and workflows are not saved, so each task starts over.
- Repeatable work is not promoted into tools or templates.
- AI use stays hidden, preventing project-level or organizational learning.

Strong AI users behave differently:

- They define purpose, audience, constraints, input material, and success criteria first.
- They write neutral questions and ask for alternatives plus counterevidence.
- They specify output format, depth, verification criteria, and examples.
- They use AI as an explorer, drafter, critic, transformer, and verification assistant rather than as an oracle.
- They split work into planning, evidence gathering, implementation, validation, and evaluation.
- They combine AI with web search, official docs, tests, local files, evaluators, and human judgment.
- They assume AI capability is uneven across tasks and changes over time.
- They promote repeated useful patterns into prompts, workflows, templates, tools, and skills.

## Bridging The Gap

1. Improve the request: add goal, context, constraints, examples, and success criteria.
2. Fix bad instructions: turn biased framing, forced conclusions, hidden preferences, oversized requests, and source-free current-claims into neutral task briefs.
3. Check task fit: decide whether AI should draft, search, code, test, critique, or defer to human judgment.
4. Avoid one-shot work: run short draft, critique, revise, and verify loops.
5. Attach evidence: sources for factual claims, tests for code, and unit/base/timeframe/method for numbers.
6. Save repeatable patterns: promote useful patterns into the smallest durable asset.

## Question And Instruction Quality

LLM output is probabilistic output conditioned on the prompt and available context. A good question is therefore not decorative wording; it changes the answer distribution the model is likely to produce.

In this operating model, "ask better questions" is not a prompt trick. A poor instruction gives the model poor conditions, and biased or conclusion-seeking framing increases the chance of a fluent but distorted answer.

A useful instruction should include:

- Goal: what should be decided or changed.
- Context: what materials, constraints, and prior decisions matter.
- Output contract: format, depth, tone, examples, exclusions, and success criteria.
- Neutrality: whether it asks for alternatives and counterevidence instead of proving a desired conclusion.
- Verification: what sources, tests, calculations, or review should be used.
- Uncertainty: what should be marked as an assumption, unknown, or user decision.

Common bad instructions:

- `Make it good`: no criteria.
- `Prove this is the best`: forces a conclusion.
- `Explain why people who disagree are wrong`: biased framing.
- `Use the latest numbers`: no source, date, definition, or geography.
- `Research, plan, and code everything`: mixes phases with different verification needs.

These instructions should be rewritten into neutral prompts with goal, context, constraints, output format, success criteria, and verification path before execution.
The rewrite should preserve the user's real goal while separating factual claims from preferences and making alternatives, counterevidence, and uncertainty checkable.

## Prohibition-To-Positive Instruction Principle

The statement “AI does not understand prohibitions” matters operationally. More precisely, agents should not assume an LLM will always process a prohibition as a stable behavior rule. Negative instructions can keep the avoided concept salient in context, and long or complex work can weaken constraints.

Convert prohibition-heavy instructions in this sequence:

1. Extract the forbidden behavior or content.
2. State the desired positive behavior.
3. Define allowed actions and allowed outputs.
4. Define the replacement action when the forbidden case appears.
5. Add good/bad examples when useful.
6. For material risk, add a schema, allowlist, evaluator, test, privacy audit, permission gate, or other enforcement mechanism.

For example, `Do not read sensitive files` becomes: “When sensitive information is needed, do not open `_private/` directly; request a redacted extract first. Direct inspection requires one-time permission for the exact path and purpose. Run privacy audit to confirm generated maps and snapshots exclude the content.”

Prohibitions do not disappear. They become boundary notes after the positive execution contract is clear. Security, privacy, cost, publication, and destructive changes should be controlled structurally, not only through prompt wording.

## Structural Guardrail Principle

A guardrail is not a written “do not” instruction. It is an execution boundary. When an agent touches files, tools, external services, cost, deployment, publication, permissions, sensitive information, or high-risk factual claims, it should choose a control that can prevent, detect, or recover from the failure.

Guardrail selection sequence:

1. Classify the risk surface: security, privacy, cost, publication, deployment, deletion or mutation, external call, file access, permission, or high-risk claim.
2. Check reversibility and possible impact.
3. Choose the smallest sufficient guardrail: input redaction, output schema, allowlist, tool permission, sandbox/dry-run, rate limit, human checkpoint, evaluator, test, privacy/security audit, or rollback gate.
4. Record allowed actions, blocked actions, and the replacement or escalation action on failure.
5. Record which log, test, evaluator, audit, or user approval proves the guardrail was applied.

Low-risk reversible work can use light checks. Security, privacy, cost, publication, deployment, deletion, and permission boundaries should not proceed on prompt wording alone.

## Clarifying Questions And Question Budget

Vague instructions should not always be guessed through. If the missing goal, context, constraints, output contract, or success criteria would materially change the result, the agent should ask clarifying counter-questions first.

Clarification is a device for moving the work forward, not a process for creating endless back-and-forth. The default rules are:

- Usually ask one clarification round, and at most two.
- Ask no more than three questions at a time, prioritized by decision impact.
- Do not ask the user for information that can be checked through local files, existing specs, search, or tests.
- For low-risk reversible work, state reasonable assumptions and proceed.
- If the user does not answer or the answer remains vague, converge through explicit assumptions, recommended defaults, ship-first-then-confirm work, or explicit deferral.

A good clarifying question is not “What should I do?” It shows how the decision changes the result. When useful, provide 2-3 options with a recommended default.

### Pending Answers And Non-Blocking Progress

Needing clarification does not mean the whole task should stop. Only the part that truly depends on the missing answer should be isolated as a `blocked_decision`; independent research, source collection, option comparison, drafting, testing, validation, documentation, and risk analysis should continue.

Default rules for non-blocking progress:

- Record each question with a `question_id`, decision impact, reason for waiting, and expected correction scope.
- Pause only the dependent artifact or action, not the whole task.
- Mark continued work as `unblocked_work`, including any assumptions and defaults used.
- When the answer arrives, compare it with the assumption and patch only affected files or decisions.
- Do not proceed with irreversible or high-risk work when guessing would be unsafe.

This rule reduces a major AI-era bottleneck. If the user cannot answer immediately, the agent should still do useful work and leave only the human-dependent decision small and explicit.

### Human Decision Inbox And Interrupt Resume

When multiple decisions need human answers, do not leave them scattered in chat. Collect every `blocked_decision`, `clarification_needed`, approval, and preference decision in `_ops/coordination/human-decision-inbox.json`.

Each decision item includes:

- stable decision ID
- question, options, recommended default, and answer format
- blocked work and still-unblocked work
- assumptions and risks while waiting
- `resume_action` to run after the answer arrives
- checkpoint fields required before interrupting current work

When the human returns with an answer, the agent checkpoints current work first. If the answer is high priority or directly unblocks the current user goal, the agent interrupts and resumes the affected work immediately. Otherwise, it schedules resume at the next safe point. In both cases, the agent updates inbox status and decision history after applying the answer.

## Model-Adaptive Strategy

Strong and weak models should not be used the same way. A weak model that is not optimized for reasoning can produce unstable first answers, so when cost and latency allow and task variance is high, two independent attempts or a draft-critique-revise loop should be a default candidate strategy.

This does not mean "two matching answers are true." Agreement across attempts is only an agreement signal; factual claims and important judgments still need sources, tests, tools, evaluators, or human judgment.

Operating rules:

- Weak, non-reasoning, or uncertain models: decompose the task, run two-pass comparison when useful, and separate convergence from conflict.
- General models: make examples, output contracts, and constraints explicit; use two-pass or draft-critique-revise loops for high-variance tasks.
- Strong reasoning models: do not start by adding duplicate calls; first improve goal, context, constraints, success criteria, and verification path.
- All models: never mistake repeated model agreement for evidence.

## Platform Integration

- Config: `agent-platform/configs/usage/ai-usage-gap-profile.json`
- Workflow: `_ops/workflows/59-bridge-ai-usage-gap.md`
- Prompt: `_ops/prompts/89-bridge-ai-usage-gap.md`
- Memory: warm anchor in `agent-platform/configs/memory/bootstrap-manifest.json`

## Operating Principles

- Do not blame the user. Treat gaps as literacy, context, verification, work-structure, tooling, or learning-loop gaps.
- Do not block unnecessarily on vague requests. For low-risk work, make reasonable assumptions and record them with verification paths.
- When ambiguity would materially change the result, ask clarifying counter-questions, but limit the rounds and question count with a `clarification_budget`.
- Do not stop the whole task while waiting for a clarification answer. Isolate only the dependent decision as `blocked_decision` and continue unaffected work as `unblocked_work`.
- Collect multiple pending answer items in the human decision inbox, then checkpoint current work and interrupt/resume by priority and risk when the human answers.
- Rewrite biased or conclusion-seeking instructions by separating the user's intent from factual claims and neutralizing the task.
- Convert prohibition-heavy instructions into positive behavior, allowed scope, replacement action, and verification or enforcement gates.
- When material risk exists, choose a structural guardrail instead of relying on prompt wording, and record allowed/blocked actions plus verification evidence.
- For high-risk or preference-sensitive ambiguity, use `clarification_needed`.
- Effective AI-use patterns should not remain in chat; they should become repository assets.
