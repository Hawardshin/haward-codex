# 요구사항 변경: 스킬 자동 적용 점검

## 요청

- 사용자는 지금까지 커스텀 스킬이 자동으로 잘 적용되지 않는 것 같다고 보고했다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-SKILL-ACT-001 | 레포지토리 스킬 원본과 실제 Codex 설치본을 분리해서 추적해야 한다. | must | `skill-activation-registry.json`가 `source_path`와 `installed_path`를 기록한다. |
| REQ-SKILL-ACT-002 | 자동 적용이 기대되는 스킬은 설치본 존재와 source/install drift를 실패로 검사해야 한다. | must | `check-skill-activation`이 설치 누락과 drift를 `requires_rework=true`로 보고한다. |
| REQ-SKILL-ACT-003 | 스킬 설명은 자동 매칭을 위해 사용 시점과 범위를 명확히 해야 한다. | must | checker가 `Use when`/`Use for`, 설명 길이, trigger examples를 검사한다. |
| REQ-SKILL-ACT-004 | 스킬 설치 또는 동기화는 설치 감사 기록과 rollback 경로를 남겨야 한다. | must | `_ops/installations/registry.json`와 `_history/installations/2026/` 기록이 존재한다. |
| REQ-SKILL-ACT-005 | 스킬 수정은 skill validation input, forward-test scenario, improvement idea를 남겨야 한다. | must | `validate-skill`이 두 스킬에 대해 `skill_ready`를 반환한다. |

## 범위

- 포함: `agent-platform` CLI checker, activation registry, `_skills` 설명/상태 갱신, Codex skill install sync, validation/history 기록.
- 제외: Codex 내부 자동 선택 알고리즘 변경, 시스템 스킬 변경, 플러그인 설치.
