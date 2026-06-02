# 요청-결과 추적: 크로스 플랫폼 설치형 데스크톱 플랫폼

## 요청

지금까지 만든 플랫폼을 정리해 macOS와 Windows에서 설치 가능한 현실적인 소프트웨어 구조로 만들고, Codex/Claude Code/Cursor/Antigravity 같은 도구를 플랫폼 위에서 설정 가능한 capability로 두며, 오래되거나 모순적인 구조를 정리해 달라는 요청.

## 처리

- `governance` 모드로 처리했다.
- 공식 문서 중심 웹 검색을 먼저 수행했다.
- Tauri v2/Rust desktop shell, `workspace-monitor` static UI, Python `agent-platform`, optional CLI adapter 구조를 선택했다.
- Windows 실행 프로파일을 추가했다.
- Tauri source scaffold와 readiness/test 스크립트를 추가했다.
- 공유 요구사항과 프로젝트 요구사항, 스펙, memory bootstrap, persistent instructions, project registry를 갱신했다.

## 결과 산출물

- `platform-desktop-app/src-tauri/`
- `platform-desktop-app/package.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/configs/windows-execution-profile.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/docs/architecture/cross-platform-installable-runtime-decision.ko.md`
- `platform-desktop-app/specs/2026-06-02-cross-platform-installable-runtime/`
- `_requirements/baselines/2026-05-31-workspace-platform.ko.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## 검증

- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`
- JSON validation
- `check-config-contract`
- `check-memory-bootstrap`
- docs audit
- workspace maps regeneration
- omission/resource/CLI pipeline/grounding/evaluator checks

## 제한

- 실제 Rust/Tauri dependency 설치는 하지 않았다.
- 실제 Tauri compile/build는 하지 않았다.
- signed macOS/Windows installer는 생성하지 않았다.
- public-ready 상태는 아니다. signing/notarization/code-signing/clean-machine smoke test가 필요하다.
