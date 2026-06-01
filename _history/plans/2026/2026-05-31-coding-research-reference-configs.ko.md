# 계획 히스토리: 코딩 조사 참고 설정 파일

## 초기 요청

- "단순하게 하는게 아니라 설정 파일들로 내가 무엇에서 참고하고 있는지 그런거 세팅도 해줘야해."

## 계획 목적

- 코딩 조사가 어떤 출처 레지스트리와 어떤 리서치 프로필을 참고했는지 설정 파일로 남긴다.
- `coding-research-agent`가 그 설정 파일 경로를 입력에 기록하지 않으면 구현 준비 상태로 통과하지 못하게 한다.

## 검색 질문

- 참고 자료와 source metadata는 어떤 형식으로 명시하면 재사용하기 좋은가?
- 설정 기반 registry 패턴을 어떻게 적용할 것인가?

## 검색 채널

- 웹 검색
- 저장소 검색
- 코드 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Zotero Bibliographic Data Formats | https://www.zotero.org/support/dev/data_formats | CSL JSON, BibTeX 같은 reference metadata format 참고 |
| Zotero Item Types and Fields | https://www.zotero.org/support/kb/item_types_and_fields | item type, URL, DOI, accessed date 같은 reference field 모델 참고 |
| Sourcemeta Registry Configuration | https://registry.sourcemeta.com/configuration/ | configuration-driven registry 패턴 참고 |
| 기존 코딩 조사 에이전트 구현 | `agent-platform/src/agent_platform/planning/coding_research.py` | readiness check 추가 위치 |
| 기존 출처 수집 정책 | `_docs/policies/source-collection-policy.ko.md` | source type과 adoption signal 정책 |

## 지식 베이스 검증

- 내부 구현과 정책을 참고하므로 최종 검증에서 `knowledge-skeptic-agent`를 실행한다.

## 도출한 인사이트

- `sources_checked`는 실제 본 출처이고, `source_types`는 출처의 유형이다.
- 사용자가 요구한 “무엇에서 참고하고 있는지 세팅”은 별도의 `reference_config_paths`와 설정 파일이 담당해야 한다.
- 출처 레지스트리는 source type taxonomy와 reference source catalog를 함께 가져야 한다.
- 코딩 조사 프로필은 최소 source coverage와 기본 reference source ids를 지정해야 한다.

## 계획 단계

- `agent-platform/configs/research/source-registry.json`을 추가한다.
- `agent-platform/configs/research/coding-research-profile.json`을 추가한다.
- `CodingResearchInput`에 `reference_config_paths`를 추가한다.
- readiness check에서 `agent-platform/configs/research/` JSON 설정 경로를 요구한다.
- 템플릿, 테스트, 문서, 프롬프트, 워크플로, 지속 지시를 갱신한다.
- 평가 보고서와 히스토리를 저장하고 검증 후 커밋/push한다.

## 제외하거나 보류한 선택지

- Zotero나 CSL JSON 전체 호환 schema를 바로 도입하는 것은 보류했다. 현재는 에이전트 운영에 필요한 source registry와 profile config가 우선이다.

## 위험과 불확실성

- 현재 readiness check는 config 경로가 설정 폴더를 가리키는지만 검증한다. config 내용의 schema 검증은 이후 별도 validator로 승격할 수 있다.

## 검증 방법

- `agent-platform` unit test
- `complete-coding-research` CLI
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- 맵/보드 check와 `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | `reference_config_paths`와 `configs/research/` 설정 파일을 추가하기로 결정 | 참고 기준을 암묵적 문서가 아니라 설정으로 추적하기 위해 |
