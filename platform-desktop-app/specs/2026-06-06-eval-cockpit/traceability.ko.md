# Traceability: AI EVAL cockpit

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| EVAL 탭 추가 | `MonitorShell.tsx`, `EvaluationReportPanel.tsx` | `tool-studio.test.mjs` EVAL section assertions |
| 사용자/개발자/슈퍼어드민 뷰 노출 | `view-mode-registry.json`, `fallbackViewModes` | `readiness.test.mjs`, `check-config-contract` |
| 현재 작업/히스토리/토큰/툴 비교 | `EvaluationReportPanel.tsx` score strip, report grid, tool grid | renderer tests, Browser smoke |
| 오픈소스 후보 적용 | `open-source-feature-reference-registry.json`, panel fallback candidates | config JSON parse, renderer tests |
| resident/preload 성능 완화 | `retainedResidentSections`, `startupResidentPreloadSections`, `maxResidentSectionPanels` | renderer tests, Browser smoke |
| 물개 캐릭터 | `ToolStudioPanel.tsx` seal part names and canvas labels | renderer tests |
| 빌드 자동 실행 | package scripts 실행 | final validation record |
