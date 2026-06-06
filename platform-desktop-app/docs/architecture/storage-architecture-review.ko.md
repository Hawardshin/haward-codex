# Desktop Storage Architecture Review

작성일: 2026-06-06
대상: `platform-desktop-app`

## 냉정한 평가

사용자 추정은 절반 이상 맞다. 현재 앱의 느림이 전부 파일시스템 때문이라고 보기는 어렵지만, 반복 조회되는 운영 데이터를 파일 스캔과 JSON 누적으로 처리하는 구조는 성장 병목이 된다.

현재 병목 후보는 세 갈래다.

- `collect-workspace.mjs`는 `_docs`, `_history`, `_requirements`, `_specs`, configs, project docs/specs를 걷고 Markdown/JSON을 읽어 generated snapshot을 만든다.
- `admin-history-index.json`은 히스토리 문서에서 매번 정렬/요약해서 생성된다.
- Rust/Tauri 런타임은 task run을 `record.json`, `stdout.log`, `stderr.log` 파일로 누적하고, workspace state도 JSON으로 읽고 쓴다.

이 방식은 감사성과 Git 친화성에는 좋다. 하지만 데스크톱 앱의 빠른 탭 이동, timeline filtering, decision inbox, 누적 데이터 검색, p95 성능 추적에는 약하다. JSON 파일은 “작고 드문 설정”에는 괜찮지만, 많은 이벤트와 자주 바뀌는 상태를 질의하기에는 인덱스, range query, join, incremental update가 부족하다.

## 외부 근거

- SQLite 공식 문서는 embedded/local application database 용도에 SQLite가 맞는 경우를 설명한다: <https://www.sqlite.org/whentouse.html>
- Tauri v2에는 SQL plugin 경로가 있고 SQLite 엔진을 선택할 수 있다: <https://v2.tauri.app/plugin/sql/>
- Apple Core Data는 단일 기기 persist/cache 데이터 패턴을 공식 문서화한다: <https://developer.apple.com/documentation/coredata>
- Electron도 앱별 data path를 노출한다. 데스크톱 앱은 소스 폴더가 아니라 app data/cache/log 계층을 사용해야 한다: <https://www.electronjs.org/docs/latest/api/app>

## 선택한 구조

선택은 `파일 + embedded operational DB` 하이브리드다.

파일로 유지할 것:

- 정책, 요구사항, 스펙, 철학, source code, registry, 사람이 읽는 history
- Git diff와 review가 필요한 문서
- support bundle이나 export용 큰 로그/아티팩트

DB로 옮길 것:

- task run metadata, task events, artifact index
- decision inbox active state와 resume lookup
- workspace file/document/source index
- admin history materialized index
- startup/tab/collector/resource telemetry

이렇게 해야 durable knowledge는 투명하게 남기면서, 앱이 자주 질의하는 데이터는 OS app data 안의 SQLite로 빠르게 읽을 수 있다.

## 왜 전체 DB 전환은 아닌가

이 플랫폼은 단순 앱 데이터보다 “에이전트가 읽고 검토하고 커밋할 수 있는 지식 저장소”가 중요하다. 모든 것을 DB로 넣으면 사용자는 파일 diff, history, migration trace, 정책 리뷰를 잃는다. 또한 DB가 깨졌을 때 플랫폼 지식까지 불투명해진다.

반대로 모든 것을 파일로 유지하면 앱은 매번 많은 파일을 걷고, JSON을 파싱하고, 정렬하고, 다시 snapshot을 써야 한다. 지금의 병렬화는 CPU 활용도를 올렸지만, warm startup과 탭 이동의 구조적 비용은 DB index 없이는 계속 남는다.

## 마이그레이션 순서

1. `db-001-task-run-shadow-index`: 기존 `record.json`/log 파일을 계속 쓰면서 task run metadata를 SQLite에 shadow index한다.
2. `db-002-decision-inbox-index`: active decision filtering과 resume lookup을 DB로 이동한다.
3. `db-003-workspace-file-index`: 파일 path, mtime, hash, category, excerpt를 DB에 저장하고 unchanged 파일은 재파싱하지 않는다.
4. `db-004-performance-telemetry`: startup, tab switch, collector, memory/resource cleanup p50/p95를 DB에 누적한다.

각 단계는 파일 fallback, DB rebuild, export, schema migration, corrupt DB recovery를 통과해야 한다.

## 즉시 결론

지금 당장 SQLite를 무작정 설치해서 모든 JSON을 치환하는 것은 위험하다. 하지만 다음 성능 개선 축은 분명하다. 파일은 durable source로 남기고, runtime/query/index 계층은 SQLite로 분리해야 한다. 이 결정을 `platform-desktop-app/configs/storage-architecture-registry.json`에 고정했다.
