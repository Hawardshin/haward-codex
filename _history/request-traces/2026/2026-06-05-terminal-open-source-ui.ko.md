# Request Trace: Terminal Open Source UI

## 요청

- ID: `UR-2026-06-05-terminal-open-source-ui`
- 요약: 터미널 UI를 오픈소스 개발 도구의 터미널처럼 익숙하고 명확한 surface로 개선한다.

## 근거

- Web-first intake: `_history/web-searches/2026/2026-06-05-terminal-open-source-ui.ko.md`
- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md` `REQ-WM-040`
- Spec: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-terminal-open-source-ui/`

## 구현

- `RuntimeTerminalDrawer.tsx`
  - terminal chrome bar 추가.
  - start/sessions/output/events tab strip을 상단 terminal chrome으로 이동.
  - cwd/status metadata와 emulator meta row 추가.
  - output pre를 `terminal-emulator-screen`으로 분리.
  - stdin 입력을 `$` prompt row로 변경.
- `globals.css`
  - terminal drawer를 dark terminal surface로 스코프.
  - monospace output, white foreground, compact terminal tabs, responsive 2열 tab grid 추가.
- `MonitorShell.tsx`
  - 전역 터미널 버튼이 터미널이 마운트되지 않은 화면에서 눌려도 Desktop Runtime으로 이동한 뒤 드로어를 열게 변경.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 17 tests.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 328833 bytes.
- `corepack pnpm --filter platform-desktop-app run check`: 통과, 기존 public release gate 경고만 유지.
- in-app Browser: overview titlebar 터미널 버튼 count 1, 클릭 후 `#section-desktop`, `.terminal-drawer.open`, `.terminal-chrome-bar`, 탭 4개, body overflow 0.
- 정적 export viewport smoke: 1280x820, 900x720, 390x720 모두 body/drawer horizontal overflow 0.

## 결과

- 터미널 drawer가 일반 운영 카드가 아니라 개발 도구형 terminal surface로 보인다.
- 전역 터미널 버튼의 위치 의존성이 줄어들었다.
- true PTY/xterm runtime은 별도 slice로 유지한다.
