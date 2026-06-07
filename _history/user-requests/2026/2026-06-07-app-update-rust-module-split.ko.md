# 2026-06-07 사용자 요청 요약: 앱 업데이트 Rust 모듈 분리

## 요청

기능적 이슈 없이 계속해서 큰 소스를 분리하고 중복 구조를 줄여 달라는 요청.

## 해석한 작업 범위

- 최근 UI와 패키징 구조 분리 뒤 남아 있는 Rust 런타임의 큰 `lib.rs`에서 앱 업데이트 관련 책임을 안전하게 분리한다.
- 자동 업데이트 기능이 깨지지 않도록 Tauri command, shared state, readiness checks, package pipeline까지 검증한다.

## 제외

- 공개 배포용 Developer ID 서명, notarization, 실제 HTTPS updater endpoint, updater signing key 구성은 이번 슬라이스에서 설정하지 않았다. 서비스 준비도 리포트에 기존 공개 배포 경고로 남겨 두었다.
- 기존 worktree에 섞여 있던 다른 변경은 되돌리거나 정리하지 않았다.
