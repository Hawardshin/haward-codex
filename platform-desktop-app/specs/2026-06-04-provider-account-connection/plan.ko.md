# 계획: Provider 계정 연결

1. 공식 인증 근거를 확인하고 웹 세션 임베드가 아닌 provider credential 연결로 범위를 정한다.
2. Tauri provider credential store, command surface, URL opener, adapter env injection을 구현한다.
3. Settings > Initialize > Provider accounts UI와 adapter card 상태 표시를 구현한다.
4. installer shell runtime contract, user-flow/product/service/runtime registry, readiness tests를 갱신한다.
5. 타입 검사, Rust check, JSON 검증, readiness/test/build, 브라우저 smoke를 실행한다.
