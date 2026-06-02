# 계획: 설치형 다중 에이전트 앱 구현 레퍼런스 반영

## 방향

현재 플랫폼은 Tauri-first 설치형 앱 방향을 유지한다. 새 레퍼런스는 이 방향을 뒤집는 근거가 아니라, 구현 우선순위를 더 선명하게 하는 근거다.

## 구현 로드맵

### 1단계: 앱 신뢰와 첫 실행

- workspace chooser와 privacy scope preview를 먼저 만든다.
- CLI capability card를 현재 Desktop 탭보다 더 명확한 설치/인증/버전/나중에 설정 상태로 바꾼다.
- Tauri developer-local run smoke를 준비한다.
- public-ready와 developer-local-ready를 UI/문서에서 엄격히 분리한다.

### 2단계: 에이전트 터미널면

- xterm.js를 설치 감사 후 도입한다.
- 기존 pipe session stdout/stderr buffer를 xterm.js lane에 연결한다.
- output parser를 만들고 question/error/test/file-link event를 구조화한다.
- terminal lane은 session persistence, cancellation, output bound, clear/export를 지원한다.

### 3단계: 코드 편집/리뷰면

- Monaco Editor를 설치 감사 후 도입한다.
- 기존 textarea scoped editor를 Monaco로 교체한다.
- 저장 전 diff preview, backup, validation command를 기본 flow로 만든다.
- GitHub Desktop 참고로 branch/worktree/diff/commit review UI를 붙인다.

### 4단계: 다중 CLI orchestration

- process graph schema를 UI와 backend가 공유하게 만든다.
- 두 CLI fan-out부터 시작한다.
- 각 lane에 isolated worktree를 붙인다.
- merge gate는 accepted/rejected/conflicting/deferred로 결과를 분류한다.

### 5단계: 지식 축적/재사용

- run record schema를 고정한다.
- terminal output summary, artifacts, decision, validation, source diff를 한 record로 묶는다.
- 반복되는 작업은 prompt/workflow/tool/skill 후보로 promotion inbox에 보낸다.
- vector DB는 병목 측정 뒤 비교한다.

## 다음 구현 후보

1. `platform-desktop-app`에 Tauri developer-local smoke script 추가
2. `workspace-monitor` Desktop 탭의 capability card UI 개선
3. xterm.js 설치 감사와 terminal lane POC
4. Monaco Editor 설치 감사와 scoped editor POC
5. run record schema와 process graph schema 추가

## 레퍼런스 적용 원칙

- VS Code처럼 terminal과 editor를 강하게 만들되, VS Code clone이 되지 않는다.
- GitHub Desktop처럼 Git 작업을 안전하게 시각화하되, agent review/merge gate에 초점을 둔다.
- Docker Desktop처럼 extension/capability surface를 만들되, 외부 CLI는 optional adapter다.
- Raycast처럼 command palette와 quick action을 제공하되, 결정/검증/기록은 반드시 남긴다.
- Warp/Cursor/OpenCode처럼 agentic UX를 제공하되, 플랫폼은 vendor-neutral supervisor로 남는다.
