# 계획 기록: Provider 버튼 오류 상태

## 범위

- Provider 설정에서 오류/완료/정보 상태를 버튼 내부에 표시한다.
- 상태 텍스트가 provider row 아래에 삽입되어 버튼 위치를 밀지 않게 한다.
- 기존 provider credential/model command 동작은 유지한다.

## 실행 순서

1. 웹 접근성/레이아웃 근거와 기존 provider panel을 확인한다.
2. 요구사항, 스펙, tasks, validation, traceability를 작성한다.
3. provider action feedback state와 버튼 badge를 구현한다.
4. renderer tests/readiness를 갱신한다.
5. collect/check/browser/internal package build를 실행한다.
6. omission/resource/evaluation/request trace를 기록하고 commit/push한다.

## Plan Impact

- 오류 메시지는 누른 버튼과 연결된 badge/title/aria-label로 이동한다.
- 시각적 상태는 compact badge로 두고, 보조기술용 메시지는 hidden live region에 남긴다.
- badge 공간은 항상 예약한다.
