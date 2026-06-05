# 스펙: Workbench lazy boundary 확장

## 목표

Workspace Monitor의 남은 Shell-local heavy panels를 lazy chunk boundary로 분리하고, 탭 이동/버튼 반응성 검증을 통해 사용자가 느끼는 지연을 줄인다.

## 언어/런타임 선택

- 옵션 A: React/Next dynamic boundary. 현재 병목은 renderer code evaluation, hydration, mount cost가 같은 client module에 집중되는 문제이므로 선택한다.
- 옵션 B: Rust/Tauri cache 확대. OS resource warmup은 이미 사용 중이나 Shell JS 평가 비용을 직접 줄이지 못하므로 보조 수단으로 둔다.
- 옵션 C: 전체 route 재작성. 가장 근본적이지만 회귀 범위가 커서 이번 slice에서는 panel boundary 확장으로 위험을 제한한다.

## 아키텍처 선택

- 옵션 A: 큰 workbench panels를 별도 module로 분리하고 `dynamic()` + idle preload를 사용한다. 변경 범위와 검증이 명확해 선택한다.
- 옵션 B: 모든 탭을 한 번에 route-level로 나눈다. 장기적으로 가능하지만 현 시점에서는 state coupling이 많아 위험하다.
- 옵션 C: Web Worker를 추가한다. UI component parse/evaluation 문제에는 직접 효과가 작다.

## 설계

- `AgentBuilderPanels.tsx`는 `AgentCoreBlueprintPanel`, `AgentFactoryWizard`, `LearningFeedbackLoopPanel`을 담는다.
- `AgentDetailPanels.tsx`는 collaboration, inventory, runtime overview panels를 담는다.
- 기존 feature/workbench components는 props type을 export하여 dynamic boundary type safety를 유지한다.
- `MonitorShell.tsx`는 heavy panels를 runtime static import하지 않고 type-only import와 `dynamic()`으로 연결한다.
- `prewarmWorkSurfaces`는 prewarm functions를 90ms 간격으로 순차 실행한다.
- `installInstantButtonFeedback`는 DOM readiness attribute를 설정해 버튼 감사가 실제 feedback hook 설치 후 시작되게 한다.
- readiness와 tests는 `MonitorShell` 하나가 아니라 lazy panel sources를 포함한 workbench source 계약을 검사한다.

## 수용 기준

- `workspace-monitor check/test/build`가 통과한다.
- `platform-desktop-app check/test/package:internal`이 통과한다.
- `perf:sections`는 p95 1400ms 이하, resident/mounted max 5 이하를 유지한다.
- `perf:buttons`는 feedback 누락 0건이고 real click p95가 즉시 feedback 수준으로 유지된다.
- `perf:budget`은 largest chunk 1,000,000 bytes 이하를 유지한다.
