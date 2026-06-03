# 웹 검색 기록: 작업공간 Explorer Workbench

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-043`
- 소유 프로젝트: `platform-desktop-app/`
- 목적: VS Code식 파일시스템 Explorer/Workbench 구조를 platform desktop app의 `파일/코드` 화면에 반영할 근거를 확인한다.

## 쿼리

- `VS Code official Explorer view file explorer Activity Bar primary side bar docs`
- `VS Code official User Interface Explorer Activity Bar Primary Side Bar editor groups docs`
- `VS Code official drag and drop files Explorer documentation`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| VS Code User Interface (`https://code.visualstudio.com/docs/getstarted/userinterface`) | 높음 | Activity Bar는 view 전환을 맡고, Primary Side Bar는 Explorer 같은 view-specific content를 보여주며, editor는 오른쪽 workbench에 위치한다. | navigation duplication이 아닌 file explorer pane을 activity rail 옆에 추가했다. |
| VS Code Basic Editing (`https://code.visualstudio.com/docs/editing/codebasics`) | 높음 | Explorer에서 파일을 선택해 editor에서 열고 여러 editor tab을 다루는 기본 흐름을 제공한다. | Explorer click -> existing Monaco editor/draft tab 흐름을 전면화했다. |
| VS Code Integrated Terminal (`https://code.visualstudio.com/docs/terminal/basics`) | 높음 | Terminal은 editor 밑 panel로 운영되는 별도 surface다. | 기존 하단 CLI drawer는 유지하고 파일 Explorer는 좌측 workspace surface로 분리했다. |

## 약한 출처 및 제외

- 비공식 UI 블로그와 이미지 검색은 직접 근거로 쓰지 않았다.
- VS Code OSS 또는 Theia 통합은 유효한 후보지만, 이번 slice에서는 설치/라이선스/보안/번들 크기 audit 없이 즉시 도입하지 않았다. 기존 Monaco/Tauri workspace command를 유지하면서 Explorer 구조를 먼저 구현했다.

## 공개 결정 요약

- `파일/코드` 화면은 카드 목록이 아니라 activity rail + workspace Explorer + editor pane 구조여야 한다.
- Explorer는 navigation sidebar가 아니라 현재 view의 파일시스템 surface다. 따라서 activity rail은 하나만 유지하고, Explorer는 파일/폴더/업로드/검색/상태만 맡긴다.
- Customer static build는 source content를 싣지 않으므로 실제 파일 tree는 Tauri runtime에서 채우고, 정적 화면은 빈 workspace placeholder와 dropzone을 보여준다.
