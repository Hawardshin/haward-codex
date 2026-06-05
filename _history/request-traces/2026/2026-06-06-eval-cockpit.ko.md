# 요청-결과 trace: AI EVAL cockpit

## 요청 요약

사용자는 사용성, 성능, UI, 기능 개선을 계속 진행하고, EVAL 기능과 히스토리/토큰/툴 사용 비교 보고서를 추가하며, 캐릭터는 물개를 사용하라고 요청했다.

## 결과

- EVAL 탭 추가
- 오픈소스 EVAL 후보 registry/UI 반영
- Tool Studio 물개형 3D character 적용
- requirements/spec/research/web-search/evaluation/resource/omission 기록 추가
- build/package 자동 실행 완료

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- `platform-desktop-app/configs/open-source-feature-reference-registry.json`
- `platform-desktop-app/docs/requirements/2026-06-06-eval-cockpit.ko.md`
- `platform-desktop-app/specs/2026-06-06-eval-cockpit/`
- `_research/topics/platform-desktop-app/2026-06-06-eval-cockpit-open-source.ko.md`
- `_history/evaluations/2026/2026-06-06-eval-cockpit.ko.md`

## 검증

- config contracts: 통과
- app check/test: 통과
- workspace-monitor test/build: 통과
- Tauri internal package: 통과
- Browser smoke: 통과

## 후속 후보

- token/cost/tool-use schema를 task-run 단위 구조화 필드로 승격
- promptfoo/DeepEval/Inspect AI 같은 외부 runner를 설치 감사 후 optional adapter로 연결
- EVAL score를 commit/request trace 단위 비교 그래프로 확장
