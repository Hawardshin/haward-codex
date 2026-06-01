# `_docs` 카테고리와 누락 방지 검증

## 검증 계획

| 검증 | 명령/방법 | 기대 결과 |
| --- | --- | --- |
| docs audit | `python3 _tools/docs-audit/src/docs_audit.py --check` | gaps 0 |
| docs-audit tests | `python3 -m unittest discover -s _tools/docs-audit/tests` | 통과 |
| old path search | `rg`로 이동 전 `_docs/<file>` 직접 경로 검색 | 옛 경로 없음 |
| config contract | `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...` | 통과 |
| memory bootstrap | `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json` | 통과 |
| structure audit | `python3 _tools/structure-audit/src/structure_audit.py --check` | 통과 |
| workspace index | `python3 _tools/workspace-index/src/workspace_index.py` | map/snapshot 갱신 |
| monitor checks | `npm run test`, `npm run check`, `npm run build` | 통과 |
| diff hygiene | `git diff --check` | whitespace 오류 없음 |

## 실행 결과

- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과, gaps 0, warnings 0.
- `python3 -m unittest discover -s _tools/docs-audit/tests`: 통과, 4 tests.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: 통과.
- `check-config-contract`: 통과, core configs와 `_docs/registry.json` self_documenting.
- `check-memory-bootstrap`: 통과, `docs_registry` startup_order 포함.
- 옛 `_docs/<file>` 직접 경로 `rg` 검색: no matches.
- `workspace-index`, `task-board`: 재생성 완료.
- `workspace-monitor` collect/test/check/build: 통과.
- `agent-platform` unittest: 통과, 103 tests.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
