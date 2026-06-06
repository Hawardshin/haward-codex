# 설치 감사: workspace-monitor xterm search addon

## 요약

- 날짜: 2026-06-06
- 상태: installed
- 프로젝트: `platform-desktop-app/renderer/workspace-monitor`
- 범위: project-local frontend dependency
- 패키지: `@xterm/addon-search@0.16.0`
- 설치 명령: `corepack pnpm --filter workspace-monitor add -E @xterm/addon-search@0.16.0`

## 설치 목적

터미널 기능 개선 요청에 따라 xterm.js 기반 native PTY surface에 scrollback 검색, 이전/다음 match 이동, keyboard-friendly search controls를 추가한다. 직접 구현한 문자열 검색보다 xterm.js 공식 addon 계열을 사용하는 것이 유지보수와 terminal buffer 동작 면에서 낫다.

## dependency record

- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `pnpm-lock.yaml`

## 설치 전 확인

| 항목 | 결과 |
|---|---|
| version | `0.16.0` |
| license | `MIT` |
| repository | `git+https://github.com/xtermjs/xterm.js.git#master` |
| unpacked size | `838673` |
| 설치 범위 | project-local dependency only |

## 보안 검토

- 전역 설치 없음.
- native executable, Tauri permission, credential access, browser cookie access, external network client를 추가하지 않는다.
- frontend terminal buffer search addon이므로 runtime 권한 증가는 없다.

## 라이선스 검토

- npm metadata 기준 `@xterm/addon-search@0.16.0` license는 `MIT`.
- 기존 `@xterm/xterm`, `@xterm/addon-fit`, `@xterm/addon-web-links`와 같은 xterm.js 생태계 package다.

## 검증 계획

## 설치 후 실제 결과

- 실행한 명령: `corepack pnpm --filter workspace-monitor add -E @xterm/addon-search@0.16.0`
- 설치된 버전: `@xterm/addon-search@0.16.0`
- 변경된 파일:
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - `pnpm-lock.yaml`
- 생성/갱신된 lock 파일: `pnpm-lock.yaml`

## 검증 결과

- `corepack pnpm audit --prod=false`: No known vulnerabilities found
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 79개 테스트
- `corepack pnpm --filter workspace-monitor run build`: 통과, Next.js production build
- `corepack pnpm --filter platform-desktop-app test`: 통과, 24개 테스트
- `corepack pnpm --filter platform-desktop-app run check`: 통과, 기존 public signing/updater/clean-machine gate 경고만 유지
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과

## Rollback

1. `corepack pnpm --filter workspace-monitor remove @xterm/addon-search`
2. `RuntimeTerminalDrawer.tsx`의 `SearchAddon` import/load와 search controls 제거.
3. 터미널 UX test/CSS를 되돌린 뒤 workspace-monitor/platform checks를 재실행한다.
