# 웹 검색 기록: 섹션 딥링크 UX

- 날짜: 2026-06-08
- 요청: UX 개선
- 목적: 데스크톱 워크벤치형 UI에서 섹션 탐색과 복구 가능한 주소 상태를 어떻게 잡을지 확인.

## 검색어

- `desktop app UX guidelines deep linking navigation history workbench official`
- `Visual Studio Code UX guidelines navigation workbench deep links panel official`
- `Apple Human Interface Guidelines navigation macOS app official`
- `Microsoft Fluent design navigation layout desktop app official`
- `WAI ARIA Authoring Practices tabs official`

## 확인한 주요 출처

- Visual Studio Code UX Guidelines: https://code.visualstudio.com/api/ux-guidelines/overview
- Visual Studio Code Webviews UX Guidelines: https://code.visualstudio.com/api/ux-guidelines/webviews
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Microsoft Fluent 2 React Nav usage: https://fluent2.microsoft.design/components/web/react/core/nav/usage
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/

## 계획 영향

- 워크벤치형 UI는 컨테이너와 활성 작업 맥락을 분리해서 보여줘야 하므로, 화면 상태와 주소 상태를 분리된 임시 상태로 두지 않기로 했다.
- 섹션 탭은 접근성과 복구성을 위해 선택 상태가 분명해야 하며, URL query/hash를 같은 섹션으로 정규화하는 방식으로 구현한다.
- 사용자가 고급 섹션 링크를 직접 연 경우는 명시적 의도로 보고, 그 섹션을 볼 수 있는 view mode로 자동 전환한다.

## 무시한 약한 출처

- Reddit/블로그의 의견성 UX 비판은 제품 방향의 참고 신호로만 보고 구현 근거로 쓰지 않았다.
- 오래된 PDF 형태의 과거 HIG 문서는 현재 macOS 앱 기준 검증에는 보조 자료로만 취급했다.

## 불확실성

- 공식 문서들은 섹션 deep link 구현 세부를 직접 지정하지 않는다. 이번 결정은 워크벤치 탐색, 링크 가능한 nav, 탭 상태 일관성 원칙을 현재 제품 구조에 적용한 추론이다.
