# 요청-결과 추적: 레퍼런스 기반 데스크톱 Workbench UX

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-042`
- 소유 프로젝트: `platform-desktop-app/`
- 렌더러: `platform-desktop-app/renderer/workspace-monitor/`
- 작업 모드: `quick`

## 요청 요약

사용자는 Discord, VS Code, IntelliJ 같은 실제 데스크톱 앱의 UI/UX를 보고 반영하라고 요청했다. 특히 다중 CLI는 아래에서 올라오는 터미널이어야 하고, 언어 설정이 `전체`만 있는 문제, 실제 설정할 수 있는 항목 부족, 좌우/중복 sidebar처럼 보이는 설정과 navigation, 어려운 초기 설정, 다크모드/라이트모드 부재를 지적했다.

## 결과

- VS Code, IntelliJ IDEA, Discord 공식 문서를 확인해 workbench의 activity rail, bottom panel/terminal, settings/appearance 구조를 반영 기준으로 삼았다.
- `desktop-sidebar` DOM을 제거하고 activity rail 하나만 남겨 주요 화면 전환이 중복되지 않게 했다.
- 현재 화면 맥락과 attention action은 titlebar context strip으로 이동했다.
- multi-CLI session surface를 `하단 다중 CLI 터미널` fixed drawer로 바꾸고, titlebar 버튼, quick start, session launch, task pipe init에서 열리게 했다.
- 첫 화면과 runtime 화면에 `바로 쓰기` quick start flow를 추가했다.
- runtime 기본 CLI adapter는 `codex-cli`로 시작하게 조정해 초기 사용 흐름을 단순화했다.
- 설정 dialog는 왼쪽/오른쪽 tab layout 대신 상단 segmented tab으로 바꾸고 `화면`, `레이아웃`, `초기화`, `데이터/운영`으로 재분류했다.
- `시스템`, `라이트`, `다크` theme mode를 추가하고 root theme class/localStorage persistence를 구현했다.
- language mode fallback을 추가해 snapshot에 `all`만 있어도 `전체`, `한국어만`, `English Only`, `미분류`가 항상 표시되게 했다.
- readiness script와 Node test가 bottom terminal, quick start, theme mode, expanded language mode token을 검증하게 했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/public/workspace-snapshot.json`
- `platform-desktop-app/renderer/workspace-monitor/src/generated/workspace-snapshot.json`
- `platform-desktop-app/artifacts/2026-06-03-workbench-ux-reference-implementation/bottom-terminal-dark-settings.png`
- `_history/web-searches/2026/2026-06-03-workbench-ux-reference-implementation.ko.md`
- `_history/evaluations/2026/2026-06-03-workbench-ux-reference-implementation.ko.md`
- `_history/evaluations/2026/2026-06-03-workbench-ux-reference-implementation-resource.json`

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed before records
- Browser static-build smoke: `.desktop-sidebar` 0개, `.activity-rail` 1개, 설정 버튼 1개, quick start visible, bottom terminal drawer open, settings tab list horizontal, theme/language/layout controls visible, dark theme text color 확인

## 잔여 위험

- 이번 변경은 renderer UX와 static customer build smoke 기준이다. 실제 packaged Tauri window의 OS chrome, packaged viewport, 공개 배포 gate는 기존 internal/public release pipeline에서 계속 확인해야 한다.
- 기존 multi-CLI session 기능의 표시 위치와 UX를 하단 terminal drawer로 바꾼 것이며, 완전한 native PTY emulator 구현 범위는 별도 CLI/session runtime 작업에서 계속 추적한다.
