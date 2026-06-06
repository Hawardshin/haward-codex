# Plan: Runtime Setup Check

## 구현 전략

1. Rust에 terminal setup check report와 `check_runtime_terminal_setup` command를 추가한다.
2. renderer에 `RuntimeTerminalSetupCheckReport` 타입과 setup check state/action을 추가한다.
3. settings adapter panel에 check button과 결과 panel을 추가한다.
4. 기존 tests에 정적 계약 assertion을 추가한다.
5. workspace monitor test와 internal package pipeline으로 검증한다.

## 파일 범위

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 리스크

- packaged app PATH와 개발 shell PATH가 다를 수 있다. UI copy는 “설치형 런타임이 보는 경로”를 기준으로 설명한다.
- startup command는 실행하지 않으므로 활성화 스크립트 성공 여부까지 보장하지 않는다.

## 검증 전략

- 정적 테스트로 command 등록, UI action/result, CSS contract를 확인한다.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`를 실행한다.
- 최종적으로 `pnpm --dir platform-desktop-app package:internal`을 실행한다.
