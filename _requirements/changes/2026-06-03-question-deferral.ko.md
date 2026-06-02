# 요구사항 변경: 질문 보류 기능

## 변경

- `PDA-UX-021` 추가: 실행 중인 CLI output에서 사용자 질문을 감지하면 자동으로 lane에 defer 메시지를 보내고, 질문을 decision inbox에 보류 항목으로 저장한 뒤 사용자가 복귀하면 answer/resume할 수 있어야 한다.

## 이유

사용자가 자리를 비운 상태에서 외부 CLI가 질문을 출력하면 작업 전체가 멈추거나 임의 결정을 내려서는 안 된다. 플랫폼은 source-affecting 결정을 보류하고, 독립 작업은 계속 가능한 구조를 가져야 한다.

## 영향

- Tauri session report에 자동 보류 상태가 추가된다.
- Workspace Monitor Desktop 탭에 자동 보류 토글과 전체 감지 질문 보류 액션이 추가된다.
- decision inbox item은 `deferred` status와 session metadata를 가진다.
