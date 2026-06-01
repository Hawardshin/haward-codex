# 스펙: 날짜별 히스토리와 폴더 구조 지도

## 목표

Workspace Monitor가 `_history/` 문서를 날짜별로 모아 보여주고, 현재 저장소의 루트/문서/프로젝트 폴더 구조를 웹에서 이해할 수 있게 한다.

## 요구사항

- `REQ-WM-007`
- `REQ-WM-008`
- 관련 요청: `UR-2026-06-01-015`

## 동작

- collector는 `_history/**/YYYY/YYYY-MM-DD...` 경로에서 `historyDate`를 추출한다.
- snapshot은 날짜별 index인 `historyDays`를 포함한다.
- History UI는 날짜와 히스토리 유형으로 필터링할 수 있다.
- snapshot은 `folderStructure`를 포함해 root folder class, `_docs` category, project home, history source root를 담는다.
- Structure UI는 폴더 경계와 데이터 출처를 보여준다.

## 제외 범위

- 서버 DB나 실시간 이벤트 저장
- Git commit graph 시각화
- 브라우저에서 파일을 직접 수정하는 기능
