# SVG 에셋 라이브러리 스펙

## 최신화 메모

- 이 문서는 초기 120개 생성 범위를 기록한다.
- 현재 사용 기준은 `design-asset-library/specs/2026-06-02-asset-usability-expansion/spec.ko.md`의 600개 생성 자산과 탐색 도구 구조를 따른다.

## 목적

저작권 리스크 없이 발표, HTML, dashboard, prototype에 쓸 수 있는 다수의 SVG 디자인 에셋을 미리 준비한다.

## 범위

- 내부 생성 SVG 120개 생성
- asset registry 작성
- 외부 오픈소스 후보 registry 작성
- 라이선스/사용 문서 작성
- 단위 테스트 작성

## 비범위

- 유료/상용/브랜드 에셋 다운로드
- 외부 SVG 파일 실제 저장
- 특정 유료 템플릿의 복제

## 수용 기준

- registry가 자체 설명형 계약을 통과한다.
- 100개 이상의 SVG가 존재하고 XML로 parse된다.
- 외부 후보는 `downloaded=false`로 유지된다.
