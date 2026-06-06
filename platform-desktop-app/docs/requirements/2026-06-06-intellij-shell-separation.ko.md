# Requirements: IntelliJ Shell Separation

## 목적

데스크톱 앱의 좌측 사이드/레일과 메인 작업 영역이 같은 평면처럼 보이지 않도록, IntelliJ 계열 IDE의 tool-window stripe와 editor/content area 분리 원칙을 적용한다.

## 요구사항

- 좌측 activity rail은 tool-window stripe처럼 독립된 side chrome으로 보여야 한다.
- 메인 viewport는 editor/content plane처럼 별도 배경, 경계, titlebar chrome을 가져야 한다.
- 활성 section은 사이드에서 명확한 indicator와 selected state를 가져야 한다.
- titlebar는 메인 영역의 상단 경계를 끝까지 형성해야 하며, 좌측 레일과 시각적으로 섞이지 않아야 한다.
- 기존 no-mobile, bounded scroll, Tauri drag region, resident section, provider/terminal 기능을 깨뜨리지 않아야 한다.
- 구현 후 테스트, check, build/package 검증을 실행한다.

## 범위

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 제외

- 새로운 side panel 기능 추가.
- IntelliJ 상표나 시각 자산 복제.
- public release signing/notarization 문제 해결.
