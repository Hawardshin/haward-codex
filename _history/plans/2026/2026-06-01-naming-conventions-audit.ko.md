# 계획 기록: 네이밍 규칙과 감사

## 요청

- 요약: 이름 구조와 네이밍 규칙을 정리.
- 작업 모드: `governance`

## 확인한 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-naming-conventions-audit.ko.md`
- 기존 규칙: `AGENTS.md`, `_ops/projects/root-structure-policy.json`, `_docs/registry.json`
- 관련 요구사항: `REQ-WS-026`, `REQ-WS-027`, `REQ-WS-031`, `REQ-WS-035`

## 선택한 방향

- 기존 durable path를 대량 rename하지 않는다.
- namespace별 naming policy를 self-documenting config로 둔다.
- 사람이 보는 governance 문서와 기계가 실행하는 naming-audit를 함께 추가한다.
- workspace-health에 연결해 전체 검증 루프에서 빠지지 않게 한다.

## 수용 기준

- naming policy config contract 통과
- naming-audit clean
- docs audit 통과
- memory bootstrap 통과
- workspace-health full run 통과
