# 검증 계획

## 이번 작업 검증

- JSON 설정 파일이 self-documenting config 계약을 만족하는지 확인한다.
- 기존 presentation-agent 단위 테스트가 깨지지 않는지 확인한다.
- 카탈로그 검증이 계속 통과하는지 확인한다.
- workspace navigation/health 관련 생성물을 갱신한다.
- work evaluator로 초기 요청과 결과를 대조한다.

## 다음 구현 검증

- `quality_harness.py`는 실패/성공 샘플 deck spec 단위 테스트를 가진다.
- Playwright 도입 시 HTML 렌더 smoke, keyboard navigation, viewport check를 포함한다.
- axe-core 도입 시 자동 접근성 위반을 report 파일로 남긴다.
- visual regression은 environment lock 전에는 blocking으로 두지 않는다.
