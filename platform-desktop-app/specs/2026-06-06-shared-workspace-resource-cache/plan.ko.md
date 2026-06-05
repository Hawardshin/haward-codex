# Shared Workspace Resource Cache 계획

1. 웹 검색에서 React/Tauri 공식 성능/아키텍처 문서를 확인한다.
2. 기존 resident section과 `DesktopRuntimePanel` 중복 mount 경로를 확인한다.
3. `warm_workspace_os_resources`와 `prepare_workspace_os_resources` 호출부를 공유 in-flight/cache 헬퍼로 감싼다.
4. fallback과 force refresh semantics를 유지한다.
5. tests/readiness/product registry를 갱신한다.
6. TypeScript, renderer check/test, platform test/check, Browser smoke, internal package를 실행한다.
7. omission/resource/evaluation/history records를 남기고 commit/push한다.

## 결정

- 언어 선택: 기존 React renderer에 가까운 최적화이므로 TypeScript를 선택한다. Rust command 자체는 이미 OS 자원 작업을 담당하므로 변경하지 않는다.
- 구조 선택: 이번 slice는 두 resident component instance 사이의 중복 native request 제거가 목적이므로 module-level request cache가 가장 작은 변경이다.
- 폴더 구조: project-local docs/requirements와 specs/YYYY-MM-DD-slug 구조를 따른다.
