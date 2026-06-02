# 요구사항 리뷰: 전체 워크스페이스 완성도 감사

## 판정

- 상태: 승인
- 기준선: `REQ-WS-075`
- 모드: `governance`

## 검토

요구는 단순 점검이 아니라 향후에도 같은 누락이 반복되지 않도록 품질 게이트를 강화하는 일이다. 따라서 health tool 자체를 최신화하고, root generated output false positive를 제거하며, 스펙 문서의 미완 신호를 정리하는 것이 적절하다.

## 수용 기준

- `workspace-health --include-build --json`이 통과해야 한다.
- health 목록은 privacy audit, current core config contracts, presentation browser validation, desktop readiness, workspace-monitor build를 포함해야 한다.
- `structure-audit`는 policy에 선언된 generated output root를 unknown root로 오판하지 않아야 한다.
- 오래된 `[ ] commit/push` 잔여 체크박스와 `예정 검증` heading은 정리되어야 한다.
