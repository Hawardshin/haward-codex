# 스펙: Provider 버튼 오류 상태

## 목적

Provider 설정에서 오류나 완료 메시지가 별도 텍스트로 추가되어 버튼 위치를 밀어내지 않게 하고, 사용자가 누른 버튼 자체에서 상태를 즉시 확인하게 한다.

## 기능 범위

- Provider 설정 패널에 `ProviderActionFeedback` 상태를 추가한다.
- 저장, 삭제, 새로고침, 공식 링크, 모델 확인, 작업 기본값 선택 결과를 provider/action 단위로 기록한다.
- 버튼 안에 절대 위치 상태 badge를 표시해 오류/완료/정보를 버튼 내부에 표기한다.
- 상태 badge 공간은 평상시부터 예약해 상태 발생 시 버튼 폭이나 위치가 바뀌지 않게 한다.
- 시각적으로 보이는 문단형 오류/공지 대신 hidden live region으로 상태를 보조기술에 전달한다.

## 비목표

- Provider credential 저장 방식이나 native command API를 변경하지 않는다.
- 화면 전체 toast system을 새로 만들지 않는다.
- 외부 provider API 검증 호출을 새로 추가하지 않는다.

## 수용 기준

- 빈 API key 저장 시 provider row 아래 텍스트가 추가되지 않고 저장 버튼에 오류 상태가 표시된다.
- 모델 확인 오류는 provider model strip 위아래에 문단을 삽입하지 않고 모델 확인 버튼에 표시된다.
- 버튼 상태 badge가 생겨도 provider action button의 bounding box가 움직이지 않는다.
- `provider-action-live-region`은 상태 메시지를 화면에 보이지 않게 유지하되 `role=status` 또는 `role=alert`로 알린다.
- renderer test/readiness가 `ProviderActionFeedback`, `provider-button-status`, `provider-action-live-region`, `has-provider-status`를 검증한다.
