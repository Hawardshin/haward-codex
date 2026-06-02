# 2026-06-02 에이전트 플랫폼 UX/디자인 개선 계획

## 목표

사용자 요청에 따라 플랫폼의 디자인과 UX를 딥리서치 기반으로 다시 정리하고, 실제 UI/제품 흐름에 반영한다.

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-agent-platform-ux-design.ko.md`
- 딥리서치 입력: `_specs/workspace-platform/2026-06-02-agent-platform-ux-design/deep-research-input.json`
- 리서치 보고서: `_research/topics/ux/2026-06-02-agent-platform-ux-design-deep-research.ko.md`

## 적용 계획

1. `complete-deep-research`로 UX 리서치 패키지 readiness를 확인한다.
2. `REQ-WS-077`을 추가한다.
3. `workspace-monitor` overview를 command center 중심으로 재구성한다.
4. `platform-desktop-app` user-flow map을 설치형 제품 UX spine으로 재구성한다.
5. 프로젝트별 UX 문서를 추가한다.
6. tests/typecheck/build/screenshot smoke/workspace-health로 검증한다.

## 검증 기준

- `Workspace Monitor`, `Command Center`, `Evidence`가 desktop/mobile screenshot에서 보인다.
- mobile viewport에서 horizontal overflow가 없다.
- workspace monitor와 desktop readiness checks가 통과한다.
