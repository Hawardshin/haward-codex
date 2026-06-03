# 2026-06-04 provider direct API reqwest dependency

## 요약

- 상태: installed
- 범위: project-local dependency
- 소유 프로젝트: platform-desktop-app
- 패키지 매니저: cargo
- 목적: 저장된 OpenAI, Anthropic, Gemini provider credentials를 기반으로 외부 CLI 없이 직접 모델 API 작업을 실행하기 위해 Rust/Tauri 백엔드에 HTTP client 의존성을 명시한다.

## 설치 명령과 변경 범위

- 설치 방식: `platform-desktop-app/src-tauri/Cargo.toml`에 `reqwest = { version = "0.13.4", features = ["json"] }` 직접 의존성 추가
- 실제 resolution 명령: `cd platform-desktop-app/src-tauri && cargo check`
- 변경된 dependency record:
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`
- 글로벌 설치: 없음

## 보안 검토

- 비밀 키는 provider API 요청 헤더에만 사용하고, task-run record에는 provider id, model, status, http status, redacted paths만 남긴다.
- support bundle은 provider credential store를 포함하지 않고, provider direct task record도 raw secret을 저장하지 않는다.
- HTTP 호출은 백엔드 명령 `run_provider_agent_task` 뒤에만 노출되며, provider id는 allowlisted definitions로 제한한다.
- public release 전 OS keychain adapter 전환은 별도 보안 개선으로 남는다.

## 라이선스 검토

- `reqwest`는 Rust 생태계의 널리 쓰이는 HTTP client이며 MIT OR Apache-2.0 라이선스로 알려져 있다.
- 이번 변경은 직접 의존성 선언이며, Cargo.lock에 transitive TLS/network dependencies가 기록된다.

## 검증

- `cargo check`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter workspace-monitor test`: passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `git diff --check`: passed
- 추가 플랫폼 검증은 같은 작업의 evaluation record에 기록했다.

## 롤백

1. `platform-desktop-app/src-tauri/Cargo.toml`에서 `reqwest` 직접 의존성을 제거한다.
2. `run_provider_agent_task` 및 provider direct API 호출 코드를 제거한다.
3. `cd platform-desktop-app/src-tauri && cargo update -p reqwest` 또는 lockfile 재생성으로 직접 의존성 변경을 되돌린다.
4. `cargo check`, `corepack pnpm --filter platform-desktop-app run check`, `corepack pnpm --filter platform-desktop-app test`를 다시 실행한다.
