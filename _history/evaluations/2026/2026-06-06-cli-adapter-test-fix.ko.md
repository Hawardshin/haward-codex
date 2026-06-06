# Evaluation: CLI Adapter Test Fix

## 평가 기준

- 붙여넣은 실패 로그의 `authHint: string;` assertion 실패가 해소되는가.
- 런타임 동작을 불필요하게 되돌리지 않고 현재 localized setup guide 구조를 보존하는가.
- owning project의 테스트와 내부 패키지 명령이 통과하는가.
- 기존 dirty generated snapshot 변경을 섞어 커밋하지 않는가.

## 현재 평가

- `tool-studio.test.mjs`의 CLI adapter setup assertion을 `LocalizedText` 타입 기대값으로 갱신했다.
- `MonitorShell.tsx`의 `AdapterSetupGuide`는 `authHint`, `firstRunCommand`, `expectedResult`를 localized field로 계속 제공한다.
- generated snapshot 파일들은 작업 시작 전부터 dirty 상태였고 이번 커밋 범위에서 제외한다.

## 검증 상태

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 88 tests.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
- 내부 산출물 생성 및 검증:
  - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과.
  - `hdiutil verify`: 통과.

## 잔여 리스크

- public release readiness의 기존 경고인 Developer ID signing, notarization, updater, clean-machine smoke test는 이번 범위가 아니다.
- working tree에는 기존 generated snapshot 변경이 남아 있다.
