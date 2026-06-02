# 발표 변환 기록

PPT/PPTX를 HTML로 변환한 결과와 변환 메모를 저장하는 위치다. 모든 변환 결과는 원본 카탈로그 레코드와 라이선스 검토 결과를 함께 남겨야 한다.

## 변환 원칙

- 기본 변환기는 텍스트 구조와 슬라이드 순서를 HTML로 추출하는 도구다.
- 공개 Impress 템플릿 변환은 `.otp` 파일을 고화질 렌더링하지 않고, 썸네일/출처/라이선스/추출 텍스트를 HTML 참조 카드로 만든다.
- 픽셀 단위의 고품질 시각 변환이 필요하면 별도 렌더러 검토, 스크린샷 검증, 라이선스 검토가 필요하다.
- 변환 결과 파일명에는 원천 레코드 ID와 날짜를 포함한다.

## 현재 변환 묶음

- `html/open-impress-templates/`: 2026-06-02에 생성한 공개 Impress 템플릿 119개 HTML 참조 페이지.
- 전체 갤러리: `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- registry: `presentation-agent/data/reference-index/open-impress-template-downloads.json`
