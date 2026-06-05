# 평가: 구현 완료 후 자동 빌드 규칙

## 결과

- 사용자의 지속 지시를 durable instruction과 Codex runtime adapter에 반영했다.
- 의미 있는 구현 작업은 최종 응답 전에 담당 프로젝트의 build/package 명령을 실행해야 한다.
- build 명령이 없거나 부적절한 경우 이유와 가장 강한 대체 검증을 기록하도록 예외 조건을 명시했다.
- memory bootstrap manifest에 이 규칙을 persistent instruction hot context로 연결했다.

## 검증

- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-05-auto-build-after-implementation-omission.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-05-auto-build-after-implementation-input.json`: `ready_to_close`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-05-auto-build-after-implementation.json`: 통과, partial timing warning 있음
- `corepack pnpm --filter workspace-monitor run collect`: developer snapshot 재생성
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과, stale public snapshot warning은 prebuild 허용 경고
- `git diff --check`: 통과

## 빌드 적용성

- 이번 작업은 제품 source implementation이 아니라 운영 규칙과 memory config 변경이다.
- owning project build/package 대상이 없으므로 docs audit, memory bootstrap, config contract, omission guard, evaluator, Workspace Monitor check, platform desktop check를 대체 검증으로 사용했다.

## 잔여 리스크

- 향후 실제 구현 작업에서는 이 규칙을 close-out에서 지켜야 한다. 빌드를 생략하는 경우 최종 응답과 평가 기록에 예외 사유가 남아야 한다.
