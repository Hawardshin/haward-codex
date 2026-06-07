# 2026-06-07 desktop monitor panel split continuation summary

## 완료

- `MonitorShell.tsx`에서 다음 패널을 feature 컴포넌트로 추가 분리했다.
  - `AccumulatedDataPanel.tsx`
  - `DesktopControlPanel.tsx`
  - `WorkspaceHostPanel.tsx`
- `runtimeCatalog.ts`로 공용 CLI adapter helper를 이동했다.
  - `localizedAdapterGuideText`
  - `providerAuthStatusForAdapter`
- readiness/test source aggregation에 새 패널 파일을 포함했다.
- 사용자가 실패했던 `corepack pnpm run desktop:package:run:internal` 경로를 끝까지 재실행해 내부 `.app`과 `.dmg` 생성, codesign 검증, hdiutil 검증, 앱 open까지 확인했다.

## 줄 수

- `MonitorShell.tsx`: 15018줄에서 14699줄로 감소.
- 새 패널:
  - `AccumulatedDataPanel.tsx`: 159줄
  - `DesktopControlPanel.tsx`: 159줄
  - `WorkspaceHostPanel.tsx`: 172줄

## 남은 제약

- 공개 배포는 Developer ID signing, notarization, updater endpoint/key, clean-machine smoke가 없어 여전히 public release blocked 상태다.
- 현재 git worktree는 이전 작업/사용자 변경이 많이 섞여 있어 이번 slice만 안전하게 커밋하지 않았다.
