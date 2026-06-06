# Plan: Native Provider and Terminal Action Reliability

1. 공식 문서와 기존 구현을 대조해 failure point를 확정한다.
2. 설치 감사 초안을 만들고 project-local Rust dependency를 추가한다.
3. Tauri runtime plugin init, capability, Rust command를 패치한다.
4. Renderer clipboard helper와 terminal paste handler를 native 우선으로 변경한다.
5. Unit test와 Playwright click smoke를 추가한다.
6. check/test/build/package를 실행하고 검증 기록을 갱신한다.
