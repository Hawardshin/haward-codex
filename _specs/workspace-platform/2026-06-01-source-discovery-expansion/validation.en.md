# Validation Plan: Source Discovery Expansion

## Required Checks

- `python3 -m json.tool agent-platform/configs/research/source-discovery-registry.json`
- `python3 -m json.tool agent-platform/configs/research/enterprise-source-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/source-discovery-registry.json configs/research/enterprise-source-registry.json configs/research/source-registry.json configs/research/research-agent-profile.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-source-discovery-expansion-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-source-discovery-expansion-evaluation-input.json`

## Result

- Status: passed
- `python3 -m json.tool agent-platform/configs/research/source-discovery-registry.json`: passed
- `python3 -m json.tool agent-platform/configs/research/enterprise-source-registry.json`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/docs-audit/src/docs_audit.py --check`: `docs_ready`
- `python3 _tools/naming-audit/src/naming_audit.py --check`: `clean`
- `python3 _tools/structure-audit/src/structure_audit.py --check`: `clean` with existing generated-folder warnings for `presentation-agent`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: passed
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`: `passed`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ...source-discovery-expansion-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ...source-discovery-expansion-evaluation-input.json`: `ready_to_close`
