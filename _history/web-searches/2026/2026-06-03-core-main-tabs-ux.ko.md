# 웹 검색 기록: 핵심 기능 메인 탭 UX

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-044`
- 소유 프로젝트: `platform-desktop-app/`
- 목적: 처음 보는 사용자가 핵심 기능을 찾게 하는 정보 구조와 설치형 데이터 경로 같은 운영 정보를 낮추는 방식 확인

## 쿼리

- `Apple Human Interface Guidelines onboarding settings user interface progressive disclosure official`
- `Microsoft Fluent 2 navigation tabs app information architecture official`
- `VS Code official getting started workbench welcome core actions docs`
- `JetBrains IntelliJ IDEA official user interface tool windows settings paths docs`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| Apple HIG Onboarding (`https://developer.apple.com/design/human-interface-guidelines/onboarding`) | 높음 | 사용법 설명은 필요한 곳 근처에 두고, 필요한 권한/리소스 접근은 onboarding 흐름에 통합해야 한다. | 첫 화면 탭 detail에 각 기능의 3단계 흐름과 action을 배치했다. |
| Microsoft Fluent 2 Nav (`https://fluent2.microsoft.design/components/web/react/core/nav/usage`) | 높음 | Nav는 앱의 main sections를 이동하게 하며 category는 정보를 드러내거나 감추는 용도로 쓴다. | activity rail은 유지하고, Overview는 main feature tabs로 목적별 선택을 제공했다. |
| VS Code Getting Started (`https://code.visualstudio.com/docs/getstarted/getting-started`) | 높음 | 처음 사용자는 Explorer, editor, terminal, settings 같은 핵심 작업 영역을 빠르게 연결해 배운다. | `파일 가져오기`, `작업 실행`, `에이전트 만들기`, `학습/개선` 탭을 first-view action으로 구성했다. |
| IntelliJ IDEA Settings (`https://www.jetbrains.com/help/idea/configuring-project-and-ide-settings.html`) | 높음 | 설정과 경로 같은 세부 구성은 Settings/Preferences에서 관리한다. | raw runtime/install data path를 기본 카드에서 숨기고 `세부 경로` disclosure로 낮췄다. |

## 약한 출처 및 제외

- Reddit, 비공식 블로그, 오래된 PDF는 직접 결정 근거로 쓰지 않았다.
- 이번 slice는 정보 구조와 progressive disclosure 개선이며, 별도 first-run onboarding wizard까지는 확장하지 않았다.

## 공개 결정 요약

- Overview의 첫 질문은 “무엇을 하려는가”여야 한다.
- 메인 기능은 파일 가져오기, 에이전트 만들기, 작업 실행, 학습/개선으로 고정한다.
- 설치형 데이터 경로는 사용자가 처음 보는 기본 UI에 노출하지 않고, 운영 상세에서만 펼쳐 보게 한다.
