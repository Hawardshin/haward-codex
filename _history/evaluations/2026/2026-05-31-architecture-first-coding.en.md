# Work Evaluation: Architecture-First Coding

## Initial Instruction

Source-code work should search for best architectures.

## Result Summary

- Added `_docs/architecture-first-coding-policy.ko.md` and its English companion.
- Added `architecture_reference_sources`, `architecture_options`, and `architecture_decision_notes` as required readiness checks for `coding-research-agent` and `complete-coding-research`.
- Updated the coding research profile, source registry, template, workflow, prompt, requirements, spec, request summary, request trace, work summary, memory bootstrap, and coordination board.

## Evaluation Result

- Status: `ready_to_close`
- Difference between instruction and result: none
- Remaining gaps: none
- Improvement idea: if architecture misses recur, promote the rule into a dedicated architecture review agent that creates ADR/C4 artifacts.

## References Checked

- AWS Well-Architected Framework: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html
- Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Google Cloud Architecture Framework: https://cloud.google.com/architecture/framework
- arc42: https://arc42.org/
- C4 model: https://c4model.info/
- SEI Views and Beyond: https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/

## Verification

- `python3 -m json.tool` for changed JSON configs: passed
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 61 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /private/tmp/architecture-first-coding-check.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/architecture-first-coding-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/architecture-first-coding-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/architecture-first-coding-eval.json`: `ready_to_close`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: passed
- `python3 _tools/task-board/src/task_board.py --check`: passed
- `git diff --check`: passed

## Conclusion

The requirement is reflected. Future source-code work cannot close with code references alone; it must record architecture references, at least two options, and decision rationale.
