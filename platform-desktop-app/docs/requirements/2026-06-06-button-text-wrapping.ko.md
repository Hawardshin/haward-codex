# 요구사항: 버튼 텍스트 줄바꿈 안정화

날짜: 2026-06-06

## 사용자 요구
- 텍스트 줄바꿈 때문에 버튼이 너무 길어지거나 높아지는 문제를 고친다.

## 요구사항
- REQ-BTW-001: 액션/명령 버튼은 라벨 줄바꿈 때문에 높이가 커지지 않아야 한다.
- REQ-BTW-002: 긴 버튼 라벨은 한 줄 ellipsis로 표시하고, 버튼 내부 아이콘과 라벨 정렬은 유지해야 한다.
- REQ-BTW-003: 본문, 코드, 파일 경로처럼 줄바꿈이 필요한 영역의 wrap 정책과 버튼 라벨 정책을 분리해야 한다.
- REQ-BTW-004: 런타임 설정, CLI 설정, 모델 칩, 소스 에디터 툴바, 커맨드 팔레트 결과에서 줄바꿈 회귀를 테스트로 막아야 한다.
- REQ-BTW-005: 시각적 truncation이 생겨도 버튼의 DOM 텍스트와 accessible name은 제거하지 않아야 한다.

## 범위
- 포함: workspace monitor CSS, 버튼 라벨 회귀 테스트, 요구사항/스펙/검증 기록.
- 제외: 버튼 copy 전면 재작성, 새 tooltip 시스템, 전체 디자인 시스템 교체.

## 수용 기준
- 대표 액션 버튼 라벨에 `overflow:hidden`, `text-overflow:ellipsis`, `white-space:nowrap` 계약이 적용된다.
- `overflow-wrap:anywhere`와 `white-space:normal`이 액션 버튼 라벨 높이를 늘리지 않는다.
- workspace-monitor test/check, browser smoke, desktop app test/check/package가 통과한다.
