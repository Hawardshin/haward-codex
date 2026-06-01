# 문서 카테고리와 누락 방지 웹 검색 기록

## 검색 정보

- 날짜: 2026-06-01
- 관련 요청: `UR-2026-06-01-014`
- 작업 모드: `standard`
- 목적: `_docs/`를 종류별로 나누고 누락 방지 검증을 설계하기 위한 문서 정보 구조 근거 확인

## 검색 쿼리

- `documentation information architecture docs folder structure taxonomy technical documentation best practices`
- `Diataxis documentation framework tutorial how-to explanation reference official`
- `technical documentation IA docs taxonomy README index structure best practices`
- `documentation discoverability prevent missing docs governance checklist`
- `Diataxis documentation framework official`
- `Google developer documentation style guide documentation types official`
- `GitLab documentation style guide structure topic types official`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| https://diataxis.fr/ | documentation framework | 문서를 사용자 니즈와 문서 목적에 맞춰 구조화하는 방식 | `_docs` category를 문서 목적별로 나누는 근거 |
| https://docs.gitlab.com/development/documentation/topic_types/ | official docs | concept, task, reference, troubleshooting 등 topic type 구분 | 정책/운영모델/지시/거버넌스 성격 분리의 근거 |
| https://developers.google.com/style/ | official style guide | 기술 문서의 일관된 스타일, 구조, 링크, 제목, 예시 관리 | README index와 registry를 통한 일관성 유지 근거 |

## 약한 출처와 제외

- 일반 SEO 블로그와 vendor 마케팅 글은 구체적인 taxonomy나 검증 규칙보다 홍보성 내용이 많아 주요 근거로 사용하지 않았다.

## 계획 영향

- `_docs/`를 단일 문서 덤프가 아니라 `instructions`, `policies`, `operating-models`, `governance` 카테고리로 분리한다.
- 문서 이동만으로 끝내지 않고 `_docs/registry.json`과 `docs-audit`를 추가해 누락 방지 검증을 반복 가능하게 만든다.
- registry는 self-documenting config 정책에 맞춰 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함한다.

## 불확실성

- Diataxis의 tutorial/how-to/reference/explanation 4분류를 그대로 복사하지 않고, 이 저장소의 운영 문서 성격에 맞춘 4개 카테고리로 변형했다.
- docs-audit의 include pattern은 현재 파일명 관례에 맞춘 것이므로 새 문서 유형이 생기면 registry를 갱신해야 한다.

## 공개 결정 요약

문서 구조는 외부 문서 프레임워크의 목적 기반 분리 원칙을 참고하되, 이 저장소에서는 운영 지시, 실행 정책, 운영 모델, 거버넌스를 별도 category로 관리한다. 누락 방지는 사람이 기억하는 방식이 아니라 registry와 deterministic audit로 검증한다.
