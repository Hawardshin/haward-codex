# History Payload Migration Spec

## 목적

누적 `_history` 기록이 Workspace Monitor 기본 snapshot과 LLM context를 계속 비대하게 만들지 않도록, 기본 UI payload와 관리자 히스토리 색인을 분리한다.

## 요구사항

- 기본 `workspace-snapshot.json`은 최근 히스토리 요약만 포함하고 전체 `_history` 기록 목록을 중복 적재하지 않는다.
- 전체 히스토리 기록은 생성된 `admin-history-index.json`에 저장하고, History/Documents 같은 관리자 표면에서만 lazy load한다.
- 기존 durable `_history` 원본 파일은 이동하거나 삭제하지 않는다. 이번 마이그레이션은 표시/색인 레이어 변경이다.
- customer snapshot 빌드에서는 내부 히스토리 색인을 빈 `admin-history-index.json`으로 대체한다.
- 검증은 기본 documents JSON byte budget, inline history 제한, admin index bounded preview, snapshot summary와 index count 일치를 확인해야 한다.

## 비범위

- SQLite/DB 영구 저장소 전환은 이번 slice에서 하지 않는다.
- 기존 `_history` 경로 rename/delete는 migration plan과 별도 검증 전까지 하지 않는다.
