# 외부 SVG 실제 수집 가이드

## 현재 수집분

| Source | 수량 | License | Local path |
| --- | ---: | --- | --- |
| Lucide | 800 | ISC | `assets/svg/external/lucide/` |
| Heroicons | 648 | MIT | `assets/svg/external/heroicons/` |
| Bootstrap Icons | 800 | MIT | `assets/svg/external/bootstrap-icons/` |
| Tabler Icons | 800 | MIT | `assets/svg/external/tabler-icons/` |

총 3,048개 SVG를 실제 파일로 저장했다.

## 핵심 파일

- `configs/external-collection-policy.json`: source, commit, allowlist, 수집량 정책
- `scripts/collect_external_svg_assets.py`: 실제 수집기
- `data/external-asset-registry.json`: 실제 저장된 외부 SVG registry
- `artifacts/html/external-gallery.html`: 외부 SVG 탐색 gallery
- `assets/svg/external/<source>/LICENSE`: source별 upstream license
- `assets/svg/external/<source>/SOURCE.json`: source별 provenance 기록

## 사용 명령

```bash
python3 design-asset-library/scripts/collect_external_svg_assets.py --dry-run
python3 design-asset-library/scripts/collect_external_svg_assets.py
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json search --family lucide --query dashboard --limit 5
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json snippet external-lucide-outline-layout-dashboard
```

## 확장 규칙

- source를 추가하려면 먼저 공식 repository와 license를 확인한다.
- moving branch가 아니라 pinned commit archive URL을 사용한다.
- `allowed_svg_roots`를 좁게 지정한다.
- source별 `LICENSE`와 `SOURCE.json`이 생성되는지 테스트한다.
- public 배포 전에는 각 source의 license/attribution/trademark 조건을 다시 확인한다.
