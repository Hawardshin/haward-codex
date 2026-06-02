# 웹 검색 기록: 공개 Impress 템플릿 수집과 HTML 참조화

## 요청 요약

사용자는 수많은 무료 PPT 레퍼런스 파일과 UI를 모아 다운로드하고 HTML로 전환해 달라고 요청했다.

## 검색 쿼리

- `free PowerPoint templates downloadable pptx license Creative Commons SlidesCarnival PresentationGO Canva Slidesgo terms`
- `open source free pptx templates GitHub license presentation templates PowerPoint`
- `LibreOffice command line convert pptx to html export Impress documentation`
- `pptx to html open source converter GitHub pptx2html`
- `dohliam libreoffice impress templates GitHub license`
- `LibreOffice Impress templates archive github dohliam libreoffice-impress-templates lo-cft CC0`

## 확인한 강한 출처

- `dohliam/libreoffice-impress-templates`: 공개 Impress 템플릿 원천 archive와 collection README를 확인했다.
- GitHub archive: 실제 다운로드 가능한 source archive를 확인하고 수집했다.
- Collection READMEs: `lo-cft`, `lo4-design-candidates`, `lo5-design-candidates`, `lo51-templates`, `lo35-templates`, `fedora-slideshow`, `user-contrib/material-simple`.
- LibreTemplates license page: 직접 다운로드는 가능하지만 재배포 제한이 있어 raw 저장에서 제외했다.

## 약한/제외 출처

- Canva, Slidesgo, MiriCanvas, PresentationGO 같은 템플릿 갤러리는 유용한 디자인 레퍼런스지만, 원본 파일의 재배포/저장 권한이 item-level 또는 계정/약관 의존이라 이번 “원본 대량 저장” 대상에서 제외했다.
- LibreTemplates는 무료 다운로드 링크가 있지만 license page의 재배포 제한 때문에 raw file 저장 대상에서 제외했다.

## 계획 영향

- PPTX 대량 다운로드 대신, 재배포 가능성이 명확한 LibreOffice Impress `.otp` 공개 템플릿 119개를 저장 대상으로 선택했다.
- HTML 변환은 고화질 PPT 렌더링이 아니라 썸네일, 출처, 라이선스, 추출 가능한 텍스트를 보여주는 참조 카드 방식으로 결정했다.
- LibreOffice/`soffice`가 로컬에 없으므로 렌더링 엔진 설치는 이번 범위에서 제외하고 향후 개선 후보로 기록했다.

## 불확실성

- `lo35-templates`는 README가 “LGPLv3로 보인다”고 표현하므로 registry에는 그 표현을 바탕으로 `open_source`로 기록하되, public 배포나 상업 사용 전에는 item-level 검토가 필요하다.
- `.otp` 템플릿을 실제 PPTX로 변환하려면 LibreOffice 또는 다른 렌더러 설치/검증이 필요하다.

## 참고 링크

- https://github.com/dohliam/libreoffice-impress-templates
- https://github.com/dohliam/libreoffice-impress-templates/archive/refs/heads/master.zip
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo-cft
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo4-design-candidates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo5-design-candidates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo51-templates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/lo35-templates
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/fedora-slideshow
- https://github.com/dohliam/libreoffice-impress-templates/tree/master/user-contrib/material-simple
- https://libretemplates.com/en/licenses
