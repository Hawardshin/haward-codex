# 검증 계획: desktop project management sliced implementation

## 명령 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect --best-effort`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
- `corepack pnpm --dir platform-desktop-app run renderer:build`
- `corepack pnpm --dir platform-desktop-app run test`
- `corepack pnpm --dir platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-desktop-project-management-sliced-implementation.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-08-desktop-project-management-sliced-implementation.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-desktop-project-management-sliced-implementation-evaluation-input.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `git diff --check`

## UI 검증

- Browser desktop viewport에서 `#section-projects` 진입 후 panel/detail/action/report markers 확인
- Browser mobile viewport에서 가로 overflow와 텍스트 겹침 없음 확인

## 수용 기준 매핑

- `REQ-DPMS-001`: collector tests
- `REQ-DPMS-002`: tool-studio tests, Browser smoke
- `REQ-DPMS-003`: collector tests, Browser smoke
- `REQ-DPMS-004`: line count, tsc
- `REQ-DPMS-005`: tool-studio tests
- `REQ-DPMS-006`: collector tests
