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
   - `single_shot_oracle_use`
   - `poor_task_fit_judgment`
   - `missing_verification`
   - `context_not_saved`
   - `tool_avoidance`
   - `hidden_or_unsupported_use`
5. Translate the gap into one or more bridge interventions:
   - intent upgrade
   - task-fit check
   - iteration scaffold
   - verification gate
   - asset promotion
   - learning loop
6. Apply the smallest useful intervention to the current task.
7. If the lesson is reusable, save it as a prompt, workflow, template, tool, skill, config, operating model, or history note.
8. If ambiguity is high-risk or user-preference-sensitive, use spec/source reconciliation or `clarification_needed`.
9. Ground factual claims before close-out.
10. Evaluate whether the intervention actually reduced the gap against the initial request.

## Output Contract

- Gap classification or an explicit note that no AI-use gap was relevant.
- Bridge intervention chosen and why.
- Any durable asset created or updated.
- Evidence and verification path.
- Request trace, work summary, and evaluation targets when required by the selected mode.

## Rule

Do not frame weak AI use as a user flaw. Treat it as a solvable design problem involving task framing, context, verification, iteration, tooling, and learning loops.
