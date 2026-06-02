# 요청-결과 추적: 외부 SVG 실제 수집

## 요청 ID

- `UR-2026-06-02-043`

## 요청 요약

- 디자인 에셋을 실제로 많이 수집한다.

## 결과

- Lucide, Heroicons, Bootstrap Icons, Tabler Icons의 공식 GitHub repository에서 총 3,048개 SVG를 실제 파일로 수집했다.
- source별 `LICENSE`와 `SOURCE.json`을 저장했다.
- `external-asset-registry.json`에 source URL, commit, upstream path, local path, license, tags를 기록했다.
- 외부 registry도 `asset_browser.py`의 search, snippet, gallery 흐름에서 사용할 수 있게 했다.
- 외부 SVG 수집 정책, 문서, 요구사항, 스펙, 히스토리, memory bootstrap, workspace health config를 갱신했다.

## 주요 산출물

- `design-asset-library/assets/svg/external/`
- `design-asset-library/data/external-asset-registry.json`
- `design-asset-library/configs/external-collection-policy.json`
- `design-asset-library/scripts/collect_external_svg_assets.py`
- `design-asset-library/artifacts/html/external-gallery.html`
- `design-asset-library/docs/external-collection/README.ko.md`
- `_specs/workspace-platform/2026-06-02-external-svg-asset-collection/`
- `_history/web-searches/2026/2026-06-02-external-svg-asset-collection.ko.md`

## 검증

- `python3 design-asset-library/scripts/collect_external_svg_assets.py --dry-run`: 3,048개 후보 확인
- `python3 design-asset-library/scripts/collect_external_svg_assets.py`: 3,048개 SVG 수집
- `python3 -m unittest discover -s design-asset-library/tests`: 통과
- `asset_browser.py` external families/search/snippet/gallery smoke: 통과
- config contract, memory bootstrap, browser smoke, workspace health, omission, grounding, evaluation: 최종 close-out에서 기록

## 평가

- `_history/evaluations/2026/2026-06-02-external-svg-asset-collection.ko.md`

## 커밋

- close-out 후 기록한다.
