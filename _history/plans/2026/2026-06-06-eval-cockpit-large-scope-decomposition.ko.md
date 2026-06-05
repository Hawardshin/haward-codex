# 계획 기록: AI EVAL cockpit large-scope decomposition

## 요청 성격

사용자 요청은 사용성 개선, 성능 개선, UI 개선, 기능 개선, 오픈소스 비교, EVAL 기능, 캐릭터 개선, 히스토리/토큰/툴 사용 비교를 모두 포함하는 광범위 요청이다.

## 이번 slice

- EVAL 탭을 실제 first-class section으로 추가한다.
- 현재 작업 점수, 히스토리 비교, 토큰/툴 비교, 오픈소스 EVAL 후보를 한 화면에 배치한다.
- Tool Studio 캐릭터를 물개형으로 바꾼다.
- 관련 registry/test/docs/build/package를 닫는다.

## 제외/후속 slice

- 외부 EVAL runner 설치 및 실제 실행 통합
- trace/token/cost 구조화 schema 정식 마이그레이션
- route-level monitor shell 재작성
- 공개 배포 signing/notarization/updater

## source inventory

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- `agent-platform/configs/access/view-mode-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/open-source-feature-reference-registry.json`
- renderer/app tests and readiness tests

## merge gate

- JSON parse and config contract pass
- renderer/app tests pass
- renderer build pass
- internal package pass
- Browser smoke confirms EVAL tab and Tool Studio render
