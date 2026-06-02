# 디자인 에셋 사용성 확장 스펙

## 목적

디자인 에셋을 많이 보유하는 것에서 끝나지 않고, 사용자가 빠르게 훑고 검색하고 HTML/PPT 산출물에 바로 연결할 수 있는 구조를 만든다.

## 요구사항

- `REQ-WS-082`
- `DAL-REQ-005`

## 범위

- 내부 생성 SVG를 600개로 확장한다.
- 계열별 집계 CLI를 제공한다.
- `family`, `query`, `tag` 기반 검색 CLI를 제공한다.
- 단일 asset id를 HTML `<img>` snippet으로 변환한다.
- 정적 HTML gallery를 생성한다.
- 외부 오픈소스 후보는 registry 후보로만 추가하고 다운로드하지 않는다.

## 비범위

- 외부 SVG 파일 다운로드
- 외부 아이콘 세트의 최종 license 해석 확정
- 웹 서버 기반 asset management UI 구현
- SVG 자체의 고급 디자인 시스템 리브랜딩

## 수용 기준

- `asset-registry.json`에 600개 이상 생성 자산이 기록된다.
- 6개 계열이 각각 100개 자산을 가진다.
- `asset_browser.py search`와 `snippet` 명령이 동작한다.
- `artifacts/html/gallery.html`이 생성된다.
- 단위 테스트와 config contract가 통과한다.
