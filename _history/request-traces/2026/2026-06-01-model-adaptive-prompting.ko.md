# 요청-결과 추적: 모델별 프롬프팅 전략

## 요청

- 요청 ID: `UR-2026-06-01-033`
- 요약: 좋은 모델과 안 좋은 모델은 사용법이 다르며, 약한/비추론 모델은 같은 요청을 두 번 보내는 전략이 더 높은 성능을 보일 수 있다는 점을 플랫폼 규칙으로 반영한다.
- 작업 모드: `governance`

## 요구사항

- `REQ-WS-044`

## 결과

- `ai-usage-gap-profile.json`에 `model_capability_profiles`와 `model_adaptive_prompting_policy`를 추가했다.
- 운영 모델 문서에 모델별 사용 전략을 추가했다.
- bridge workflow/prompt가 모델 capability를 분류하고 2-pass 전략을 조건부로 적용하도록 갱신했다.
- 지속 지시, AGENTS, memory bootstrap, operations index/router에 연결했다.

## 주요 산출물

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.ko.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_requirements/changes/2026-06-01-model-adaptive-prompting.ko.md`
- `_requirements/reviews/2026-06-01-model-adaptive-prompting.ko.md`
- `_specs/workspace-platform/2026-06-01-model-adaptive-prompting/`
- `_research/topics/agent-planning/2026-06-01-model-adaptive-prompting.ko.md`
- `_history/web-searches/2026/2026-06-01-model-adaptive-prompting.ko.md`

## 검증

- JSON syntax, config contract, memory bootstrap, docs/naming/structure audit, workspace index/task board, workspace health, grounding, work evaluation, timing check, `git diff --check`를 실행할 예정이다.

## 커밋

- `dbbe34f` pushed: `docs(platform): add model-adaptive prompting policy`
