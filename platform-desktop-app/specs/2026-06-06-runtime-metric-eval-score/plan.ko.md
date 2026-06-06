# 계획: runtime metric EVAL score

## 단계

1. 공식 문서와 이전 close-out 기록을 확인한다.
2. 미뤄둔 항목 중 실제 runtime metric 기반 score 연결을 선택한다.
3. Rust desktop resource snapshot report에 semantic metric contract를 추가한다.
4. `MonitorShell`이 runtime snapshot을 EVAL panel로 공유하도록 state를 끌어올린다.
5. EVAL scoring, evidence, runtime metric strip UI를 추가한다.
6. contract script, workspace-monitor test, readiness test를 업데이트한다.
7. collector, check, test, build, internal package, Browser smoke를 실행한다.
8. 요구사항/spec/trace/evaluation/history 기록을 정리하고 commit/push한다.

## 리스크 관리

- snapshot callback은 실패 시 `null`을 전달해 stale native metric이 EVAL에 남지 않게 한다.
- static browser preview는 fallback metric row로 유지한다.
- process/thread metric은 semantic name을 갖되 source field로 `sysinfo` 기반임을 표시한다.
