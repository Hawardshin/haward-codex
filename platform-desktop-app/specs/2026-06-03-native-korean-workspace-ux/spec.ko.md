# 네이티브 한국어 작업공간 UX 스펙

## 목표

사용자가 데스크톱 앱을 열었을 때 영어 중심의 모호한 메뉴와 수동 경로 입력 때문에 기능을 찾지 못하는 문제를 줄이고, `파일/코드` 섹션에서 실제 OS 파일시스템과 workspace 파일을 바로 열어 작업할 수 있게 한다.

## 요구사항

- 기본 제품 네비게이션과 주요 workspace/file 문구는 한국어 우선이어야 한다.
- 새 UI copy는 한국어/영어 모드를 분리할 수 있는 구조를 가져야 한다.
- `파일/코드` 섹션은 정적 snapshot source viewer가 아니라 Tauri runtime의 active workspace 파일 목록을 우선 보여야 한다.
- 사용자는 수동 absolute path 입력 없이 OS native folder picker를 눌러 active workspace를 선택할 수 있어야 한다.
- 선택된 workspace 안의 text file은 목록에서 클릭해 열 수 있고, Monaco editor에서 수정한 뒤 저장할 수 있어야 한다.
- 저장은 기존 workspace-scoped backup gate를 유지해야 한다.
- Tauri runtime이 없는 브라우저 fallback에서는 snapshot file viewer로 degrade해야 한다.

## 비범위

- Finder/Explorer reveal, drag-and-drop import, OS file association은 이번 slice에서 제외한다.
- 전체 operator/admin 문서 화면의 모든 과거 영어 copy를 완전히 번역하지 않는다.
- public release signing/notarization gate는 변경하지 않는다.
