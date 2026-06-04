# 검증: Single Purpose Home UI

## 수행 검증

- `pnpm run check`: 통과
- `pnpm test`: 17개 통과
- `pnpm exec next build`: 통과
- `pnpm run perf:budget`: 통과, largest chunk 362490 bytes
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과, gaps 0
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- JSON syntax check: 통과
- localhost HTTP smoke: `200`, 0.294806s
- in-app Browser responsive smoke:
  - 1280x720: horizontal overflow 0, disclosure 6개 기본 접힘, feature CTA 1개, 작은 홈 타깃 0개
  - 900x720: horizontal overflow 0, disclosure 6개 기본 접힘, feature CTA 1개, 작은 홈 타깃 0개
  - 390x844: horizontal overflow 0, disclosure 6개 기본 접힘, feature CTA 1개, 작은 홈 타깃 0개
  - 390x844에서 `실행 순서` disclosure open: 1개 열림, horizontal overflow 0

## 확인 기준

- 핵심 기능 active detail의 CTA는 하나다: 충족.
- 홈 disclosure panel은 기본 접힘이며 각 summary가 하나의 정보 역할만 나타낸다: 충족.
- desktop/tablet/mobile viewport에서 horizontal overflow가 없다: 충족.
- 단일 목적 UI 원칙이 persistent instructions, UI tone policy, memory bootstrap, 요구사항에 남아 있다: 충족.
