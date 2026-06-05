# Runtime Run Timeline 추적

| 항목 | 경로 |
| --- | --- |
| 요구사항 | `platform-desktop-app/docs/requirements/2026-06-06-runtime-run-timeline.ko.md` |
| 스펙 | `platform-desktop-app/specs/2026-06-06-runtime-run-timeline/spec.ko.md` |
| 계획 | `platform-desktop-app/specs/2026-06-06-runtime-run-timeline/plan.ko.md` |
| 작업 | `platform-desktop-app/specs/2026-06-06-runtime-run-timeline/tasks.ko.md` |
| 검증 | `platform-desktop-app/specs/2026-06-06-runtime-run-timeline/validation.ko.md` |
| 구현 | `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx` |
| 스타일 | `platform-desktop-app/renderer/workspace-monitor/app/globals.css` |
| 패키징 파이프라인 | `platform-desktop-app/scripts/desktop-pipeline/definitions.mjs` |
| 제품 registry | `platform-desktop-app/configs/product-feature-registry.json` |
| 테스트 | `platform-desktop-app/tests/readiness.test.mjs` |
| readiness 구조 검사 | `platform-desktop-app/scripts/readiness/desktop-build-pipeline.mjs` |
| 조사 기록 | `_research/topics/platform-desktop-app/2026-06-06-runtime-run-timeline-open-source-inspection.ko.md` |

## 요구사항 매핑

- REQ-PDA-140 -> `runtime-run-timeline-panel`
- REQ-PDA-141 -> `runtimeRunTimelineItems` priority/order
- REQ-PDA-142 -> item `onAction` wiring
- REQ-PDA-143 -> `runRecordsOpen` guard
- REQ-PDA-144 -> `.runtime-run-timeline-*` CSS
- REQ-PDA-145 -> `developerSnapshotCollectStep`, readiness pipeline token, `package:internal` 재검증
