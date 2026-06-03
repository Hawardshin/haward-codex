# 웹 검색 기록: 작업 중심 네비게이션과 운영 센터 분리

- 날짜: 2026-06-03
- 요청 요약: 데스크톱 앱의 주 기능을 agent orchestration, agent workbench, agent factory, development, learning loop로 보이게 하고 monitoring/operator/admin surface는 별도로 빼야 한다.

## 검색어

- `desktop app information architecture user workspace operator admin monitoring separate surfaces official design guidelines`
- `Microsoft Fluent NavigationView settings pane official docs`
- `Apple Human Interface Guidelines Settings app preferences official`
- `JetBrains IntelliJ Platform UI Guidelines tool windows settings official`

## 확인한 강한 출처

- Apple Human Interface Guidelines: Settings: `https://developer.apple.com/design/human-interface-guidelines/settings`
  - 앱 전체 경험에 영향을 주는 설정은 별도 설정 영역으로 둘 수 있다는 기준을 확인했다.
- Microsoft Learn: NavigationView: `https://learn.microsoft.com/en-us/windows/apps/design/controls/navigationview`
  - 데스크톱 앱 navigation에서 주요 navigation item과 settings item을 분리하는 패턴을 확인했다.
- IntelliJ Platform UI Overview: `https://plugins.jetbrains.com/docs/intellij/ui-overview.html`
  - IDE형 앱은 editor/work surface, tool window, settings, modal dialog가 서로 다른 역할로 분리된다는 점을 확인했다.

## 약한 출처 제외

- 커뮤니티 반응과 Reddit 글은 UI 선호 신호로만 볼 수 있고 이번 설계 결정의 기준으로 쓰지 않았다.
- 일반 블로그나 비공식 튜토리얼은 이번 변경의 근거에서 제외했다.

## 계획 반영

- 기본 작업 네비게이션은 `overview`, `desktop`, `agents`, `source`, `intent`로 제한한다.
- `projects`, `history`, `structure`, `documents`, `requirements`는 Operator Center로 분리한다.
- product feature panel은 primary feature card만 크게 보여주고 supporting observability는 별도 operator strip으로 낮춘다.
- user view와 customer snapshot도 같은 work-first allowed sections를 사용하게 한다.

## 남은 불확실성

- public 제품 수준의 전체 desktop IA는 first-run onboarding, workspace chooser, settings taxonomy, signed updater/recovery UI까지 이어서 검증해야 한다.
