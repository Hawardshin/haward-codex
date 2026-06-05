# History Payload Migration Plan

## 옵션 비교

| 옵션 | 장점 | 단점 | 결정 |
| --- | --- | --- | --- |
| 기본 snapshot에 history preview만 계속 축소 | 변경이 작다 | 중복 색인과 초기 JSON parse 비용이 계속 증가한다 | 기각 |
| JSONL/SQLite로 원본 기록까지 즉시 이동 | 장기적으로 좋다 | 기존 durable history 경로를 크게 흔들고 검증 범위가 커진다 | 보류 |
| 기본 snapshot + lazy admin history index 분리 | 원본 보존, 초기 payload 절감, static app과 호환 | 관리자 진입 시 추가 fetch가 필요하다 | 선택 |

## 실행

1. collector가 full history document index를 `admin-history-index.json`으로 생성한다.
2. 기본 snapshot은 non-history 문서와 최근 히스토리 96개만 포함한다.
3. Monitor UI는 `history` 또는 `documents` 섹션 진입 시 admin index를 한 번 lazy fetch한다.
4. History/Documents 계산은 기본 snapshot과 admin index를 병합하되 중복 ID는 admin index가 우선한다.
5. `check-history-payload.mjs`가 payload budget과 migration contract를 검증한다.
