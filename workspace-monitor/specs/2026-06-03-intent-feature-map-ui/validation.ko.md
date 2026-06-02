# 검증: Intent Feature Map UI

## 실행 검증

- `npm --prefix workspace-monitor run collect`: 통과
- `npm --prefix workspace-monitor test`: 통과
- `npm --prefix workspace-monitor run check`: 통과
- `npm --prefix workspace-monitor run build`: 통과
- `npm --prefix workspace-monitor run build:customer`: 통과
- `npm --prefix workspace-monitor run perf:budget`: 통과, largest initial chunk 227,537 bytes
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`: 통과
- `curl http://127.0.0.1:3091/`: 200 응답 확인
- `curl http://127.0.0.1:3091/workspace-snapshot.json`: `themes=12`, `now=4`, developer view `intent` 허용 확인

## 수동 확인

- customer snapshot의 `documents=0`, `sourceFiles=0`, `intentFeatureMap.themes=0`, `roadmap.now=0` 확인.
- in-app Browser MCP 도구가 노출되지 않아 클릭/스크린샷 검증은 HTTP smoke로 대체했다.
