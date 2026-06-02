# 2026-06-03 설치 기록: platform-desktop-app Tauri/Rust local build setup

## 상태

- 상태: installed
- 설치 대상: Rust/Tauri 데스크톱 로컬 빌드 경로
- 소유 프로젝트/도구: `platform-desktop-app`
- 설치 범위: project
- 환경 경로: `platform-desktop-app/node_modules/`, `workspace-monitor/node_modules/`, `platform-desktop-app/src-tauri/target/`, 사용자 로컬 Cargo cache

## 설치 이유

- 사용자가 필수 설치를 완료하고 Rust로 로컬 빌드와 테스트를 실행하라고 요청했다.
- `platform-desktop-app` README에는 Rust/Tauri 빌드가 Rust와 Tauri dependency 설치 전까지 막혀 있다고 기록되어 있었다.
- 전역 Rust toolchain은 이미 설치되어 있어 새 전역 설치는 하지 않고, 프로젝트 로컬 npm 의존성과 Cargo 의존성 해소/빌드를 감사 대상으로 둔다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| https://rust-lang.github.io/rustup/installation/ | 2026-06-03 | `rustup`이 `rustc`, `cargo`, 표준 도구를 Cargo bin 경로에 설치한다는 공식 설치 기준 확인 |
| https://doc.rust-lang.org/cargo/commands/cargo-build.html | 2026-06-03 | `cargo build`가 로컬 패키지와 dependency를 컴파일한다는 공식 기준 확인 |
| https://doc.rust-lang.org/stable/cargo/guide/tests.html | 2026-06-03 | `cargo test`가 Rust 테스트 실행 기준임을 확인 |
| https://v2.tauri.app/start/prerequisites/ | 2026-06-03 | Tauri v2 macOS/Rust/Node 전제 조건 확인 |
| https://v2.tauri.app/start/create-project/ | 2026-06-03 | Tauri CLI를 npm devDependency로 설치하고 `tauri dev/build`를 실행하는 공식 흐름 확인 |
| `platform-desktop-app/README.md` | 2026-06-03 | 현재 프로젝트가 Tauri v2 scaffold이고 설치 audit 후 `npm install`, `tauri:dev`, `tauri:build`가 계획되어 있음을 확인 |

## 설치 계획

- 정확한 설치 명령:
  - `npm --prefix platform-desktop-app ci`
  - `npm --prefix workspace-monitor ci`
  - `cd platform-desktop-app/src-tauri && cargo fetch`
  - `cd platform-desktop-app/src-tauri && cargo test`
  - `cd platform-desktop-app/src-tauri && cargo build`
  - `npm --prefix platform-desktop-app run tauri:build`
- dependency 기록 파일:
  - `platform-desktop-app/package.json`
  - `platform-desktop-app/package-lock.json`
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`
  - `workspace-monitor/package.json`
  - `workspace-monitor/package-lock.json`
- lock/SBOM 상태:
  - npm lock 파일은 기존 lock을 `npm ci`로 사용한다.
  - Cargo lock 파일은 첫 Cargo dependency 해소 후 생성했고 애플리케이션 재현성을 위해 추적 대상으로 바꿨다.
  - SBOM은 생성하지 않는다.
- 예상 변경 파일:
  - `platform-desktop-app/src-tauri/Cargo.lock`
  - 설치/검증 기록과 작업 기록
  - 빌드 실패를 고치는 데 필요한 `platform-desktop-app` 또는 `workspace-monitor` 소스/설정 파일
- 권한 승인 필요 여부:
  - 사용자가 설치와 개선 시작 권한을 명시했다.
  - 새 전역 Rust 설치는 하지 않는다.

## 보안/라이선스 검토

- 보안 검토:
  - 설치는 프로젝트 로컬 npm dependency와 Cargo registry dependency 해소로 제한한다.
  - `npm ci`는 lock 파일 기준 설치라 dependency drift를 줄인다.
  - Cargo dependency는 `Cargo.lock` 생성 후 후속 검증에서 lock 기반 재현성을 확인한다.
- 라이선스 검토:
  - Tauri 공식 문서는 사이트 하단에 CC-BY/MIT를 표시한다.
  - 직접 npm dependency `@tauri-apps/cli`는 Tauri 프로젝트 dependency로 사용한다.
  - Rust crates는 Cargo.lock 생성 후 직접 dependency 중심으로 기록한다.
- 유지보수/커뮤니티 신호:
  - Tauri v2는 공식 문서와 npm CLI 경로가 유지되는 성숙한 데스크톱 framework이다.
  - Cargo/Rustup은 Rust 공식 도구체인이다.
- 알려진 위험:
  - Tauri 번들 단계는 macOS icon, signing, notarization, platform target 설정에 민감하다.
  - `npm run tauri:build`가 frontend build를 중복 실행할 수 있다.
  - 현재 요청은 로컬 개발 빌드/테스트이지 public macOS 배포 readiness가 아니다.

## 설치 후 실제 결과

- 실행한 명령:
  - `npm --prefix platform-desktop-app ci`
  - `npm --prefix workspace-monitor ci`
  - `cd platform-desktop-app/src-tauri && cargo fetch`
  - `cd platform-desktop-app/src-tauri && cargo test`
  - `cd platform-desktop-app/src-tauri && cargo build`
  - `npm --prefix platform-desktop-app run tauri:build`
  - `npm --prefix workspace-monitor install` after adding the `dompurify` override
  - `npm --prefix workspace-monitor ci`
  - `npm --prefix workspace-monitor audit --audit-level=moderate`
  - `codesign --verify --deep --strict --verbose=2 "platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app"`
  - `hdiutil verify "platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg"`
- 설치된 버전:
  - rustup: `rustup 1.29.0 (28d1352db 2026-03-05)`, preinstalled
  - rustc: `rustc 1.96.0 (ac68faa20 2026-05-25)`, preinstalled
  - cargo: `cargo 1.96.0 (30a34c682 2026-05-25)`, preinstalled
  - @tauri-apps/cli: `2.11.2`
  - tauri crate: `2.11.2`
  - tauri-build crate: `2.6.2`
  - monaco-editor: `0.55.1`
  - dompurify: `3.4.7` through `workspace-monitor` override
- 변경된 파일:
  - `platform-desktop-app/.gitignore`
  - `platform-desktop-app/README.md`
  - `platform-desktop-app/package.json`
  - `platform-desktop-app/package-lock.json`
  - `platform-desktop-app/src-tauri/Cargo.lock`
  - `platform-desktop-app/src-tauri/tauri.conf.json`
  - `platform-desktop-app/src-tauri/icons/`
  - `workspace-monitor/package.json`
  - `workspace-monitor/package-lock.json`
  - `workspace-monitor/public/workspace-snapshot.json`
  - `workspace-monitor/src/generated/workspace-snapshot.json`
  - close-out history/evaluation records for this task
- 생성/갱신된 lock 파일:
  - `platform-desktop-app/package-lock.json`
  - `platform-desktop-app/src-tauri/Cargo.lock`
  - `workspace-monitor/package-lock.json`
- 검증 명령과 결과:
  - `npm --prefix platform-desktop-app audit --audit-level=moderate`: 0 vulnerabilities
  - `npm --prefix platform-desktop-app ls @tauri-apps/cli`: `@tauri-apps/cli@2.11.2`
  - `npm --prefix platform-desktop-app run check`: passed, `ready_for_dependency_install_audit`
  - `npm --prefix platform-desktop-app test`: 7 tests passed
  - `npm --prefix workspace-monitor audit --audit-level=moderate`: 0 vulnerabilities
  - `npm --prefix workspace-monitor ls dompurify monaco-editor`: `monaco-editor@0.55.1`, `dompurify@3.4.7 overridden`
  - `npm --prefix workspace-monitor run check`: passed
  - `npm --prefix workspace-monitor test`: 12 tests passed
  - `npm --prefix workspace-monitor run build`: passed
  - `cd platform-desktop-app/src-tauri && cargo test`: passed, 0 Rust tests present
  - `cd platform-desktop-app/src-tauri && cargo build`: passed
  - `npm --prefix platform-desktop-app run tauri:build`: passed
  - `codesign --verify --deep --strict --verbose=2 ...Agent Workspace Platform.app`: valid on disk and satisfies its Designated Requirement
  - `hdiutil verify ...Agent Workspace Platform_0.1.0_aarch64.dmg`: checksum valid
  - local app open/quit smoke: process started and no process remained after quit

## Rollback

- 제거 명령:
  - `rm -rf platform-desktop-app/node_modules`
  - `rm -rf workspace-monitor/node_modules`
  - `rm -rf platform-desktop-app/src-tauri/target`
  - `rm -f platform-desktop-app/src-tauri/Cargo.lock` if this task's Rust lock should be removed
- 되돌릴 파일:
  - 이 작업이 만든 설치/검증 기록
  - 이 작업이 만든 `Cargo.lock` 또는 빌드 수정을 명시적으로 되돌릴 때의 변경 파일
- 복구 검증:
  - `git status --short`
  - `npm --prefix platform-desktop-app test`

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-06-03.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-06-03-platform-desktop-tauri-rust-build-evaluation-result.json`
- 커밋: pending
