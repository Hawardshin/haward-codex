# 검증: 구현 완료 후 자동 빌드 규칙

## 검증 계획

- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-05-auto-build-after-implementation-omission.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-05-auto-build-after-implementation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-05-auto-build-after-implementation.json`
- `git diff --check`

## 결과

- `python3 _tools/docs-audit/src/docs_audit.py --check`: `docs_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-05-auto-build-after-implementation-omission.json`: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-05-auto-build-after-implementation-input.json`: `ready_to_close`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-05-auto-build-after-implementation.json`: `ready`, timing은 사후 partial 기록이라 phase duration 경고 있음
- `corepack pnpm --filter workspace-monitor run collect`: developer public snapshot 재생성, 650 inline documents와 2247 admin history records 기록
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과, customer fallback 관련 stale public snapshot warning은 허용된 prebuild 경고
- `git diff --check`: 통과

## 빌드 적용성

- 이번 변경은 제품 source implementation이 아니라 durable instruction과 memory config 변경이다.
- owning project build/package 대상이 없으므로 전체 제품 빌드 대신 docs audit, memory bootstrap, config contract, omission guard, evaluator, Workspace Monitor check, platform desktop check를 대체 검증으로 사용한다.
