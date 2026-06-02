# 2026-06-02 에이전트 플랫폼 UX/디자인 딥리서치 웹 검색 기록

## 요청 요약

사용자는 플랫폼의 디자인적 요소와 사용자 UX 요소를 딥리서치로 찾아서 더 제대로 설계하고 반영해 달라고 요청했다.

## 검색 쿼리

- `Human-AI interaction UX guidelines Microsoft agent systems dashboard transparency control handoff`
- `Google People AI Guidebook human AI interaction UX guidelines transparency control feedback`
- `Nielsen Norman Group AI UX design guidelines user control transparency trust`
- `developer tools dashboard UX design best practices observability task orchestration`
- `site:microsoft.com HAX Toolkit human-AI interaction guidelines user control transparency`
- `site:pair.withgoogle.com People AI Guidebook UX AI transparency control feedback`
- `site:nngroup.com AI UX guidelines user control transparency trust`
- `site:carbondesignsystem.com data visualization dashboards design system`
- `site:material.io design data visualization dashboard cards tables controls density`
- `site:designsystem.digital.gov dashboard usability metrics alerts task status design system`
- `site:atlassian.design dashboard navigation admin UI design system`
- `site:nngroup.com visibility of system status heuristic user interface design`

## 확인한 주요 출처

| 출처 | 유형 | 이번 작업에 준 영향 |
| --- | --- | --- |
| Microsoft HAX Toolkit: Guidelines for Human-AI Interaction | 공식 AI UX 가이드 | AI/에이전트 UI는 초기 기대 설정, 상호작용 중 맥락 정보, 실패 시 설명, 장기적 사용자 통제권을 갖춰야 한다. |
| Microsoft HAX: Make clear what the system can do | 공식 AI UX 가이드 | 사용자에게 시스템 capability와 제한을 명확히 보이는 mode/status/control UI를 우선한다. |
| Microsoft HAX: Show contextually relevant information | 공식 AI UX 가이드 | 현재 작업/상태에 맞는 next action, blocker, evidence를 first viewport에 둔다. |
| Microsoft HAX: Make clear why the system did what it did | 공식 AI UX 가이드 | 근거와 평가, 출처 추적을 UI에서 별도 탐색 가능한 evidence trail로 만든다. |
| Microsoft HAX: Provide global controls | 공식 AI UX 가이드 | view/language mode처럼 전체 동작을 바꾸는 control은 상단에 명확히 둔다. |
| Google People + AI Guidebook | 공식 AI UX 가이드 | 자동화와 사용자 통제의 균형을 desktop UX와 decision inbox에 반영한다. |
| Carbon Design System: Dashboards | 디자인 시스템 | dashboard는 strong hierarchy, 제한된 핵심 metric, consistent color, whitespace, exploratory drill-down을 가져야 한다. |
| Material Design: Data tables | 디자인 시스템 | 대량 정보는 query/filter/manipulation이 붙은 scan 가능한 table/list 구조가 적합하다. |
| Nielsen Norman Group: Ten Usability Heuristics | UX 분석/기초 원칙 | system status visibility, user control, recognition rather than recall, minimalist design을 적용한다. |
| Nielsen Norman Group: Visual Design Principles | UX 분석/기초 원칙 | scale, visual hierarchy, contrast를 통해 첫 화면 우선순위를 명확히 한다. |
| U.S. Web Design System: Site Alert | 정부 디자인 시스템 | 중요한 시스템 상태는 상단에 한 번만, 과도한 경고색 없이 배치한다. |

## 약한 출처 또는 제외한 신호

- 일반 블로그와 이미지 갤러리는 예쁜 사례 수집에는 유용하지만, 이번 구현 판단의 근거로는 사용하지 않았다.
- 좋아요/조회수 신호는 디자인 취향 발견 신호로만 쓰고, UX 원칙의 근거로 쓰지 않았다.

## 적용 결정

- `workspace-monitor` overview 첫 화면을 단순 metric 나열이 아니라 command center, next action, blocker/evidence trail, mode/language control 중심으로 재구성한다.
- `platform-desktop-app` user-flow artifact는 첫 실행 흐름만 나열하지 말고, 설치형 제품의 UX spine, status, decision inbox, recoverability를 함께 보여준다.
- 딥리서치 결과는 `_research/topics/ux/`에 보고서로 남기고, `complete-deep-research` 입력을 스펙 폴더에 저장한다.

## 불확실성

- 이번 작업은 실제 사용자 테스트가 아니라 문헌/디자인 시스템 기반 개선이다.
- 향후 실제 사용 로그나 사용자 관찰이 생기면 metric priority와 first-run flow는 조정해야 한다.
