# 요구사항 변경: 철학 기반 기능 추출 구조

## 요청

- 사용자의 철학이 플랫폼 기능에 충분히 들어가 있지 않으므로, 철학 원칙을 더 반영해 기능을 뽑아내고 만드는 구조가 필요하다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PHIL-FEAT-001 | 플랫폼은 `_philosophy/` 원칙을 기능 후보 생성의 입력으로 사용해야 한다. | must | `check-philosophy-features`가 모든 required principle을 feature flow에 연결한다. |
| REQ-PHIL-FEAT-002 | 기능 후보는 source principle id, human process step, smallest asset type, evidence, risk, validation, rollback을 포함해야 한다. | must | philosophy feature registry checker와 unittest가 누락을 실패 처리한다. |
| REQ-PHIL-FEAT-003 | 철학 기반 기능화는 prompt/workflow/template/tool/skill/agent/project feature 중 가장 작은 유용한 자산을 우선 선택해야 한다. | must | registry contract와 candidate records에 smallest asset type이 기록된다. |
| REQ-PHIL-FEAT-004 | 다음 세션이 이 구조를 찾을 수 있도록 prompt router, memory bootstrap, philosophy traceability에 연결해야 한다. | must | `check-memory-bootstrap`, `check-philosophy-trace`가 통과한다. |
| REQ-PHIL-FEAT-005 | 운영 화면은 철학에서 나온 feature flow와 후보 상태를 볼 수 있어야 한다. | should | Workspace Monitor snapshot/type/test/build가 통과하고 Overview panel token이 표시된다. |

## 범위

- 포함: `agent-platform/` registry, CLI checker, tests, agent spec, docs, `_ops` prompt/workflow, memory/trace 연결, `workspace-monitor` overview panel.
- 제외: queued 후보의 실제 구현, high-risk 자동 실행, 고객 번들에 내부 철학 후보 노출.
