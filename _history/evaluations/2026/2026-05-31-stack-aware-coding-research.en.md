# Work Evaluation: Stack-Aware Coding Research

## Initial Instruction

Coding research should account for technology-specific official docs or standards for stacks such as Java/Spring Boot, C, React, and Next.js, and should also record Stack Overflow, Reddit, GitHub discussions, and reaction signals as useful research inputs.

## Result Summary

- Added `technology_stack`, `technology_official_docs`, `stack_version_constraints`, `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes` to `coding-research-agent` input and readiness checks.
- Made missing known-stack official docs/standards, missing issue/discussion records, and missing community signal notes implementation-blocking gaps.
- Updated the coding research profile, template, docs, prompt, workflow, persistent instructions, requirements, specs, history, research note, and coordination board.

## Evaluation Result

- Status: `ready_to_close`
- Work mode: `governance`
- Difference from initial instruction: none
- Remaining gaps: none
- Improvement idea: extend official-doc hint mapping when new repeated technology stacks appear.

## References Checked

- Spring Boot Reference Documentation: https://docs.spring.io/spring-boot/reference/index.html
- React docs: https://react.dev/learn
- Next.js docs: https://nextjs.org/docs
- ISO/IEC 9899:2024: https://www.iso.org/standard/82075.html
- Stack Overflow vote-up privilege: https://stackoverflow.com/help/privileges/vote-up
- GitHub Reactions API docs: https://docs.github.com/en/rest/reactions/reactions
- Existing coding research docs: `agent-platform/docs/coding-research-agent.en.md`
- Existing architecture-first coding policy: `_docs/policies/architecture-first-coding-policy.en.md`

## Verification

- `python3 -m json.tool` changed JSON configs: passed
- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`: 18 tests passed
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 77 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /private/tmp/stack-aware-coding-plan.json`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/stack-aware-coding-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/stack-aware-coding-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/task-board/src/task_board.py --check`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/stack-aware-coding-eval.json`: `ready_to_close`

## Conclusion

The requirement is reflected. Future coding research cannot close with generic "official docs checked"; it must record stack-specific official docs or standards, version constraints, high-signal issue/discussion sources, and community signal interpretation.
