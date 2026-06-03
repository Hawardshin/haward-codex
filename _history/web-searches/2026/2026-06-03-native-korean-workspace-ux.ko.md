# 웹 검색 기록: 네이티브 한국어 작업공간 UX

- 날짜: 2026-06-03
- 관련 요청: `UR-2026-06-03-039`
- 작업 모드: `standard`

## 검색 쿼리

- `Tauri v2 file system plugin official documentation open file dialog path desktop app`
- `Tauri v2 dialog plugin official documentation open directory file picker`
- `Tauri v2 invoke command official documentation frontend Rust commands`

## 확인한 출처

| 출처 | URL | 사용 방식 |
| --- | --- | --- |
| Tauri v2 Dialog Plugin | https://v2.tauri.app/ko/plugin/dialog/ | native file/folder dialog, Rust plugin init, folder picker availability 확인 |
| Tauri Dialog Rust API | https://docs.rs/tauri-plugin-dialog/latest/tauri_plugin_dialog/struct.FileDialogBuilder.html | `blocking_pick_folder`와 `FilePath` 반환 형태 확인 |
| Tauri FilePath API | https://docs.rs/tauri-plugin-dialog/latest/tauri_plugin_dialog/enum.FilePath.html | 선택 결과를 `PathBuf`로 변환하는 `into_path` 확인 |
| Tauri Calling Rust from Frontend | https://v2.tauri.app/develop/calling-rust/ | frontend에서 Rust command를 호출하는 boundary 확인 |

## 계획 영향

- 기존 수동 경로 입력만으로 workspace를 import하는 UX는 네이티브 앱답지 않으므로 OS 폴더 선택 다이얼로그를 추가한다.
- 이 앱은 이미 Rust command 중심의 Tauri bridge를 쓰므로 JavaScript plugin API보다 Rust command `choose_desktop_workspace_folder`를 추가한다.
- 파일 보기/편집은 기존 `list_workspace_text_files`, `read_workspace_text_file`, `write_workspace_text_file`를 재사용하되, `파일/코드` 섹션에서 바로 발견되게 한다.

## 불확실성

- 이번 slice는 desktop 폴더 선택과 workspace-scoped text file 작업에 한정한다. OS file association, drag-and-drop, Finder/Explorer reveal은 별도 후속 UX slice로 남긴다.
