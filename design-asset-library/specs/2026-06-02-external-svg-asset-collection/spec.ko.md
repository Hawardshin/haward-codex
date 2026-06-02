# 외부 SVG 실제 수집 프로젝트 스펙

## 목적

`design-asset-library`에 실제 저장된 외부 오픈소스 SVG 팩을 추가해 발표, 대시보드, HTML artifact에서 바로 사용할 수 있게 한다.

## 요구사항

- `DAL-REQ-006`

## 설계

- `configs/external-collection-policy.json`이 수집 가능한 source, pinned commit, path allowlist, max count를 정의한다.
- `scripts/collect_external_svg_assets.py`가 policy를 읽고 실제 SVG, source별 `LICENSE`, `SOURCE.json`, external registry를 생성한다.
- `data/external-asset-registry.json`은 실제 저장된 외부 SVG만 기록한다.
- `asset_browser.py`는 `generated_assets`와 `collected_assets` 모두를 같은 검색/갤러리 도구로 처리한다.

## 현재 수집량

- Lucide: 800
- Heroicons: 648
- Bootstrap Icons: 800
- Tabler Icons: 800
- 총합: 3,048

## 검증

- `python3 design-asset-library/scripts/collect_external_svg_assets.py --dry-run`
- `python3 design-asset-library/scripts/collect_external_svg_assets.py`
- `python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families`
- `python3 -m unittest discover -s design-asset-library/tests`
