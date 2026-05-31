# Open-Source Installation Policy Evaluation

## Initial Instruction

The user said open-source installation should happen when needed.

## Result Summary

- Added a policy that allows installing mature open-source dependencies when they fit the task.
- Set project/tool-local installation as the default and required install command, dependency record file, security review, license review, verification, and rollback plan.
- Added installation readiness fields to `OpenSourceCandidate` and `candidate-template.json`.
- Updated `score-oss` output with `installation_status` and `installation_gaps`.
- Updated persistent instructions, AGENTS, README, platform operating model, coding research prompt/workflow, open-source integration docs, and memory bootstrap manifest.
- Saved Korean and English research notes plus plan history.

## References Checked

- [Python Packaging User Guide](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
- `agent-platform/docs/open-source-integration.md`
- `agent-platform/configs/open-source/candidate-template.json`
- `AGENTS.md`

## Verification

- `python3 -m json.tool agent-platform/configs/open-source/candidate-template.json`: passed
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`: passed
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 45 tests OK
- `score-oss configs/open-source/candidate-template.json`: `installation_status=not_required`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-config-contract`: `self_documenting`
- `knowledge-skeptic-agent`: `ready_to_reference`
- `hallucination-guard-agent`: `ready_to_publish`
- `work-evaluator-agent`: `ready_to_close`, no gaps

## Evaluation Result

The result matches the initial instruction. Open source is no longer only something to consider; when needed, it can be installed with scope, command, dependency tracking, security/license review, verification, and rollback recorded.

## Improvement Idea

When each project settles on a package manager, add lock-file generation or vulnerability scanning automation.
