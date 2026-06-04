# 검증: Depth First Home Navigation

## 실행 결과

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 17 tests
- `corepack pnpm --filter platform-desktop-app test`: 통과, 21 tests
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `corepack pnpm --filter workspace-monitor exec next build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 367590 bytes
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과, gaps 0
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: 통과
- JSON syntax check: 통과
- `git diff --check`: 통과
- in-app Browser responsive/drill-down smoke: 통과
  - 1280x720, 900x720, 390x844에서 horizontal overflow 0
  - 기본 홈은 `home-depth-menu` 링크 12개를 표시하고 drill-down 상세는 0개
  - `#home-depth-feature-agents`에서는 menu가 숨고 상세 surface 1개와 `main-workbench-panel` 1개만 표시
  - `에이전트 만들기` 클릭과 뒤로가기 링크 클릭 모두 해시 이동/복귀 성공
  - 40px 미만 visible action target 없음

## 확인 기준

- Overview 기본 홈은 기능 선택 메뉴이며 여러 기능 상세 패널을 동시에 노출하지 않는다.
- drill-down 화면은 선택한 기능 하나만 보여준다.
- desktop/tablet/mobile에서 horizontal overflow가 없다.
- TypeScript, build, docs/config 계약 검증을 통과한다.
