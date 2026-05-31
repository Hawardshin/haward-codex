# 참고 출처 설정 파일 레퍼런스

## 목적

코딩 조사에서 어떤 기준과 어떤 reference source catalog를 참고했는지 설정 파일로 남기기 위한 참고 자료를 정리한다.

## 접근일

- 2026-05-31

## 확인한 출처

| 출처 | 유형 | 핵심 참고점 | 적용 |
| --- | --- | --- | --- |
| Zotero Bibliographic Data Formats: https://www.zotero.org/support/dev/data_formats | 공식 문서 | Zotero는 BibTeX, CSL JSON, RIS 같은 여러 bibliographic data format을 다룬다. | reference source catalog가 export/import 가능한 metadata 구조로 발전할 수 있다는 방향을 확인했다. |
| Zotero Item Types and Fields: https://www.zotero.org/support/kb/item_types_and_fields | 공식 문서 | reference item은 item type, title, date, DOI, URL, accessed date 같은 필드를 갖는다. | `source-registry.json`에 title, URL/path, source_type, last_checked, used_for를 둔다. |
| Sourcemeta Registry Configuration: https://registry.sourcemeta.com/configuration/ | 공식 문서 | registry 동작을 설정 파일 중심으로 관리하는 패턴을 보여준다. | `agent-platform/configs/research/` 아래 source registry와 profile config를 둔다. |

## 인사이트

- 출처 목록은 문서에만 흩어두면 재사용하기 어렵다.
- 실제 참고한 출처는 `sources_checked`, 출처 범주는 `source_types`, 참고 기준 설정은 `reference_config_paths`로 나누어야 한다.
- 지금은 CSL JSON 전체 호환보다 에이전트 운영에 필요한 source registry와 profile config가 우선이다.

## 적용 결과

- `agent-platform/configs/research/source-registry.json` 추가
- `agent-platform/configs/research/coding-research-profile.json` 추가
- `coding-research-agent` 입력에 `reference_config_paths` 추가
- readiness check에서 `agent-platform/configs/research/` JSON 경로를 요구하도록 강화
