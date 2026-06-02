# 웹 검색 기록: Intent Feature Map UI 부족분 보강

## 쿼리

- `product roadmap dashboard UX feature prioritization source freshness best practices official`
- `Atlassian Jira Product Discovery views audience roadmap permissions official`
- `product roadmap data freshness dashboard change management best practices`

## 확인한 출처

| 출처 | 유형 | 사용한 점 | 한계 |
| --- | --- | --- | --- |
| https://www.atlassian.com/software/jira/product-discovery/guides/views/overview | 공식 제품 가이드 | idea/roadmap view는 대상별 detail과 view 유형을 다르게 구성해야 한다는 점 | Jira Product Discovery 맥락이라 로컬 구현 판단에는 직접 적용하지 않음 |
| https://support.atlassian.com/jira-product-discovery/docs/view-permissions/ | 공식 support 문서 | view 권한과 공개/제한 view가 구분되어야 한다는 점 | Workspace Monitor의 client-side view mode는 보안 경계가 아니므로 customer snapshot redaction으로만 반영 |
| https://wac-cdn-a.atlassian.com/software/jira/product-discovery/guides/getting-started/introduction | 공식 제품 소개 | ongoing discovery는 feedback/data를 계속 수집해 roadmap에 반영해야 한다는 점 | 개념 참고용 |

## 계획 영향

- 특정 날짜 파일 하드코딩을 제거하고 최신 의도-기능 지도 파일을 자동 선택한다.
- UI에 source date와 사용 가능한 map 수를 노출한다.
- customer snapshot redaction과 developer snapshot 상태를 별도 검사 명령으로 확인한다.

## 공개 결정 요약

내부 의도 맵은 developer/superadmin용 최신 source-of-truth로 유지하고, customer snapshot에서는 계속 비운다.

