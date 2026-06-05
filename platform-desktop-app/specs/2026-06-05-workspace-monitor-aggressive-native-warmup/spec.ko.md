# 스펙: Workspace Monitor 공격적 네이티브 메모리 워밍

## 목표

Workspace Monitor가 데스크톱 앱의 장점을 더 살려 앱 프로세스 메모리와 OS thread를 적극적으로 사용한다. 사용자가 소스 탭에 들어가기 전에 Rust runtime이 워크스페이스 파일 목록과 텍스트 내용을 선제적으로 읽어 cache한다.

## 설계 결정

- `WorkspaceResourceStore`를 `Arc<WorkspaceResourceStoreInner>` 기반 shared state로 바꿔 background thread가 같은 cache를 업데이트할 수 있게 한다.
- `warm_workspace_os_resources` 명령을 추가한다.
- Tauri `.setup`에서 active workspace root를 확인하고 `workspace-resource-warmup` OS thread를 시작한다.
- renderer bootstrap도 모든 surface에서 `warm_workspace_os_resources`를 호출한다.
- foreground `prepare_workspace_os_resources`는 source 탭에서 즉시 필요한 report/catalog를 돌려주되, 이미 background cache가 있으면 memory cache를 사용한다.
- preload 한도는 `MAX_WORKSPACE_PRELOAD_TEXT_FILES=512`, `MAX_WORKSPACE_PRELOAD_TEXT_BYTES=128_000_000`, scan entry 한도는 40,000으로 확장한다.
- 저장 후에는 foreground prepare 대신 background force warmup을 건다.

## 수용 기준

- Rust compile/check가 통과한다.
- renderer test/check와 platform test/check가 통과한다.
- internal Tauri package build가 `.app`와 `.dmg`를 생성하고 검증한다.
- readiness/test가 `warm_workspace_os_resources`, `workspace-resource-warmup`, preload limit을 확인한다.

## 근거

- Tauri State Management 공식 문서는 앱 전역 managed state를 command와 app handle에서 접근하는 구조를 제공한다: https://v2.tauri.app/develop/state-management/
- Tauri Calling Rust 공식 문서는 frontend가 Rust command를 호출하는 bridge를 제공한다: https://v2.tauri.app/develop/calling-rust/
- Rust `std::thread::spawn` 공식 문서는 새 OS thread 실행 경로를 제공한다: https://doc.rust-lang.org/std/thread/fn.spawn.html

## 제한

- 외부 편집기에서 파일이 바뀌는 경우 watcher 없이 next refresh/warmup에 반영된다.
- 128MB는 bounded memory budget이다. 전체 저장소를 무제한으로 메모리에 올리지 않는다.
