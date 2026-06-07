# Spec: 터미널 탭 개혁

## 목표

터미널 탭을 사용자가 처음 열었을 때 “무엇을 눌러야 실행되는지, 왜 막혔는지, 실제 셸은 어디서 여는지”가 즉시 보이는 실행 허브로 바꾼다.

## 요구사항

- `REQ-WM-077`: 터미널 탭은 런타임/어댑터/실제 셸/작업 폴더 준비 상태를 상단에 보여야 한다.
- 시작 화면은 작업 시작, 실제 셸 열기, CLI 연결 점검, 설정 복구 액션을 먼저 제공해야 한다.
- 프롬프트 선택, 작업 폴더 세부 입력, 프롬프트 저장/초기화 같은 고급 시작 옵션은 접힌 영역에 둔다.
- 기존 네이티브 PTY xterm.js surface의 검색, 복사, 붙여넣기, 맞춤, 빠른 명령 기능은 유지한다.
- 좁은 화면에서 readiness strip, start command center, action grid가 수평 overflow를 만들면 안 된다.

## 구현 범위

- `RuntimeTerminalDrawer.tsx`: readiness strip, 실행/복구 액션, 실제 셸 시작 동선.
- `RuntimeTerminalStartPanel.tsx`: 사용자용 시작 허브와 접힌 고급 시작 옵션.
- `runtimeTerminalCopy.ts`: 사용자 기본 용어를 `PTY` 중심에서 `실제 셸` 중심으로 변경.
- `globals.css`: 터미널 readiness/start hub 반응형 레이아웃.
- `tool-studio.test.mjs`: 터미널 실행 허브 정적 계약.

## 제외 범위

- shell profile 자동 수정.
- 외부 CLI 자동 설치.
- PTY escape sequence fidelity 확장.
- 터미널 session persistence 저장소 변경.

## 수용 기준

- `data-terminal-readiness`가 터미널 드로어에 있어야 한다.
- `data-terminal-start-command-center`와 `data-terminal-primary-action`들이 시작 화면에 있어야 한다.
- `terminal-advanced-start`가 고급 입력 영역을 접어야 한다.
- 기존 `data-terminal-command-center`, 검색, 클립보드, 빠른 명령 기능이 유지되어야 한다.
