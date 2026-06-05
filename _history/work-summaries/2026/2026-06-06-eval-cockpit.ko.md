# 작업 요약: AI EVAL cockpit

## 요약

Workspace Monitor에 EVAL 탭을 추가해 현재 작업 품질, 히스토리, 토큰/툴 사용, 오픈소스 EVAL 후보를 비교하는 사용성 표면을 만들었다. Tool Studio 3D 캐릭터는 물개형으로 바꿨고, 내부 앱 패키징까지 완료했다.

## 변경 파일군

- UI: `MonitorShell.tsx`, `EvaluationReportPanel.tsx`, `ToolStudioPanel.tsx`, `globals.css`
- Config: view-mode, product-feature, open-source-feature reference, readiness check
- Tests: workspace-monitor tests, desktop readiness tests
- Docs/history: requirements, specs, research, web search, evaluation, resource, omission, request trace
- Generated snapshots: public/generated workspace snapshots

## 검증

- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app run test`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run test`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run build`
- `npm --prefix platform-desktop-app run package:internal`
- Browser smoke
