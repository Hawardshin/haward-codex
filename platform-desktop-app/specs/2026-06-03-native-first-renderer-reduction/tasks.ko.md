# 작업 목록: Native-first renderer reduction

## 완료

- [x] Web-first intake로 Tauri v2 command/capability/path reference를 확인한다.
- [x] `DesktopPreferences`와 `DesktopRuntimeInitDefaults` Rust schema를 추가한다.
- [x] app config `desktop-preferences.v1.json` path helper를 추가한다.
- [x] `get_desktop_preferences`, `save_desktop_preferences` command를 추가한다.
- [x] Rust normalization으로 잘못된 preference 값을 기본값으로 보정한다.
- [x] renderer localStorage preference persistence를 제거한다.
- [x] renderer가 native preference command를 load/save하도록 교체한다.
- [x] 설정 데이터 탭에 native preference store 상태와 path를 표시한다.
- [x] runtime contract에 `preferences_commands`를 추가한다.
- [x] readiness/test에 no-localStorage regression guard를 추가한다.
- [x] customer snapshot을 재생성한다.

## 다음 작업

- [ ] `preferences.rs`, `workspace_host.rs`, `cli_supervisor.rs`로 Rust native modules를 분리한다.
- [ ] source editor settings와 draft persistence도 native schema로 이동한다.
- [ ] workspace explorer tree/filter state를 renderer-only transient state와 native preference state로 분리한다.
- [ ] native app menu/shortcut/menu command surface를 추가해 설정/파일/터미널 action을 OS 메뉴에서도 접근하게 한다.
