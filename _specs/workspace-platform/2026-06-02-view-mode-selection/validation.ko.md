# 검증: View Mode Selection

## 검증 계획

- `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli list-view-modes configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli show-view-mode configs/access/view-mode-registry.json superadmin_developer`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`

## 수용 기준

- 세 가지 view mode가 모두 존재한다.
- 기본값이 `superadmin_developer`다.
- `view_mode`가 `install_mode`, `work_mode`와 분리되어 문서화된다.
- 보안 문서에 client-side hiding 한계가 명시된다.
