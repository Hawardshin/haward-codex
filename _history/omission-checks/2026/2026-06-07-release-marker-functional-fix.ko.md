# 2026-06-07 누락 방지 확인: release marker 기능 이슈

## 확인 항목

- 기능 이슈를 구조 debt가 아닌 실제 readiness false blocker로 좁혀 처리했다.
- runtime source 이동으로 생긴 검사 누락을 수정했다.
- generated public Tauri config의 resource map까지 확인해 단순 문자열 검사보다 기능 경계를 강화했다.
- 외부 자격증명 gate는 임의로 통과 처리하지 않았다.
- `_private/`는 읽지 않았다.

## 결과

- 누락 없음. 외부 release gate는 그대로 명시적으로 남겼다.
