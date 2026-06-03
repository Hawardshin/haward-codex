# 추적성

| 요구사항 | 구현/문서 | 검증 |
| --- | --- | --- |
| PDA-PROD-001 | `desktop-distribution-registry.json`, `README.md`, architecture docs | config contract, `platform-desktop-app run check` |
| PDA-PROD-002 | installable/runtime policies, persistent instructions, README/docs wording | `rg` search, docs audit |
| PDA-PROD-003 | `candidate_frameworks` statuses and fallback wording | config contract |
| PDA-PROD-004 | `check-readiness.mjs`, `check-service-readiness.mjs`, `src-tauri/src/lib.rs` | `platform-desktop-app run check`, tests |
| PDA-PROD-005 | service readiness registry, macOS execution profile, release claim | service readiness/report checks |
