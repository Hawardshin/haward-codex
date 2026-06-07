# Validation: 터미널 탭 개혁

## 자동 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 116개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build:customer`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer snapshot 복구.
- `corepack pnpm --dir platform-desktop-app run test`: 통과, 30개 테스트.
- `corepack pnpm --dir platform-desktop-app run check`: 통과. 기존 public release/signing 및 customer snapshot stale 경고는 비차단 경고로 유지.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-08-terminal-tab-reform.json`: `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-08-terminal-tab-reform.json`: `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-08-terminal-tab-reform-input.json`: `ready_to_close`.

## Browser 제한

- 현재 세션의 동적 도구 검색에서 인앱 브라우저 제어 도구가 노출되지 않으면 실제 클릭 smoke는 생략하고 정적 계약, TypeScript, Next build로 대체한다.
