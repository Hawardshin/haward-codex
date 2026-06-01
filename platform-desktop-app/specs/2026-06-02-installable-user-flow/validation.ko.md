# 검증 계획

## 설정 검증

- `python3 -m json.tool platform-desktop-app/configs/user-flow-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/user-flow-registry.json ../platform-desktop-app/configs/desktop-distribution-registry.json`

## 문서/구조 검증

- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/workspace-health/src/workspace_health.py`

## 모니터 반영 검증

- `cd workspace-monitor && npm run collect`
- `cd workspace-monitor && npm test`
- `cd workspace-monitor && npm run check`
- `cd workspace-monitor && npm run build`

## 평가 검증

- 누락 방지 입력을 만들어 `check-omissions`를 실행한다.
- grounding 입력을 만들어 `check-grounding`을 실행한다.
- work evaluation 입력을 만들어 `evaluate-work`를 실행한다.
