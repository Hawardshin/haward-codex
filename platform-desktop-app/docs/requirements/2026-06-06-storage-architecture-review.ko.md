# Storage Architecture Review 요구사항

작성일: 2026-06-06
소유 프로젝트: `platform-desktop-app`

## 사용자 요구

앱이 모든 것을 파일시스템으로 처리해서 느린 것인지, 내부 DB를 쓰는 회사/데스크톱 앱 패턴을 검토하고 현재 플랫폼에 맞는 저장소 구조를 판단해 달라는 요청이 있었다.

## 결론 요구

현재 구조는 파일 기반 지식 저장소 자체가 문제라기보다, 앱이 반복 조회하는 운영 상태와 인덱스를 파일 스캔/JSON 누적으로 처리하는 부분이 성장 병목이 될 가능성이 높다. 따라서 전체 DB 전환이 아니라 하이브리드 구조가 요구사항이다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-SAR-001 | 정책, 요구사항, 스펙, 철학, 소스, 사람이 읽는 히스토리는 Git 추적 파일로 유지해야 한다. | must | 저장소 구조 검토 |
| REQ-SAR-002 | task run, decision inbox, workspace file index, history index, performance telemetry는 embedded operational DB 후보로 분리해야 한다. | must | storage architecture registry |
| REQ-SAR-003 | DB는 숨은 단일 진실원이 아니라 앱 운영 인덱스/이벤트 저장소/물질화 뷰로 사용해야 한다. | must | registry rules |
| REQ-SAR-004 | 각 DB 마이그레이션은 파일 fallback, rebuild/export, schema version, corruption recovery, retention/privacy 정책을 가져야 한다. | must | migration slice acceptance |
| REQ-SAR-005 | 초기 SQLite 의존성 설치 전 설치 감사, 라이선스/보안 검토, rollback, package 검증 계획을 남겨야 한다. | must | installation audit when dependency changes |
| REQ-SAR-006 | 탭 렉은 DB만으로 해결한다고 보지 않고 resident/prewarm UI, component split, render measurement와 함께 검증해야 한다. | should | performance validation |

## 비범위

- 이 요구사항만으로 SQLite 의존성을 즉시 설치하지 않는다.
- `_private`, 쿠키, 실서버 비밀값, 원문 민감 로그를 DB에 저장하지 않는다.
- durable repository knowledge를 전부 DB로 숨기지 않는다.
