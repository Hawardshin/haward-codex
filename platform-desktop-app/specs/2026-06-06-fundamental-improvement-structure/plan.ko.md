# 구현 계획

1. `historyInsightLoop`에서 패턴 ID별 근거를 읽는 구조 개선 collector를 추가한다.
2. `collect-workspace.mjs`에서 새 collector, empty model, customer sanitizer를 연결한다.
3. `snapshot.ts`에 새 타입과 stats 필드를 추가한다.
4. Product Structure UI에 구조 개선 보드를 추가하고 CSS를 작성한다.
5. collector/readiness tests를 확장하고 snapshot을 재생성한다.
6. Browser smoke와 desktop internal package를 실행한다.
