# 스펙: 단일 주 기능 화면 공간 원칙

## 목표

플랫폼 UI를 설계하거나 검토할 때, 한 화면에 주 기능이 하나뿐이면 그 기능이 화면을 지배하도록 하는 공간 배분 원칙을 지속 규칙으로 만든다.

## 사용자 요구

- 화면에 주 기능이 하나라면 그 기능이 화면 대부분을 차지해야 한다.
- 보조 요소가 화면을 차지해 주 기능을 작게 만들면 안 된다.

## 기능 요구사항

| ID | 내용 |
| --- | --- |
| SPEC-UI-FOCUS-001 | 지속 지시에 단일 주 기능 화면의 full-screen focus 원칙을 추가한다. |
| SPEC-UI-FOCUS-002 | UI tone policy에 공간 배분 원칙, split layout 허용 조건, 검증 항목을 추가한다. |
| SPEC-UI-FOCUS-003 | Codex runtime adapter인 `AGENTS.md`에 같은 원칙을 얇게 반영한다. |
| SPEC-UI-FOCUS-004 | memory bootstrap manifest가 UI tone policy를 이 원칙의 startup anchor로 설명하도록 갱신한다. |
| SPEC-UI-FOCUS-005 | 요구사항, 검색 기록, 요청 요약, request trace, 평가 입력을 남긴다. |

## 비범위

- 특정 화면 구현 수정은 비범위다. 사용자가 대상 화면을 지정하면 이 스펙을 acceptance gate로 사용해 별도 UI 변경을 수행한다.
- 화면의 모든 보조 UI 제거는 비범위다. navigation, status, action은 주 기능을 돕는 한 허용한다.

## 수용 기준

- 지속 지시와 UI 정책에 단일 주 기능 화면 공간 원칙이 명시되어 있다.
- split layout을 허용하는 조건이 문서화되어 있다.
- 검증 항목이 "주 기능보다 주변 chrome이 우세한 화면"을 재설계 대상으로 잡는다.
- docs audit와 JSON validation이 통과한다.
