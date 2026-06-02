# 요구사항 변경: Desktop Decision Resume

- 날짜: 2026-06-02
- 요청 ID: `UR-2026-06-02-051`
- 작업 모드: `governance`

## 변경 요약

설치형 다중 CLI 데스크톱 앱의 decision inbox 흐름에 linked active CLI session 재개 기능을 추가한다.

## 추가 요구사항

- `PDA-REQ-023`: Desktop MVP는 active CLI session에서 생성되어 session metadata가 있는 decision에 대해 사용자가 명시적으로 답변과 재개를 선택하면, decision answer를 저장한 뒤 같은 답변을 해당 session stdin으로 보내고 session report를 갱신해야 한다.
- `PDA-UX-016`: Desktop 탭은 linked active CLI session이 있는 decision에 대해 answer-only와 answer-and-resume action을 구분하고, 연결 session id/status와 resume 결과를 보여야 한다.

## 비변경

- CLI decision answer가 자동으로 모든 workflow를 재개하지 않는다.
- PTY, shell plugin, xterm.js, Monaco, installer dependency는 설치하지 않는다.
- public-ready macOS 앱이라고 주장하지 않는다.
