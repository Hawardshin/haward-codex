# Deep Feature Issue Review 작업 요약

- 날짜: 2026-06-07
- 대상: `platform-desktop-app/`

## 구현 결과

- `src-tauri/src/features/app_update.rs`
  - `install_app_update`에서 `restart` 요청을 `restart_requested`로 보존하고, report의 `restarted`와 detail이 실제 호출 의도와 일치하도록 수정했다.
- `renderer/workspace-monitor/components/features/ServiceReadinessPanel.tsx`
  - 업데이트 설치 결과에 `재시작 요청됨` 상태를 노출했다.
- `renderer/workspace-monitor/components/history/useAdminHistoryIndex.ts`
  - lazy admin history index fetch 실패/abort 뒤 전역 promise가 영구 실패 상태로 남지 않도록 실패 promise를 비웠다.
- `renderer/workspace-monitor/components/SnapshotLoader.tsx`
  - startup prewarm timeout을 effect cleanup에서 해제하도록 바꿨다.
- `renderer/workspace-monitor/lib/motion.ts`
  - instant button feedback 활성 cleanup들을 root cleanup에서 모두 실행하도록 보강했다.
- `renderer/workspace-monitor/components/features/useProviderAccountSettings.ts`
  - provider 모델 목록 요청에 sequence guard를 추가해 느린 이전 요청 결과가 최신 provider 모델 UI를 덮지 못하게 했다.
- `renderer/workspace-monitor/components/features/useSettingsRuntimeSync.ts`
  - queued settings sync 실패가 unhandled promise로 새지 않도록 fire-and-forget catch boundary를 추가했다.
- `renderer/workspace-monitor/components/MonitorShell.tsx`
  - source editor 파일 로딩에 request sequence guard를 추가해 느린 이전 read 결과가 최신 draft/선택 상태를 덮지 못하게 했다.
  - source load request 시작/취소를 `beginSourceLoadRequest`/`cancelPendingSourceLoad` helper로 묶고, editor busy 중 draft 탭 전환/닫기를 비활성화했다.
  - 빈 경로 또는 Tauri 미가용 같은 invalid open 요청은 pending source load를 취소하지 않도록 request sequence 시작을 입력 검증 뒤로 제한했다.
  - `sourceEditorLocked`를 추가해 저장/전체 저장 중 Monaco 편집과 편집성 toolbar command를 잠갔다.
  - 저장 완료 반영 시 `savedContent`를 base로, 저장 완료 시점의 editor content를 draft로 분리해 저장 중 새 입력이 dirty draft로 유지되게 했다.
- regression tests
  - update restart report, admin history retry contract, snapshot prewarm cleanup, instant button cleanup, provider model stale guard, queued sync catch, source editor stale load guard, save-time editor lock 계약을 static/readiness tests에 추가했다.

## 검토 결과

- `dangerouslySetInnerHTML`은 collector의 `markdownToHtml`가 raw HTML을 escape하고 기존 테스트가 확인한다.
- Rust `expect`는 Tauri app boot 또는 test-only 경로에 한정되어 있었다.
- `Workspace-scoped command stub` 문자열은 실제 runtime stub가 아니라 source editor starter template 문구였다.
- public release blockers는 code bug가 아니라 signing/notarization/updater credential/clean-machine smoke 입력과 검증 게이트다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 90 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `cargo fmt --check && cargo check && cargo test`: 통과, Rust tests 8 passed.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 통과. `.app`/`.dmg` 생성, codesign verify, hdiutil verify, internal app open 완료.

Continuation 20:36 KST 추가 검증:

- `corepack pnpm --filter workspace-monitor test`: 통과, 90 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. customer bundle stale warning은 최종 package 파이프라인에서 다시 정리한다.
- `corepack pnpm run desktop:package:run:internal`: 통과. stale snapshot warning 해소, `.app`/`.dmg` 생성, codesign verify, hdiutil verify, internal app open 완료.

Continuation 20:43 KST 추가 구현 및 1차 검증:

- `MonitorShell.tsx`: source editor 파일 read 요청에 최신 요청 sequence guard 추가.
- `MonitorShell.tsx`: draft 선택/active draft 닫기 시 pending source load를 취소하는 공통 helper 사용.
- `MonitorShell.tsx`: editor busy 중 source editor tab 전환/닫기 비활성화.
- `tool-studio.test.mjs`: source editor stale async file load regression test 추가.
- `corepack pnpm --filter workspace-monitor test`: 통과, 91 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. public release warning은 signing/notarization/updater credential/clean-machine smoke 외부 게이트로 유지.
- `corepack pnpm run desktop:package:run:internal`: 통과. workspace-monitor collect/check/test, Rust tests 8 passed, Rust build, customer bundle audit, Tauri release build, `.app`/`.dmg`, codesign verify, hdiutil verify, internal app open 완료.
- 최종 보정 후 `corepack pnpm --filter workspace-monitor test`, `corepack pnpm --filter workspace-monitor run check`, `corepack pnpm run desktop:package:run:internal`을 재실행해 같은 게이트가 통과했다.

Continuation 20:53 KST 추가 구현 및 1차 검증:

- `MonitorShell.tsx`: 저장/전체 저장 중 `sourceEditorLocked`로 editor read-only, command toolbar, file/draft 전환을 잠그도록 수정.
- `MonitorShell.tsx`: 저장 완료 시 저장된 base와 저장 완료 시점의 visible draft content를 분리해 후속 입력 소실을 방지.
- `tool-studio.test.mjs`: save-time mutation lock regression test 추가.
- `corepack pnpm --filter workspace-monitor test`: 통과, 92 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. stale customer snapshot warning은 최종 package pipeline에서 다시 정리한다.
- `corepack pnpm run desktop:package:run:internal`: 통과. workspace-monitor collect/check/test, Rust tests 8 passed, Rust build, customer bundle audit, Tauri release build, `.app`/`.dmg`, codesign verify, hdiutil verify, internal app open 완료.

패키징 산출물:

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
