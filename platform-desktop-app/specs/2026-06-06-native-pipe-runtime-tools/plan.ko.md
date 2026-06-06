# Plan: Native Pipe Runtime Tools

1. 웹 검색, memory bootstrap, install/work mode를 기록한다.
2. 요구사항과 spec-driven artifacts를 생성한다.
3. 설치 감사 초안을 만들고 `os_pipe@1.2.3`을 project-local Cargo dependency로 추가한다.
4. `run_native_pipe_probe` Rust command와 report/input structs를 구현한다.
5. runtime/readiness tests와 CLI pipeline/resource/omission records를 추가한다.
6. `cargo check`, desktop tests, package pipeline을 실행한다.
7. 평가/요약/trace를 기록하고 commit/push한다.
