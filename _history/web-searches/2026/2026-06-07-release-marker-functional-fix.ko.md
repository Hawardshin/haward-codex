# 2026-06-07 release marker 기능 이슈 웹 검색 기록

## 검색 목적

- public release preflight와 Tauri runtime/update marker 검사 사이의 기능 결손을 고치기 전, Tauri command/error handling, React async 상태, Rust visibility/module 경계를 공식 문서 중심으로 확인했다.

## 확인한 출처

- Tauri 공식 문서, Calling Rust from the frontend: https://v1.tauri.app/v1/guides/features/command
- React 공식 문서, Managing State: https://react.dev/learn/managing-state
- React 공식 문서, Sharing State Between Components: https://react.dev/learn/sharing-state-between-components
- Rust Reference, Visibility and Privacy: https://doc.rust-lang.org/reference/visibility-and-privacy.html

## 계획 영향

- runtime 기능 구현은 Rust feature module에 유지하고, release preflight는 해당 feature module과 generated public Tauri config를 함께 검사해야 한다고 판단했다.
- public readiness blocker는 외부 signing/notarization/updater credentials와 코드/번들 marker 결손을 구분해야 한다.

## 약한 출처

- Q&A와 일반 블로그는 사용하지 않았다.

## 불확실성

- 실제 public release는 외부 자격증명, updater endpoint, clean-machine smoke가 필요하므로 이번 수정으로 public ready를 주장하지 않는다.
