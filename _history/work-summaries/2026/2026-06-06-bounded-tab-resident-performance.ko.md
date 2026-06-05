# 작업 요약: bounded tab resident 성능 보정

Workspace Monitor 탭 전환이 아직 느리다는 피드백에 대해 이전의 전체 visible section resident 선마운트를 보정했다. 무제한 hidden React tree 누적을 제거하고, active/source/최근 섹션만 최대 5개까지 resident로 유지하도록 바꿨다.

## 변경

- `MonitorShell.tsx`: resident section cap, source retained section, hidden runtime memo, stable callbacks 추가
- `useAdminHistoryIndex.ts`: admin history index preload API 추가
- `audit-section-switch-latency.mjs`: 섹션 전환 settle time과 mounted panel count 감사 추가
- `tool-studio.test.mjs`: bounded resident 계약으로 테스트 갱신
- `package.json`: `perf:sections` script 추가

## 검증

- renderer test/check/build 통과
- `perf:sections` 통과: CPU 6배 throttle에서 settle p95 827.8ms, max resident/mounted panel 5
- `perf:budget` 통과: largest chunk 734,386 bytes
- desktop test/check 통과
- `package:internal` 통과, `.app`와 `.dmg` 생성 및 codesign/hdiutil 검증 완료

## 판단

이번 병목은 Rust resource warmup 부족보다 hidden React tree를 너무 많이 resident로 유지한 구조에 가까웠다. native/RAM prewarm은 유지하고 React resident DOM은 cap으로 제한하는 쪽으로 보정했다.
