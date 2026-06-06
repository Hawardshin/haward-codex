# Traceability

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-ATP-001 | `MonitorShell.tsx` resident section config | `tool-studio.test.mjs`, browser smoke |
| REQ-ATP-002 | `startupSurfaceReadyMinMs`, startup warmup overlay | static/dev smoke, section audit |
| REQ-ATP-003 | `SnapshotLoader.tsx`, `MonitorShellBoundary.tsx`, `SnapshotLoadingShell.tsx` | snapshot loader tests, browser smoke |
| REQ-ATP-004 | `next.config.mjs` production-only static export | dev smoke |
| REQ-ATP-005 | build/package validation | validation/evaluation records |
