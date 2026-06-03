# Traceability

| 요구사항 | 구현/증거 | 검증 |
| --- | --- | --- |
| RPA-001 | `_research/topics/platform-desktop-app/2026-06-03-similar-desktop-agent-platforms.ko.md` | web-search record, citation audit |
| RPA-002 | `configs/reference-platform-advantage-registry.json` `transfer_patterns` | readiness/test |
| RPA-003 | registry fields: source ids, status, targets, risk controls | JSON parse, readiness/test |
| RPA-004 | `ProductFeatureArchitecturePanel.tsx` reference advantage board | typecheck/build/browser smoke |
| RPA-005 | `sanitizeReferencePlatformAdvantagesForCustomer` | customer build/snapshot check |
| RPA-006 | `scripts/check-readiness.mjs`, `tests/readiness.test.mjs` | platform check/test |

## 요청 연결

- `UR-2026-06-03-059`: 유사 데스크톱/에이전트 플랫폼 심층 조사.
- `UR-2026-06-03-060`: 조사 결과를 현재 플랫폼에 기능으로 반영.
