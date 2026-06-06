# Validation: Editable Runtime Prompts

날짜: 2026-06-07

## 완료된 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 결과: 통과.
  - 확인: TypeScript, lazy boundary, scroll contract, source control design, comprehensive improvement contract, history payload.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
  - 결과: 통과.
  - 확인: 90 tests pass.
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml desktop_prompt_customization_keeps_only_allowed_prompt_keys`
  - 결과: 통과.
  - 확인: 허용 session/task-pipe prompt key만 보존하고 빈 값/알 수 없는 key 제거.

## 후속 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
  - 결과: 통과.
  - 확인: 650 inline documents, 2834 admin history records.
- `corepack pnpm -w run desktop:renderer:build`
  - 결과: 통과.
  - 확인: Next production build와 customer bundle audit 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
  - 결과: 통과.
  - 확인: developer public snapshot 재생성.
- `corepack pnpm --dir platform-desktop-app run check`
  - 결과: 통과.
  - 참고: 기존 public release gate 경고와 dev snapshot stale 경고가 남는다. customer-safe fallback과 `out` snapshot은 build에서 통과했다.
- Browser smoke
  - 결과: 통과.
  - 확인: Desktop Runtime 운영 진단 패널에서 작업 파이프라인 프롬프트 저장 후 `customized` 상태와 "수정된 프롬프트" 표시 확인.
  - 확인: 작업 파이프라인 프롬프트 기본값 reset 후 `customized` 제거와 기본값 복원 확인.
  - 확인: 하단 터미널 세션 프롬프트 저장 후 `customized` 상태와 "수정된 프롬프트" 표시 확인.
  - 확인: 세션 프롬프트 기본값 reset 후 `customized` 제거와 기본값 복원 확인.
  - 확인: Next dev server 종료 후 TCP 3224 listener 없음.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-07-editable-runtime-prompts.json`
  - 결과: 통과. `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-07-editable-runtime-prompts.json`
  - 결과: 통과. `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-07-editable-runtime-prompts-input.json`
  - 결과: 통과. `ready_to_close`.
