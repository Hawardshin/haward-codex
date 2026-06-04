# 웹 검색 기록: 단일 주 기능 화면 공간 원칙

## 사용자 지시 요약

사용자는 한 화면에 주 기능이 하나라면 그 기능이 화면을 채우는 것을 기본 UI 원칙으로 삼으라고 지시했다.

## 검색어

- `single task screen UI design focus principle task-focused interface full screen`
- `Nielsen Norman Group focused user interface one primary task per screen`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| Microsoft Learn, Inductive User Interface, https://learn.microsoft.com/en-us/windows/win32/appuistart/inductive-user-interface | official documentation | 화면을 하나의 primary task에 집중시키고 contents가 task에 맞아야 한다는 지침을 확인했다. | 단일 주 기능 화면 원칙을 persistent instruction과 UI policy에 기록했다. |
| VA.gov Design System, A single response, https://dev-design.va.gov/5931/patterns/ask-users-for/a-single-response | official design system | One Thing per Page 패턴과 한 번에 하나의 논리적 항목을 다루는 집중 효과를 확인했다. | 여러 보조 panel이 목적을 흐리면 재설계하는 검증 기준을 추가했다. |

## 약하거나 제외한 출처

- Ask.com, ConsumerSearch, Medium 글은 공식/1차 출처가 아니어서 직접 근거로 쓰지 않았다.
- Reddit/Dribbble 결과는 현업 신호로 볼 수 있으나 durable policy 근거로는 쓰지 않았다.

## 계획 반영

- 단일 주 기능 화면은 해당 기능이 viewport 대부분을 차지하도록 한다.
- navigation, status, action은 주 기능을 보조하는 수준으로 둔다.
- split layout은 비교, monitoring, 다중 주 작업처럼 동시에 볼 이유가 있을 때만 허용한다.

## 불확실성

- 이번 요청은 특정 화면을 지목하지 않았으므로 실제 UI 구현 변경은 하지 않는다. 다음 특정 화면 개선 요청에서 이 원칙을 acceptance gate로 적용한다.

## 공개 판단 요약

공식 UI 문서들은 rigid full-screen mandate를 요구하지는 않지만, 화면 목적을 하나의 primary task에 집중시키는 방향은 일관된다. 사용자의 지시는 이 저장소의 플랫폼 UI에 대해 더 강한 공간 배분 기본값으로 채택한다.
