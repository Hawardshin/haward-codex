# 웹 검색 기록: 레퍼런스 기반 데스크톱 Workbench UX

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-042`
- 소유 프로젝트: `platform-desktop-app/`
- 목적: Discord, VS Code, IntelliJ의 실제 데스크톱 UI/UX를 기준으로 platform desktop app의 navigation, settings, theme, language, bottom terminal 결정을 검토한다.

## 쿼리

- `VS Code official user interface Activity Bar Panel Terminal Settings Theme`
- `VS Code official terminal bottom panel settings appearance theme`
- `IntelliJ IDEA official tool windows terminal settings appearance theme`
- `Discord official appearance settings theme interface support`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| VS Code User Interface (`https://code.visualstudio.com/docs/getstarted/userinterface`) | 높음 | Activity Bar, Primary Side Bar, Panel, Status Bar가 서로 다른 역할을 맡는 workbench 구조를 제공한다. | activity rail은 주요 view 전환만 맡기고, 중복 sidebar DOM을 제거했다. |
| VS Code Terminal Basics (`https://code.visualstudio.com/docs/terminal/basics`) | 높음 | 통합 터미널은 workbench panel에 위치하고 여러 terminal instance/tabs를 다룬다. | 다중 CLI surface를 화면 본문 카드가 아니라 하단에서 올라오는 drawer로 이동했다. |
| VS Code User and Workspace Settings (`https://code.visualstudio.com/docs/configure/settings`) | 높음 | settings editor에서 앱 동작과 사용자/workspace 설정을 관리한다. | theme, language, layout, runtime init을 settings dialog의 대분류 탭으로 모았다. |
| VS Code Themes (`https://code.visualstudio.com/docs/configure/themes`) | 높음 | color theme는 product UI의 기본 설정이다. | `시스템`, `라이트`, `다크` theme mode와 persistence를 추가했다. |
| IntelliJ IDEA Tool Windows (`https://www.jetbrains.com/help/idea/tool-windows.html`) | 높음 | IDE 기능은 editor 주변 tool window로 열고 숨기거나 이동할 수 있다. | 작업 본문과 보조 tool surface를 분리하고, CLI는 하단 surface로 취급했다. |
| IntelliJ IDEA Terminal Emulator (`https://www.jetbrains.com/help/idea/terminal-emulator.html`) | 높음 | IDE 안에서 terminal tool window를 열어 command-line shell을 실행한다. | 다중 CLI를 앱 내부 하단 terminal 영역에서 다루는 방향을 확정했다. |
| Discord Appearance Settings (`https://support.discord.com/hc/en-us/articles/360035491151-Customizing-your-Discord-Interface`) | 높음 | appearance 설정에서 테마, compact/cozy, density 같은 사용자 UI 선호를 제공한다. | light/dark theme와 사용자가 즉시 이해하는 appearance settings를 추가했다. |

## 약한 출처 및 제외

- 비공식 UI 블로그, 일반 리뷰, 이미지 검색 결과는 직접 근거로 쓰지 않았다.
- 사용자 요청은 특정 오픈소스 코드를 복제하라는 방향도 포함했지만, 이번 slice는 기존 제품 renderer를 직접 수정하는 것이 더 빠르고 법적/의존성/유지보수 변경 범위가 작아 공식 UX reference만 채택했다.

## 공개 결정 요약

- 제품은 web page가 아니라 workbench shell처럼 동작해야 하므로 activity rail, titlebar context, bottom terminal drawer, settings dialog를 명확히 분리한다.
- 좌측 navigation은 하나만 둔다. settings 내부도 별도 sidebar처럼 보이는 좌우 tab 구조를 피하고 상단 segmented tab으로 둔다.
- terminal/CLI는 사용자가 기대하는 하단 surface로 제공한다.
- 기본 사용자는 `바로 쓰기` flow로 시작하고, 상세 설정은 settings dialog에서 theme/language/layout/init/data로 분리한다.
