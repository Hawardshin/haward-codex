# 자산 사용성 확장 스펙

## 목적

`design-asset-library`를 “보관소”가 아니라 사용자가 바로 탐색하고 붙여 넣을 수 있는 asset workbench로 확장한다.

## 요구사항

- `DAL-REQ-002`
- `DAL-REQ-003`
- `DAL-REQ-004`
- `DAL-REQ-005`

## 설계

- 생성 자산은 6개 계열, 20개 motif, 5개 palette의 조합으로 600개를 만든다.
- `asset_browser.py`는 registry를 읽어 계열 집계, 검색, snippet, gallery 생성을 제공한다.
- `gallery.html`은 정적 파일이며 별도 서버 없이 브라우저로 연다.
- 외부 오픈소스 source는 후보로만 기록하고 다운로드하지 않는다.

## 검증

- `python3 design-asset-library/scripts/generate_svg_assets.py`
- `python3 design-asset-library/scripts/asset_browser.py gallery --output design-asset-library/artifacts/html/gallery.html --limit 600`
- `python3 -m unittest discover -s design-asset-library/tests`
