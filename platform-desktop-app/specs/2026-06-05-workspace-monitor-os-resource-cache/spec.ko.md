# 스펙: Workspace Monitor OS 자원 기반 워크스페이스 캐시

## 목표

Workspace Monitor 소스 탭이 렌더러 화면 렌더링 최적화에만 의존하지 않고, 실제 데스크톱 앱답게 Tauri/Rust에서 OS 파일시스템을 읽어 워크스페이스 파일 목록과 주요 텍스트 파일 내용을 미리 준비한다.

## 설계 결정

- `WorkspaceResourceStore`를 Tauri managed state로 등록한다.
- 새 명령 `prepare_workspace_os_resources`는 active workspace root를 기준으로 source editor 대상 파일 목록을 스캔하고, 최대 80개/12MB 범위 안에서 텍스트 내용을 Rust 메모리에 적재한다.
- `list_workspace_text_files`와 `read_workspace_text_file`은 준비된 cache가 있으면 먼저 사용하고, 없으면 OS scan/read 후 cache를 보강한다.
- `write_workspace_text_file`, `set_desktop_workspace_path`, `choose_desktop_workspace_folder`, `clone_desktop_workspace`는 cache를 무효화한다.
- 렌더러는 소스 워크벤치 진입과 workspace 변경 후 `prepare_workspace_os_resources`를 호출하고, 새로고침은 강제 refresh로 처리한다.
- 구버전 런타임 호환을 위해 새 명령이 없을 때만 `list_workspace_text_files` fallback을 유지한다.

## 수용 기준

- Tauri 명령 surface와 runtime contract에 `prepare_workspace_os_resources`가 포함된다.
- 렌더러 상태에 `WorkspaceResourcePrepareReport`가 있고, UI에 `OS 캐시`와 cached bytes가 표시된다.
- Rust `cargo check`, renderer test/check, platform test/check가 통과한다.
- 내부 패키지 빌드가 `.app`와 `.dmg`를 생성하고 검증한다.

## 근거

- Tauri v2 공식 문서는 Rust 명령을 프론트엔드에서 호출하는 command bridge를 제공한다: https://v2.tauri.app/develop/calling-rust/
- Tauri v2 공식 문서는 Rust managed state를 앱 전역 상태로 관리할 수 있음을 설명한다: https://v2.tauri.app/develop/state-management/
- Tauri v2 공식 파일시스템 플러그인 문서는 데스크톱 앱의 filesystem capability boundary를 별도 권한/범위로 다룬다: https://v2.tauri.app/plugin/file-system/

## 제한

- 캐시는 앱 프로세스 메모리 안의 bounded cache다. 파일 watcher는 이번 범위에 넣지 않았다.
- 공개 notarization은 Apple 자격 증명이 없어서 내부 패키지 빌드에서 스킵된다.
