# 계획: 스킬 자동 적용 점검

## 작업 모드

- `governance`: 스킬 lifecycle, 설치 상태, 검증기, 운영 기록을 바꾼다.

## 분해

| Slice | 내용 | touch paths |
| --- | --- | --- |
| SKA-001 | 웹 검색과 로컬 스킬 설치 상태 진단 | `_history/web-searches/`, `/Users/shinjoungeun/.codex/skills/` |
| SKA-002 | activation registry와 CLI checker 구현 | `agent-platform/configs/skills/`, `agent-platform/src/agent_platform/` |
| SKA-003 | 스킬 설명과 installed copy 동기화 | `_skills/`, `/Users/shinjoungeun/.codex/skills/` |
| SKA-004 | validation, installation, history 기록 | `_history/`, `_ops/installations/registry.json` |
| SKA-005 | tests와 close-out validation | `agent-platform/tests/`, `_history/evaluations/` |

## 선택

- Codex 내부 자동 선택 알고리즘은 변경할 수 없으므로, 레포에서 통제 가능한 source/install/trigger/drift 상태를 검사한다.
- 스킬은 외부 패키지가 아니라 repository-managed source copy로 설치한다.
- `_private/`는 검사하지 않는다.
