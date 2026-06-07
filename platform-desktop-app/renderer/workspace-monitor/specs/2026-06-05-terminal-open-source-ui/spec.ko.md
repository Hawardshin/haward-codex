# Spec: Terminal Open Source UI

## 목표

Workspace Monitor의 터미널/CLI 실행 UI가 일반 웹 카드처럼 보이지 않고, 사용자가 이미 익숙한 개발 도구형 터미널 surface로 인지되게 한다.

## 요구사항

- `REQ-WM-040`: 터미널은 terminal chrome, tab strip, dark emulator surface, monospace output, prompt input, status/cwd bar를 기본 구조로 사용한다.
- `REQ-WM-077`: 터미널 시작 화면은 런타임/어댑터/실제 셸/작업 폴더 준비 상태, 작업 시작, 실제 셸 열기, CLI 연결 점검을 먼저 보여주고 고급 프롬프트 조정은 접힌 영역에 둔다.
- 전역 터미널 버튼은 현재 화면이 overview, agents, settings 등 터미널이 마운트되지 않은 화면이어도 실제 터미널이 존재하는 Desktop Runtime 화면으로 이동한 뒤 드로어를 연다.
- 1280px, 900px, 390px 폭에서 root/body/drawer 수평 overflow가 없어야 한다.
- 터미널 탭은 좁은 폭에서 2열 grid로 접히고, 클릭 target이 32px 아래로 줄어들면 안 된다.

## 구현 범위

- `RuntimeTerminalDrawer.tsx`: terminal chrome bar, tab strip relocation, cwd/status metadata, emulator meta row, prompt-style input row.
- `RuntimeTerminalDrawer.tsx`: 터미널 준비 상태 strip, 사용자용 시작 허브, 실제 셸/CLI 점검 복구 액션.
- `MonitorShell.tsx`: 전역 터미널 열기 동작을 터미널 마운트 화면 라우팅과 결합.
- `globals.css`: dark terminal surface, white foreground, monospace output, compact tab strip, responsive terminal chrome.

## 제외 범위

- 추가 외부 CLI 자동 설치.
- shell profile 자동 수정, terminal escape sequence fidelity 확장.
- 터미널 session persistence 구조 변경.

## 수용 기준

- in-app Browser에서 overview titlebar 터미널 버튼을 누르면 `#section-desktop`으로 이동하고 `.terminal-drawer.open`과 `.terminal-chrome-bar`가 보여야 한다.
- terminal chrome은 시작, 세션, 실제 셸, 출력, 이벤트 탭을 보여야 한다.
- 시작 화면에는 `data-terminal-readiness`, `data-terminal-start-command-center`, `data-terminal-primary-action`과 접힌 `terminal-advanced-start`가 있어야 한다.
- terminal drawer, chrome, main surface의 computed background는 어두운 terminal 계열이어야 한다.
- 정적 export 1280/900/390px smoke에서 `bodyOverflowX=0`, `drawerOverflowX=0`이어야 한다.
