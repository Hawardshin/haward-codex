# 계획 기록: 히스토리 인사이트 루프

## 핵심 판단

히스토리 인사이트는 별도 문서 보고서가 아니라 플랫폼에서 재사용되는 데이터/화면이어야 한다. 따라서 `_history`를 읽는 existing collector pipeline에 추가하고, 제품 구조 화면에서 platform application으로 보여준다.

## 구현 slice

- Rule-based insight collector.
- Snapshot schema/type/customer sanitizer.
- Product Structure UI board.
- Product feature registry learning-loop asset update.
- Tests and build verification.

## 검증

- Data: collector test and generated snapshot stats.
- UI: product feature panel readiness token and browser smoke.
- Release path: internal Tauri package build.
