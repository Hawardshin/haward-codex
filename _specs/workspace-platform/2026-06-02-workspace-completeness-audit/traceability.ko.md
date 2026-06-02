# 추적성

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| REQ-WS-075 | `_tools/workspace-health/src/workspace_health/checks.py` | `workspace-health --include-build --json` |
| REQ-WS-075 | `_tools/structure-audit/src/structure_audit.py` | `structure-audit --check`, structure-audit tests |
| REQ-WS-075 | `_specs/**/validation.*.md` heading cleanup | stale unfinished marker search |
| REQ-WS-075 | `_history/evaluations/2026/2026-06-02-workspace-completeness-health-report.json` | saved health report |
