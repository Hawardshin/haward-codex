# 웹 검색 기록: Intent Feature Map UI

## 쿼리

- `roadmap feature map dashboard UX best practices official product management`
- `Atlassian roadmap Now Next Later feature map user feedback product discovery`
- `dashboard information architecture roadmap feature prioritization UX research`
- `Atlassian Now Next Later roadmap user feedback product roadmap official`
- `Atlassian product roadmap guide Now Next Later official`

## 확인한 출처

| 출처 | 유형 | 사용한 점 | 신뢰도/한계 |
| --- | --- | --- | --- |
| https://www.atlassian.com/agile/product-management/roadmaps | 공식 product management guide | roadmap은 전략/일상 작업 context를 주고, customer feedback/insight/engineering constraints를 반영하며, Now/Next/Later로 priority conversation을 유지할 수 있다는 점 | vendor guide라 일반 원칙 참고로만 사용 |
| https://community.atlassian.com/learning/lesson/how-to-create-a-roadmap-in-jira-product-discovery | Atlassian learning | now/next/later로 계획을 이해하기 쉽게 보여주고, 대상별 detail 수준을 조정한다는 점 | Jira Product Discovery 맥락이므로 구현 상세는 로컬 UI에 맞춤 |
| https://www.atlassian.com/software/jira/product-discovery/guides/views/overview | Atlassian product guide | idea list, board, matrix, timeline view가 audience/detail에 따라 달라져야 한다는 점 | 특정 제품 기능 설명이라 개념 참고에 제한 |

## 약한 출처 또는 사용하지 않은 출처

- Reddit/커뮤니티 신호는 채택/문제 발견 신호로만 보고 구현 근거로 사용하지 않았다.
- 비공식 now/next/later 블로그는 공식 Atlassian 자료로 충분해 이번 plan evidence에서는 제외했다.

## 계획 영향

- `Intent Feature Map UI`는 날짜 약속보다 `Now/Next/Later` priority surface로 노출한다.
- 개발자/슈퍼어드민 view에서 내부 의도 맵을 보이게 하고 customer snapshot은 비운다.
- Overview에는 압축 요약을, 전용 탭에는 전체 테마와 roadmap을 배치한다.

## 불확실성

- 외부 자료는 일반적인 roadmap UX 참고일 뿐 이 플랫폼의 우선순위 자체를 결정하지 않는다.
- 최종 우선순위는 `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md`와 사용자 철학/설치형 고객 경계를 기준으로 한다.

## 공개 결정 요약

의도 기반 기능 지도는 내부 운영 산출물이므로 developer/superadmin view에 표시하고, 고객 설치용 snapshot에서는 내부 히스토리와 동일하게 제거한다.

