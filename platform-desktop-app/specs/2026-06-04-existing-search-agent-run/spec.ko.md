# 스펙: 기존 검색 에이전트 실행

## 목적

사용자가 “이미 만들어둔 검색 에이전트”를 바로 쓰게 한다. 검색 에이전트를 생성 후보나 내부 설정 파일로 숨기지 않고, 데스크톱 앱의 실행 가능한 제품 기능으로 노출한다.

## 기능 범위

- Agents 화면 최상단에 `research-insight-planner-agent` 실행 패널을 추가한다.
- 목표, 검색 질문, 검색 채널, 저장 위치, 메모를 받아 구조화된 초기 프롬프트를 만든다.
- command palette와 Desktop quick start에서도 검색 에이전트를 실행할 수 있게 한다.
- Tauri `start_cli_adapter_session`은 optional `taskKind`를 받아 task-run store에 `research_insight_agent`를 남긴다.
- multi-lane 실행용 `research_insight_agent_pipe`를 추가한다.
- 제품 기능/사용자 흐름/런타임 계약/검증 스크립트에 검색 에이전트 실행을 기록한다.

## 비목표

- `research-insight-planner-agent` 자체의 판단 로직을 새로 구현하지 않는다.
- optional CLI를 자동 설치하지 않는다.
- 공개 배포용 signing/notarization 준비 상태를 바꾸지 않는다.

## 수용 기준

- 사용자는 Agents 화면에서 검색 에이전트 실행 버튼을 볼 수 있다.
- 클릭하면 하단 터미널 drawer가 열리고, 구조화된 프롬프트가 선택 adapter 세션에 주입된다.
- 실행 기록은 `taskKind=research_insight_agent`로 저장된다.
- readiness 테스트가 `research-insight-planner-agent`, `SearchAgentQuickRunPanel`, `research_insight_agent_pipe`를 확인한다.
