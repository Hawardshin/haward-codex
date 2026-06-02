# 스펙: Unified Ops Timeline

## 목표

Workspace Monitor가 기존의 날짜별 히스토리, 평가, 웹 검색, 작업 시간, 요청 추적, 협업 task, blocker, next action을 하나의 운영 이벤트 stream으로 합쳐 보여준다.

## 요구사항

- `REQ-WM-018`
- 관련 요청: `UR-2026-06-02-060`

## 동작

- collector는 `documents`, `historyDays`, `tasks`, `collaborationBoard`를 유지하면서 `unifiedOps`를 추가한다.
- `unifiedOps.events`는 `sourceType`, `signalType`, `lane`, `severity`, `status`, `title`, `detail`, `path`, `category`, `language`, `date`, `timestamp`를 가진다.
- `unifiedOps.summary`는 total/history/monitor/evidence/decision/open/critical signal 수와 최신 event 시각을 제공한다.
- Overview는 `Unified Ops` 패널에서 히스토리와 모니터링 신호를 같이 보여준다.
- History 탭은 날짜별 히스토리 위에 같은 unified stream을 노출해 기존 기록 구조와 운영 모니터링을 연결한다.
- view mode와 language mode는 unified events에도 적용된다. 단, monitoring event는 문서 언어 필터 때문에 숨겨지지 않는다.

## 제외 범위

- 실시간 서버 telemetry backend
- OpenTelemetry SDK 도입
- 외부 observability SaaS 연동
- 기존 History/Agents/Desktop drill-down 제거
