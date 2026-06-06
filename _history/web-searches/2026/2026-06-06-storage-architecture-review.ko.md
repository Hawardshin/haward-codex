# Web Search Record: Storage Architecture Review

작성일: 2026-06-06

## 검색 목적

파일시스템 중심 저장 구조가 desktop app 성능 병목이 될 수 있는지, embedded DB/SQLite 같은 내부 DB 사용이 일반적인 선택인지 공식 근거로 확인했다.

## 검색어

- `SQLite official appropriate uses embedded database application file format`
- `Tauri v2 SQL plugin SQLite official documentation`
- `Apple Core Data persistent store SQLite official documentation`
- `Electron official app getPath userData storage documentation`

## 확인한 강한 출처

| 출처 | URL | 사용한 근거 | 한계 |
| --- | --- | --- | --- |
| SQLite official docs | https://www.sqlite.org/whentouse.html | SQLite가 embedded/local application database로 적합한 경우가 많다는 근거 | 구체적 앱 구조는 로컬 요구사항으로 판단 필요 |
| Tauri official SQL plugin | https://v2.tauri.app/plugin/sql/ | Tauri v2에서 SQL/SQLite plugin 경로가 존재한다는 근거 | plugin 도입은 별도 dependency audit 필요 |
| Apple Core Data docs | https://developer.apple.com/documentation/coredata | 단일 기기 persist/cache 데이터 패턴 근거 | Core Data 자체를 이 Tauri 앱에 적용한다는 뜻은 아님 |
| Electron app docs | https://www.electronjs.org/docs/latest/api/app | desktop app-specific data path 개념 근거 | Electron은 현재 선택한 runtime이 아니므로 일반 desktop reference로만 사용 |

## 약한 출처 처리

블로그, Q&A, Reddit, vendor marketing 글은 이번 결정에 직접 사용하지 않았다. 공식 문서와 현재 소스 조사만으로 충분히 결정 가능했다.

## 계획 영향

- 전체 DB 전환이 아니라 file-backed durable knowledge와 SQLite operational plane의 하이브리드 전략을 선택했다.
- task run, decision inbox, workspace/history/source index, performance telemetry를 DB 후보로 분리했다.
- SQLite dependency 설치는 이번 변경에서 제외하고, 다음 slice에서 설치 감사와 rollback 계획을 요구하도록 했다.

## 불확실성

- 실제 성능 이득은 DB schema와 incremental indexing 구현 후 startup/tab p50/p95를 측정해야 확정된다.
- React remount/render 비용은 DB 전환만으로 해결되지 않으므로 UI resident/prewarm 구조와 별도 검증이 필요하다.
