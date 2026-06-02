# 스펙: Intent Feature Map 소스 구조 리팩터링

## 상태

- 상태: `implemented`
- 날짜: 2026-06-03
- 소유 프로젝트: `workspace-monitor/`
- 요구사항: `REQ-WM-022`
- 출처 요청: `UR-2026-06-03-018`

## 문제

`scripts/collect-workspace.mjs`가 repository snapshot 생성과 여러 기능별 데이터 파싱을 동시에 담당하면, 기능을 계속 쌓을수록 수정 범위가 커지고 회귀 원인을 찾기 어려워진다.

## 동작

- `intentFeatureMap` 수집과 Markdown roadmap parsing은 `scripts/lib/intent-feature-map.mjs`가 담당한다.
- `scripts/collect-workspace.mjs`는 snapshot 조립 책임을 유지하고, 의도 지도 수집 함수는 import/re-export로 연결한다.
- 기존 테스트가 import하는 `collectIntentFeatureMap` API는 유지한다.
- customer snapshot의 빈 `intentFeatureMap` 구조는 새 모듈의 `emptyIntentFeatureMap()`을 재사용한다.

## 비범위

- UI 레이아웃 변경
- roadmap parsing 의미 변경
- root 폴더 재배치
- customer snapshot에 내부 의도 지도 노출
