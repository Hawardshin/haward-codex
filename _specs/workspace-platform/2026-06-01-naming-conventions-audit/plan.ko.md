# 계획: 네이밍 규칙과 감사

## 작업 모드

- `governance`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-naming-conventions-audit.ko.md`
- 기존 구조 규칙: `REQ-WS-026`, `REQ-WS-027`, `REQ-WS-031`
- 신규 요구사항: `REQ-WS-035`

## 선택한 방향

| 옵션 | 장점 | 단점 | 판단 |
| --- | --- | --- | --- |
| 문서만 추가 | 빠름 | 규칙이 지켜지는지 알 수 없음 | 제외 |
| 기존 파일 대량 rename | 일관성은 올라감 | 링크, 히스토리, dashboard snapshot 위험 큼 | 제외 |
| 정책 config + 문서 + audit 도구 | 규칙이 명확하고 검증 가능하며 기존 링크를 보존 | 구현량이 있음 | 선택 |

## 단계

1. 웹 검색과 기존 규칙을 확인한다.
2. naming policy와 governance 문서를 만든다.
3. naming-audit 도구와 테스트를 구현한다.
4. workspace-health, memory bootstrap, config contract, docs registry에 연결한다.
5. 요구사항/스펙/히스토리/평가를 기록한다.
6. 전체 검증 후 commit/push한다.
