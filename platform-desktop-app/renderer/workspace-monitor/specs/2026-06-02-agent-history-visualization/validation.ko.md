# 검증 계획

- `cd workspace-monitor && npm test`
- `cd workspace-monitor && npm run check`
- `cd workspace-monitor && npm run collect`
- `cd workspace-monitor && npm run build`
- Playwright 또는 브라우저 기반 smoke check로 Agents/History 화면이 렌더링되는지 확인
- `git diff --check`

## 수동 확인 포인트

- Agents 섹션에서 agent config 수, runtime/status, 에이전트 카드가 보인다.
- History 섹션에서 날짜별 밀도 차트와 유형별 막대가 보인다.
- 모바일 너비에서 카드/차트가 1열로 내려간다.
