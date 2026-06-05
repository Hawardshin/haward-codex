# 2026-06-06 UI 이론 기반 디자인 파운데이션 리팩토링 계획 기록

## 범위

- desktop app workspace monitor의 전역 CSS foundation
- 홈/설정/어댑터/버튼 대표 표면
- 정적 테스트, readiness, 브라우저 렌더, 내부 패키징

## 제외

- 전체 화면별 정보 구조 재설계
- 별도 design-system package 생성
- Rust 런타임 변경

## Merge gate

- 테스트 2종 통과
- check 2종 통과
- 브라우저 렌더 overflow 0
- 내부 패키징 빌드 통과
