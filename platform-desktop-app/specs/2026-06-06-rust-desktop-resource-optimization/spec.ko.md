# 스펙: Rust 데스크톱 자원 최적화

## 목표

Workspace Monitor의 source workspace 준비 경로가 Tauri/Rust에서 CPU parallelism과 OS memory telemetry를 사용한다. 탭 진입 시 renderer가 뒤늦게 파일을 읽는 느낌을 줄이고, 데스크톱 앱 프로세스가 먼저 파일 목록과 텍스트 내용을 준비한다.

## 설계 결정

- Rust dependency로 `rayon`을 추가해 line count entry build와 preload read를 bounded thread pool에서 병렬 처리한다.
- Rust dependency로 `sysinfo`를 추가해 total/available/used memory를 읽고 preload memory budget 산정에 사용한다.
- `WorkspaceResourceProfile`을 cache/report 계약에 추가해 CPU thread 수, parallel worker 수, memory budget, scan/build/preload 시간을 renderer로 전달한다.
- preload 상한은 2,048 files / 512MB hard cap으로 확장하되, 실제 budget은 OS available memory의 일부를 사용하도록 clamp한다.
- renderer source workspace UI는 OS cache 상태에 worker 수, free RAM, CPU 병렬 수, native duration을 함께 표시한다.

## 언어/런타임 선택

- 옵션 A: Rust/Tauri in-process cache. 장점은 OS thread와 native file IO, process memory를 직접 사용하고 기존 command/state boundary를 재사용한다. 선택.
- 옵션 B: TypeScript renderer/worker cache. 장점은 UI와 가까우나 OS resource telemetry와 filesystem authority가 약하고 탭 렌더링 경합을 키울 수 있다. 미선택.
- 옵션 C: Python/Node sidecar indexer. 장점은 분리 가능하나 프로세스 lifecycle, install surface, IPC 비용이 늘어난다. 미선택.

## 아키텍처 선택

- 옵션 A: 기존 `WorkspaceResourceStore`에 bounded Rayon preload를 추가한다. 기존 Tauri command/report 계약과 cache invalidation을 유지할 수 있어 선택했다.
- 옵션 B: 별도 local daemon/index DB를 둔다. 대형 workspace에는 유리하지만 이번 병목에는 과하고 복구/종료/동기화 책임이 늘어난다.
- 옵션 C: renderer IndexedDB preload를 둔다. 새로고침 지속성은 생기지만 native desktop resource 요구와 맞지 않는다.

## 폴더 구조 선택

- 옵션 A: 현재 Rust command가 모여 있는 `src-tauri/src/lib.rs`에 좁게 확장한다. 현재 프로젝트가 단일 Tauri lib 중심이라 선택했다.
- 옵션 B: 새 Rust module로 분리한다. 장기적으로 좋지만 이번 변경은 기존 state/report 구조와 강하게 결합되어 있어 추후 cache 기능이 더 커질 때 분리한다.

## 수용 기준

- `rayon`과 `sysinfo`가 Cargo manifest/lock에 기록된다.
- Rust cache build가 `WorkspaceResourceProfile`, `parallel_workers`, `memory_budget_bytes`, phase duration fields를 반환한다.
- readiness와 workspace-monitor tests가 새 native resource contract를 확인한다.
- `package:internal`이 `.app`와 `.dmg`를 생성하고 검증한다.

## 근거

- Tauri v2 Rust command bridge: https://v2.tauri.app/develop/calling-rust/
- Rayon parallel iterator/thread pool 문서: https://docs.rs/rayon/
- sysinfo system memory/CPU telemetry 문서: https://docs.rs/sysinfo/0.39.3
- Tokio `spawn_blocking`은 검토했지만 이번 코드는 기존 sync Tauri command/background thread 경로 안에서 bounded Rayon pool을 쓰는 쪽이 더 작다: https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html
- `memmap2`는 검토했지만 현재 대상은 큰 단일 파일 random access보다 여러 텍스트 파일 bounded preload라 unsafe mmap까지 도입하지 않았다: https://docs.rs/memmap2/

## 제한

- scan traversal 자체는 bounded sequential walk이고, entry build와 preload read가 병렬화 대상이다.
- memory budget은 runtime available memory 기반 추정치라 OS pressure 변화와 완전히 동기화되지는 않는다.
