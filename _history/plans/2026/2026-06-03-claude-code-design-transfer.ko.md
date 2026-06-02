# 계획: Claude Code 공개 설계 전이

## 작업 모드

- 선택: `governance`
- 이유: source boundary, platform behavior, registry, Workspace Monitor UI, readiness/evaluation이 바뀌는 durable platform work다.

## Memory Bootstrap

- 명령: `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- 결과: `ready_to_bootstrap`

## Large Scope Decomposition

- broad 요청: Claude Code의 여러 설계 insight를 플랫폼에 반영.
- slice: 공개 출처 기반 design transfer registry + Workspace Monitor Overview 노출 + 검증.
- 제외: 유출/비공개 자료, Claude Code CLI 필수화, 자동 설치, MCP/hook/worktree runtime 구현.

## Touch Paths

- `platform-desktop-app/configs/claude-code-design-transfer-registry.json`
- `platform-desktop-app/docs/architecture/claude-code-design-transfer.*.md`
- `platform-desktop-app/docs/requirements/2026-06-03-claude-code-design-transfer.*.md`
- `platform-desktop-app/specs/2026-06-03-claude-code-design-transfer/`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- generated snapshot files

## Merge Gate

- registry must be self-documenting.
- Workspace Monitor build must include `claudeCodeDesignTransfer`.
- Tauri build must still generate local `.app` and DMG.
