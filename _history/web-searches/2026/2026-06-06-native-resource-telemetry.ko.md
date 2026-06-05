# 웹 검색 기록: Native Resource Telemetry

## 검색 시각

2026-06-06

## 질의

- `Tauri v2 official docs updater plugin code signing notarization macOS`
- `Apple official Developer ID notarization hardened runtime command line notarytool docs`
- `Tauri v2 official docs system information process memory CPU Rust plugin shell process`
- `Rust sysinfo crate official docs process CPU memory refresh API`

## 확인한 강한 출처

- Tauri Updater Plugin: https://v2.tauri.app/plugin/updater/
- Tauri Process Plugin: https://v2.tauri.app/plugin/process/
- Tauri macOS Code Signing: https://v2.tauri.app/distribute/sign/macos/
- Apple Developer notarization docs: https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution
- sysinfo docs: https://docs.rs/sysinfo/

## 계획 반영

- updater/signing/notarization은 자격증명과 signed endpoint가 필요하므로 로컬 코드 변경만으로 public-ready라고 주장하지 않는다.
- 이미 project-local `sysinfo`가 있으므로 새 dependency를 설치하지 않고 현재 앱 process/system telemetry를 추가한다.
- Tauri plugin-process는 app process/system memory telemetry 목적에는 과하지 않으므로 사용하지 않는다.

## 약한 출처 처리

- Reddit/Tauri community 글은 notarization pain point와 updater confusion의 adoption/risk signal로만 보았고 구현 근거로 쓰지 않았다.
