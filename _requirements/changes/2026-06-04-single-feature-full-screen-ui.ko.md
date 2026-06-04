# 요구사항 변경: 단일 주 기능 화면 공간 원칙

## 요청 요약

사용자는 현재 화면이 좋지 않다고 지적하며, 한 화면에 주 기능이 하나라면 그 기능이 화면을 채우는 것을 기본 원칙으로 삼으라고 지시했다.

## 변경 요구사항

| ID | 요구사항 | 상태 |
| --- | --- | --- |
| REQ-UI-FOCUS-001 | 한 화면의 주 기능이 하나이면 그 기능이 화면 중심과 대부분의 면적을 차지해야 한다. | accepted |
| REQ-UI-FOCUS-002 | navigation, 상태, 보조 action은 주 기능을 돕는 수준으로만 배치하고 주 기능보다 시각적으로 우세하면 안 된다. | accepted |
| REQ-UI-FOCUS-003 | split layout, dashboard grid, side-by-side panel은 비교, monitoring, 다중 주 작업처럼 동시에 봐야 할 명확한 이유가 있을 때만 사용한다. | accepted |
| REQ-UI-FOCUS-004 | UI 검증에서는 단일 주 기능이 주변 chrome, 빈 card, 장식, 무관한 module보다 작게 보이는지 확인하고, 해당하면 재설계 대상으로 분류한다. | accepted |

## 범위

- 적용 대상: platform UI, desktop app UI, dashboard, monitor, generated snapshot, admin surface.
- 비범위: 사용자가 특정 화면을 지정하지 않았으므로 이번 변경에서는 실제 화면 구현을 추측해 수정하지 않는다.

## 근거

- Microsoft Learn의 Inductive User Interface 문서는 screen/page를 하나의 primary task에 집중시키고 contents가 그 task에 맞아야 한다는 지침을 제공한다.
- VA.gov Design System의 One Thing per Page 패턴은 한 번에 하나의 논리적 항목을 다루면 집중과 이해가 쉬워진다고 설명한다.

## 반영 대상

- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/instructions/persistent-instructions.md`
- `_docs/policies/ui-tone-policy.ko.md`
- `_docs/policies/ui-tone-policy.en.md`
- `AGENTS.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
