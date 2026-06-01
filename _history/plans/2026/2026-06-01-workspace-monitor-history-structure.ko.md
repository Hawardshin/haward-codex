# Workspace Monitor 히스토리/구조 UI 계획 기록

## 개요

- 날짜: 2026-06-01
- 관련 요청: `UR-2026-06-01-015`
- 관련 요구사항: `REQ-WM-007`, `REQ-WM-008`
- 작업 모드: `standard`

## 계획

1. 웹 검색으로 Next.js static export, React list/filter rendering, 문서 정보 구조 근거를 확인한다.
2. 기존 collector가 `_history`와 프로젝트 문서를 어떻게 수집하는지 확인한다.
3. `_history/**/YYYY/YYYY-MM-DD...` 경로에서 날짜를 추출해 `historyDays`를 만든다.
4. root structure policy, docs registry, project registry를 읽어 `folderStructure`를 만든다.
5. History UI를 날짜별 타임라인과 날짜/유형 필터로 확장한다.
6. Structure UI를 추가해 root folders, docs categories, project homes, history source roots를 보여준다.
7. 테스트, TypeScript check, build, snapshot smoke, evaluation을 실행한다.

## 결정

- 서버 DB나 GitHub API를 추가하지 않고 기존 static snapshot 모델을 유지한다.
- history timeline에는 HTML 본문을 복제하지 않고 lightweight document summary만 넣는다.
- folder structure는 새로운 별도 설정을 만들지 않고 기존 registry와 policy를 재사용한다.
