# 웹 검색 기록: Workspace Monitor 공격적 네이티브 메모리 워밍

## 목적

사용자가 “메모리를 실제로 쓰고 운영체제 자원을 최대한 쓰라”고 지시했다. Tauri managed state, Rust command bridge, Rust OS thread 사용 경로를 공식 문서 기준으로 재확인했다.

## 검색어

- `Tauri 2 official setup app state background task Rust spawn managed state documentation`
- `Tauri 2 official async commands state management Rust app handle setup docs`
- `Rust std thread spawn official documentation Mutex memory cache`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Tauri State Management: https://v2.tauri.app/develop/state-management/ | 공식 문서 | managed state를 command/app handle에서 접근하는 패턴을 확인했다. | `WorkspaceResourceStore`를 Tauri managed state로 유지하고 `Arc` shared inner로 확장 |
| Tauri Calling Rust: https://v2.tauri.app/develop/calling-rust/ | 공식 문서 | frontend invoke와 Rust command bridge를 확인했다. | `warm_workspace_os_resources` 명령 추가 |
| Rust `std::thread::spawn`: https://doc.rust-lang.org/std/thread/fn.spawn.html | 공식 문서 | 새 OS thread를 생성하는 표준 경로를 확인했다. | `workspace-resource-warmup` background thread 추가 |

## 계획 영향

- 탭 진입 시 foreground prepare만 하는 구조에서 앱 시작/렌더러 bootstrap background warmup 구조로 변경했다.
- preload 예산을 80개/12MB에서 512개/128MB로 확장했다.
- UI에 warmup 상태와 메모리 예산을 표시했다.

## 불확실성

- file watcher는 아직 없다. 앱 밖 파일 변경은 force refresh/warmup으로 반영된다.
- public notarization은 Apple 자격 증명이 없으면 검증할 수 없다.
