# 계획: Workbench lazy boundary 확장

## 분류

- 소유 프로젝트: `platform-desktop-app`
- 작업 모드: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 평가

이전 resident/prewarm 최적화는 mount cost를 줄였지만, `MonitorShell.tsx`가 여전히 많은 heavy panel runtime imports와 JSX를 한 client module에 보유했다. 다음 병목은 Desktop runtime, home feature drilldown, Agents detail/build panels가 같은 Shell 평가 경로에 남아 있는 것이다.

## 실행 계획

1. `MonitorShell.tsx`의 heavy panel imports와 inline Agents panels를 조사한다.
2. Agents detail/build panels를 별도 workbench modules로 이동한다.
3. 기존 feature/workbench components의 props type을 export한다.
4. `MonitorShell.tsx`에서 `dynamic()` boundaries와 staggered preload를 연결한다.
5. button response audit를 실제 DOM readiness 기준으로 안정화한다.
6. readiness/test 계약을 새 module boundary에 맞게 갱신한다.
7. build, package, performance audits를 실행한다.

## 위험 관리

- lazy split이 첫 진입 지연으로만 바뀌지 않도록 idle preload를 유지한다.
- prewarm이 startup main thread를 막지 않도록 순차 분산한다.
- static server와 package subprocess는 close-out 전에 종료/완료를 확인한다.
