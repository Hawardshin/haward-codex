# Spec: 버튼별 맥락 피드백

## 목표

데스크톱 런타임 주요 버튼이 클릭된 뒤 범용 notice 대신 액션별 상태 카드를 보여준다. 사용자는 방금 누른 버튼이 무엇을 대상으로 어떤 작업을 수행했고, 결과를 어디에서 이어서 확인해야 하는지 한 화면 안에서 파악할 수 있어야 한다.

## UX 기준

- Apple HIG Feedback: 피드백은 현재 상태, 성공/실패, 다음에 할 수 있는 일을 이해하게 해야 한다.
- Apple HIG Buttons: 버튼은 목적을 명확히 전달해야 하고, 즉시 끝나지 않는 동작에는 진행 피드백이 필요하다.
- Microsoft Commanding basics: command feedback은 명령이 감지/해석/처리되었는지와 성공 여부, 다음 행동을 알려야 한다.

## 구현 계약

- `DesktopActionFeedbackId`, `DesktopActionFeedbackStatus`, `DesktopActionFeedback` 타입을 둔다.
- `runDesktopAction` wrapper는 액션 시작 시 `running`, 완료 시 `done`, 예외 시 `failed` 피드백을 갱신한다.
- `renderDesktopActionFeedbackCard`는 Quick Start, Command Palette, 파일 워크스페이스 표면에서 재사용한다.
- 버튼에는 `data-desktop-action-feedback="<id>"`를 부여하고 현재 액션이면 `desktop-action-current status-*` 클래스를 적용한다.
- 피드백 카드는 `role="status"`와 `aria-live="polite"`를 포함한다.

## 수용 기준

- CLI 점검, 세션 시작, 검색 에이전트, 파이프라인, 결정함, 실행 기록, 축적 데이터, 런타임 루트, 페이로드 감사, 지원 번들, 서비스 준비도, 작업공간, 질문 보류, 소스 검토 버튼이 각기 다른 피드백 copy를 가진다.
- 완료 문구가 “완료”만 말하지 않고 액션 이름과 다음 확인 위치를 포함한다.
- CSS는 상태별 border/background/shadow를 제공한다.
- 구조 테스트가 타입, data attribute, aria status, CSS class 계약을 확인한다.
