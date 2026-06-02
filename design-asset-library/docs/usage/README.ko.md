# SVG 자산 사용법

## 빠른 사용

1. `data/asset-registry.json`에서 `generated_assets`를 검색한다.
2. `family`, `motif`, `tags`로 필요한 자산을 고른다.
3. `path`의 SVG를 HTML, PPT 변환용 HTML, dashboard, prototype에 삽입한다.
4. public 배포 전에는 licensing 문서를 다시 확인한다.

## 계열

- `presentation`: 슬라이드, 발표 흐름, 근거, 메시지 구조
- `interface`: 대시보드, 검색, 설정, 파일, 모니터링 UI
- `workflow`: 파이프라인, 병렬 작업, merge gate, 검증 흐름
- `abstract`: 배경, 분위기, 시각적 리듬
- `status`: ready, blocked, warning, verified 같은 상태 표현
- `pattern`: 패턴 배경과 장식

## 발표 에이전트에서 쓰는 방식

- 발표 에이전트는 필요한 asset query를 먼저 정한다.
- `asset-registry.json`에서 후보를 고른다.
- HTML deck에서는 SVG 파일을 `<img>`로 참조하거나 inline SVG로 삽입한다.
- 디자인 방향이 부족하면 새 motif를 generator에 추가하고 registry를 재생성한다.

## 재생성

```bash
python3 design-asset-library/scripts/generate_svg_assets.py
python3 -m unittest discover -s design-asset-library/tests
```

## 주의

- 외부 후보 source는 바로 쓰는 자산이 아니다.
- `external_source_candidates`는 검색 시작점이며, 파일 저장 전 license review가 필요하다.
