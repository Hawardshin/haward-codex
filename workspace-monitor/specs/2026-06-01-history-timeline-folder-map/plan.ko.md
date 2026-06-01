# 계획: 날짜별 히스토리와 폴더 구조 지도

## 근거

- Next.js static export 공식 문서는 정적 HTML/CSS/JS 산출물로 배포할 수 있음을 설명한다.
- React 공식 문서는 배열 데이터의 filter/map 렌더링과 조건부 렌더링 패턴을 제공한다.
- Diataxis와 문서 정보 구조 검색 결과는 문서 목적과 탐색 경로를 분리해 보여주는 접근을 뒷받침한다.

## 구현 순서

1. collector에 날짜 추출과 `historyDays` 생성 함수를 추가한다.
2. root structure policy, docs registry, project registry를 읽어 `folderStructure`를 만든다.
3. snapshot 타입을 확장한다.
4. History 섹션을 날짜별 타임라인과 필터 UI로 바꾼다.
5. Structure 섹션을 추가해 루트 폴더, docs category, project home, history roots를 보여준다.
6. 테스트, TypeScript check, 정적 build, snapshot smoke check를 실행한다.

## 리스크

- 날짜가 없는 history 파일은 날짜 timeline에 포함되지 않는다. 이 경우 `updatedAt` 목록에는 남지만 날짜별 index에서는 제외한다.
- snapshot이 커질 수 있다. 현재는 상한을 `1200` documents로 두고, history summary는 HTML 본문 없이 경량 document summary를 사용한다.
