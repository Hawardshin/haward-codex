# Desktop 요구사항: workspace tracker product split

- 날짜: 2026-06-08
- 소유 프로젝트: `platform-desktop-app/`
- 관련 shared requirement: `_requirements/changes/2026-06-08-workspace-tracker-product-split.ko.md`

## 제품 요구사항

| ID | 요구사항 | 구현 표면 | 검증 |
| --- | --- | --- | --- |
| REQ-WM-078 | 홈 화면은 사용자가 Git 작업공간을 고르고 현재 작업을 추적하는 흐름을 첫 화면으로 보여야 한다. | `MonitorShell.tsx`, `WorkspaceProductSplitPanel.tsx` | workspace monitor tests |
| REQ-WM-079 | 사용자 기본 네비게이션은 작업 추적에 필요한 섹션만 노출해야 한다. | `view-mode-registry.json`, `MonitorShell.tsx` | readiness tests |
| REQ-WM-080 | 에이전트/툴/모델/AgentCore류 기능은 기본 사용자 기능이 아니라 분리 플랫폼/고급 기능으로 표시해야 한다. | `product-feature-registry.json`, `ProductFeatureArchitecturePanel.tsx` | readiness tests |
| REQ-WM-081 | product split은 collector snapshot과 customer snapshot에 포함되어야 한다. | `snapshot.ts`, `collect-workspace.mjs` | collector tests |
| REQ-WM-082 | import/open/clone/create repository intent는 기본 추천 작업이어야 한다. | `MonitorShell.tsx` | tool-studio tests |
| REQ-WM-083 | 보고서/근거, 작업 타임라인, 문서/요구사항은 기본 사용자 경로에서 접근 가능해야 한다. | navigation, command palette, home drilldown | tool-studio tests |

## 설계 원칙

- 기본 화면은 “현재 작업을 시작하고 이해하는 것”에 집중한다.
- 고급 플랫폼 기능은 숨겨진 것이 아니라 명확히 분리된 대상으로 표시한다.
- 모든 durable user project는 Git 경계를 가진 작업공간으로 가져오거나 생성하는 방향을 따른다.
