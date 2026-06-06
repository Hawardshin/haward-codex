# 웹 검색 기록: desktop dev/run fix

## 목적

README 명령대로 desktop app을 빌드하거나 실행할 때 실패하는 문제를 고치기 전에, Tauri v2와 Next static export의 공식 실행/빌드 전제를 확인했다.

## 검색어

- `Tauri v2 official docs development build beforeDevCommand frontendDist devUrl`
- `Next.js official docs output export static build`
- `Tauri plugin updater v2 config pubkey endpoints official docs`

## 확인한 주요 출처

- Tauri Develop: https://v2.tauri.app/develop/
- Tauri Configuration: https://v2.tauri.app/reference/config/
- Tauri Updater: https://v2.tauri.app/plugin/updater/
- Next.js Static Exports: https://nextjs.org/docs/pages/guides/static-exports

## 계획 영향

- Tauri dev 실행은 `beforeDevCommand`가 실제 renderer dev server 경로를 가리켜야 한다.
- Tauri production/internal build는 `frontendDist`가 Next static export output을 가리켜야 한다.
- Tauri updater v2 plugin은 `plugins.updater.pubkey`와 `plugins.updater.endpoints` 설정을 전제로 하므로, public updater config가 없는 internal/dev 실행에서는 plugin 초기화를 건너뛰어야 한다.

## 약한 출처 처리

Reddit와 비공식 mirror는 문제 발견 신호로만 보고 구현 근거로 쓰지 않았다.

## 불확실성

public release updater artifact 성공은 Apple signing/notarization credential과 updater env가 준비된 환경에서 별도 검증해야 한다. 이번 fix는 local/internal 개발 실행과 내부 앱 실행 경로를 복구한다.
