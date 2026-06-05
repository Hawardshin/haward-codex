# 웹 검색 기록: Workspace Monitor OS 자원 기반 워크스페이스 캐시

## 목적

사용자가 “실제 데스크톱 앱이니까 단순 렌더가 아니라 운영체제 자원을 쓰라”고 지적했다. Tauri v2에서 Rust 명령과 앱 상태를 쓰는 공식 경로를 확인한 뒤 구현 방향을 정했다.

## 검색어

- `Tauri 2 official state managed state commands async file system desktop app Rust docs`
- `Tauri 2 official file system plugin commands Rust desktop app docs`
- `Tauri 2 official window state app handle managed state Rust docs`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| Tauri v2 Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/ | 공식 문서 | 프론트엔드가 Rust command를 invoke하는 구조를 확인했다. | `prepare_workspace_os_resources` Tauri command 추가 |
| Tauri v2 State Management: https://v2.tauri.app/develop/state-management/ | 공식 문서 | 앱 전역 managed state로 Rust-side memory state를 유지할 수 있음을 확인했다. | `WorkspaceResourceStore`를 `Builder::manage`에 등록 |
| Tauri v2 File System plugin: https://v2.tauri.app/plugin/file-system/ | 공식 문서 | 데스크톱 파일시스템 접근은 capability/scope boundary가 필요한 OS 자원임을 확인했다. | 기존 workspace-scoped Rust file access를 유지하고 bounded preload만 추가 |

## 약한 출처 제외

- 블로그/예제 모음은 이번 판단에 필요하지 않았다. 공식 Tauri 문서로 command/state/filesystem boundary를 충분히 확인했다.

## 계획 영향

- 렌더러 탭 마운트 유지로 끝내지 않고 Rust managed state cache를 구현했다.
- 전체 워크스페이스 무제한 preload 대신 파일 수와 byte 제한을 둔 bounded cache를 선택했다.
- workspace 변경과 파일 저장에서 cache invalidation을 필수 수용 기준으로 추가했다.

## 불확실성

- 파일 watcher까지 도입하지 않았으므로 앱 밖에서 파일이 바뀐 경우 manual refresh 또는 다음 force refresh가 필요하다.
- 공개 notarization은 Apple 자격 증명이 없으면 자동 검증할 수 없다.
