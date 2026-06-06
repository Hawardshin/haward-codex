# Validation: Subagent Tool Selection

## 완료

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer snapshot 갱신
- `corepack pnpm -w run desktop:renderer:build`: 통과, customer bundle 생성
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer snapshot 복원
- `corepack pnpm --dir platform-desktop-app run check`: 통과, 기존 public release warning만 유지
- Browser smoke `http://127.0.0.1:3224/#section-desktop`: 통과
  - `[data-terminal-agent-bridge="pty-to-agent"]`: 존재
  - `[data-terminal-agent-action="execute-subagent"]`: 존재, preview disabled
  - `[data-terminal-agent-action="fanout-subagents"]`: 존재, preview disabled
  - 버튼 문구: `선택 묶음 실행`
  - plan이 없는 browser preview에서는 `[data-subagent-tool-selector]`가 아직 없는 것이 정상이다.
- `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-07-subagent-tool-selection-cli-pipeline.json`: 통과, `pipeline_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-07-subagent-tool-selection.json`: 통과, `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-07-subagent-tool-selection.json`: 통과, `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-07-subagent-tool-selection-input.json`: 통과, `ready_to_close`
- `git diff --check`: 통과

## 알려진 경계

- Browser preview는 native Tauri command를 직접 실행하지 못하므로 selector DOM contract는 static test로, shell 렌더링은 Browser smoke로 검증한다.
- 실제 CLI fan-out process start는 packaged desktop runtime smoke가 더 강한 검증이다.
