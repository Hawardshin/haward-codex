# 구현 계획: 히스토리 인사이트 루프

1. Web-first로 lessons learned, ADR, knowledge management, retrospective action 기준을 확인한다.
2. 기존 snapshot collector, product architecture panel, tests를 읽어 가장 작은 연결 지점을 선택한다.
3. Rule 기반 `historyInsightLoop` collector를 추가한다.
4. Snapshot type, customer sanitization, generated stats를 확장한다.
5. Product Structure UI에 history insight board를 추가한다.
6. Product feature registry의 learning loop asset/signal을 갱신한다.
7. Collector/readiness tests와 check/package build를 실행한다.
8. 스펙, 검증, 평가, trace를 남기고 commit/push한다.

## 결정

- LLM 호출 없이 deterministic rule clustering을 사용한다.
- Evidence는 developer snapshot에만 남기고 customer snapshot에서는 제거한다.
- 새로운 섹션을 만들지 않고 제품 구조 화면에 붙여 platform feature architecture와 직접 연결한다.
