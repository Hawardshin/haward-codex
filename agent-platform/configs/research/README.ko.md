# 리서치 설정

이 폴더는 에이전트가 어떤 출처 기준과 어떤 참고 자료를 사용했는지 추적하기 위한 설정 파일을 둔다.

## 파일

- `source-registry.json`: 출처 유형 taxonomy와 재사용 reference source catalog
- `enterprise-source-registry.json`: 대기업 엔지니어링, 공식 연구소, architecture center, 고신뢰 독립 자료의 별도 seed list
- `research-agent-profile.json`: Perplexity식 answer engine 구조를 따르는 핵심 조사 에이전트 profile
- `coding-research-profile.json`: `coding-research-agent`가 구현 전 조사에서 사용하는 기본 source coverage profile

## 사용 규칙

- 코딩 조사 입력에는 `reference_config_paths`를 포함한다.
- 일반 조사/계획 입력에는 `research_profile_paths`를 포함하고 기본값으로 `research-agent-profile.json`을 기록한다.
- 최소 하나의 경로는 `agent-platform/configs/research/` 아래 JSON 설정이어야 한다.
- `source_types`는 `source-registry.json`의 source type을 사용한다.
- 대기업/고신뢰 출처를 조사 시작점으로 쓰면 `enterprise-source-registry.json`도 `research_profile_paths` 또는 `reference_config_paths`에 기록한다.
- 일반 조사에는 `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, `skeptic_review` 단계와 citation 요구사항을 남긴다.
- 소스 코드 구현 전에는 `code_reference_sources`와 `code_reference_notes`로 참고한 오픈소스 구조, 참고 구현, 실제 코드, 테스트에서 배운 점을 기록한다.
- 외부 reference source는 `last_checked`를 갱신하거나 새 config 항목으로 추가한다.
- 내부 지식 베이스 항목은 `knowledge-skeptic-agent` 검증 후 근거로 사용한다.
- 공유 설정 파일은 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함해야 한다.
- 설정을 바꾼 뒤 `check-config-contract`로 파일 내부 설명이 충분한지 확인한다.

## 기본 입력 예

```json
{
  "research_profile_paths": [
    "agent-platform/configs/research/research-agent-profile.json",
    "agent-platform/configs/research/source-registry.json"
  ],
  "answer_engine_stages": [
    "query_understanding",
    "search_retrieval",
    "source_ranking",
    "evidence_extraction",
    "synthesis",
    "citation_grounding",
    "skeptic_review"
  ],
  "citation_requirements": [
    "중요 사실 주장은 확인된 출처와 연결한다."
  ],
  "reference_config_paths": [
    "agent-platform/configs/research/source-registry.json",
    "agent-platform/configs/research/enterprise-source-registry.json",
    "agent-platform/configs/research/coding-research-profile.json"
  ],
  "source_types": [
    "official",
    "open_source",
    "reference_implementation",
    "tech_blog",
    "community"
  ],
  "code_reference_sources": [
    "https://github.com/example/project/tree/main/src",
    "https://github.com/example/project/tree/main/tests"
  ],
  "code_reference_notes": [
    "참고한 저장소 구조, 모듈 경계, 테스트, 예외 처리, API 사용 패턴"
  ]
}
```
