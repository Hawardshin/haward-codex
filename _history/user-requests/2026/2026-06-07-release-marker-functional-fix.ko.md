# 2026-06-07 사용자 요청 요약: 기능적 이슈 구현

## 요청 요약

- 이전 구조 분리와 패키징 복구 이후, 남은 기능적 이슈를 구현해 달라는 요청.

## 선택한 이슈

- public release preflight가 `service-update-channel.json` runtime marker 검사를 `lib.rs` 단일 파일에만 의존해, 실제 runtime feature module과 generated public Tauri config가 준비되어도 blocker로 남는 문제.

## 작업 범위

- `check-release-readiness.mjs`가 Rust runtime source 전체와 public generated Tauri config resource map을 함께 검사하도록 수정.
- `customer-bundle.test.mjs`가 marker 검사를 passed로 요구하도록 회귀 테스트 추가.

## 비범위

- Developer ID signing, Apple notarization credentials, Tauri updater private/public key, updater endpoint, release asset URL, clean-machine smoke test 제공.
