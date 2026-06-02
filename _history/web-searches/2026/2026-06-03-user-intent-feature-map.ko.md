# 웹 검색 기록: 사용자 의도 기반 기능 지도

## 검색 목적

- 히스토리의 사용자 의도를 기능군과 roadmap 후보로 정리할 때, feature request/backlog/roadmap 정리 방식의 외부 기준을 참고한다.

## 검색

| Query | 확인한 출처 | 계획 영향 |
| --- | --- | --- |
| `product management user intent to feature mapping roadmap best practices official guidance` | Atlassian backlog/roadmap 자료 | 의도와 기능을 backlog/epic/roadmap 후보로 나눠 정리한다. |
| `Nielsen Norman Group user needs feature prioritization roadmap research` | 검색 결과 중 직접 사용한 강한 출처 없음 | 외부 UX 기준은 이번 정리에서 보조로만 둔다. |
| `Atlassian product roadmap user feedback feature prioritization guide` | Atlassian feature request, roadmap, prioritization 자료 | Now/Next/Later와 feedback-to-roadmap 연결 방식을 참고한다. |

## 사용한 출처

| Source | Access date | Reliability | Used for |
| --- | --- | --- | --- |
| https://www.atlassian.com/agile/backlogs | 2026-06-03 | vendor guidance | roadmap initiative, epic, requirement, user story로 쪼개는 방식 |
| https://www.atlassian.com/agile/product-management/roadmaps | 2026-06-03 | vendor guidance | Now/Next/Later로 우선순위 대화를 정리하는 방식 |
| https://www.atlassian.com/agile/product-management/feature-request | 2026-06-03 | vendor guidance | feature request를 문제, 맥락, 이점과 연결하는 방식 |

## 약한 출처/제외

- Reddit, 일반 블로그, PDF 후보는 이번 기능 지도에서 factual basis로 사용하지 않았다.
- 외부 자료는 정리 프레임 참고용이다. 레포 기능 상태와 남은 blocker는 로컬 히스토리와 검증 기록을 기준으로 했다.

## 결정

- 기능 지도는 `의도 → 기능군 → 이미 구현된 핵심 기능 → 다음 기능 후보` 형태로 작성한다.
- 대규모 히스토리 작업이므로 모든 파일 원문을 읽지 않고, user request summaries, work summaries, representative registries/specs를 대표 입력으로 사용한다.
