# 요청-결과 추적: CLI task-run 상세/정리 기능

- 요청 ID: UR-2026-06-03-005
- 요청 요약: 플랫폼 소스코드 구현을 계속 진행
- 소유 프로젝트: `platform-desktop-app/`, `workspace-monitor/`

## 결과

- Tauri runtime에 `read_cli_task_run_record` 명령을 추가해 저장된 `record.json`, `stdout.log`, `stderr.log`를 bounded preview로 읽는다.
- Tauri runtime에 `prune_cli_task_run_records` 명령을 추가해 최신 30개를 기본 유지하고 오래된 task-run 디렉터리를 정리한다.
- prune 대상은 canonical path가 task-run store 내부인 디렉터리로 제한했다.
- Workspace Monitor Desktop 탭에 `Open Logs`, `Prune Old`, stdout/stderr/record JSON preview UI를 추가했다.

## 구현 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`

## 남은 제약

- Rust toolchain이 설치되지 않아 실제 Tauri compile/build는 아직 검증하지 못했다.
