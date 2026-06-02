# 계획: Desktop CLI Supervisor MVP

## 작업 모드

- 선택: `governance`
- 이유: 설치형 앱의 실제 subprocess 실행 경로, UI runtime surface, view mode, resource/CLI pipeline gate를 바꾸는 작업이다.

## 범위

- Tauri backend에 allowlist CLI 탐지와 bounded health check command 추가
- `workspace-monitor`에 Desktop 탭과 Tauri/browser fallback 추가
- view mode registry의 `desktop` section 노출
- readiness/test/build 검증

## 비범위

- Rust/Tauri dependency 설치
- Tauri dev/build 실행
- shell plugin, xterm.js, Monaco, PTY 설치
- stdin write, interactive prompt handling, source-affecting CLI execution
- provider auth management

## 구현 순서

1. web-first intake와 memory bootstrap을 수행한다.
2. 기존 `platform-desktop-app`와 `workspace-monitor` 구조를 확인한다.
3. Rust backend command를 구현한다.
4. Desktop UI 탭과 browser fallback을 구현한다.
5. readiness/test/build를 갱신하고 실행한다.
6. omission/resource/grounding/evaluation 기록으로 close-out한다.
