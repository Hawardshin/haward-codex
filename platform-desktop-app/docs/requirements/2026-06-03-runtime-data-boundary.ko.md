# Runtime Data Boundary 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-036 | 이 레포지토리는 플랫폼을 만드는 개발 원천으로 유지하고, 설치형 고객 제품은 platform source tree를 제품 기능으로 노출하지 않아야 한다. | must | `runtime-data-boundary-registry.json` `customer_visibility_policy`, readiness test |
| REQ-PDA-037 | 사용자 workspace, platform data store, log store, cache store, agent workspace는 source folder와 분리된 runtime data plane으로 정의해야 한다. | must | registry `installed_product_planes`, architecture docs |
| REQ-PDA-038 | 로그는 보존, export, model ingestion 전에 runtime health, task execution, CLI IO, agent work, support diagnostic 같은 목적별 taxonomy로 분류해야 한다. | must | registry `log_taxonomy`, readiness token |
| REQ-PDA-039 | 재사용 agent 정의는 `agent-platform/configs/agents/`에 묶고, 설치형 제품의 agent runtime 작업은 agent workspace plane에 둬야 한다. | must | registry `agent_workspace_policy`, memory bootstrap anchor |
| REQ-PDA-040 | installer payload 감사는 `_private/`, `outputs/`, unredacted logs, private snapshots, developer-only snapshots, 개발 repository source tree를 제외해야 한다. | must | registry `installer_payload_policy`, readiness test |
