# 요구사항: MonitorShell 근본 boundary 재검토

## 사용자 요구

탭 전환 최적화가 아직 충분하지 않으므로, Workspace Monitor의 근본 구조부터 다시 검토하고 실제 성능/메모리 경계를 개선해야 한다.

## 기능 요구사항

- `MonitorShell`의 남은 구조 병목을 line count, import boundary, bundle/chunk 결과로 확인한다.
- 이미 독립 파일인 heavy workbench는 Shell static import에서 제거할 수 있어야 한다.
- Tool Studio는 `next/dynamic` top-level boundary를 가져야 한다.
- Tool Studio dynamic chunk는 앱 idle prewarm 경로에 연결되어 실제 탭 진입 지연을 완화해야 한다.
- 기존 Tool Studio props/type contract는 유지한다.

## 비기능 요구사항

- resident panel cap 5는 유지한다.
- source/editor state 보존 로직은 변경하지 않는다.
- 변경 후 renderer test/check/build, performance audit, desktop test/check, internal package build를 실행한다.
- 성능 결과가 혼합이면 개선과 악화를 모두 기록한다.

## 제외

- `DesktopRuntimePanel` 4k+ line 추출과 `Agents` section 분리는 다음 큰 structural slice로 둔다.
- public signing/notarization/updater/clean-machine smoke는 이번 내부 최적화 범위가 아니다.
