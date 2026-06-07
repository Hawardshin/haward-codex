# 2026-06-07 Service Readiness panel split 웹 검색 기록

## 검색 목적

이어서 구현 요청을 처리하기 전에 Tauri updater와 macOS public 배포 게이트가 현재 구현 방향과 맞는지 확인했다.

## 확인한 출처

- Tauri 공식 Updater 문서: https://v2.tauri.app/ko/plugin/updater/
- Tauri 공식 macOS Code Signing 문서: https://v2.tauri.app/fr/distribute/sign/macos/
- Tauri Updater JavaScript API 문서: https://v2.tauri.app/zh-cn/reference/javascript/updater/

## 계획 영향

- updater는 앱 런타임/manifest 준비도를 사용자에게 보이게 유지하되, public 배포 준비 완료 주장은 signing, notarization, updater endpoint, smoke 검증 뒤로 남긴다.
- 이번 구현은 외부 배포 secret이나 endpoint를 추정하지 않고, 이미 구현된 Service Readiness UI를 별도 feature 컴포넌트로 분리해 유지보수성을 높인다.

## 불확실성

- 외부 signing/notarization/updater endpoint 값은 로컬 코드만으로 확인할 수 없으므로 계속 public blocker로 둔다.
