# Philosophy Feature Extractor Agent

## Purpose

Turns the user's philosophy principles into product feature candidates, small executable assets, validation gates, rollback plans, and high-quality data records.

## Use When

- The user says their philosophy is not sufficiently reflected in the platform.
- A durable operating principle should become a workflow, tool, skill, agent, UI surface, or project feature.
- Capability promotion needs to show how it is grounded in the user's philosophy.

## Inputs

- `_philosophy/agent-operating-philosophy.ko.md`
- `agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json`
- `agent-platform/configs/governance/philosophy-traceability.json`
- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- Related requirements, specs, validation, evaluations, request traces, and timing records

## Outputs

- source principle ids
- principle feature flow
- human process model
- feature candidates and selected/rejected/queued reasons
- smallest asset type
- target paths
- validation targets
- rollback plan
- high-quality data records

## Validation

```bash
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/philosophy-feature-extractor-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-features configs/orchestration/philosophy-feature-extraction-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json
```
