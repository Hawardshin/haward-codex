# 디자인 에셋 라이브러리 변경

## 요구사항 ID

- `REQ-WS-081`

## 사용자 요청

- 사용자는 불법 다운로드가 아니라, 유사한 SVG 디자인 에셋을 많이 미리 모아두고 사용하는 구조를 요청했다.

## 변경 내용

- 새 루트 프로젝트 `design-asset-library/`를 추가한다.
- 내부 생성 SVG asset pack을 기본값으로 둔다.
- 외부 오픈소스 후보는 registry에 기록하되 실제 저장 전 license review를 요구한다.
- 발표/HTML/dashboard/prototype에서 registry 기반으로 SVG를 선택해 사용한다.

## 결정

- 불법 다운로드 방지를 위해 외부 SVG를 바로 복사하지 않는다.
- 기본 자산은 generator가 만든 SVG로 구성한다.
