# 출처 수집 정책

## 목적

웹 검색을 할 때 단순히 검색 결과 몇 개를 보는 데서 끝내지 않고, 공신력 높은 자료와 현업 신호를 최대한 폭넓게 모아 판단 품질을 높인다.

이 정책은 [_docs/web-first-work-policy.ko.md](web-first-work-policy.ko.md)의 후속 규칙이다. 모든 새 지시는 웹 검색으로 시작하고, 필요한 경우 이 문서의 출처 수집 기준으로 검색 깊이를 넓힌다.

## 우선 수집할 출처

| 우선순위 | 출처 유형 | 예시 | 사용 방식 |
| --- | --- | --- | --- |
| 1 | 공식/1차 출처 | 공식 문서, 표준, RFC, 제품 블로그, 릴리스 노트, API 문서 | 사실 확인의 1차 근거 |
| 2 | 논문/학술 자료 | arXiv, ACL, NeurIPS, ACM, IEEE, 학술 PDF | 방법론, 성능, 한계 근거 |
| 3 | 오픈소스 원천 | GitHub repo, issue, PR, release, README, docs | 실제 구현과 유지보수 상태 확인 |
| 4 | 외국 기술 블로그 | engineering blog, architecture post, incident review, benchmark write-up | 현업 적용 방식과 tradeoff 탐색 |
| 5 | 조사/분석 아티클 | industry report, survey, benchmark article, long-form analysis | 시장/사례/비교 관점 |
| 6 | 커뮤니티 신호 | Hacker News, Reddit, Stack Overflow, GitHub stars, article likes/bookmarks | 발견과 반대 신호 탐색 |
| 7 | 소셜/전문가 신호 | LinkedIn posts, author profiles, conference talks, newsletters | 실무자 반응과 adoption 신호 |

## 수집 원칙

- 공식/1차 출처를 먼저 확인한다.
- 논문과 기술 블로그를 함께 본다. 논문은 엄밀성, 블로그는 실제 적용과 제약을 보완한다.
- 외국 기술 블로그와 해외 아티클을 적극 포함한다.
- 좋아요 수, 공유 수, 댓글 수, GitHub stars, Hacker News 점수, LinkedIn 반응은 "인기도/확산 신호"로 기록하되 사실 근거로 단독 사용하지 않는다.
- LinkedIn 글은 저자, 소속, 날짜, 반응, 원문 링크를 확인하고 1차 근거로 격상하지 않는다.
- 조사 아티클은 방법론, 데이터 출처, 후원/광고 여부를 확인한다.
- 검색 결과 제목만 근거로 쓰지 않고 원문을 확인한다.
- 서로 충돌하는 출처는 둘 다 기록하고 결론을 보류하거나 조건부로 쓴다.

## 출처 묶음 기준

작업이 조사나 계획에 영향을 주면 가능한 한 다음 묶음을 모은다.

- 공식/1차 출처 1개 이상
- 논문 또는 표준/기술 보고서 1개 이상
- 외국 기술 블로그나 실무 사례 2개 이상
- 오픈소스 repo 또는 실제 구현 사례 1개 이상
- 커뮤니티/소셜 신호 1개 이상
- 반대 의견이나 실패 사례 1개 이상

단순 로컬 작업에서는 이 기준을 모두 채우지 않아도 된다. 다만 웹 검색을 먼저 수행하고, 무관하면 그 사실을 기록한다.

반복적으로 많은 출처를 수집하거나 보고서로 정리해야 하면 `_tools/source-collector/`를 사용한다.

코딩 조사는 조사 완료 전에 `coding-research-agent`로 출처, 선택지, 추천안, 위험, 검증 계획, 표준 종료 질문을 함께 확인한다.

## 평가 기준

- 권위: 저자와 발행 주체가 신뢰할 만한가?
- 정확성: 근거, 데이터, 코드, 인용이 있는가?
- 최신성: 현재 작업에 맞는 날짜인가?
- 관련성: 지금 결정에 직접 영향을 주는가?
- 독립성: 서로 독립된 출처인가?
- 투명성: 방법론, 한계, 이해관계가 드러나는가?
- 현업 신호: 실제 사용, 토론, 반응, 유지보수 흔적이 있는가?

## 기록 형식

리서치 노트나 평가 보고서에는 다음을 남긴다.

- URL 또는 경로
- 출처 유형
- 접근일
- 핵심 claim
- 신뢰도 판단
- 인기도/현업 신호
- 반대 신호
- 현재 계획에 미친 영향

## 자동화 도구

```bash
python3 _tools/source-collector/src/source_collector.py init /tmp/source-bundle.json --topic "topic" --purpose "purpose" --access-date YYYY-MM-DD
python3 _tools/source-collector/src/source_collector.py report /tmp/source-bundle.json --output /tmp/source-report.md --json-output /tmp/source-report.json
python3 _tools/source-collector/src/source_collector.py check /tmp/source-bundle.json --strict
```

## 관련 파일

- [_tools/source-collector/README.ko.md](../_tools/source-collector/README.ko.md)
- [_ops/workflows/05-web-first-intake.md](../_ops/workflows/05-web-first-intake.md)
- [_ops/workflows/55-research-insight-planning.md](../_ops/workflows/55-research-insight-planning.md)
- [_ops/workflows/56-coding-research.md](../_ops/workflows/56-coding-research.md)
- [_research/topics/agent-planning/2026-05-31-source-collection-policy.ko.md](../_research/topics/agent-planning/2026-05-31-source-collection-policy.ko.md)
