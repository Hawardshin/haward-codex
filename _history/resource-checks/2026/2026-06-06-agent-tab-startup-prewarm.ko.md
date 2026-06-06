# 리소스 점검

- 리스크: 12개 panel resident mount, dynamic imports, timers, WebGL/Monaco prewarm, local dev/static servers.
- 완화:
  - `SnapshotLoader` cleanup은 AbortController와 timeout clear를 유지한다.
  - `MonitorShell` startup timer는 cleanup에서 clear한다.
  - hidden inactive panel은 WebGL surface가 활성으로 오판하지 않도록 기존 `hidden` 방식을 유지한다.
  - static/dev servers는 검증 후 종료한다.
- 측정:
  - Section audit: p95 1413.4ms, max long task 1125ms, mounted panel count 12.
  - Browser smoke: Agent switch static 244ms, dev 219ms.
