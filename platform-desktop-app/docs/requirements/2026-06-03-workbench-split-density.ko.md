# 요구사항: Workbench Split Density

- 요청 ID: `UR-2026-06-03-054`
- 소유 프로젝트: `platform-desktop-app/`
- 범위: Workspace Monitor desktop shell terminal drawer and workspace explorer density

## 배경

사용자는 앞선 desktop app UX 개선을 계속 진행하라고 요청했다. 직전 피드백의 핵심은 웹앱처럼 한 화면에 과하게 쌓이는 UI, 긴 scroll, 과한 typography, 불명확한 native app 흐름이었다.

## 요구사항

- `PDA-REQ-054-1`: 하단 다중 CLI 터미널은 상태/보기 선택 rail과 실제 작업 main pane을 분리해야 한다.
- `PDA-REQ-054-2`: 터미널 drawer는 한국어 우선 문구로 시작, 세션, 출력, 이벤트, 작업 폴더, 초기 입력, 질문 보류 동작을 직관적으로 보여야 한다.
- `PDA-REQ-054-3`: Workspace Explorer는 native 권한 요청을 유지하면서도 header, action, state, search 영역을 압축해 파일 트리 가시성을 높여야 한다.
- `PDA-REQ-054-4`: split pane과 scroll pane 구조는 readiness/test token으로 회귀 방지되어야 한다.
- `PDA-REQ-054-5`: 기존 native permission, theme, source editor, terminal session runtime command contract를 깨지 않아야 한다.
