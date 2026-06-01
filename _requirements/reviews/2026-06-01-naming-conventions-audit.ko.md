# 요구사항 검토: 네이밍 규칙과 감사

## 검토 대상

- `REQ-WS-035`
- 사용자 요청: “이름 구조 네이밍 규칙”

## 판단

- 상태: 승인
- 소유 영역: `_ops/naming`, `_tools/naming-audit`, `_docs/governance`
- 변경 유형: durable workspace governance

## 검토 메모

- 이름 규칙은 기존 경로를 즉시 대량 rename하는 방식이 아니라, 새 이름의 기본값과 변경 전 검증 기준으로 운영한다.
- 기존 durable path는 링크와 dashboard snapshot이 의존하므로 migration plan 없이 rename하지 않는다.
- audit는 기계적으로 검증 가능한 항목만 gap으로 보고하고, commit message처럼 git history 기반 검사는 문서 규칙으로 둔다.

## 검증 필요 사항

- naming-audit clean
- docs-audit clean
- config contract clean
- memory bootstrap clean
- workspace-health full run
