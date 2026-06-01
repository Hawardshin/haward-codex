# Request Trace: Principle Guardian Agent

## Request

- ID: `UR-2026-06-02-025`
- Summary: The user said everyone strongly adheres to principles.

## Interpretation

Add persistent instructions and `principle-guardian-agent` so all agents treat principles as execution contracts and close-out gates, not decoration.

## Result

- Requirement: `REQ-WS-067`
- Agent config: `agent-platform/configs/agents/principle-guardian-agent.json`
- Docs: `agent-platform/docs/principle-guardian-agent.ko.md`, `agent-platform/docs/principle-guardian-agent.en.md`
- Persistent instructions: `AGENTS.md`, `_docs/instructions/persistent-instructions.en.md`
- Specs: `_specs/workspace-platform/2026-06-02-principle-guardian-agent/`
- Web search record: `_history/web-searches/2026/2026-06-02-principle-guardian-agent.en.md`
- Research note: `_research/topics/principle-governance/2026-06-02-principle-guardian-agent.en.md`
- Evaluation: `_history/evaluations/2026/2026-06-02-principle-guardian-agent.en.md`

## Verification

- `inspect-agent`: passed
- `list-agents`: includes `principle-guardian-agent`
- `check-agent-orchestration`: `ready`
- `agent-platform` tests: 150 tests OK
- `workspace-monitor` collect/test/check/build: passed
- `workspace-health`: 18 checks passed

## Commit

- Planned commit: `feat(agent): add principle guardian`
