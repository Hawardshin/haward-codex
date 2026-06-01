# Bridge AI Usage Gap Workflow

## Purpose

AI를 잘 쓰는 사람과 잘 못 쓰는 사람의 차이를 진단하고, 현재 작업에서 바로 줄일 수 있는 간극을 작업 구조, 검증, 반복, 자산화로 반영한다.

## Inputs

- 사용자 요청
- 웹 검색 기록
- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- 관련 프로젝트 요구사항, 스펙, 기존 프롬프트/워크플로/도구/스킬

## Sequence

1. Run web-first intake and record sources when the work is meaningful.
2. Run memory bootstrap and select `work_mode`.
3. Open `agent-platform/configs/usage/ai-usage-gap-profile.json`.
4. Classify the visible gap:
   - `vague_intent`
   - `clarification_loop_risk`
   - `bad_or_biased_instruction`
   - `no_output_contract`
   - `deterministic_truth_machine_assumption`
   - `single_shot_oracle_use`
   - `model_capability_mismatch`
   - `poor_task_fit_judgment`
   - `missing_verification`
   - `context_not_saved`
   - `tool_avoidance`
   - `hidden_or_unsupported_use`
5. Translate the gap into one or more bridge interventions:
   - intent upgrade
   - instruction quality gate
   - bounded clarification
   - bias neutralization
   - task-fit check
   - iteration scaffold
   - model-adaptive retry
   - verification gate
   - asset promotion
   - learning loop
6. Classify the model capability when it affects output quality: `reasoning_model`, `general_or_non_reasoning_model`, `weak_or_uncertain_model`, or `unknown`.
7. Apply model-adaptive retry when useful:
   - weak/non-reasoning/uncertain model + high-variance task + acceptable cost/latency: run two independent attempts or a draft-critique-revise loop.
   - reasoning/strong model: improve task framing and verification first; add duplicate calls only if variance or evaluator needs justify it.
   - never treat repeated agreement as proof without source, test, tool, evaluator, or human verification.
8. Apply the smallest useful intervention to the current task.
9. If the instruction is biased, leading, or asks to prove a preferred conclusion, rewrite it neutrally before execution and separate user preference from factual claims.
10. If the user treats the LLM as a deterministic truth machine, add a short probabilistic-model note and attach sources, tests, or uncertainty labels.
11. If the instruction has no output contract, add the expected format, depth, exclusions, acceptance criteria, and review method.
12. If missing information would materially change the result, apply the bounded clarification policy:
   - ask usually one clarification round and at most two;
   - ask no more than three prioritized questions per round;
   - ask only questions with clear decision impact;
   - include assumptions or recommended defaults when useful.
13. If the user does not answer or the request remains vague after the budget, converge through one of:
   - reasonable assumption with verification path;
   - option-based default;
   - reversible ship-first-then-confirm draft;
   - explicit defer/`clarification_needed` when proceeding would be unsafe.
14. If the lesson is reusable, save it as a prompt, workflow, template, tool, skill, config, operating model, or history note.
15. If ambiguity is high-risk or user-preference-sensitive, use spec/source reconciliation or `clarification_needed`, but keep the question set short and decision-focused.
16. Ground factual claims before close-out.
17. Evaluate whether the intervention actually reduced the gap against the initial request.

## Output Contract

- Gap classification or an explicit note that no AI-use gap was relevant.
- Bridge intervention chosen and why.
- Model capability classification and retry strategy when relevant.
- Rewritten instruction when the original instruction was vague, biased, or missing an output contract.
- Clarification questions asked, budget used, assumptions/defaults selected, or deferral reason when relevant.
- Any durable asset created or updated.
- Evidence and verification path.
- Request trace, work summary, and evaluation targets when required by the selected mode.

## Rule

Do not frame weak AI use as a user flaw. Treat it as a solvable design problem involving task framing, context, verification, iteration, tooling, and learning loops.
