# 계획: Workspace Monitor 공격적 네이티브 메모리 워밍

## 실행 순서

1. 기존 OS resource cache 구조와 renderer 호출 지점을 확인한다.
2. Rust store를 background thread가 쓸 수 있는 `Arc` shared state로 바꾼다.
3. `warm_workspace_os_resources` command와 warmup report를 추가한다.
4. Tauri setup과 renderer bootstrap에서 warmup을 시작한다.
5. preload/scan 한도를 상향하고 UI에 메모리 예산과 warming 상태를 표시한다.
6. tests/contracts/readiness를 업데이트한다.
7. Rust/renderer/platform 검증과 internal package build를 실행한다.

## 선택한 옵션

- 선택: 표준 Rust thread + Tauri managed state + bounded memory cache.
- 대안 1: renderer-only preload. 사용자의 “실제 메모리/OS 자원” 요구에 부족해 제외했다.
- 대안 2: 파일 watcher 도입. 추가 dependency/audit와 이벤트 복잡도가 커서 이번에는 background warmup과 force refresh로 제한했다.
- 대안 3: 무제한 전체 repository load. 메모리 리스크가 커서 128MB bounded budget으로 제한했다.
