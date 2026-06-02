# 2026-06-02 요구사항 변경: 에이전트 플랫폼 UX/디자인 딥리서치 개선

## 변경 ID

`REQ-CHANGE-2026-06-02-UX-DESIGN`

## 배경

사용자는 디자인적 요소와 사용자 UX 요소를 딥리서치로 찾아 플랫폼을 더 제대로 디자인해 달라고 요청했다. 기존 플랫폼은 기능과 문서 구조는 풍부하지만, 사용자가 첫 화면에서 현재 상태, 다음 행동, 근거, 막힘을 즉시 이해하는 UX가 부족했다.

## 추가 요구사항

`REQ-WS-077`을 추가한다.

## 요구사항

플랫폼 UX와 디자인 개선은 감각적 장식만으로 처리하면 안 되며, 딥리서치로 확인한 AI UX, dashboard hierarchy, system status visibility, user control, evidence trail, decision recovery 원칙을 `workspace-monitor`와 `platform-desktop-app`의 첫 화면/사용자 흐름/검증 산출물에 반영해야 한다.

## 검증 조건

- `complete-deep-research`가 UX research input을 통과한다.
- `workspace-monitor` overview에 status, attention, evidence, mode/language control이 first viewport에 반영된다.
- `platform-desktop-app` user-flow artifact가 설치형 UX spine과 recovery/decision flow를 보여준다.
- `workspace-monitor` tests, typecheck, build, screenshot smoke가 통과한다.
