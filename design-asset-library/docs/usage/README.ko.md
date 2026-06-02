# SVG 자산 사용법

## 빠른 사용

1. `artifacts/html/gallery.html`을 브라우저로 열어 전체 자산을 훑는다.
2. 실제 외부 수집 SVG가 필요하면 `artifacts/html/external-gallery.html`을 연다.
3. CLI로 `family`, `query`, `tag`를 좁힌다.
4. `snippet` 명령으로 HTML `<img>` 코드를 생성한다.
5. 필요하면 `data/asset-registry.json` 또는 `data/external-asset-registry.json`에서 provenance와 license 상태를 확인한다.
6. public 배포 전에는 licensing 문서를 다시 확인한다.

## 빠른 명령

```bash
python3 design-asset-library/scripts/asset_browser.py families
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
python3 design-asset-library/scripts/asset_browser.py gallery --output design-asset-library/artifacts/html/gallery.html --limit 600
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json search --family lucide --query dashboard --limit 5
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json snippet external-lucide-outline-layout-dashboard
```

## 규모

- 현재 생성 자산: 600개
- 구성: 6개 계열 x 20개 motif x 5개 palette
- 실제 외부 수집 자산: 3,048개
- 외부 수집 source: Lucide 800, Heroicons 648, Bootstrap Icons 800, Tabler Icons 800

## 계열

- `presentation`: 슬라이드, 발표 흐름, 근거, 메시지 구조
- `interface`: 대시보드, 검색, 설정, 파일, 모니터링 UI
- `workflow`: 파이프라인, 병렬 작업, merge gate, 검증 흐름
- `abstract`: 배경, 분위기, 시각적 리듬
- `status`: ready, blocked, warning, verified 같은 상태 표현
- `pattern`: 패턴 배경과 장식

## 발표 에이전트에서 쓰는 방식

- 발표 에이전트는 필요한 asset query를 먼저 정한다.
- `asset_browser.py search` 또는 `gallery.html`에서 후보를 고른다.
- 외부 오픈소스 아이콘이 필요하면 `external-gallery.html`과 `external-asset-registry.json`을 확인한다.
- HTML deck에서는 SVG 파일을 `<img>`로 참조하거나 inline SVG로 삽입한다.
- 디자인 방향이 부족하면 새 motif를 generator에 추가하고 registry를 재생성한다.

## 재생성

```bash
python3 design-asset-library/scripts/generate_svg_assets.py
python3 design-asset-library/scripts/collect_external_svg_assets.py
python3 -m unittest discover -s design-asset-library/tests
```

## 주의

- `data/asset-registry.json`의 `external_source_candidates`는 검색 시작점이다.
- `data/external-asset-registry.json`의 `collected_assets`는 실제 저장된 외부 SVG다.
- 실제 저장된 외부 SVG라도 public 배포 전에는 source별 `LICENSE`, `SOURCE.json`, attribution 조건을 다시 확인한다.
