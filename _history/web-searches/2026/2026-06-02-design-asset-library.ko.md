# 디자인 에셋 라이브러리 웹 검색 기록

## 요청

- `UR-2026-06-02-041`
- 사용자는 불법 다운로드가 아니라, 유사한 SVG 파일을 많이 미리 모아두고 사용하는 구조를 요청했다.

## 검색 시각

- 2026-06-02

## 검색어

- `open source SVG illustration library license unDraw lucide heroicons official license`
- `SVG icon library open source MIT license official lucide heroicons tabler icons`
- `design assets license SVG templates open source official documentation`
- `site:lucide.dev license lucide icons`
- `site:heroicons.com license heroicons MIT`
- `site:tabler.io icons license MIT`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 사용 |
| --- | --- | --- | --- |
| Lucide License | 공식 문서 | Lucide는 license 페이지에서 ISC License를 표시하고 일부 Feather 유래 아이콘은 MIT License 내용을 함께 제공한다. | 오픈소스 후보 registry와 license review seed |
| Heroicons | 공식 사이트 | Heroicons는 SVG icons, 316 icons, MIT license를 첫 화면에 표시한다. | 외부 후보 registry |
| Tabler Icons | 공식 사이트 | Tabler Icons는 6100+ SVG icons, MIT License, personal/commercial license를 표시한다. | 외부 후보 registry |

## 계획 영향

- 외부 SVG를 직접 다운로드하지 않고 `external_source_candidates`에만 기록한다.
- 기본 사용 자산은 내부 generator로 만든 SVG로 둔다.
- public 배포 전 license 확정은 별도 owner confirmation으로 남긴다.
- registry에 source provenance와 license status를 남긴다.

## 약한 출처 처리

- 일반 블로그와 에셋 모음 사이트는 다운로드 유도 가능성이 높아 이번 구현의 근거로 사용하지 않았다.
- marketplace나 유료 템플릿 페이지는 사용하지 않았다.

## 공개 판단 요약

- 합법성과 재사용성을 동시에 만족하려면 “내부 생성 SVG는 즉시 사용”, “외부 오픈소스는 후보로 기록 후 license review 뒤 저장” 구조가 적합하다.
