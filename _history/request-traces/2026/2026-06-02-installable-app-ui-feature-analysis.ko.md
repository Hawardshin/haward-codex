# 요청 추적: 설치형 앱 UI/기능 레퍼런스 분석

## 요청

- ID: `UR-2026-06-02-055`
- 요약: 앞서 찾은 설치형 앱 레퍼런스들의 UI와 기능을 자세히 분석해 달라는 요청.

## 결과

- VS Code, GitHub Desktop, Docker Desktop, Raycast, Warp, Cursor, OpenCode, Gemini CLI, Codex CLI, Tauri/Electron, xterm.js, Monaco Editor의 UI/기능 패턴을 비교했다.
- 우리 앱의 1급 UI 객체를 `run`, `lane`, `decision`, `artifact`, `evidence`, `capability`로 정리했다.
- Home, Runs, Agents, Decisions, Source, Knowledge, Capabilities, Settings 정보구조와 MVP 구현 순서를 제안했다.
- 구현 변경은 하지 않았다.

## 산출물

- `_research/topics/platform-desktop-app/2026-06-02-installable-app-ui-feature-analysis.ko.md`
- `_history/plans/2026/2026-06-02-installable-app-ui-feature-analysis.ko.md`
- `_history/web-searches/2026/2026-06-02-installable-app-ui-feature-analysis.ko.md`

## 다음 행동

- Capability Center 카드 UI 개선
- Run Board v1
- xterm.js terminal lane POC
- Decision Inbox v2
- Source Review v1
