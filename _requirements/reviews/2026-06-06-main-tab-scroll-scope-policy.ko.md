# Main Tab Scroll Scope Policy 요구사항 리뷰

날짜: 2026-06-06
프로젝트: shared policy, `platform-desktop-app`

## 요구사항 후보

| ID | 요구사항 | 판정 |
|---|---|---|
| REQ-SHARED-UI-001 | main tab/page 전체를 기본 scroll owner로 만들지 않는다. | baseline |
| REQ-SHARED-UI-002 | scroll이 필요한 영역은 code editor/viewer, terminal/log, 긴 기능/파일 목록, popup/dialog/flyout, inspector 같은 bounded child surface로 제한한다. | baseline |
| REQ-SHARED-UI-003 | main tab이 overflow될 것 같으면 전체 tab scroll보다 deeper view, drill-down, bounded child pane으로 정보 구조를 나눈다. | baseline |
| REQ-PDA-126 | Workspace Monitor는 `.desktop-viewport`와 `.mounted-section-panel`에 whole-tab vertical scroll ownership이 재도입되면 static check에서 실패해야 한다. | baseline |

## 검토

- 요청은 일회성 취향이 아니라 이후 UI 변경 기준으로 작동해야 하므로 persistent instructions, UI tone policy, memory bootstrap에 반영한다.
- 이미 허용된 scroll surface인 source editor, terminal drawer, file tree, timeline docs, tool detail/list scroll은 유지한다.
- 전체 tab/page scroll을 금지하는 대신 overflow가 실제로 필요한 child surface를 명명해 허용한다.
