# 공개 발표 템플릿 파일 수집 기록

## 핵심 인사이트

무료 PPT/슬라이드 템플릿 사이트는 많지만, 원본 파일을 repository에 저장하려면 무료 여부보다 재배포/저장 허가가 더 중요하다. 2026-06-02 작업에서는 공개 GitHub archive와 collection README 라이선스가 있는 LibreOffice Impress 템플릿을 raw storage 대상으로 선택했다.

## 재사용할 판단 규칙

- 무료 사이트라도 재배포 제한이 있으면 원본 파일은 저장하지 않는다.
- GitHub/open-source archive라도 collection별 또는 item별 license note를 registry에 남긴다.
- PPTX가 아니어도 `.otp`, `.odp` 같은 발표 템플릿은 발표 레퍼런스 파일이 될 수 있다.
- 렌더러가 없으면 “PPT 변환”이라고 주장하지 말고 reference-only HTML로 표시한다.

## 산출물

- `presentation-agent/data/reference-index/open-impress-template-downloads.json`
- `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- `presentation-agent/docs/research/2026-06-02-open-impress-template-collection.ko.md`

## 출처

- https://github.com/dohliam/libreoffice-impress-templates
- https://libretemplates.com/en/licenses
