# 사용자 요청 요약: 폰트 개선

- 날짜: 2026-06-05
- 원문 요지: Workspace Monitor의 폰트 품질과 가독성을 개선한다.
- 해석: 기존 typography scale 작업에서 선언한 Pretendard 우선 stack이 실제 번들 폰트 로딩으로 이어지는지 확인하고, 한글 UI에 적합한 self-hosted 폰트를 적용한다.
- 수용 기준:
  - 시스템 폰트 우연성에만 의존하지 않는다.
  - 한글 glyph를 포함한 Pretendard Variable을 앱에서 로딩한다.
  - 작은 텍스트는 작게 유지하되 본문 가독성은 높인다.
  - 빌드, 테스트, 성능 예산, 브라우저 smoke로 확인한다.
