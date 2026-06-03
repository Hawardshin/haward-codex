# 웹 검색 기록: installer shell runtime contract

## 요청

- 날짜: 2026-06-03
- 작업: `platform-desktop-app` 전체 구조를 설치 프로그램과 설치 앱 shell/runtime 중심으로 리팩토링한다.

## 검색

- `Tauri v2 official docs shell plugin sidecar command app data directory permissions`
- `Tauri v2 official docs filesystem plugin app data config directory scope`
- `Tauri v2 official docs updater installer sidecar capabilities`
- `Tauri v2 tauri.conf.json bundle resources external resources syntax official docs`

## 확인한 강한 출처

- Tauri Shell plugin reference: sidecar command는 capabilities에 등록된 program만 실행해야 한다.
- Tauri File System plugin docs: 앱 전용 config/data/local data/cache/log 디렉터리와 scope/deny 기반 접근 경계가 있다.
- Tauri Resources docs: `tauri.conf.json > bundle > resources`로 frontendDist 밖 파일을 앱 resource에 포함하고 Rust에서 resource path로 읽을 수 있다.
- Tauri Updater docs: updater/public distribution은 signature와 install mode 같은 별도 release gate가 필요하다.

## 계획 영향

- 외부 shell sidecar를 새로 설치하거나 plugin-shell을 추가하지 않고, 현재 Rust/Tauri backend를 platform-first shell runtime으로 유지한다.
- 설치 앱이 읽는 계약은 `runtime-contracts/installer-shell-runtime-contract.json`으로 만들고 Tauri resource로 번들한다.
- shell 실행과 데이터 축적은 앱 데이터/log/agent workspace boundary를 따라야 한다.
- validator는 contract file, resource mapping, Rust command, enforcement gates, data accumulation targets를 함께 검사해야 한다.

## 불확실성

- 이번 변경은 sidecar binary 추가가 아니라 contract bundling과 Rust command read path 구현이다. 외부 sidecar shell이 필요해지는 시점에는 별도 capability, installation audit, rollback plan이 필요하다.
