# Evaluation: model and scene split

- 날짜: 2026-06-08
- 범위: `platform-desktop-app` workspace monitor type model and ToolStudio scene split.

## 완료

- `snapshot.ts` public import path를 유지하면서 snapshot 타입을 4개 영역 파일과 aggregator로 분리했다.
- `desktop.ts` public import path를 유지하면서 desktop 타입을 4개 영역 파일과 aggregator로 분리했다.
- ToolStudio 3D scene lifecycle을 `useToolAgentScene.ts` hook으로 분리했다.
- 새 분리 파일마다 한국어 책임 주석을 추가했다.

## 검증

- 통과: `corepack pnpm --filter workspace-monitor test`
- 통과: `corepack pnpm --filter workspace-monitor run check`
- 통과: `corepack pnpm --filter workspace-monitor run build`
- 재시도 후 통과: `corepack pnpm --filter platform-desktop-app run renderer:build`

## 평가

- 이번 slice의 요구인 type model 분리와 ToolStudio scene side-effect 분리는 완료됐다.
- 로컬 구조 압력은 `MonitorShell.tsx`와 `ToolStudioPanel.tsx` 두 파일로 좁혀졌다.
- 첫 renderer build 실패는 병렬 Next.js build lock 충돌이며, 직렬 재실행에서 통과했다.

## 남은 게이트

- `MonitorShell.tsx`: 13042 lines.
- `ToolStudioPanel.tsx`: 1318 lines.
- 공개 배포 준비는 Developer ID signing, notarization, clean-machine smoke, update/rollback gate가 필요하다.
