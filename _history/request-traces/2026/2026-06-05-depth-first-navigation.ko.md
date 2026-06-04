# 요청 추적: Depth First Navigation

## 요청

- 한 탭에 여러 기능을 넣지 않고, 더 깊은 drill-down 구조로 기능을 나눈다.

## 결과

- Workspace Monitor Overview 기본 화면을 기능 선택 메뉴로 낮추고, 실제 기능 내용은 `#home-depth-*` child view에서 하나씩 열리도록 변경했다.
- `CoreFeatureTabs`는 제거하고 `CoreFeatureDrilldown` 단일 기능 상세 컴포넌트로 대체했다.
- 탭 하나에 여러 기능을 넣지 않는 원칙을 영속 지침, UI 정책, memory bootstrap, Workspace Monitor 요구사항과 readiness 검증에 반영했다.

## 연결 산출물

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-depth-first-home-navigation/`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-05-depth-first-navigation.ko.md`
- 평가: `_history/evaluations/2026/2026-06-05-depth-first-navigation-evaluation-input.json`

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 17 tests
- `corepack pnpm --filter platform-desktop-app test`: 통과, 21 tests
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter workspace-monitor exec next build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 367590 bytes
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- `git diff --check`: 통과
- Browser smoke: 1280x720, 900x720, 390x844에서 기본 menu와 단일 상세 화면 전환, click/back, horizontal overflow 0 확인.
