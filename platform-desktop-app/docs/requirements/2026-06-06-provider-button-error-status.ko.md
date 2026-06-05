# Provider 버튼 오류 상태 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-131 | Provider 설정 오류와 작업 결과는 별도 문단으로 레이아웃을 밀지 않고, 해당 액션 버튼 내부 상태로 표시해야 한다. | must | `ProviderActionFeedback`, `provider-button-status` |
| REQ-PDA-132 | 오류, 성공, 정보 상태가 생겨도 provider 액션 버튼의 위치와 크기는 안정적으로 유지되어야 한다. | must | 상태 배지 공간 예약 CSS, Browser layout smoke |
| REQ-PDA-133 | 화면에는 레이아웃을 밀어내는 오류 텍스트를 숨기되, 보조기술에는 상태 변화를 알릴 수 있어야 한다. | must | `provider-action-live-region`, `role=status/alert` |
| REQ-PDA-134 | 저장, 삭제, 새로고침, 모델 확인, 공식 링크, 작업 기본값 선택 액션은 상태 회귀 방지 테스트에 포함되어야 한다. | should | renderer test, readiness tokens |

## 범위

- Settings provider accounts 패널의 provider별 action feedback UI를 개선한다.
- 기존 native provider credential/model command surface는 유지한다.
- API key 원문을 읽거나 history/test output에 기록하지 않는다.

## 제외

- Provider OAuth, OS keychain migration, public release signing은 이번 버튼 상태 표시 변경 범위가 아니다.
- 다른 설정 패널의 모든 오류 표시 방식을 한 번에 통일하지 않는다.
