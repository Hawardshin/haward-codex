# 버튼별 맥락 피드백 요구사항

## 배경

사용자는 버튼을 눌렀을 때 나오는 결과가 너무 범용적이라고 지적했다. 현재 데스크톱 런타임 표면은 많은 버튼이 서로 다른 네이티브 작업을 수행하지만, 실행 후 사용자가 보는 피드백은 짧은 notice 또는 일반 상태 문구에 가까워 어떤 버튼의 결과인지, 대상이 무엇인지, 다음에 어디를 확인해야 하는지 즉시 알기 어렵다.

## 요구사항

- REQ-CONTEXTUAL-BUTTON-FEEDBACK-001: Quick Start, Command Palette, Workspace Host, Runtime Data, Service Readiness, Task Run, Agent CLI Cockpit의 주요 실행 버튼은 클릭 후 액션별 피드백 상태를 표시해야 한다.
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-002: 피드백은 액션명, 대상 scope, 실행 상태, 결과, 다음 확인 위치를 포함해야 하며 `running`, `done`, `failed`를 구분해야 한다.
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-003: 클릭한 버튼은 현재 액션 상태와 시각적으로 연결되어야 하며, 버튼 외부의 일반 notice만으로 끝나면 안 된다.
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-004: 피드백 영역은 `role="status"`와 `aria-live="polite"`를 사용해 보조기술에서도 실행 결과 변화를 알 수 있어야 한다.
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-005: 변경 후 renderer check/test/build와 내부 데스크톱 패키징을 실행해야 한다.

## 비범위

- 모든 버튼을 새 컴포넌트로 교체하지 않는다.
- CLI/Rust 실행 로직의 성공/실패 판정 방식은 이번 변경에서 확장하지 않는다.
- 모달 alert 또는 blocking dialog를 늘리지 않는다.
