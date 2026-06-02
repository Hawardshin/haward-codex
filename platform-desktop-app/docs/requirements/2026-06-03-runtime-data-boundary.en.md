# Runtime Data Boundary Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-036 | This repository shall remain the development source for building the platform, while installed customer products shall not expose the platform source tree as a product feature. | must | `runtime-data-boundary-registry.json` `customer_visibility_policy`, readiness test |
| REQ-PDA-037 | User workspaces, platform data store, log store, cache store, and agent workspace shall be defined as runtime data planes separated from source folders. | must | Registry `installed_product_planes`, architecture docs |
| REQ-PDA-038 | Logs shall be classified by purpose such as runtime health, task execution, CLI IO, agent work, and support diagnostic before retention, export, or model ingestion. | must | Registry `log_taxonomy`, readiness token |
| REQ-PDA-039 | Reusable agent definitions shall be grouped under `agent-platform/configs/agents/`, while installed-product agent runtime work belongs in the agent workspace plane. | must | Registry `agent_workspace_policy`, memory bootstrap anchor |
| REQ-PDA-040 | Installer payload audits shall exclude `_private/`, `outputs/`, unredacted logs, private snapshots, developer-only snapshots, and the development repository source tree. | must | Registry `installer_payload_policy`, readiness test |
