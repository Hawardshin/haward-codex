# 외부 SVG 실제 수집 요구사항 검토

## 검토 대상

- `REQ-WS-083`
- `DAL-REQ-006`

## 검토 결과

- 수용한다.

## 판단

- 실제 파일 수집은 사용자의 명시 요청과 맞다.
- 단, 모든 외부 SVG를 무차별 저장하면 license/provenance 관리가 약해지므로 첫 tranche는 공식 repository 4개와 pinned commit으로 제한한다.
- source별 `LICENSE`와 `SOURCE.json`을 보존하고, 실제 수집 registry를 생성 자산 registry와 분리해야 한다.

## 반영 대상

- `design-asset-library/configs/external-collection-policy.json`
- `design-asset-library/scripts/collect_external_svg_assets.py`
- `design-asset-library/assets/svg/external/`
- `design-asset-library/data/external-asset-registry.json`
- `design-asset-library/artifacts/html/external-gallery.html`
