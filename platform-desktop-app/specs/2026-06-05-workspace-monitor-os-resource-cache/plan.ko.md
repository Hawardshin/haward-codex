# 계획: Workspace Monitor OS 자원 기반 워크스페이스 캐시

## 실행 순서

1. Tauri Rust workspace 파일 명령과 렌더러 source workbench 호출 구조를 확인한다.
2. Rust managed state와 bounded workspace resource cache를 추가한다.
3. 새 `prepare_workspace_os_resources` 명령을 노출하고 기존 list/read/write 명령을 cache-aware로 바꾼다.
4. 렌더러가 source surface 진입, workspace 변경, 저장 후 네이티브 준비 명령을 호출하도록 연결한다.
5. runtime contract, readiness, renderer test를 갱신한다.
6. Rust/TS/test/check를 실행하고 내부 데스크톱 패키징까지 수행한다.

## 선택한 구현 옵션

- 선택: Tauri/Rust managed state 기반 cache.
- 대안 1: 렌더러 React state만 유지. 사용자가 지적한 OS 자원 사용 요구를 충족하지 못해 제외했다.
- 대안 2: 파일 watcher와 전체 workspace content preload. 구현 위험과 메모리 사용량이 커서 이번 작업에서는 bounded preload로 제한했다.

## 리스크 제어

- cache preload는 `MAX_WORKSPACE_PRELOAD_TEXT_FILES=80`, `MAX_WORKSPACE_PRELOAD_TEXT_BYTES=12_000_000`으로 제한한다.
- 파일 저장과 workspace root 변경 시 cache를 비워 stale data를 방지한다.
- fallback list command는 새 명령이 없는 runtime compatibility 용도로만 둔다.
