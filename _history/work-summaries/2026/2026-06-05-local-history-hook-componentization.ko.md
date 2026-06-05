# 작업 요약: Local History Hook Componentization

- 관리자 기록 색인 로딩, 모듈 캐시, idle preload, 문서 병합, 날짜별 그룹 생성을 `useAdminHistoryIndex` hook으로 분리했다.
- `MonitorShell.tsx`에서 해당 로딩/effect/helper를 제거했다.
- History 화면의 핵심 한국어 지표와 상태 문구를 자연스럽게 바꿨다.
- 테스트가 hook 분리, 로컬 캐시, idle preload, Korean copy 회귀를 검증하도록 보강했다.
