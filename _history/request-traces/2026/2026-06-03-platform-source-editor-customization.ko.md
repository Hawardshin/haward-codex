# 요청 추적: 플랫폼 소스 에디터 커스터마이징

## 요청

- 요청 ID: `UR-2026-06-03-028`
- 날짜: 2026-06-03
- 요약: 기존 코드 편집 기능을 우리 플랫폼에 맞게 커스터마이징해 실제 제품에서 쓸 수 있게 한다.

## 결정

- VS Code 전체 제품이나 별도 오픈소스 앱을 새로 설치하지 않고, 이미 설치된 Monaco Editor를 제품 작업 흐름에 맞게 커스터마이징했다.
- 플랫폼 반복 산출물인 요구사항, 스펙, 검증, Tauri command, agent config, decision item 템플릿을 우선 추가했다.
- 순수 브라우저 저장 기능은 만들지 않고, 기존 Tauri scoped write와 backup gate를 유지했다.

## 산출물

- 요구사항: `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- 스펙: `workspace-monitor/specs/2026-06-03-platform-source-editor-customization/`
- 구현: `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css`
- 웹 검색: `_history/web-searches/2026/2026-06-03-platform-source-editor-customization.ko.md`
- 평가: `_history/evaluations/2026/2026-06-03-platform-source-editor-customization-evaluation-result.json`

## 검증

- 결과: `git diff --check`, Workspace Monitor check/test/build/build:customer/perf/intent-map checks, Platform Desktop check/test, Browser smoke 통과. Work evaluator `ready_to_close`.
- 커밋: 최종 커밋 후 갱신
