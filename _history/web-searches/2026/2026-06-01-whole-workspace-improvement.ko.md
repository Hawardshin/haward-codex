# 웹 검색 기록: 전체 Workspace 개선

## 검색 정보

- 날짜: 2026-06-01
- 관련 요청: `UR-2026-06-01-016`
- 작업 모드: `governance`
- 목적: 전체 저장소 구조, navigation, 결정 기록, health check 개선 방향의 외부 근거 확인

## 검색 쿼리

- `monorepo documentation structure best practices navigation governance`
- `software architecture documentation decision records repository structure best practices`
- `Diataxis documentation framework reference explanation how-to tutorial documentation structure`
- `repository health checklist documentation tests CI governance best practices`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| https://diataxis.fr/ | documentation framework | 문서 목적을 tutorial/how-to/reference/explanation으로 분리해 탐색 목적을 명확히 하는 접근 | 전체를 한 번에 재구성하기보다 navigation 목적과 검증 목적을 분리 |
| https://docs.cloud.google.com/architecture/architecture-decision-records | official docs | ADR은 timestamp와 source control 기반 기록으로 결정 맥락을 남길 수 있음 | 요구사항 변경, plan, traceability를 남김 |
| https://learn.microsoft.com/en-ie/azure/well-architected/architect-role/architecture-decision-record | official docs | 결정은 독립적으로 이해될 수 있어야 하고 보조 자료는 link로 연결 | 요구사항/스펙/평가 파일이 각각 source와 결과를 연결하도록 구성 |
| https://mitlibraries.github.io/guides/misc/adr.html | institutional guide | 중요한 기술 결정은 repository의 docs 위치에 기록하고 관련 요구사항/가정/문서를 연결 | navigation 개선을 spec과 traceability에 연결 |
| https://nix.dev/contributing/documentation/diataxis | project docs | reference 문서는 scan/random access에 최적화되어야 함 | `repository-map.md` root folder table에 class/source column 추가 |

## 약한 출처와 제외

- 일반 블로그의 repository checklist는 참고 수준으로만 보았다.
- Reddit 의견은 broad signal로 볼 수 있지만 이번 변경의 직접 근거는 공식/기관 문서와 기존 repository source-of-truth로 제한했다.

## 계획 영향

- “모든 것”을 한 번에 재작성하지 않고, 전체 구조를 더 잘 볼 수 있게 하는 map 품질과 전체 검증 entrypoint를 먼저 개선한다.
- `workspace-index`는 `_ops/projects/root-structure-policy.json`과 `_ops/projects/registry.json`을 읽어 root folder class/purpose/source를 표시한다.
- 새 `workspace-health` 도구는 docs audit, structure audit, map freshness, board freshness, memory/config checks, 프로젝트 테스트, 도구 테스트, optional build를 묶는다.

## 불확실성

- 전체 개선은 지속적인 일이라 이번 변경은 navigation/health foundation에 한정한다.
- 더 큰 구조 재편은 실제 사용 중 반복되는 friction을 확인한 뒤 별도 요구사항으로 분리한다.

## 공개 결정 요약

전체 개선의 1차 결과는 source-of-truth 기반 repository map과 한 번에 실행 가능한 workspace health command로 만든다.
