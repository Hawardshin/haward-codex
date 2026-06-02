# 에이전트 플랫폼 UX/디자인 개선 스펙

## 관련 요구사항

- `REQ-WS-077`

## 범위

- `workspace-monitor` overview를 command-center 중심으로 개선한다.
- `platform-desktop-app` user-flow map을 설치형 제품 UX 구조로 재구성한다.
- 딥리서치 결과와 구현 근거를 `_research`, `_history`, `_requirements`, `_specs`에 남긴다.

## 수용 기준

- 첫 화면에서 현재 상태, 주의 필요 항목, 다음 행동, 근거 trail, 보기/언어 모드가 보인다.
- metrics는 유지하되 first viewport의 주요 메시지를 가리지 않는다.
- blockers와 next actions는 agents tab으로 이동할 수 있는 action을 제공한다.
- evidence trail은 web search/evaluation/requirements count와 최근 기록을 보여준다.
- desktop artifact는 first run, command center, decision inbox, recovery, evidence review를 한 화면 흐름으로 보여준다.
- 모바일 폭에서도 텍스트와 버튼이 겹치지 않는다.

## 비목표

- 실제 데스크톱 앱 런타임 구현
- 새 디자인 시스템 패키지 도입
- 사용자 행동 telemetry 구현

## 근거

- `_research/topics/ux/2026-06-02-agent-platform-ux-design-deep-research.ko.md`
- `_history/web-searches/2026/2026-06-02-agent-platform-ux-design.ko.md`
