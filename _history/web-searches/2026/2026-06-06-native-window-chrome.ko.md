# 2026-06-06 네이티브 창 크롬 활용 웹 검색

## 질의

- `Tauri v2 native window APIs theme color titlebar macOS official docs`
- `Tauri v2 commands invoke Rust native desktop app state official docs`
- `Apple Human Interface Guidelines macOS materials controls toolbar sidebar official`
- `Tauri v2 window effects vibrancy macOS official docs`
- `site:v2.tauri.app data-tauri-drag-region allow-start-dragging Tauri v2`
- `Tauri v2 hiddenTitle titleBarStyle Transparent backgroundColor config windows`

## 확인한 강한 출처

- Tauri Configuration: https://v2.tauri.app/reference/config/
- Tauri Window Customization: https://v2.tauri.app/learn/window-customization/
- Tauri Core Permissions: https://v2.tauri.app/reference/acl/core-permissions/
- Tauri 2.11.0 release note: https://v2.tauri.app/release/tauri/v2.11.0/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines

## 약한 출처 처리

- Reddit/Electron/Windows titlebar 관련 검색 결과는 운영체제별 증상 발견용 신호로만 보았고 구현 근거로 쓰지 않았다.
- 공식 문서와 현재 `Cargo.lock`의 Tauri 2.11.2를 더 강한 근거로 사용했다.

## 계획 반영

- Tauri window config에 `hiddenTitle`, `titleBarStyle`, `backgroundColor`가 존재함을 확인해 `tauri.conf.json`에 직접 반영한다.
- Tauri drag region은 직접 적용된 요소 기준으로 동작하고 Tauri 2.11.0부터 `deep`/`false`가 지원되므로 제목 영역은 `deep`, 조작 컨트롤은 `false`를 사용한다.
- `start_dragging` permission은 capability에 명시해 native window dragging 계약을 readiness gate로 고정한다.

## 불확실성

- macOS vibrancy/material effect는 이번 slice에서 도입하지 않았다. 시각 효과보다 창 이동/크롬 통합이 더 직접적인 네이티브 계약이고, 추가 Rust/AppKit 의존성은 별도 검증이 필요하다.
