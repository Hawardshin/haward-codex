# 계획: 철학 기반 기능 추출 구조

## 작업 모드

- `governance`: 철학, registry, validator, prompt/workflow, memory bootstrap, monitor surface를 변경한다.

## 분해

| Slice | 내용 | touch paths |
| --- | --- | --- |
| PHF-001 | 철학 feature extraction registry와 checker 추가 | `agent-platform/configs/orchestration/`, `agent-platform/src/agent_platform/governance/`, `agent-platform/tests/` |
| PHF-002 | 운영 연결 추가 | `_ops/prompts/`, `_ops/workflows/`, `agent-platform/configs/agents/`, `agent-platform/docs/` |
| PHF-003 | philosophy trace와 memory bootstrap 연결 | `_philosophy/`, `agent-platform/configs/governance/`, `agent-platform/configs/memory/` |
| PHF-004 | Workspace Monitor snapshot/UI 반영 | `workspace-monitor/scripts/`, `workspace-monitor/lib/`, `workspace-monitor/components/`, `workspace-monitor/app/`, `workspace-monitor/tests/` |
| PHF-005 | requirements/spec/history/evaluation/validation | `_requirements/`, `_specs/`, `_history/` |

## 선택

- 새 기능 후보 저장소를 별도 local-only 파일로 먼저 만들기보다 registry와 checker를 먼저 만든다.
- 실제 queued 후보 구현은 이번 범위에서 제외하고, 후보로 기록한다.
- 고객 snapshot은 내부 feature candidate를 제거한다.
