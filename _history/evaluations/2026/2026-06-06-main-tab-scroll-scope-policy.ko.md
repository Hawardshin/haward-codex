# 평가: Main Tab Scroll Scope Policy

날짜: 2026-06-06

## 결론

요청은 정책과 회귀 방지 검사 수준에서 충족됐다. main tab/page 전체를 기본 scroll owner로 두지 않는 원칙이 durable instructions, UI tone policy, memory bootstrap, renderer checker에 반영됐다.

## 검증

- `python3 _tools/docs-audit/src/docs_audit.py --check` 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json` 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json` 통과.
- `corepack pnpm --filter workspace-monitor run check` 통과. `scroll_contract_ok`, `checkedMainTabScrollOwners: 2`.
- `corepack pnpm --filter workspace-monitor test` 통과. 78개 테스트.
- `corepack pnpm --filter workspace-monitor run collect` 통과. 650 inline documents, 2632 admin history records.
- `corepack pnpm --filter workspace-monitor run build` 통과. Next.js production build.
- `git diff --check` 통과.

## 품질 판단

- 지시는 금지문에 머물지 않고 허용 scroll surface와 대체 행동으로 정리됐다.
- `.desktop-viewport`와 `.mounted-section-panel`에 whole-tab scroll ownership이 들어오면 static check가 실패한다.
- 기존 code/source, terminal/log, 긴 목록, popup/dialog 등 필요한 scroll surface는 유지된다.

## 남은 제한

- 이번 slice는 전체 UI 재배치가 아니라 future regression prevention이다.
