# 2026-06-06 resource check

## Runtime risk

이번 작업은 source refactor이며 새 long-running process, timer, file watcher, browser listener, cache, stream, pipe를 추가하지 않는다.

## 변경 사항

- UI component 내부 pure calculation을 TypeScript module로 이동했다.
- runtime telemetry snapshot lifecycle은 바꾸지 않았다.
- memory retention은 기존 latest snapshot 1개 state 구조를 유지한다.
- internal package 검증 중 이전 실패가 남긴 `rw.*.dmg` intermediate가 다음 DMG 생성 입력에 섞이는 문제를 확인했고, Tauri build 직전 cleanup step을 추가했다.

## 검증

- TypeScript check로 import/type boundary를 확인한다.
- package build와 Browser smoke로 runtime surface가 유지되는지 확인한다.
- cleanup script는 Tauri macOS bundle root의 `rw.*.dmg` file entry만 삭제하며, 최종 DMG artifact나 사용자가 마운트한 외부 DMG는 대상으로 삼지 않는다.
- Browser smoke용 `python3 -m http.server`는 검증 후 `Ctrl-C`로 종료했고, smoke tab도 닫았다.

## 결론

resource_risk_occurred=true로 기록한다. 새 장기 실행 리소스는 없고, 검증용 서버/브라우저 탭은 정리했으며, package pipeline은 stale DMG intermediate cleanup을 갖는다.
