# 스펙: Agent Detail Switch Speed

## 목표

- Agents 세부 기능 버튼을 눌렀을 때 선택 표시와 눌림 피드백이 즉시 보이게 한다.
- 3D 협업 장면, 생성 폼, 표 기반 런타임 패널 같은 무거운 active workspace 교체는 첫 paint 이후로 미룬다.
- 빠른 연속 클릭이나 disclosure 닫기, 섹션 이탈이 stale workspace mount로 이어지지 않게 한다.

## 요구사항

- 선택 상태는 `agentDetailView`로 즉시 갱신한다.
- 실제 active workspace 렌더는 `agentDetailRenderView`로 분리하고 `scheduleAfterFirstPaint` 뒤에만 갱신한다.
- 새 세부 기능을 선택하면 이전 예약 commit은 취소되고 최신 선택만 commit된다.
- Agents 섹션을 벗어나거나 세부 기능 disclosure가 닫히면 예약 commit을 취소하고 render view를 현재 선택 상태로 정리한다.
- DOM에는 `data-agent-detail-view`, `data-agent-detail-render-view`, `data-agent-detail-pending`이 남아 정적/브라우저 검증에서 pending 상태를 확인할 수 있어야 한다.
- active workspace는 한 번에 하나만 렌더링하며 Builder로 전환된 뒤 Collaboration 3D canvas는 남아 있으면 안 된다.

## 제외

- React Three Fiber 내부 렌더러 최적화
- Agent Factory, Blueprint, Learning 패널의 비즈니스 로직 변경
- 실제 런타임 agent 실행 속도 개선
