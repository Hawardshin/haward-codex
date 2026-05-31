# 리서치 설정

이 폴더는 에이전트가 어떤 출처 기준과 어떤 참고 자료를 사용했는지 추적하기 위한 설정 파일을 둔다.

## 파일

- `source-registry.json`: 출처 유형 taxonomy와 재사용 reference source catalog
- `coding-research-profile.json`: `coding-research-agent`가 구현 전 조사에서 사용하는 기본 source coverage profile

## 사용 규칙

- 코딩 조사 입력에는 `reference_config_paths`를 포함한다.
- 최소 하나의 경로는 `agent-platform/configs/research/` 아래 JSON 설정이어야 한다.
- `source_types`는 `source-registry.json`의 source type을 사용한다.
- 외부 reference source는 `last_checked`를 갱신하거나 새 config 항목으로 추가한다.
- 내부 지식 베이스 항목은 `knowledge-skeptic-agent` 검증 후 근거로 사용한다.
- 공유 설정 파일은 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함해야 한다.
- 설정을 바꾼 뒤 `check-config-contract`로 파일 내부 설명이 충분한지 확인한다.

## 기본 입력 예

```json
{
  "reference_config_paths": [
    "agent-platform/configs/research/source-registry.json",
    "agent-platform/configs/research/coding-research-profile.json"
  ],
  "source_types": [
    "official",
    "open_source",
    "tech_blog",
    "community"
  ]
}
```
