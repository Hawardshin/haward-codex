# 검증: Intent Feature Map 소스 구조 리팩터링

## 계획된 명령

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run build:customer`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run perf:budget`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`

## 결과

- `npm --prefix workspace-monitor test`: 통과, 16개 테스트 pass.
- `node --check workspace-monitor/scripts/collect-workspace.mjs && node --check workspace-monitor/scripts/lib/intent-feature-map.mjs`: 통과.
- `npm --prefix workspace-monitor run collect`: 통과, developer snapshot 생성.
- `npm --prefix workspace-monitor run check:intent-map`: 통과, 155개 의도와 12개 기능 축 확인.
- `npm --prefix workspace-monitor run check`: 통과.
- `npm --prefix workspace-monitor run build`: 통과.
- `npm --prefix workspace-monitor run build:customer`: 통과.
- `npm --prefix workspace-monitor run check:intent-map:customer`: 통과, customer snapshot에서 의도 지도 0개 확인.
- `npm --prefix workspace-monitor run collect`: 통과, developer snapshot 복원.
- `npm --prefix workspace-monitor run check:intent-map`: 통과.
- `npm --prefix workspace-monitor run perf:budget`: 통과, largest initial chunk 227537 bytes.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`: 통과.
