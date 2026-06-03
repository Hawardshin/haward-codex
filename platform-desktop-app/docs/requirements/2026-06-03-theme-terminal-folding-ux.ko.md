# 요구사항: Theme, Terminal Overlay, Code Folding UX

## 배경

사용자는 다크모드에서 흰 배경이 많이 튀고, 다중 CLI 터미널이 올라올 때 화면을 애매하게 가리며, 코드 에디팅 모드에 접기 기능이 없다고 지적했다. 설치형 데스크톱 앱의 작업감에 맞게 테마 표면, 터미널 오버레이, 코드 편집 접기 동작을 개선한다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| PDA-REQ-054 | 다크모드와 시스템 다크모드에서 주요 카드, dialog, 파일/코드, 운영/의사결정, 구조 패널은 라이트 전용 흰 배경을 직접 쓰지 않아야 한다. | must | CSS hard-coded light background scan, Browser dark smoke |
| PDA-REQ-055 | 라이트모드에서는 기존 밝은 workbench 표면을 유지하되, 표면색은 theme token을 통해 관리해야 한다. | must | CSS token scan, Browser light smoke |
| PDA-REQ-056 | 다중 CLI 터미널이 열리면 작업 화면을 확실히 덮는 오버레이로 동작하고, 배경 클릭 또는 접기 버튼으로 닫을 수 있어야 한다. | must | Browser terminal drawer smoke |
| PDA-REQ-057 | 코드 에디팅 모드에는 Monaco 코드 접기/펼치기 명령이 사용자에게 노출되어야 한다. | must | Type check, toolbar token check, Browser source toolbar smoke |
| PDA-REQ-058 | 파일 Explorer의 폴더는 접고 펼 수 있어야 하며, 접힌 상태가 시각적으로 드러나야 한다. | should | Type check, Browser Explorer smoke |

## 비범위

- 새 editor engine 도입.
- 실제 CLI PTY multiplexing 재구현.
- public release signing/notarization gate 해소.
