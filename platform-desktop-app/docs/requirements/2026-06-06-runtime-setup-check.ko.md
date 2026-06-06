# Requirement: Runtime Setup Check

## 배경

사용자가 터미널 셸, 시작 명령, 기본 CLI 어댑터를 설정해도 설정 화면에서 실제 실행 가능 여부를 바로 확인할 수 없다. 특히 macOS GUI 앱은 셸 dotfile의 `PATH`를 그대로 상속하지 않을 수 있으므로, 단순 저장 여부가 아니라 설치형 런타임이 보는 실행 경로를 확인해야 한다.

## 요구사항

- `REQ-RSC-001`: 설정 화면의 CLI 어댑터 섹션은 선택된 기본 CLI 어댑터를 즉시 점검하는 버튼을 제공해야 한다.
- `REQ-RSC-002`: 점검은 기존 CLI adapter health check를 재사용해 실제 PATH에서 command를 찾고 version command 결과를 반영해야 한다.
- `REQ-RSC-003`: 설정 화면은 현재 터미널 셸 설정 또는 시스템 기본 셸이 설치형 런타임에서 실행 파일로 해석되는지 보여줘야 한다.
- `REQ-RSC-004`: 터미널 셸 점검은 새 장기 PTY 세션을 만들지 않고 cwd와 command 해석만 확인해야 한다.
- `REQ-RSC-005`: 점검 결과는 한국어/영어 UI에서 상태, 경로, 오류를 확인할 수 있어야 하며 CLI 명령 복사 흐름과 충돌하지 않아야 한다.

## 비범위

- CLI 자동 설치.
- 로그인/OAuth 자동 완료.
- shell startup command의 의미 실행이나 secret-bearing command 실행.
- public release signing/notarization 해결.

## 수용 기준

- `MonitorShell.tsx` 설정 adapter 섹션에 runtime setup check UI가 있다.
- Rust/Tauri는 terminal shell setup check command를 제공한다.
- 선택된 CLI adapter 점검 결과와 terminal shell 점검 결과가 설정 화면에 같이 표시된다.
- renderer test와 desktop package pipeline이 통과한다.
