# macOS 실행 구조 작업 평가

## 결론

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요청: 설치형 플랫폼이 macOS에서 실행 가능한 구조를 가져야 한다.
- 결과: macOS 실행 구조 source of truth를 `platform-desktop-app/configs/macos-execution-profile.json`으로 만들고, 요구사항/스펙/문서/메모리/히스토리/평가까지 연결했다.

## 완료 내용

- `REQ-WS-069`와 `PDA-REQ-007`을 추가했다.
- 개발자 로컬 실행, 내부 테스트 `.app`, 외부 public distribution을 분리했다.
- Tauri-first shell, `workspace-monitor` UI 재사용, Python `agent-platform` sidecar/local service, optional CLI adapter degrade를 macOS 구조에 넣었다.
- public macOS readiness는 Developer ID signing, hardened runtime, notarization, 가능한 경우 stapling, update/rollback, clean Mac smoke test 없이는 주장하지 않도록 했다.
- 실제 Tauri/Electron 설치, `.app` 빌드, signing, notarization, updater 구현은 이번 구조 정의 범위 밖으로 명확히 표시했다.

## 검증

- JSON parse: passed
- config contract: `self_documenting`
- memory bootstrap: `ready_to_bootstrap`
- agent-platform tests: 150 tests OK
- docs/naming/structure audits: passed
- work timer: ready
- workspace index/task board: regenerated
- workspace-monitor collect/test/check/build: passed
- workspace health: 18 checks passed
- omission guard: `coverage_ready`
- grounding guard: `ready_to_publish`
- work evaluator: `ready_to_close`

## 참고 근거

- Apple/Xcode official docs: outside-App-Store distribution, Developer ID signing, notarization, Gatekeeper testing
- Apple Hardened Runtime docs
- Tauri distribution, macOS signing/notarization, updater docs
- Electron code signing and autoUpdater docs as fallback comparison

## 개선 후보

- Tauri scaffold 이후 app bundle/signing/notarization/stapling/updater/smoke-test evidence를 검사하는 macOS release readiness checker를 만든다.
- Apple signing credentials와 build artifact가 준비되면 clean Mac smoke-test checklist 또는 스크립트를 만든다.

