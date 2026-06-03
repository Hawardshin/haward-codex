# 검증 계획

## 기능 검증

- `npm test`
- `npm run collect`
- snapshot에 `sourceFiles`와 `stats.sourceFiles`가 있는지 확인
- Developer/Superadmin view mode에 `source` 섹션이 있고 User View에는 없는지 확인

## 빌드 검증

- `npm run check`
- `npm run build`

## 플랫폼 검증

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m unittest discover -s tests`
- `python3 _tools/workspace-health/src/workspace_health.py`

## 평가 검증

- `check-omissions`
- `check-grounding`
- `evaluate-work`
