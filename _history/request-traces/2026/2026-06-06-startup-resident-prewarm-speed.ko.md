# 요청-결과 추적: startup resident prewarm 속도 최적화

## 요청

사용자는 "속도 최적화"를 요청했으며, 앞선 맥락에서 탭 전환 지연과 데스크톱 자원 활용 부족을 반복 지적했다.

## 결과

- startup idle resident prewarm을 추가했다.
- resident cap 5와 source state retention을 유지했다.
- overview hidden retention을 제외했다.
- Tool Studio rerender 비용을 줄이는 memo/stable callback을 추가했다.
- 내부 `.app`와 `.dmg` 패키징까지 완료했다.

## 연결 파일

- 구현: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-startup-resident-prewarm-speed.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-startup-resident-prewarm-speed/spec.ko.md`
- 검증: `platform-desktop-app/specs/2026-06-06-startup-resident-prewarm-speed/validation.ko.md`
- 평가 입력: `_history/evaluations/2026/2026-06-06-startup-resident-prewarm-speed-evaluation-input.json`

## 판단

최악 지연 p95는 개선됐지만 평균 지연은 악화됐다. 이번 변경은 immediate responsiveness의 tail latency 보정으로 닫고, 평균 지연 개선은 section component split과 per-section memoization의 후속 작업으로 추적한다.
