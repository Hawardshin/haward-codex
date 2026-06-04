# 추적성

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| REQ-WM-048 | `MonitorShell.tsx` `agentCoreCapabilityOptions`, `agentcore-capability-bundle` | `tool-studio.test.mjs`, desktop/mobile smoke |
| proposal 반영 | `buildAgentFactoryFormFromAgentCoreBlueprint(..., selectedCapabilityIds)` | browser form fill assertion |
