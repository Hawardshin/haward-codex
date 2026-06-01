# 검증

## 계획

- `python3 -m unittest discover -s _tools/workspace-index/tests`
- `python3 -m unittest discover -s _tools/workspace-health/tests`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py`
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `check-grounding`
- `evaluate-work`
- `git diff --check`

## 결과

- `python3 -m unittest discover -s _tools/workspace-index/tests`: 통과, 3 tests.
- `python3 -m unittest discover -s _tools/workspace-health/tests`: 통과, 3 tests.
- `python3 _tools/workspace-index/src/workspace_index.py --check`: 통과.
- `python3 _tools/workspace-health/src/workspace_health.py`: 통과, 16 checks.
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: 통과, 17 checks.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: `docs_ready`.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: `clean`.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `git diff --check`: 통과.
