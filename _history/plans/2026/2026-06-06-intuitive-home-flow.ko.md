# 작업 계획: Intuitive Home Flow

- 범위가 큰 UI/UX 요청을 첫 화면 흐름 개선 slice로 분해했다.
- 홈 화면은 전체 앱의 진입점이고 기존 task intent와 handoff 구조가 있어 회귀 위험 대비 효과가 크다.
- 구현은 새 dependency 없이 `MonitorShell.tsx`, `globals.css`, 문자열 계약 테스트 안에서 완료한다.
