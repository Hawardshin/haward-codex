# 사용자 요청 요약: Desktop Package Readiness Repair

## 요청

- 내부 데스크톱 패키징 실패 원인을 모두 고치고, 기존 생성 변경물도 필요한 범위에서 같이 수정하라는 요청.

## 해석

- `pnpm run desktop:package:internal`이 끝까지 통과해야 한다.
- 이전에 건드리지 않겠다고 보류한 generated snapshot/admin history 출력도 검증에 필요하면 갱신한다.
- 최신 요구사항과 테스트가 충돌하는 부분은 활성 요구사항 기준으로 정렬한다.

