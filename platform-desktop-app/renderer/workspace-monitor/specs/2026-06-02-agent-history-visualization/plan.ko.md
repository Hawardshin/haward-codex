# 구현 계획

1. 웹 검색으로 observability dashboard와 timeline visualization 레퍼런스를 확인한다.
2. 기존 workspace-monitor snapshot collector와 UI 구조를 읽는다.
3. `collectAgentCatalog`를 추가해 agent definitions, docs, runtime status, task count를 수집한다.
4. snapshot type에 `agentCatalog`와 `agentDefinitions` 통계를 추가한다.
5. Agents UI에 인벤토리 카드, runtime/status 막대, task lane을 추가한다.
6. Overview/History UI에 히스토리 밀도와 유형별 막대를 추가한다.
7. 테스트, type check, collect, build를 실행한다.
8. 히스토리, 평가, trace를 남기고 commit/push한다.

## 작업 모드

- `standard`

## 아키텍처 옵션

- 옵션 A: 기존 정적 snapshot에 agent/history 시각화 데이터를 추가한다.
- 옵션 B: 런타임 API 서버를 추가해 실시간 agent 상태를 가져온다.

## 선택

옵션 A를 선택한다. 현재 monitor는 Vercel 정적 export와 repository snapshot 기반이므로, 실시간 서버를 추가하면 운영 경계가 커진다.
