# 작업 요약

- `SnapshotLoader`를 lightweight bootstrap으로 유지하고 heavy `MonitorShell`을 별도 dynamic boundary로 분리했다.
- startup resident panel limit을 12로 늘려 모든 주요 section을 초기 resident set에 포함했다.
- 2.6초 shell warmup overlay를 추가해 사용자가 조작하기 전 탭 mount/prewarm 비용을 먼저 쓰게 했다.
- production static export 설정을 dev 경로와 분리해 `next dev` hydration 고착을 해결했다.
- static/dev/in-app Browser smoke, check/test/build/perf를 통과했다.
