# 리소스/라이프사이클 점검

- 날짜: 2026-06-07
- resource_risk_occurred: true

## 점검 대상

- React fetch: `SnapshotLoader`, `useAdminHistoryIndex`.
- React timers: snapshot timeout, startup prewarm timeout, settings sync debounce, source draft sync, workspace warmup poll.
- React async races: provider model catalog refresh, queued settings sync.
- React async races: source editor workspace text file loading.
- React async races: source editor save/write completion while the visible Monaco draft changes.
- React intervals: desktop resource snapshot, CLI session polling, native PTY polling.
- event/listener cleanup: overlay focus, global button feedback, Tool Studio 3D scene, motion helpers.
- Rust updater: pending update mutex, download/install, restart boundary.

## 보강

- `SnapshotLoader` startup prewarm timeout을 cleanup에서 clear한다.
- `useAdminHistoryIndex` 실패 promise를 reset해 abort/error 뒤 재시도 가능하게 한다.
- `installInstantButtonFeedback` 활성 cleanup set을 두고 root cleanup에서 모두 실행한다.
- `install_app_update`의 restart 요청 상태를 report에 반영한다.
- `useProviderAccountSettings`의 provider model request에 sequence guard를 추가한다.
- `useSettingsRuntimeSync`의 queued fire-and-forget sync에 catch boundary를 추가한다.
- `MonitorShell` source editor file load에 sequence guard를 추가하고 draft 선택/닫기에서 pending load를 취소한다.
- invalid source open 요청은 pending load ownership을 건드리지 않도록 sequence 시작을 validation 뒤로 제한한다.
- editor busy 중 source editor draft tab 전환/닫기를 비활성화해 저장·로딩 중 상태 교차를 막는다.
- 저장/전체 저장 중 Monaco editor와 편집성 command를 잠그고, 저장 완료 시 saved base와 current draft를 분리한다.

## 최종 검증 메모

- `corepack pnpm run desktop:package:run:internal`에서 Rust tests 8개, Rust build, Tauri release build, `.app`/`.dmg` 생성, codesign verify, hdiutil verify, internal app open이 통과했다.
- save-time editor lock 추가 후에도 `corepack pnpm run desktop:package:run:internal`이 다시 통과했다.
- long-running command session은 종료 상태를 확인했다.

## 확인된 기존 보호

- `MonitorShell` workspace warmup poll과 source draft sync timer는 unmount cleanup이 있다.
- active CLI/native PTY polling interval은 cleanup에서 clear하고 disposed guard를 사용한다.
- Tool Studio 3D scene은 RAF, observer, event listener, interval, WebGL resources를 cleanup한다.
- settings runtime sync debounce timer는 unmount cleanup이 있다.
