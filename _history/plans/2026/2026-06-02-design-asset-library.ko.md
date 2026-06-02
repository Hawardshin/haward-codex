# 디자인 에셋 라이브러리 계획

## 요청

- `UR-2026-06-02-041`
- 사용자는 합법적으로 쓸 수 있는 유사 SVG 에셋을 많이 미리 모으는 구조를 요청했다.

## 작업 모드

- `governance`

## 계획

1. 공식/고신뢰 SVG 라이브러리와 license 정보를 웹 검색한다.
2. 외부 파일 저장 없이 내부 생성 asset pack을 만든다.
3. `design-asset-library/` 루트 프로젝트를 만들고 registry, docs, tests를 둔다.
4. `presentation-agent`에서 공통 라이브러리를 참조하는 문서를 추가한다.
5. 프로젝트 registry, memory bootstrap, workspace health에 연결한다.
6. 검증/평가 후 커밋하고 push한다.
