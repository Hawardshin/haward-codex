# Source Code Viewer 스펙

## 목표

Workspace Monitor에서 개발자와 슈퍼어드민 개발자가 주요 프로젝트와 `_tools`의 소스 코드를 읽기 전용으로 볼 수 있게 한다.

## 범위

- snapshot 생성기에 `sourceFiles` catalog 추가
- Developer/Superadmin view mode에 `source` 섹션 추가
- Source 탭 UI 추가
- 프로젝트/언어/검색 필터 추가
- 선택 파일의 코드 내용을 `<pre><code>`로 안전하게 표시
- source snapshot 공개 전 검토 안내

## 비범위

- 브라우저에서 소스 코드 편집 또는 저장
- Monaco/Shiki 기반 고급 하이라이팅
- GitHub API 연동
- 전체 저장소의 모든 파일 수집
- client-side view mode를 보안 경계로 취급하는 것

## 결정

- 현재는 의존성을 추가하지 않고 plain read-only code viewer를 사용한다.
- `src`, `tests`, `app`, `components`, `lib`, `scripts` 같은 유지보수 코드 루트만 수집한다.
- generated snapshot, build output, dependency 폴더, 큰 파일은 제외한다.
- User View에서는 Source 탭을 숨긴다.

## 성공 기준

- `sourceFiles`가 snapshot에 생성된다.
- Developer/Superadmin view에서 Source 탭을 볼 수 있다.
- User View에서는 Source 탭을 볼 수 없다.
- `npm test`, `npm run check`, `npm run build`가 통과한다.
