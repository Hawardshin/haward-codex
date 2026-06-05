# 추적성

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-OSR-001 | `platform-desktop-app/configs/open-source-feature-reference-registry.json` | `check-config-contract` |
| REQ-OSR-002 | `scripts/lib/open-source-feature-references.mjs`, `collect-workspace.mjs`, `snapshot.ts` | `collector.test.mjs` |
| REQ-OSR-003 | `ProductFeatureArchitecturePanel.tsx`, `MonitorShell.tsx`, `globals.css` | `tool-studio.test.mjs`, smoke |
| REQ-OSR-004 | install policy fields, evaluation record | installation_occurred=false |
| REQ-OSR-005 | package validation record | `desktop:package:internal` |

## 요청 연결

- “그런거 가능하면 기능 추가” -> 기능별 오픈소스 research를 Product Structure 기능으로 승격.
- “설치 필요하면 설치” -> 설치 필요 여부와 audit 정책을 기능 layer별로 표시하고, 이번 구현은 새 설치 없이 완료.
