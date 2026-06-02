# Runtime Data Feature 구현 계획

1. Rust Tauri command surface에 runtime root, payload audit, support diagnostic bundle 명령을 추가한다.
2. task-run 저장 경로를 OS app data로 이전하고 legacy repo artifact read compatibility를 유지한다.
3. Workspace Monitor Desktop 탭에 runtime data/support control과 상태 surface를 추가한다.
4. workspace snapshot collector에 customer mode를 추가하고 Tauri build script를 customer mode로 전환한다.
5. readiness/unit/build/Tauri 검증으로 bundle source leakage와 Rust compile을 확인한다.
