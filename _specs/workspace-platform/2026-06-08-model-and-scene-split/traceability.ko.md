# Traceability: model and scene split

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| REQ-MODEL-SPLIT-001 | `snapshotTypes.ts`, `snapshotProjectTypes.ts`, `snapshotCatalogTypes.ts`, `snapshotReferenceTypes.ts`, `snapshotRuntimeTypes.ts`, `desktopTypes.ts`, `desktopCoreTypes.ts`, `desktopCliTypes.ts`, `desktopWorkspaceTypes.ts`, `desktopInteractionTypes.ts` | TypeScript check, build |
| REQ-MODEL-SPLIT-002 | `useToolAgentScene.ts` | tests, check |
| REQ-MODEL-SPLIT-003 | re-export shell 유지 | import users unchanged, TypeScript check |
| REQ-MODEL-SPLIT-004 | build/test gate | validation record |
