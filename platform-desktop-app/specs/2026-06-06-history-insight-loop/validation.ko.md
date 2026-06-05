# 검증 기록

## 현재 통과

- `corepack pnpm --filter workspace-monitor test`: 통과, 64 tests.
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 24 tests.
- `corepack pnpm --filter workspace-monitor run collect`: 통과, developer public snapshot 생성.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- Browser static smoke: 통과. Product Structure surface에서 `history-insight-board` visible, 4 cards visible, card overflow false.
- `corepack pnpm run desktop:package:internal`: 통과.

## Snapshot 확인

- 실제 developer snapshot 기준 `historyInsightPatterns`: 6.
- `historyInsightRecommendations`: 6.
- source documents: 3,485.
- evidence links: 36.
- detected patterns: build closeout, web research to spec, large-scope slicing, desktop native resource, UI feedback to design contract, release blocker gate.
- customer snapshot 기준 `historyInsightPatterns`: 0, `historyInsightLoop.signalGroups`: 0.

## 내부 패키징 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- `codesign --verify --deep --strict`: 통과.
- `hdiutil verify`: 통과.

## 남은 리스크

- Rule 기반이므로 의미가 같은 새 표현은 keyword를 보강해야 감지된다.
- LLM 기반 재요약/추론 UI는 이번 범위 밖이다.
- 공개 배포 signing/notarization/updater/clean-machine smoke warning은 기존 public release gate로 남는다.
