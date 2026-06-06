# 구현 계획

1. `SnapshotLoader`에서 heavy monitor dynamic import를 분리한다.
2. `MonitorShellBoundary`와 shared loading shell을 추가한다.
3. startup resident section limit을 12로 늘리고 모든 section을 초기 resident set에 포함한다.
4. shell 내부 warmup overlay로 초기 마운트 비용을 사용자가 조작하기 전으로 이동한다.
5. dev hydration을 위해 static export config를 production에만 적용한다.
6. check/test/build/browser smoke/perf/package를 실행한다.
