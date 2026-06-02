# 질문 보류 검증

## 필수 검증

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ...`
- `python3 _tools/work-timer/src/work_timer.py check ...`

## 정적 확인

- built/static output에서 `Auto-defer questions`, `Defer detected questions`, `auto-deferred`, `pendingDecisionPrompts`, `defer_all_cli_adapter_questions`가 확인되어야 한다.

## 제한

- public macOS 배포 준비는 별도 signing/notarization 검증 전까지 완료로 보지 않는다.
- Rust toolchain이 없으면 `cargo check`는 실행하지 못하며 `platform-desktop-app run check`의 Rust 경고를 기록한다.
