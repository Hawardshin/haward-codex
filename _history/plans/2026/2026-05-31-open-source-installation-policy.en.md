# Open-Source Installation Policy Plan

## Initial Instruction

The user said open-source installation should also happen when needed.

## Objective

Turn the existing "consider open source" preference into a durable rule that allows installation when open source is the right fit, with dependency, license, security, verification, and rollback records.

## Search Questions

- How should Python open-source packages be installed safely?
- Which security and license signals should be checked before adopting dependencies?
- Which installation fields should be added to this repository's open-source candidate model?

## Search Channels

- Web search
- Python Packaging official docs
- OpenSSF/CISA security references
- Repository search

## Sources Checked

- [Python Packaging User Guide](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
- `agent-platform/docs/open-source-integration.md`
- `agent-platform/configs/open-source/candidate-template.json`
- `AGENTS.md`

## Plan Steps

1. Add Korean and English open-source installation policy docs.
2. Update persistent instructions, AGENTS, README, operating model, and coding research prompt/workflow.
3. Add installation readiness fields to `OpenSourceCandidate` and include installation status/gaps in the evaluator output.
4. Add install scope, install command, dependency record path, security/license review, and rollback plan to the candidate template.
5. Update research notes, history, evaluation reports, and maps.
6. Verify with tests and CLI checks, then commit and push.

## Validation Plan

- `agent-platform` unit tests
- `score-oss` CLI
- `check-memory-bootstrap`
- `check-config-contract`
- JSON syntax checks
- workspace/task board checks
- hallucination guard and work evaluator

## Risks

- Actual dependency installation may require network and filesystem permission, so request approval when the tool policy requires it.
- Global installation can weaken reproducibility and remains exceptional.
