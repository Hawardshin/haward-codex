# 대범위 분해: Button Library Baseline

## 요청 범위

- "기본 버튼들 다 이상함 라이브러리 사용"은 모든 버튼 전면 개선으로 해석될 수 있어 파일 범위가 넓다.

## 이번 slice

- 공통 Button primitive 도입
- 대표 기본 버튼 사용처 migration
- 요구사항/테스트/설치 기록으로 이후 migration 기준 고정

## 제외

- 수백 개 `<button>` 전체 치환
- Source editor, terminal, activity rail의 특수 control 전면 변경
- Tailwind 또는 Radix Themes 전체 전환

## 후속 slice 후보

- Source editor toolbar를 Button primitive size/icon variant로 migration
- settings dialog action row migration
- button audit script가 raw default button 사용처를 분류하도록 확장
