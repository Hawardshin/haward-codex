# SVG 에셋 라이브러리 사용

발표 에이전트는 새 디자인 요소가 필요할 때 먼저 `design-asset-library/`를 확인한다.

## 기본 순서

1. 발표의 필요한 시각 역할을 정한다.
2. `design-asset-library/artifacts/html/gallery.html`에서 전체 분위기를 빠르게 훑는다.
3. `design-asset-library/scripts/asset_browser.py search`로 `family`, `query`, `tag` 후보를 좁힌다.
4. `snippet` 명령으로 `<img>` 코드를 만들거나 SVG를 inline으로 삽입한다.
5. 원하는 자산이 없으면 `design-asset-library/scripts/generate_svg_assets.py`에 motif를 추가하고 registry를 재생성한다.
6. 외부 SVG가 필요하면 `external_source_candidates`를 조사하되, 실제 파일 저장 전 license review를 남긴다.

## 빠른 명령

```bash
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
```

## 금지하지 않고 대신 해야 할 것

- 외부 asset을 바로 복사하지 말고, source URL/license/access date/attribution/public-use constraint를 먼저 기록한다.
- PPT나 HTML에서 디자인 무드만 맞추려면 내부 생성 SVG를 색상/크기/배치로 조합한다.
