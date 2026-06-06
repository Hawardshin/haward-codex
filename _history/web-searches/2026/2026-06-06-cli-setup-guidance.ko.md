# 웹 검색 기록: CLI 설정 안내

- 날짜: 2026-06-06
- 요청 요약: CLI 사용법과 설정이 직관적이지 않다는 지적을 데스크톱 앱 UI 개선으로 반영한다.

## 검색어

- `CLI onboarding UX best practices setup wizard command palette developer tools documentation`
- `Apple Human Interface Guidelines settings onboarding progressive disclosure developer tools`
- `Microsoft Fluent settings design command line tool setup UX`
- `Microsoft Fluent 2 onboarding settings design command bar flyout feedback`

## 확인한 출처

- Fluent 2 Design System, Onboarding: https://fluent2.microsoft.design/onboarding/
- Apple Human Interface Guidelines, Onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding
- Microsoft Learn, Command bar flyout: https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/command-bar-flyout

## 적용한 인사이트

- 사용자가 새 기능을 배울 때는 관련 작업 중인 위치에서 안내를 제공해야 한다.
- 복잡한 선행 작업은 setup wizard나 multi-step flow로 나누는 것이 적절하다.
- 명령은 작업 대상 가까이에 두고, 주요 명령과 보조 명령을 구분해야 한다.
- Apple HIG 원문은 현재 JS 페이지라 본문 열람이 제한되었다. 기존 `user-flow-registry`의 Apple HIG 근거와 검색 결과 스니펫을 보조 근거로만 사용했다.

## 약한 출처

- 일반 블로그와 Reddit 반응은 이번 구현 근거로 사용하지 않았다.

## 계획 영향

- README 보강만 하지 않고 설정 화면과 Agent CLI Cockpit에 단계형 안내와 명령 복사 표면을 추가한다.
