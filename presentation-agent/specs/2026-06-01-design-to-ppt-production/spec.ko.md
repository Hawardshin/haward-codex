# 스펙: 디자인 요소 수집에서 PPT 생성까지

## 목표

발표 제작 중 필요한 디자인 요소를 웹 검색으로 찾고, 출처/라이선스를 기록한 뒤, `deck-spec` 기반 HTML과 editable PPTX 산출물까지 생성하는 루프를 만든다.

## 요구사항

- 디자인 요소가 필요할 때마다 웹 검색을 실행한다.
- 검색/수집한 출처는 카탈로그 또는 source notes에 저장한다.
- 라이선스가 확인되지 않은 원본 에셋은 PPT/HTML에 포함하지 않는다.
- `deck-spec`은 HTML과 PPTX 생성의 공통 입력이어야 한다.
- PPTX 생성은 Presentations skill의 artifact-tool export를 우선한다.
- 실제 샘플 PPTX를 생성해 `artifacts/pptx/`에 둔다.

## 비범위

- 이번 작업은 새로운 외부 패키지를 설치하지 않는다.
- 이번 작업은 무허가 디자인 템플릿이나 이미지를 복제하지 않는다.

