# 요구사항 변경: Workspace Monitor 성능 예산

## 변경 요약

- `REQ-WM-016`을 추가했다.
- 목적: 대용량 workspace snapshot이 client JavaScript bundle에 포함되어 초기 로드를 느리게 만드는 회귀를 방지한다.

## 추가 요구사항

- `REQ-WM-016`: 웹 UI는 대용량 workspace snapshot을 client JavaScript bundle에 직접 포함하지 않아야 하며, 초기 JS chunk 크기가 성능 예산을 초과하지 않도록 회귀 검사를 제공해야 한다.

## 검증

- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- 정적 Playwright smoke
