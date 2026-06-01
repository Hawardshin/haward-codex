# 계획: 플랫폼 발표 팩

## 작업 모드

- `standard`

## 조사 기준

- 발표 구조는 문제-전환-해결-증거-행동 흐름으로 잡는다.
- 슬라이드는 한 장에 하나의 주장과 하나의 proof object를 우선한다.
- 상세 내용은 발표자 노트에 넣고 화면은 핵심 주장 위주로 둔다.

## 참조 자료

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-platform-presentation-pack.ko.md`
- 플랫폼 설명: `README.md`
- 플랫폼 identity model: `_docs/operating-models/platform-identity-operating-model.ko.md`
- 운영 철학: `_philosophy/agent-operating-philosophy.ko.md`
- 프로젝트 등록부: `_ops/projects/registry.json`
- 중심 프로젝트 README: `agent-platform/README.md`, `workspace-monitor/README.md`, `presentation-agent/README.md`

## 실행 단계

1. 전체 플랫폼 발표의 claim spine을 만든다.
2. 등록된 루트 프로젝트 3개의 개별 발표 claim spine을 만든다.
3. 각 claim spine을 `deck-spec` JSON으로 작성한다.
4. `presentation_agent.html_deck`로 HTML 산출물을 생성한다.
5. 발표 팩 가이드와 source notes를 기록한다.
6. 검증, 평가, 히스토리, 커밋, push를 수행한다.
