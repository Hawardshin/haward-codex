# 스펙: AI EVAL cockpit

## 목표

Workspace Monitor에 현재 작업 평가 탭을 추가해 사용자가 히스토리, 검증 근거, 토큰/툴 사용, 오픈소스 EVAL 후보를 한 화면에서 비교하게 한다.

## 언어/런타임 선택

- 옵션 A: 기존 React/Next renderer에 EVAL panel을 추가한다. 현재 앱의 navigation, snapshot, settings, tests와 가장 잘 맞아 선택한다.
- 옵션 B: Rust/Tauri command로 score 계산을 옮긴다. 대용량 추적 저장소가 생기면 유리하지만 현재 score는 snapshot 문서 메타데이터 기반이라 renderer 계산으로 충분하다.
- 옵션 C: 외부 EVAL CLI를 설치하고 실행한다. 강력하지만 설치 감사, 라이선스/보안 검토, provider credential boundary가 필요하므로 이번 slice에서는 후보 표시만 한다.

## 아키텍처 선택

- 옵션 A: `EvaluationReportPanel.tsx`를 별도 feature panel로 만들고 `MonitorShell.tsx`에서 dynamic import, resident preload, view mode, navigation에 연결한다. 변경 범위가 좁고 기존 패턴과 맞아 선택한다.
- 옵션 B: 기존 `LearningFeedbackLoopPanel`에 평가 UI를 더한다. 탭 목적이 흐려지고 이미 복잡한 Agents 화면에 더 쌓이므로 제외한다.
- 옵션 C: route-level `/eval` page를 만든다. 장기적으로 가능하지만 현재 monitor shell의 section state와 설정/문서 필터 연결을 재작성해야 하므로 제외한다.

## 폴더/구조 선택

- 옵션 A: `components/features/EvaluationReportPanel.tsx`에 배치한다. Product feature panel, Operator center와 같은 기능 표면 계층이라 선택한다.
- 옵션 B: `components/workbench/`에 배치한다. 조작 중심 workbench보다 보고서/feature cockpit 성격이 강해 제외한다.
- 옵션 C: `components/history/`에 배치한다. 히스토리만 다루지 않고 토큰/툴/오픈소스 후보까지 포함해 제외한다.

## 설계

- `SectionId`에 `eval`을 추가한다.
- `sections`, `fallbackViewModes`, `defaultPinnedSections`, `coreFunctionSections`, home feature, task intent에 EVAL 진입점을 추가한다.
- `EvaluationReportPanel`은 snapshot documents, history days, unified events, stats, active/blocked tasks, open-source references를 props로 받는다.
- score는 현재 문서/이벤트 메타데이터 기반 휴리스틱으로 계산한다.
- 오픈소스 후보는 `open-source-feature-reference-registry.json`의 `learning_improvement_loop` 후보와 panel fallback 후보를 병합한다.
- Tool Studio 3D character scene은 seal flipper/whisker part names를 사용한다.

## 수용 기준

- `eval` 탭이 사용자/개발자/슈퍼어드민 뷰에 노출된다.
- EVAL 탭은 현재 작업 점수, 근거 커버리지, 툴 기록, 토큰/비용 추적, 히스토리 비교, 시나리오, 오픈소스 후보, 병목 후보를 보여준다.
- EVAL 탭은 resident/preload 대상에 포함된다.
- Tool Studio 3D 장면은 `tool-agent-seal-*` 파츠와 물개형 화면 문구를 사용한다.
- 관련 tests, config contract, renderer build, internal package가 통과한다.
