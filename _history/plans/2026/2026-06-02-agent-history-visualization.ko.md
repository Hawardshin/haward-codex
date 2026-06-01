# 에이전트/히스토리 시각화 계획

## 작업 모드

- `standard`

## 목표

Workspace Monitor에서 에이전트 인벤토리와 히스토리 축적 상태를 더 시각적으로 보여준다.

## 계획

1. 공식 dashboard/observability 레퍼런스를 확인한다.
2. 기존 snapshot collector와 UI 구조를 확인한다.
3. agent config를 수집해 `agentCatalog`로 snapshot에 넣는다.
4. Agents 섹션에 에이전트 구성 맵, runtime/status 막대, task status lane을 추가한다.
5. History/Overview 섹션에 날짜별 밀도와 유형별 막대를 추가한다.
6. test/check/collect/build와 브라우저 smoke check를 실행한다.
7. 히스토리, 평가, trace를 남기고 commit/push한다.

## 선택한 구현 방식

새 backend나 chart library를 만들지 않고 기존 static snapshot + React/CSS 구조를 확장한다.
