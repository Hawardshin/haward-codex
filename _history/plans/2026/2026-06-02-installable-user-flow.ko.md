# 설치형 앱 사용자 플로우 계획

## 요청 요약

사용자가 설치형 프로그램을 손쉽게 사용할 수 있도록 사용자 플로우도 잘 설계하라고 요청했다.

## 작업 모드

- `governance`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-installable-user-flow.ko.md`
- 조사 메모: `_research/topics/desktop-productization/2026-06-02-installable-user-flow.ko.md`
- 내부 기준:
  - `platform-desktop-app/configs/desktop-distribution-registry.json`
  - `agent-platform/configs/access/view-mode-registry.json`
  - `agent-platform/configs/installations/install-mode-registry.json`
  - `agent-platform/configs/workflows/work-mode-registry.json`
  - `agent-platform/configs/integrations/cli-adapter-registry.json`

## 계획

1. 설치형 앱 사용자 플로우 설정 파일을 만든다.
2. 첫 실행과 사용 흐름을 한국어/영어 문서로 정리한다.
3. 브라우저에서 볼 수 있는 HTML 플로우 맵을 만든다.
4. 기존 desktop distribution registry, installable software policy, prompt router, workflows, persistent instructions, memory bootstrap에 연결한다.
5. 요구사항, 스펙, traceability, 검증 계획을 남긴다.
6. JSON, config contract, docs audit, workspace monitor snapshot, 테스트/빌드, evaluator로 검증한다.

## 결정

- 실제 desktop dependency 설치는 하지 않는다.
- 첫 가치는 “대시보드 도착”으로 정의하고, optional setup은 capability card로 보류한다.
- 사용자 질문은 decision inbox로 모아 전체 작업 중단을 줄인다.
