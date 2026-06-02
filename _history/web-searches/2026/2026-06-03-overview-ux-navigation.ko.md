# 웹 검색 기록: Overview UX 내비게이션 개선

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-011`
- 소유 프로젝트: `workspace-monitor/`
- 목적: 운영 대시보드의 상단 내비게이션, 상태 피드백, 다음 행동 UX 개선 기준 확인

## 쿼리

- `2026 dashboard UX design best practices dense operational tools accessibility command palette status panels`
- `Apple Human Interface Guidelines macOS sidebar toolbar status feedback latest`
- `Microsoft Fluent 2 design dashboard command bar status message accessibility`
- `Nielsen Norman Group dashboard UX status visibility action feedback`
- `site:developer.apple.com/design/human-interface-guidelines feedback status selection macOS toolbar sidebar Human Interface Guidelines`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| Apple Human Interface Guidelines, Toolbars/Sidebars/Focus search results | 높음 | macOS에서는 현재 선택, toolbar/sidebar command, hover/selection feedback의 일관성이 중요하다. | 기존 section tab을 유지하고 active state와 badge를 강화했다. |
| Microsoft Fluent 2, What's New | 높음 | cohesive color, token system, standardized corners, usage guidance, accessibility notation을 강조한다. | 새 색상 체계 대신 기존 token과 7-8px radius를 유지했다. |
| Microsoft Learn, modern model-driven apps | 높음 | command bar를 상단 별도 영역에 두고 dashboard/grid 영역과 시각적으로 분리해 primary content에 집중시킨다. | toolbar 위에 `operator-strip`을 별도 상단 작업면으로 배치했다. |
| Nielsen Norman Group heuristic summary PDF | 높음 | system status visibility, recognition over recall, shortcuts for expert users, minimalist design 기준을 확인했다. | 현재 상태, 다음 행동, evidence/runtime shortcut을 한 줄에 노출했다. |

## 약한 출처 및 제외

- Reddit와 일반 블로그의 macOS 26 UI 비판은 신호로만 참고하고 구현 근거로 쓰지 않았다.
- Apple 페이지 본문은 JavaScript 의존으로 직접 전문 확인이 제한되어 search result와 접근 가능한 관련 HIG 항목만 보조 근거로 사용했다.

## 공개 결정 요약

- 대시보드 상단에 새 설명문이나 마케팅형 hero를 추가하지 않는다.
- 현재 상태와 다음 행동을 `operator-strip`으로 직접 노출한다.
- tab badge는 상태/수량을 보조 표시하고, 보안 또는 접근 제어 경계로 취급하지 않는다.
- responsive layout은 command buttons가 mobile에서 한 줄씩 안정적으로 눌리도록 한다.
