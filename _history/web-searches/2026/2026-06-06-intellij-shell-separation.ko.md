# Web Search: IntelliJ Shell Separation

## 요청 요약

IntelliJ UI 특징과 원칙을 사용해 데스크톱 앱의 메인 영역과 사이드 영역을 확실히 분리한다.

## 검색어

- `JetBrains IntelliJ Platform UI Guidelines tool windows layout sidebar main content official`
- `JetBrains IntelliJ Platform UI Guidelines navigation tool window content tabs official`
- `JetBrains UI Guidelines layout spacing borders panels official IntelliJ`

## 확인한 출처

- JetBrains IntelliJ Platform SDK, User interface overview: https://plugins.jetbrains.com/docs/intellij/ui-overview.html
- JetBrains IntelliJ Platform SDK, Tool Window: https://plugins.jetbrains.com/docs/intellij/tool-window.html
- JetBrains IntelliJ Platform SDK, Layout: https://plugins.jetbrains.com/docs/intellij/layout.html
- JetBrains IntelliJ Platform SDK, Tabs: https://plugins.jetbrains.com/docs/intellij/tabs.html
- JetBrains IntelliJ IDEA VPAT: https://resources.jetbrains.com/storage/products/intellij-idea/docs/IntelliJ_IDEA_VPAT.pdf

## 반영한 인사이트

- 사이드 영역은 도구 창처럼 짧고 예측 가능한 이름, 고정된 위치, 명확한 활성 상태를 가져야 한다.
- 세로 tool window는 tree/navigation 성격에 맞고, 넓은 작업 내용은 메인 editor/content plane에 둔다.
- 탭과 영역 경계는 내용 전체를 카드처럼 감싸기보다 상단/영역 경계로 구분한다.
- 메인과 사이드는 배경, 경계선, shadow, 활성 인디케이터로 같은 평면이 아니라 다른 작업 영역임을 보여야 한다.
- 접근성 기준상 일관된 navigation, visible focus, 충분한 target size를 유지한다.

## 약한 출처

- Reddit/커뮤니티 글은 사용자 불만과 선호 신호로만 보고 구현 근거로 사용하지 않았다.

## 공개 판단 요약

이번 변경은 IntelliJ를 복제하는 것이 아니라, JetBrains 공식 UI 문서의 tool-window/editor 분리 구조를 현재 Tauri desktop shell에 맞게 적용하는 것이다.
