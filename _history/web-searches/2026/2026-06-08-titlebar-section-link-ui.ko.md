# 웹 검색 기록: 타이틀바 섹션 링크 UI

- 날짜: 2026-06-08
- 요청: UI개선
- 목적: 데스크톱 앱 titlebar/toolbar에 현재 화면 액션을 추가할 때 참고할 공식 UI 기준 확인.

## 검색어

- `desktop app UI guidelines toolbar copy link button official design system`
- `Apple Human Interface Guidelines toolbars buttons macOS app official`
- `Microsoft Fluent 2 toolbar button icon label official`
- `Visual Studio Code UX guidelines toolbar actions official`

## 확인한 주요 출처

- Apple Human Interface Guidelines - Toolbars: https://developer.apple.com/design/human-interface-guidelines/toolbars
- Visual Studio Code UX Guidelines: https://code.visualstudio.com/api/ux-guidelines/overview
- Microsoft UX checklist for desktop applications: https://learn.microsoft.com/en-us/windows/win32/uxguide/top-violations

## 계획 영향

- toolbar는 현재 view에 필요한 명령과 orienting 정보를 제공해야 하므로, 현재 섹션을 공유하는 액션을 공통 titlebar에 배치했다.
- 화면을 복잡하게 만들지 않기 위해 text-heavy 버튼 대신 아이콘 버튼과 tooltip/aria-label을 사용했다.
- 복사 결과는 dialog가 아니라 titlebar 안의 짧은 status pill로 처리했다.

## 무시한 약한 출처

- Reddit의 macOS toolbar 비판과 의견성 글은 현업 신호로만 보고 구현 근거로 쓰지 않았다.
- 비공식 PDF와 오래된 HIG mirror는 최신 공식 문서가 있어 보조로도 사용하지 않았다.

## 불확실성

- 공식 문서는 “섹션 링크 복사”라는 구체 UI를 직접 지정하지 않는다. 이번 결정은 toolbar의 scoped command 원칙을 현재 제품의 section deep link 기능에 적용한 추론이다.
