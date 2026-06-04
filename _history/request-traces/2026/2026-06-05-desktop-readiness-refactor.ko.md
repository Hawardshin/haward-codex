# 2026-06-05 Desktop Readiness Refactor Trace

## Request

사용자가 리팩토링을 요청했다.

## Outcome

- `platform-desktop-app/scripts/readiness/desktop-build-pipeline.mjs`를 추가했다.
- `check-readiness.mjs`에서 desktop build/package script, README/runbook, pipeline structure token 검증을 제거하고 새 모듈 호출로 대체했다.
- `desktopBuildPipelineRequiredFiles`를 통해 build pipeline 필수 파일 목록을 새 모듈이 소유하게 했다.
- `tests/readiness.test.mjs`가 새 readiness 모듈 존재와 exports를 확인하게 했다.

## Validation

- dynamic import smoke for `desktop-build-pipeline.mjs`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed
- `corepack pnpm --filter platform-desktop-app run check`: passed

## Notes

- `check-readiness.mjs`는 1163줄에서 1044줄로 줄었다.
- Generated snapshot JSON files remain unstaged build outputs.
