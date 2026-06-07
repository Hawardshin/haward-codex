# Plan: TypeScript file-size remediation

1. 남은 deferred와 500줄 초과 TS/TSX 파일을 inventory한다.
2. `SearchAgentWorkChatPanel.tsx`에서 순수 타입, copy, prompt, model routing, choice button UI를 분리한다.
3. test/check/build를 실행한다.
4. 성공하면 backlog/deferred 기록에 현재 slice 결과와 남은 구조 압력을 갱신한다.
5. 검증, 평가, request trace, work summary를 남기고 커밋/푸시한다.
