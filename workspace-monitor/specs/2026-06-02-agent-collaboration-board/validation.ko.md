# 검증 계획

## 기능 검증

- `npm test`
- `npm run collect`
- snapshot에 `collaborationBoard.summary`, `lanes`, `flows`가 있는지 확인
- Agents UI에 협업 작업판과 agent-task-project 흐름이 build되는지 확인

## 빌드 검증

- `npm run check`
- `npm run build`

## 플랫폼 검증

- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ...`
- `python3 _tools/workspace-health/src/workspace_health.py`
- `git diff --check`
