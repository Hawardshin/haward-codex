# 사람형 웹 검색 개선 요약

## 목적

웹 검색을 단순한 한 번의 키워드 검색이 아니라 사람이 실제로 조사하듯 반복 확장한다. 핵심은 `검색어 확장 -> 연산자 검색 -> source lane 분리 -> 강한 seed에서 snowballing -> 좋은 출처만 요약`이다.

## 확인한 외부 레퍼런스

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Google Search Help: https://support.google.com/websearch/answer/2466433 | official | 정확한 구문, 제외, site 제한 같은 검색 refinement를 제공한다. | `human-search-profile.json`의 operator search 근거 |
| Google Search Central: https://developers.google.com/search/docs/monitor-debug/search-operators | official | `site:` 등 검색 연산자 사용과 한계를 설명한다. | operator는 목적이 있을 때만 사용하도록 규칙화 |
| Cochrane Handbook Chapter 4: https://training.cochrane.org/handbook/current/chapter-04 | standard | 체계적 검색은 여러 데이터베이스/원천과 기록 가능한 검색 전략이 필요하다. | source lane과 search record discipline에 반영 |
| PRISMA-S: https://www.prisma-statement.org/prisma-s/ | standard | 검색 전략 보고와 재현 가능한 검색 기록의 중요성을 강조한다. | web search record와 query ladder 기록에 반영 |
| Wohlin snowballing paper: https://www.wohlin.eu/ease14.pdf | paper | seed 논문에서 backward/forward snowballing으로 관련 연구를 확장한다. | strong seed 기반 snowballing 규칙에 반영 |
| SIFT/lateral reading: https://hapgood.us/2019/06/19/sift-the-four-moves/ | analysis | unfamiliar source는 출처 자체의 맥락을 옆으로 읽어 확인한다. | source triage에서 저자/발행자/이해관계 확인에 반영 |

## 설계 결정

- 검색 원천 목록은 `source-discovery-registry.json`에 둔다.
- 검색 방법 자체는 새 `human-search-profile.json`에 둔다.
- 반복 실행용 도구는 `_tools/source-collector/`에 `query-plan` 명령으로 추가한다.
- 좋은 출처 요약은 무조건 많이 저장하지 않고, 답변/계획/위험/재사용 가치가 있을 때만 저장한다.

## 재사용 규칙

- 연구/거버넌스 작업: 최소 seed, synonym, operator, source-lane, contrary 검색을 수행한다.
- 딥리서치: strong seed 3-5개를 고른 뒤 reference/cited-by/author/repository/talk/dataset을 따라간다.
- 커뮤니티/소셜 반응은 adoption signal이며 사실 증명으로 쓰지 않는다.
- 요약에는 URL, 접근일, source type, key claim, reliability, limitation, plan impact를 남긴다.
