# 구현 계획

1. 웹/공식 문서와 로컬 CLI 상태를 확인한다.
2. GUI 앱과 로그인 셸의 PATH 차이를 흡수하도록 command resolver를 보강한다.
3. CLI 어댑터 전용 PTY launch command를 추가한다.
4. 프런트엔드 CLI 실행 경로에서 TUI 어댑터를 PTY command로 라우팅한다.
5. Rust `lib.rs`를 500줄 이하 기능 조각으로 분리한다.
6. 터미널 드로어 TypeScript 표면을 500줄 이하 조각으로 분리한다.
7. readiness/test source aggregation을 분리 구조에 맞춘다.
8. check/test/build를 실행하고 기록을 남긴다.
