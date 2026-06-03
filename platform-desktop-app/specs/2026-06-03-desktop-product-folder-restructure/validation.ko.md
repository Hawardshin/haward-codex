# 데스크톱 제품 폴더 구조 재편 검증

## 실행 결과

- `corepack pnpm install --lockfile-only`: 통과.
- `corepack pnpm install --frozen-lockfile`: 통과. 이동 후 workspace package symlink를 재연결했다.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과. customer public snapshot과 static export 생성.
- `corepack pnpm --filter workspace-monitor test`: 통과. 16개 테스트 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과. largest chunk 227542 bytes.
- `corepack pnpm --filter platform-desktop-app test`: 통과. 14개 테스트 통과.
- `corepack pnpm --filter platform-desktop-app run runtime:contract`: 통과.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. internal service readiness score 94, public release blockers는 signing/notarization/updater/clean-machine smoke.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: 통과. root `workspace-monitor/`는 등록 프로젝트가 아니며 `platform-desktop-app/renderer`가 platform project home에 포함됨.
- `python3 _tools/workspace-index/src/workspace_index.py --check`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: 변경한 desktop/project config self-documenting checks 통과.

## 알려진 잔여 게이트

- public macOS/Windows release는 Developer ID/code signing, notarization, signed updater, clean-machine smoke가 남아 있어 아직 public-ready로 주장하지 않는다.
