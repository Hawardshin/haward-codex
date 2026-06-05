# 작업 요약: Smooth Redesign Maintenance

- `MonitorShell`의 motion helper를 `lib/motion.ts`로 분리하고 정적 테스트를 새 위치 기준으로 업데이트했다.
- 공통 motion token과 keyframes로 탭/메뉴/다이얼로그/세부 작업면 전환을 통일했다.
- history/admin 문서 preview를 bounded summary로 바꿔 snapshot document payload를 2.29MB로 줄였다.
- `check-history-payload.mjs`를 추가해 일반 `check`에서 payload 회귀를 잡는다.
- Operator Center와 task run 로그 주변 한국어 문구를 정리했다.
- Playwright smoke에서 발견한 Tools 탭 아이콘 버튼 너비 문제를 수정했다.
