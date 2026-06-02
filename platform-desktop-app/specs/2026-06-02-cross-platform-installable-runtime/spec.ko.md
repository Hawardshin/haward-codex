# 크로스 플랫폼 설치형 런타임 스펙

## 목표

macOS와 Windows에서 설치형 앱으로 발전할 수 있는 실제 제품 구조를 만든다. 현재 저장소는 Codex 위에서 개발하지만, 최종 플랫폼은 Codex, Claude Code, Cursor, Antigravity 같은 AI 코딩 도구를 선택형 capability로 설정할 수 있어야 한다.

## 범위

- Tauri v2/Rust 데스크톱 셸 스캐폴드
- `workspace-monitor` 정적 UI 재사용
- `agent-platform` Python 계층을 renderer 밖에 두는 런타임 경계
- Windows 실행 프로파일 추가
- macOS/Windows release gate 정리
- 설치형 제품과 repository setup `install_mode`의 경계 유지
- readiness check와 Node test 추가

## 제외

- 실제 Rust toolchain 설치
- Tauri dependency 설치
- signed macOS/Windows installer 생성
- notarization, code signing, updater server 구성
- Python sidecar 또는 Go daemon 실제 구현
- Codex/Claude/Cursor/Antigravity CLI 자동 실행

## 선택 아키텍처

```text
Tauri desktop shell (Rust)
  -> workspace-monitor static export (Next.js)
  -> selected workspace docs/history/specs
  -> future platform execution boundary
      -> agent-platform Python command/service/sidecar
      -> optional AI coding CLI adapters
```

## 수용 기준

- `platform-desktop-app/package.json`에 check/test/Tauri scripts가 있다.
- `platform-desktop-app/src-tauri/`에 Tauri v2 설정, Rust entrypoint, capability 파일이 있다.
- `desktop-distribution-registry.json`이 selected Tauri-first architecture와 Windows profile을 참조한다.
- `windows-execution-profile.json`이 self-documenting config 계약을 만족한다.
- `npm --prefix platform-desktop-app run check`가 통과한다.
- `npm --prefix platform-desktop-app test`가 통과한다.
- 실제 installer가 없다는 제한과 다음 설치 감사 단계가 문서화되어 있다.

## 위험

- Rust toolchain이 현재 설치되어 있지 않아 Tauri build는 아직 막혀 있다.
- macOS/Windows public distribution은 서명/공증/SmartScreen/clean-machine smoke test 없이는 주장할 수 없다.
- CLI 실행을 너무 빨리 붙이면 command injection, path traversal, orphan process, resource leak 위험이 생긴다.

