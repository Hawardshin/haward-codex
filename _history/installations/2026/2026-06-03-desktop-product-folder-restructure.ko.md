# 데스크톱 제품 폴더 구조 재편 설치/환경 기록

## 범위

- 목적: 루트 `workspace-monitor/`를 `platform-desktop-app/renderer/workspace-monitor/`로 이동한 뒤 pnpm workspace symlink와 lockfile importer를 새 경로에 맞게 재연결한다.
- 설치 모드: developer
- 실제 새 dependency 추가: 없음

## 실행 명령

- `corepack pnpm install --lockfile-only`
- `corepack pnpm install --frozen-lockfile`

## Dependency Record

- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `platform-desktop-app/package.json`

## Security Review

- 새 패키지나 새 version을 추가하지 않았다.
- 기존 pnpm lockfile importer path를 `platform-desktop-app/renderer/workspace-monitor`로 갱신했고, 이동 후 끊어진 `node_modules` symlink를 workspace-local install로 재연결했다.
- `_private/`는 읽거나 색인하지 않았다.

## License Review

- 새 외부 dependency가 없어 license surface는 변경되지 않았다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor test`: 16개 테스트 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과

## Rollback

- `platform-desktop-app/renderer/workspace-monitor/`를 루트 `workspace-monitor/`로 되돌리고 `pnpm-workspace.yaml`, `pnpm-lock.yaml`, Tauri config, readiness scripts, registry/docs/map 변경을 되돌린 뒤 `corepack pnpm install --frozen-lockfile`을 다시 실행한다.
