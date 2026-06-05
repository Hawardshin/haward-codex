# 평가: Monitor 성능 가드레일 완성

## 결과

- 통과.
- 탭 전환 성능 개선이 코드 리뷰나 기억에 의존하지 않도록 lazy-boundary contract와 반복 section switch audit를 검증선에 연결했다.
- built `out/` 기준에서 성능 예산, section switch, repeated section switch, button response 감사가 모두 통과했다.
- internal `.app`와 `.dmg` 패키징, codesign verify, DMG verify가 완료됐다.

## 핵심 검증 수치

- `perf:sections:repeat`: runs 3, settle average 303.2ms, settle p95 705.9ms
- `perf:sections:repeat`: long-task max 354ms, long-task total p95 484ms
- `perf:buttons`: real click feedback p95 51ms
- `perf:budget`: largest chunk 734386 bytes / 1000000 budget

## 잔여 리스크

- Tauri WebView 안에서 OS-level memory/CPU telemetry를 장기 수집하는 단계는 남아 있다.
- public release는 Developer ID signing, notarization, signed updater, clean-machine smoke 전까지 blocked다.

## 판단

이번 슬라이스는 “탭 전환이 다시 느려지는 변경을 자동으로 걸러내는 구조”까지 구현했다. 다음 큰 구조 개선은 `MonitorShell.tsx`, `globals.css`, `src-tauri/src/lib.rs` 분해를 별도 migration으로 진행하는 것이 맞다.
