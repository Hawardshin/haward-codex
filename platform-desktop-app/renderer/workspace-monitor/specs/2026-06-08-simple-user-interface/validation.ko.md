# 검증: 기본 사용자 인터페이스 단순화

## 명령

- `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`
- `PYTHONPATH=src python3 -m unittest tests.test_view_modes`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`

## 수용 기준

- `viewModeCatalog.defaultMode`가 `user`다.
- `user` view mode 기본 섹션은 `overview`, `desktop`, `eval`이다.
- Overview에 `data-simple-user-start` 작업 시작 표면이 있다.
- 사용자 보기의 activity rail에는 운영 센터 버튼이 기본 노출되지 않는다.
- developer와 `superadmin_developer` 보기는 고급 섹션을 유지한다.
