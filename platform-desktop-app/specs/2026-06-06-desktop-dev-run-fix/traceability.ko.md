# 추적: desktop dev/run fix

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| REQ-DDR-001 dev 실행 | `beforeDevCommand`, `desktop:dev` | `corepack pnpm run desktop:dev` |
| REQ-DDR-002 internal/dev updater panic 방지 | conditional updater plugin registration | dev smoke |
| REQ-DDR-003 public updater 경로 유지 | `plugins.updater` object check | readiness tests, public config tests |
| REQ-DDR-004 실행 문서화 | README/runbook, root scripts | tests/readiness |
| REQ-DDR-005 빌드/실행 검증 | validation commands | validation record |

## 연결 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-desktop-dev-run-fix.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-desktop-dev-run-fix.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-desktop-dev-run-fix.ko.md`
