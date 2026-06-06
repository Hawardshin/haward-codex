# Plan History: Native Pipe Runtime Tools

## 요약

사용자는 터미널/CLI 설정 확인을 넘어 파이프와 터미널 직접 제어에 필요한 강력한 네이티브 툴 설치를 요청했다. 전역 도구 설치보다 `platform-desktop-app` Rust 런타임에 OS pipe 의존성과 bounded pipe runner command를 추가하는 계획을 선택했다.

## 선택

- work_mode: `standard`
- install_mode: `developer`
- 구현 위치: `platform-desktop-app/src-tauri`
- 설치 대상: `os_pipe@1.2.3`

## 검증 게이트

- Cargo dependency/lock 검증.
- Rust/Tauri command compile.
- desktop runtime/readiness tests.
- workspace-monitor test/check.
- package internal pipeline.
- CLI pipeline/resource/omission records.
