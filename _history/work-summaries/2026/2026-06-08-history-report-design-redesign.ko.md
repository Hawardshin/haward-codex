# 작업 요약: 히스토리 보고 재디자인

- 날짜: 2026-06-08
- 범위: `platform-desktop-app`

## 완료한 작업

- 히스토리 탭을 단순 날짜별 기록보다 현재 작업 보고 기준을 먼저 보여주는 구조로 재디자인했다.
- `history-report-design-registry.json`에 보고 우선, 타임라인 근거, 요약 후 확인, 카테고리 문법, bounded evidence 규칙을 고정했다.
- `HistoryReportDesignPanel.tsx`를 추가해 요청/기획, 실행 순서, 근거/검증, 제품 결정 레인을 표시했다.
- 기존 날짜별 타임라인, 필터, 히스토리 차트는 보고서 아래 근거 확인 영역으로 유지했다.
- 이전 모듈 분리 이후 깨져 있던 `tool-studio.test.mjs`의 소스 집계 전제를 현재 파일 구조에 맞게 보정했다.

## 검증

- 통과: `check-config-contract`
- 통과: `workspace-monitor run check`
- 통과: `node --test tests/readiness.test.mjs renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 통과: `corepack pnpm test`
- 통과: 브라우저 스모크. 데스크톱/390px 폭에서 히스토리 보고 패널 렌더링, 레인 4개, 기준 4개, 콘솔 오류 0건.
- 통과: `corepack pnpm run renderer:build`
