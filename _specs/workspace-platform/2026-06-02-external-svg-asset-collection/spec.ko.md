# 외부 SVG 실제 수집 스펙

## 목적

실제로 사용할 수 있는 외부 오픈소스 SVG 파일을 많이 수집하되, 공식 source, pinned commit, license/provenance 기록, path allowlist로 관리한다.

## 요구사항

- `REQ-WS-083`
- `DAL-REQ-006`

## 범위

- Lucide, Heroicons, Bootstrap Icons, Tabler Icons에서 실제 SVG 파일을 수집한다.
- 각 source는 공식 GitHub repository와 pinned commit archive만 사용한다.
- 각 source 폴더에 `LICENSE`와 `SOURCE.json`을 저장한다.
- 실제 수집 registry를 `design-asset-library/data/external-asset-registry.json`에 만든다.
- 외부 수집 갤러리를 `design-asset-library/artifacts/html/external-gallery.html`로 생성한다.
- 기존 `asset_browser.py`가 `collected_assets`도 검색하도록 확장한다.

## 비범위

- Google Material Symbols, OpenMoji, Font Awesome Free의 실제 파일 수집
- 유료/상용/브랜드 asset 수집
- 모든 source의 전체 파일 무제한 수집
- public 배포 license 최종 법률 판단

## 수용 기준

- 실제 외부 SVG 3,000개 이상이 저장된다.
- 각 source는 local `LICENSE`와 `SOURCE.json`을 가진다.
- registry가 self-documenting config contract를 통과한다.
- 외부 SVG path가 존재하고 XML parse 된다.
- 외부 gallery가 생성되고 대표 이미지가 브라우저에서 로드된다.
