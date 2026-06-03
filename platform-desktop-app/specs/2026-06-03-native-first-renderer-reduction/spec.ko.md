# Native-first renderer reduction 스펙

## 목표

- desktop preference persistence를 renderer `localStorage`에서 Tauri native app config로 이동한다.
- native runtime이 설치 앱의 설정 source of truth가 되게 한다.
- renderer는 사용자 입력, 화면 반영, command invoke만 담당하도록 첫 slice를 진행한다.

## 사용자 관점 Gate

- 사용자 목표: 설치 앱 설정이 웹 브라우저 캐시처럼 느껴지지 않고 앱 자체 설정으로 유지된다.
- 첫 행동: 설정 dialog에서 테마/언어/좌측 rail/터미널/실행 기본값을 바꾼다.
- 다음 피드백: 설정 데이터 탭에서 저장 상태와 native preferences path를 확인할 수 있다.
- 헷갈릴 지점: raw path는 기본 화면이 아니라 설정 데이터 탭에만 표시한다.
- 성공 근거: 앱 재실행 후 native command가 `desktop-preferences.v1.json`을 읽어 같은 설정을 복원한다.

## 언어/런타임 선택

- 선택지 A: Tauri Rust backend + 얇은 React/Next renderer
  - 장점: 기존 프로젝트 경계, Tauri command, app config path, Rust filesystem 검증을 그대로 활용한다.
  - 단점: renderer가 남으므로 완전 native widget 앱은 아니다.
- 선택지 B: Electron/Node main process + React renderer
  - 장점: Node 기반 상태 관리와 파일 API가 익숙하다.
  - 단점: 이미 Tauri 패키징/검증이 구축되어 있고 binary/runtime cost가 커진다.
- 선택지 C: Rust-only native GUI
  - 장점: webview 의존을 크게 줄일 수 있다.
  - 단점: Monaco editor, current Next renderer, 기존 workbench 구현을 대량 폐기해야 하며 즉시 제품 기능 개선 속도가 떨어진다.
- 선택: A. 지금은 native ownership을 Tauri/Rust로 옮기고, renderer는 전문 UI와 화면 composition만 담당하게 줄인다.

## 아키텍처 선택

- 선택지 A: renderer state owner
  - `localStorage`와 React state가 설정을 소유한다.
  - 기각: 설치 앱 같지 않고 브라우저 캐시 의존이 된다.
- 선택지 B: native command state owner
  - Rust command가 설정 schema, storage path, normalization을 소유하고 renderer는 invoke만 한다.
  - 선택: 이번 slice에 적용한다.
- 선택지 C: external config service
  - 별도 daemon/service가 설정과 runtime state를 소유한다.
  - 보류: current preference persistence에는 과하다.

## 구현 범위

- `DesktopPreferences` Rust schema와 `DesktopPreferencesReport`를 추가한다.
- `get_desktop_preferences`, `save_desktop_preferences` Tauri command를 추가한다.
- 설정 파일은 app config 경로의 `desktop-preferences.v1.json`으로 저장한다.
- `MonitorShell.tsx`의 `localStorage` preference persistence를 제거한다.
- settings data tab에 native preference store 상태와 경로를 표시한다.
- runtime contract, readiness script, readiness tests에 preference commands와 no-localStorage guard를 추가한다.

## 비범위

- 전체 React renderer 제거
- source editor/terminal UI의 Rust-native widget 전환
- multi-window preference sync
- public release gate 완료 주장
