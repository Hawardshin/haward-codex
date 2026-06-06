# Validation: Main Tab Scroll Scope Policy

## 실행한 검증

| 명령 | 결과 |
|---|---|
| `python3 _tools/docs-audit/src/docs_audit.py --check` | 통과, `docs_ready`, gaps 0 |
| `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json` | 통과, `ready_to_bootstrap` |
| `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json` | 통과, `self_documenting` |
| `corepack pnpm --filter workspace-monitor run check` | 통과, `scroll_contract_ok`, `checkedMainTabScrollOwners: 2` |
| `corepack pnpm --filter workspace-monitor test` | 통과, 78개 테스트 |
| `corepack pnpm --filter workspace-monitor run collect` | 통과, 650 inline documents, 2632 admin history records |
| `corepack pnpm --filter workspace-monitor run build` | 통과, Next.js production build |
| `git diff --check` | 통과 |

## Acceptance

- `.desktop-viewport`와 `.mounted-section-panel`은 whole-tab vertical scroll owner가 될 수 없다.
- 기존 bounded scroll containers는 scoped scroll contract 안에서 유지된다.
- durable instructions와 memory bootstrap에서 새 정책을 찾을 수 있다.
