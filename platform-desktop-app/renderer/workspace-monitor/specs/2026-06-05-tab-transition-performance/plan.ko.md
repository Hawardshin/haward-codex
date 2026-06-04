# 계획: Tab Transition Performance

1. React/Next 성능 기준을 웹에서 확인한다.
2. 정적 export에서 CPU throttle 6 기준 탭 전환 시간을 측정한다.
3. 닫힌 section-level disclosure 내부에 heavy panel이 계속 마운트되는지 확인한다.
4. Agents와 Desktop Runtime 보조 패널을 disclosure open state 기반 조건부 렌더링으로 바꾼다.
5. 섹션 전환 상태 갱신을 즉시 처리하고 중복 렌더를 줄인다.
6. 같은 조건으로 탭 전환 시간과 closed/open disclosure 동작을 재측정한다.
7. `check`, `test`, `build:customer`, `perf:budget`, `platform-desktop-app check`를 실행한다.
