# 설치 감사: Tauri Dialog Plugin Native Folder Picker

- 날짜: 2026-06-03
- 상태: installed
- 소유 프로젝트: `platform-desktop-app`
- 설치 범위: project-local Rust dependency
- 패키지: `tauri-plugin-dialog v2.7.1`
- 설치 명령: `cd platform-desktop-app/src-tauri && cargo add tauri-plugin-dialog@2`
- dependency record paths:
  - `platform-desktop-app/src-tauri/Cargo.toml`
  - `platform-desktop-app/src-tauri/Cargo.lock`
- 사용 목적: 설치형 데스크톱 앱에서 OS native folder picker로 active workspace를 선택한다.

## 근거

- Tauri 공식 Dialog plugin 문서는 native system dialogs와 Rust plugin init을 제공한다.
- docs.rs 기준 `tauri-plugin-dialog`는 MIT 또는 Apache-2.0 license다.
- 기존 앱은 Rust command bridge를 사용하므로 JavaScript package 추가 없이 Rust dependency로 충분하다.

## 보안 검토

- plugin은 Tauri 공식 plugin workspace에서 제공되는 native dialog 기능이다.
- 이번 command는 선택된 folder path를 기존 `set_desktop_workspace_path_report`로 넘기며, 실제 file read/write boundary는 기존 workspace-scoped relative path 검증을 계속 사용한다.
- `_private/`, workspace outside path, symlink escape 차단 정책은 기존 source editor command에 유지된다.

## 라이선스 검토

- `tauri-plugin-dialog`: MIT OR Apache-2.0.

## 설치 결과

- `cargo add tauri-plugin-dialog@2`로 `platform-desktop-app/src-tauri/Cargo.toml`과 `Cargo.lock`을 갱신했다.
- `src-tauri/capabilities/default.json`에 `dialog:default` capability를 추가했다.
- Rust command `choose_desktop_workspace_folder`를 추가하고 installer shell runtime contract의 workspace host command surface에 등록했다.

## 검증 결과

- `cargo check`: passed
- `cargo test`: passed
- `cargo build`: passed
- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- Browser static-build smoke: `파일` 클릭 후 `네이티브 파일 작업공간`, `폴더 선택`, `현재 작업공간` 확인
- Screenshot evidence: `platform-desktop-app/artifacts/2026-06-03-native-korean-workspace-ux/browser-native-file-workspace.png`

## 롤백

- `cd platform-desktop-app/src-tauri && cargo remove tauri-plugin-dialog`
- `choose_desktop_workspace_folder` command와 관련 UI 버튼 제거
- `Cargo.lock` 재생성 후 Rust/desktop checks 재실행
