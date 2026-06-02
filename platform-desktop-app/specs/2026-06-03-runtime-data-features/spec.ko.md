# Runtime Data Feature 스펙

## 목표

- 이전 runtime data boundary에서 비범위였던 OS storage adapter, installer payload scanner, support diagnostic bundle, customer snapshot sanitization을 구현한다.
- 설치형 고객이 platform source tree를 제품 기능으로 보지 않도록 Tauri build의 공개 snapshot을 별도로 정제한다.

## 기능

- `list_runtime_data_roots`: app config/data/local data/cache/log, task-run store, agent workspace, support bundle, payload audit root를 생성하고 보고한다.
- `run_installer_payload_audit`: Tauri resource payload를 순회하며 source/private/internal artifact 위험을 기록한다.
- `create_support_diagnostic_bundle`: redacted manifest와 bounded task-run metadata summary를 app data 아래 support bundle로 내보낸다.
- `buildCustomerSnapshot`: customer static build에서 source/docs/history/internal artifacts를 제거한 snapshot을 public bundle에 쓴다.
- `check-customer-bundle.mjs`: Tauri `frontendDist`로 임베드될 `workspace-monitor/out`과 `public` snapshot을 빌드 타임에 audit한다.
- `check-release-readiness.mjs`: internal/local build와 public distribution release blocker를 분리해 보고한다.

## 비범위

- public macOS notarization, auto updater, Windows NSIS smoke test.
- 고객 workspace 자체의 backup/export 정책 전체 구현.
- Developer ID certificate, notarization credential 발급 또는 secret 저장.
