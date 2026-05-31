# Work Evaluation: Parallel Research Merge Gates

## Evaluation Target

- User request: run parallel research lanes, then merge the outputs when all lanes are done.
- Work mode: `governance`
- Requirement: `REQ-WS-024`
- Related plan: `_history/plans/2026/2026-06-01-parallel-research-merge-gates.en.md`

## Completed Summary

- Added `ParallelMergeGate` and `merge_gates` validation to `parallel-work-planner-agent`.
- When multiple research lanes appear in the same batch, a merge gate must wait for every research lane.
- If the merge task does not depend on every `wait_for` task, the planner returns a gap.
- Updated the default template to run `official-docs-research`, `community-signal-research`, and `open-source-reference-research`, then merge through `research-synthesis`.
- Documented that implementation depends on the synthesis output, not partial research notes.

## References Checked

- GitHub Actions official `jobs.<job_id>.needs` docs
- Prefect official concurrent work and task dependency docs
- Airflow official dynamic task mapping docs
- LangGraph official branching/reducer docs
- Prior parallel work evaluation: `_history/evaluations/2026/2026-06-01-parallel-work-planning.en.md`

## Verification

- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`: OK, 9 tests
- `PYTHONPATH=src python3 -m unittest discover -s tests`: OK, 91 tests
- `python3 -m json.tool` for changed JSON configs: passed
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`: `ready_to_parallelize`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `work-evaluator-agent`: `ready_to_close`

## Evaluation Result

- Difference from initial instruction: none. The parallel research then merge structure is now represented through `merge_gates`.
- Improvement idea: later add actual lane completion timestamps and merge gate blocker state to the coordination board.
- Blocking gaps: none.
