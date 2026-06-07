# Plan record: TypeScript file-size remediation

- 날짜: 2026-06-08

## 실행 slice

1. SearchAgentWorkChatPanel을 type/copy/prompt/routing/UI module로 분리한다.
2. 500줄 초과 파일 inventory를 다시 측정한다.
3. Provider/ToolStudio 쪽도 안전한 독립 module이 있으면 이어서 줄인다.
4. 검증 후 deferred 상태를 truthfully 갱신한다.
