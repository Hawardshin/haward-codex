# SVG 에셋 라이브러리 사용

발표 에이전트는 새 디자인 요소가 필요할 때 먼저 `design-asset-library/`를 확인한다.

## 기본 순서

1. 발표의 필요한 시각 역할을 정한다.
2. `design-asset-library/data/asset-registry.json`의 `generated_assets`에서 `family`, `motif`, `tags`로 후보를 찾는다.
3. HTML deck에서는 SVG를 `<img>`로 참조하거나 inline SVG로 삽입한다.
4. 원하는 자산이 없으면 `design-asset-library/scripts/generate_svg_assets.py`에 motif를 추가하고 registry를 재생성한다.
5. 외부 SVG가 필요하면 `external_source_candidates`를 조사하되, 실제 파일 저장 전 license review를 남긴다.

## 금지하지 않고 대신 해야 할 것

- 외부 asset을 바로 복사하지 말고, source URL/license/access date/attribution/public-use constraint를 먼저 기록한다.
- PPT나 HTML에서 디자인 무드만 맞추려면 내부 생성 SVG를 색상/크기/배치로 조합한다.
