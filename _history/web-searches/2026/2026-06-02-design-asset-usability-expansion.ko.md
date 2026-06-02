# 디자인 에셋 사용성 확장 웹 검색 기록

## 요청

- 디자인 에셋을 계속 많이 유용하게 모으고, 사용자가 쉽게 쓸 수 있는 구조로 확장한다.

## 검색 시각

- 2026-06-02

## 검색어

- `Bootstrap Icons official license SVG MIT`
- `Google Material Symbols official license Apache 2.0 icons`
- `OpenMoji official license CC BY-SA 4.0 SVG emoji`
- `Font Awesome Free official license icons SVG`

## 확인한 출처

| 출처 | URL | 역할 | 반영 |
| --- | --- | --- | --- |
| Bootstrap Icons | https://icons.getbootstrap.com/ | 공식 icon library 후보 | `external_source_candidates`에 후보로 추가. 파일 다운로드 없음. |
| Google Material Symbols | https://fonts.google.com/icons | 공식 icon/source 후보 | `external_source_candidates`에 후보로 추가. 파일 다운로드 없음. |
| OpenMoji | https://openmoji.org/ | open emoji/pictogram 후보 | `external_source_candidates`에 후보로 추가. share-alike/attribution 검토 필요로 기록. |
| Font Awesome Free License | https://fontawesome.com/license/free | icon source license 후보 | `external_source_candidates`에 후보로 추가. per-pack 조건 검토 필요로 기록. |
| Lucide | https://lucide.dev/ | 기존 후보 유지 | 후보 유지. |
| Heroicons | https://heroicons.com/ | 기존 후보 유지 | 후보 유지. |
| Tabler Icons | https://tabler.io/icons | 기존 후보 유지 | 후보 유지. |

## 무시하거나 약하게 본 출처

- third-party icon catalog와 검색 결과 요약은 후보 발견 신호로만 사용했다.
- Reddit/커뮤니티 글은 license 사실의 근거가 아니라 혼동 가능성 신호로만 봤다.

## 계획 반영

- 외부 SVG를 직접 수집하지 않고, 내부 생성 SVG를 600개로 늘린다.
- 외부 후보는 `downloaded=false`로 registry에만 기록한다.
- 사용자는 `gallery.html`, `asset_browser.py search`, `snippet` 흐름으로 바로 쓸 수 있어야 한다.

## 불확실성

- 각 외부 source의 license 조건은 향후 실제 파일 저장 시점에 다시 확인해야 한다.
- 이번 작업은 license 해석을 확정하지 않고, 안전한 후보 registry와 내부 생성 자산 중심으로 구현한다.
