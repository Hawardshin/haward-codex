# 계획: Provider 버튼 오류 상태

1. 기존 provider account panel의 오류/notice/model error 표시 위치를 확인한다.
2. 버튼별 action feedback state를 provider/action 단위로 설계한다.
3. 저장/삭제/새로고침/링크/모델 확인/작업 기본값 선택 흐름에서 feedback을 기록한다.
4. CSS에서 버튼 내부 badge와 hidden live region을 추가하고, 상태 공간을 상시 예약한다.
5. renderer test와 readiness token을 갱신한다.
6. tests/check, Browser smoke, internal package build를 실행한다.
