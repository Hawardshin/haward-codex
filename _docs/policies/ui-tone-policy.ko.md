# UI Tone 정책

## 목적

플랫폼 화면은 운영 도구처럼 빠르게 읽히고 신뢰돼야 한다. 동시에 사용자가 오래 반복해서 쓰는 도구이므로, 명확성을 해치지 않는 작은 즐거움과 은근히 귀여운 톤을 허용한다.

## 원칙

- 명확성, 훑어보기, 접근성, 운영 신뢰가 항상 먼저다.
- 귀여움은 주인공이 아니라 사용자가 상태를 더 편하게 이해하게 하는 보조 신호다.
- 좋은 적용은 작은 색상 accent, 상태점, 부드러운 hover 피드백, friendly empty state, 과하지 않은 micro-interaction이다.
- 피해야 할 적용은 장식 과잉, emoji 남용, 불필요한 animation, 정보 밀도 저하, 시각적 소음이다.
- motion은 짧고 목적이 있어야 하며, `prefers-reduced-motion`을 존중해야 한다.
- 운영/관리 화면의 card radius는 기존 디자인 시스템과 맞추고, 과하게 둥근 marketing UI처럼 보이지 않게 한다.
- 한 화면의 주 기능이 하나이면 그 기능이 viewport의 중심과 대부분의 면적을 차지해야 한다. 기능이 작게 떠 있고 나머지를 장식, 빈 card, 무관한 보조 panel로 채우는 layout은 실패로 본다.
- 사용자는 한 번에 인지하고 판단할 수 있는 정보량이 제한되어 있으므로, 기능, panel, button, workflow step은 한 가지 목적만 명확히 드러내야 한다.
- 한 tab은 하나의 기능 목적을 대표해야 한다. 여러 기능을 한 tab에 얹어 navigation을 얕게 만들기보다, 한 단계 더 들어가는 drill-down 화면이나 task-specific child view를 사용한다.
- 분할 layout, dashboard grid, side-by-side panel은 비교, monitoring, 다중 주 작업처럼 사용자가 동시에 봐야 하는 맥락이 있을 때만 쓴다.

## 적용 대상

- `platform-desktop-app/renderer/workspace-monitor/`의 dashboard, history, source viewer, agent board
- `platform-desktop-app/`의 설치형 프로그램 UI
- 미래의 admin, monitor, coordination board, generated report HTML

## 근거

- Apple Human Interface Guidelines의 Motion 문서는 motion이 status와 feedback을 전달할 수 있지만 목적 없이 추가하면 산만하거나 불편할 수 있다고 설명한다. `prefers-reduced-motion` 계열 대응은 이 정책의 필수 기준으로 둔다.  
  https://developer.apple.com/design/Human-Interface-Guidelines/motion
- Microsoft Fluent 2의 design principles는 focus, 적은 visual clutter, trust, personality의 균형을 강조한다.  
  https://fluent2.microsoft.design/design-principles
- Material Design의 motion 문서는 motion을 관계, action availability, action outcome을 알려주는 도구로 다룬다.  
  https://m2.material.io/design/motion/understanding-motion.html
- Don Norman의 emotional design 논의는 사용성과 즐거움이 분리되지 않는다는 관점을 제공하지만, 이 저장소에서는 운영 가독성과 검증 가능성을 우선한다.  
  https://ubiquity.acm.org/article.cfm?id=966013
- Microsoft의 Inductive User Interface 문서는 화면을 하나의 primary task에 집중시키고, 화면 내용이 그 task에 맞아야 한다고 설명한다. 이 정책은 그 원칙을 플랫폼 화면의 공간 배분 기준으로 적용한다.
  https://learn.microsoft.com/en-us/windows/win32/appuistart/inductive-user-interface
- VA.gov Design System의 One Thing per Page 패턴은 한 번에 하나의 논리적 항목을 다루면 사용자가 더 쉽게 집중하고 이해할 수 있다고 설명한다.
  https://dev-design.va.gov/5931/patterns/ask-users-for/a-single-response
- W3C WAI의 cognitive accessibility 패턴은 화면 목적과 control 사용법을 명확히 드러내야 하며, 사용자가 수행 가능한 task와 interactive control을 알아볼 수 있어야 한다고 설명한다.
  https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p01-clear-purpose/
  https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p05-clear-controls/
- W3C WAI의 cognitive accessibility 패턴은 content를 관리 가능한 조각으로 나누라고 설명하며, GOV.UK Service Manual도 복잡한 form/workflow에서 한 번에 한 가지를 다루는 구조를 권장한다.
  https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p01-chunk/
  https://www.gov.uk/service-manual/design/form-structure#start-with-one-thing-per-page

## 검증

- 화면에 추가한 귀여움이 정보 hierarchy를 약화하지 않는지 확인한다.
- 화면에 주 기능이 하나뿐인데 해당 기능이 작고 주변 chrome, card, 빈 공간, 장식이 더 크게 보이면 재설계한다.
- panel이나 button 하나가 상태 확인, 설정, 이동, 실행, 근거 보기처럼 서로 다른 일을 동시에 시키면 단일 목적 단위로 분리한다.
- tab 안에서 서로 다른 여러 기능 panel이 동시에 보이면 기본 tab은 선택 메뉴로 낮추고, 각 기능은 더 깊은 단일 기능 화면으로 이동시킨다.
- 분할 layout을 썼다면 비교, monitoring, 다중 주 작업 중 어떤 이유로 동시에 봐야 하는지 설명 가능해야 한다.
- 버튼, tab, card, chart, code viewer에서 text overlap이 없는지 확인한다.
- 반복 interaction에 불필요한 대기 animation이 없는지 확인한다.
- `prefers-reduced-motion` 대응이 있는지 확인한다.
- `pnpm run build` 또는 해당 프로젝트의 build/check를 통과한다.
