# 공개 Impress 템플릿 수집 조사

## 요약

2026-06-02 작업에서는 발표 에이전트가 실제로 저장하고 반복 참고할 수 있는 무료 발표 템플릿 파일을 찾았다. 재배포 가능성이 명확한 원본만 프로젝트에 보관하기 위해 `dohliam/libreoffice-impress-templates` GitHub archive의 공개 LibreOffice Impress 템플릿을 우선 수집했고, 재배포 제한이 있는 무료 템플릿 사이트는 원본 저장 대상에서 제외했다.

## 확인한 원천

- `dohliam/libreoffice-impress-templates`: LibreOffice Impress 템플릿 모음. 템플릿별 원 라이선스가 README에 정리되어 있고 GitHub archive로 다운로드 가능하다.
- `lo-cft`, `lo4-design-candidates`, `lo5-design-candidates`, `lo51-templates`: collection README 기준 CC0 템플릿.
- `lo35-templates`: collection README 기준 LibreOffice 3.5와 함께 LGPLv3로 보이는 템플릿.
- `fedora-slideshow`: collection README 기준 CC-BY 또는 CC-BY-SA 3.0 템플릿.
- `user-contrib/material-simple`: collection README와 license file 기준 MIT 템플릿.
- `LibreTemplates`: 직접 다운로드 링크는 확인했지만 license page에 재배포 제한이 있어 원본 파일을 저장하지 않았다.

## 결과

- 수집 수: 119개 템플릿.
- 원본 포맷: LibreOffice Impress `.otp`.
- 저장 위치: `presentation-agent/data/assets/raw/open-impress-templates/files/`
- 썸네일 위치: `presentation-agent/data/assets/thumbnails/open-impress-templates/`
- HTML 참조 페이지: `presentation-agent/data/conversions/html/open-impress-templates/`
- 전체 갤러리: `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- registry: `presentation-agent/data/reference-index/open-impress-template-downloads.json`

## 변환 판단

현재 로컬 환경에는 LibreOffice/`soffice`가 없어서 고화질 렌더링 변환을 수행하지 않았다. 대신 unpacked ODF template directory를 `.otp`로 다시 패키징하고, `Thumbnails/thumbnail.png`와 `content.xml`의 추출 가능한 텍스트를 HTML 참조 카드에 넣었다.

따라서 이번 HTML은 “PPT 시각 변환”이 아니라 “디자인 레퍼런스를 빠르게 훑기 위한 출처/라이선스/썸네일/텍스트 카드”다. 실제 PPTX 또는 HTML 발표로 재사용할 때는 이 카드를 참고해 별도 `deck-spec`과 디자인 토큰으로 재구성해야 한다.

## 다음 개선 후보

- LibreOffice headless renderer를 프로젝트 또는 CI 환경에 설치할 수 있을 때 `.otp -> html/pdf/png` 고화질 변환 feasibility를 별도 검증한다.
- 사용자가 PPTX 파일을 제공하면 `pptx_to_html.py`의 텍스트 추출과 별개로 theme/master/layout 기반 design-token analyzer를 만든다.
- 재배포 가능 파일과 metadata-only 후보를 한 UI에서 함께 볼 수 있도록 `workspace-monitor` 또는 발표 에이전트 갤러리와 연동한다.

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
