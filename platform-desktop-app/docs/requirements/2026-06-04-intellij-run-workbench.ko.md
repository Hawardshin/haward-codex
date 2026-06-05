# IntelliJ식 실행 작업대 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-089 | `작업 실행` 화면은 사용자가 긴 대시보드를 스크롤하기 전에 검색 에이전트, CLI 세션, 다중 CLI pipe, 준비 점검을 시작할 수 있는 Run Configuration 영역을 제공해야 한다. | must | `intellij-run-workbench-panel`, `ide-run-config-list`, 버튼 action wiring |
| REQ-PDA-090 | Run Configuration 버튼은 장식이 아니라 기존 검색 에이전트 작업 채팅, CLI 세션 시작, task pipe 초기화, 전체 readiness 점검 함수에 연결되어야 한다. | must | `startDefaultSearchAgent`, `startSession`, `initTaskPipe`, `runAllHealthChecks` |
| REQ-PDA-091 | 실행 화면은 IntelliJ식 Services 도구 창처럼 runtime, workspace, CLI adapters, provider accounts, active sessions 상태를 한 곳에 보여줘야 한다. | must | `ide-services-window`, `ideServiceRows` |
| REQ-PDA-092 | 실행 화면은 Problems 영역에서 runtime 미연결, 누락 adapter, provider 미설정, decision inbox, dirty drafts, release blocker를 사용자가 바로 조치 가능한 항목으로 보여줘야 한다. | must | `ide-problems-strip`, `visibleIdeProblems` |
| REQ-PDA-093 | 실행 화면은 상태바로 runtime, CLI, model, sessions, inbox, terminal 상태를 간결하게 보여줘야 하며 다크/라이트 테마 모두에서 흰 배경이 튀면 안 된다. | must | `ide-status-bar`, token-based CSS |
| REQ-PDA-094 | 1280x800 이상 데스크톱 최소 창에서는 도구 창 레일, 실행 구성, Services, Problems가 동시에 작업 가능한 밀도로 보여야 하며 텍스트와 버튼이 깨지지 않아야 한다. | must | desktop CSS, renderer check, browser smoke |

## 결정

- 이 변경은 IntelliJ UI를 복제하는 것이 아니라 실행 구성, 도구 창, 서비스/문제/상태 표시라는 제품 패턴을 적용한다.
- `작업 실행`의 상단은 실제 작업 시작과 blocked 상태 해소를 담당한다.
- Quick Start와 기존 세부 패널은 유지하되, 사용자가 먼저 보는 표면은 IDE식 실행 작업대가 된다.
