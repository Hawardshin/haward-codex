# 디자인 에셋 라이브러리 스펙

## 목적

발표, HTML, 모니터링 UI, prototype에서 합법적으로 사용할 수 있는 SVG 디자인 에셋을 미리 많이 준비한다.

## 요구사항

- `REQ-WS-081`

## 범위

- `design-asset-library/` 루트 프로젝트 생성
- 내부 생성 SVG 120개 생성
- asset registry와 외부 후보 registry 작성
- 라이선스/사용 문서 작성
- 단위 테스트 작성
- 프로젝트 registry 등록

## 비범위

- 외부 SVG 파일 다운로드
- 유료/브랜드/상용 템플릿 복제
- 생성 자산의 최종 public 배포 license 확정

## 수용 기준

- `asset-registry.json`이 자체 설명형 계약을 통과한다.
- SVG 100개 이상이 존재하고 XML parse가 된다.
- 외부 후보는 `downloaded=false`다.
- `design-asset-library`가 프로젝트 registry에 등록된다.
