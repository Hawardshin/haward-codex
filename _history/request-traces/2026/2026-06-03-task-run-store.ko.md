# 요청-결과 추적: CLI task-run store 구현

- 요청 ID: UR-2026-06-03-004
- 요청 요약: 스펙만 만들지 말고 계획한 설치형 플랫폼 기능을 실제 구현
- 소유 프로젝트: `platform-desktop-app/`, `workspace-monitor/`

## 결과

- Tauri runtime이 CLI 세션과 task pipe lane에 `task_run_id`, task kind, pipeline/lane provenance를 부여한다.
- 실행 상태 변경, stdout/stderr 변경, decision count 변경이 있으면 `platform-desktop-app/artifacts/task-runs/<task-run-id>/record.json`, `stdout.log`, `stderr.log`를 저장한다.
- 변화가 없을 때는 task-run persist signature로 파일 쓰기를 건너뛰어 polling 비용을 줄인다.
- Workspace Monitor Desktop 탭에 `Task Run Store` 패널, task-run metric, refresh action, 세션 record/log 경로 표시를 추가했다.

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
