# Plan: Deferred Native Git, Clipboard QA, PTY Decision

1. 제품 갭 레지스트리에서 구현 가능 gap과 외부 release gate를 분리한다.
2. Tauri native command로 Git status/action surface를 구현한다.
3. Desktop Runtime 화면에 Native Git Workbench를 추가하고 별도 component로 분리한다.
4. Clipboard abstraction과 deterministic tests를 추가한다.
5. PTY/xterm decision과 Native Git credential boundary를 bilingual architecture docs로 기록한다.
6. Runtime contract, readiness script, readiness tests, product gap registry를 갱신한다.
7. Rust/type/test/check/build/browser smoke를 실행하고 결과를 history/evaluation에 남긴다.
