# Plan: product split handoff

1. `platform-desktop-app`에 별도 앱 handoff command와 보고 타입을 추가한다.
2. `agents/tools` 섹션 렌더링을 `SeparatedOperationsHandoffPanel`로 바꾼다.
3. 기본 작업 추적 흐름에서 결정함/보고서/터미널/프로젝트 경계를 platform 앱 소유로 유지한다.
4. `agent-tool-desktop-app` shell을 agent/tool/model/provider/gate 소유 영역 중심으로 강화한다.
5. 테스트 계약을 새 제품 경계 기준으로 갱신하고 build/check를 실행한다.
