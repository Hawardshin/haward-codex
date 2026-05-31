# 검증 기록: 출처 discovery, provenance, 한국 로컬 리뷰

## 상태

- 상태: 통과
- 평가 결과: `ready_to_close`

## 실행한 검증

- JSON 구문 검증: `OK`
- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: `67 tests`, `OK`
- `python3 -m unittest discover -s _tools/korean-local-review/tests`: `3 tests`, `OK`
- `python3 -m unittest discover -s _tools/source-collector/tests`: `4 tests`, `OK`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /private/tmp/source-discovery-provenance-plan.json`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /private/tmp/source-discovery-provenance-coding.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/source-discovery-provenance-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-discovery-provenance-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/source-discovery-provenance-eval.json`: `ready_to_close`
- `_tools/korean-local-review` query-plan/score smoke test: `OK`
- `python3 _tools/task-board/src/task_board.py` and `--check`: `OK`
- `python3 _tools/workspace-index/src/workspace_index.py`: `updated`
- `git diff --check`: `OK`

## 제한 사항

- `python3 _tools/workspace-index/src/workspace_index.py --check`는 중간 검증에서는 통과했지만, 커밋 범위에서 제외한 무관한 로컬 `a.txt` 삭제를 반영하지 않도록 `repository-map.md`의 기존 `a.txt` 항목을 유지했다. 따라서 최종 local `--check`는 이 무관 변경 때문에 blocking 신호로 사용하지 않는다.
- Naver/Kakao API 키는 설정되어 있지 않아 실제 credential-backed fetch는 수행하지 않았다. 도구는 credentials가 없으면 `missing_credentials`를 반환하도록 설계했다.
