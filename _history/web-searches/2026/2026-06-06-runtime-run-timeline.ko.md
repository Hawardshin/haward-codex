# 웹 검색 기록: Runtime Run Timeline

## 검색 시각

2026-06-06

## 쿼리

- `agent workbench run timeline decision inbox open source desktop AI agent platform UX patterns 2026`
- `developer workflow task timeline decision inbox AI agent workbench design best practices`
- `local desktop AI agent platform process management workspace monitor open source examples`

## 확인한 내용

- local-first agent workbench류는 task/run state, logs, terminal, history, human intervention surface를 제품의 핵심 운영 표면으로 다룬다.
- 직접 clone 검토에서는 Temporal UI가 workflow event/pending state를 묶고, Langfuse가 trace/observation을 timeline/graph로 보여주는 구조를 확인했다.
- 이번 slice는 외부 패턴을 그대로 복제하지 않고, 현재 앱의 existing task run/decision/session 상태를 작은 timeline item으로 정규화하는 방향이 맞다.

## 계획 영향

`platform-desktop-app` Desktop Runtime의 실행 기록/결정함 disclosure에 `Run Timeline` 패널을 추가한다. 새 저장소나 dependency 없이 기존 상태만 묶어 계산한다.

## 한계

검색 결과 사이트들은 discovery signal로만 사용했다. 구현 근거는 직접 clone한 public source와 기존 로컬 코드 구조를 우선했다.
