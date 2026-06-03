# Web Search: Workbench Split Density

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-054`
- 작업: desktop workbench split layout, terminal drawer density, Explorer compact controls

## Queries

- `Visual Studio Code official UX file explorer terminal panel settings keyboard shortcuts documentation`
- `IntelliJ IDEA official user interface tool windows settings dialog documentation`
- `Discord desktop official accessibility theme settings sidebar navigation documentation`
- `Apple Human Interface Guidelines macOS sidebars panels settings permissions official`

## Sources Checked

- VS Code Keyboard Shortcuts / Terminal Basics: Explorer, terminal panel, command/settings shortcuts가 별도 workbench 영역으로 다뤄진다는 점을 확인했다.
- IntelliJ IDEA Settings dialog documentation: 전역/프로젝트 설정을 별도 dialog에서 분류해 처리하는 구조를 확인했다.
- Discord Accessibility / Appearance support docs: desktop client 설정에서 accessibility, theme, appearance를 사용자가 조정할 수 있게 하는 흐름을 확인했다.
- Apple HIG Panels: macOS panel은 현재 window 위에 보조 control을 띄우되 active work context와 연결되어야 한다는 점을 확인했다.

## Plan Impact

- 하단 터미널은 한 column에 상태, graph, tab, content를 모두 쌓지 않고 status rail과 main work pane으로 분리한다.
- 긴 terminal drawer scroll 대신 session list/output/events 각각의 독립 pane을 유지한다.
- Workspace Explorer는 권한 요청과 상태 정보를 유지하되 상단 control 밀도를 낮춰 file tree가 먼저 보이게 한다.
- Readiness/test는 split drawer 구조 token을 검증해 회귀를 막는다.
