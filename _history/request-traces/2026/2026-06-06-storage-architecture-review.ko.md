# Request Trace: Storage Architecture Review

작성일: 2026-06-06

## 요청

파일시스템 중심 저장 구조가 성능 저하 원인인지, 내부 DB 사용을 검토해 달라는 요청.

## 해석

현재 앱의 느림을 저장소 구조 관점에서 재평가하고, desktop app다운 app data/embedded DB 활용 방향을 결정해야 한다.

## 실행

1. 웹 검색으로 공식 근거 확인
2. 현재 collector와 Rust runtime persistence 조사
3. 하이브리드 저장소 전략 선택
4. storage architecture registry와 architecture review 문서 생성
5. product/runtime registry 업데이트
6. generated snapshot 재생성
7. 검증과 내부 패키징 수행

## 결과

`hybrid_files_plus_embedded_operational_db`를 다음 저장소 마이그레이션 기준으로 확정했다.

## 산출물

- `platform-desktop-app/configs/storage-architecture-registry.json`
- `platform-desktop-app/docs/architecture/storage-architecture-review.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-06-storage-architecture-review.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-06-storage-architecture-review/`
- `_research/topics/platform-desktop-app/2026-06-06-storage-architecture-review.ko.md`

## 검증

- JSON validation passed
- Workspace Monitor collect/check/test/build passed
- Internal desktop package passed

## 후속 구현 기준

다음 구현은 `db-001-task-run-shadow-index`부터 시작한다. 기존 JSON/log artifacts를 즉시 제거하지 않고 SQLite shadow index와 read-through fallback을 먼저 둔다.
