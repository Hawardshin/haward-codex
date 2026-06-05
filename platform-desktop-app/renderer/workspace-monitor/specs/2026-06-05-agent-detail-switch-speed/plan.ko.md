# 계획: Agent Detail Switch Speed

1. 공식 성능 자료에서 클릭 응답과 long task 분리 기준을 확인한다.
2. 현재 Agents detail switcher의 상태와 렌더 조건을 점검한다.
3. 선택 상태와 실제 active workspace render 상태를 분리한다.
4. 첫 paint 이후 commit 예약, 최신 클릭 우선, cleanup 취소를 구현한다.
5. pending 상태와 active workspace 단일 렌더를 정적 테스트에 추가한다.
6. `test`, `tsc`, `check`, `build`, `build:customer`, `perf:budget`을 실행한다.
7. 정적 export를 in-app Browser에서 열어 Agents detail switcher를 smoke 검증한다.
