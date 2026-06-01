# Human-Like Source Discovery Workflow

## Purpose

웹 검색을 사람이 실제로 조사하듯 더 넓고 깊게 수행한다. 같은 키워드를 반복하지 않고 query ladder, 검색 연산자, source lane, snowballing, source triage, selective summary capture를 사용한다.

## Use When

- 사용자가 “웹검색을 더 잘해야 한다”, “더 많은 소스를 찾아라”, “좋은 것은 요약하라”처럼 조사 품질을 높이라고 요청한다.
- 계획, 요구사항, 아키텍처, 시장 조사, 딥리서치, 코딩 조사, 발표/디자인 레퍼런스 수집이 외부 근거에 의존한다.
- 좋은 출처가 다음 작업에서도 재사용될 가능성이 있다.

## Sequence

1. [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md)를 먼저 실행한다.
2. `agent-platform/configs/research/human-search-profile.json`을 열고 적용 깊이를 정한다.
3. `_tools/source-collector/`의 `query-plan` 명령으로 seed, synonym, operator, source-lane, community, contrary, snowballing 검색 계획을 만든다.
4. `agent-platform/configs/research/source-discovery-registry.json`에서 실제 search-origin source group을 고른다.
5. 공식/1차 출처, 논문/표준, 오픈소스/구현, 기술 블로그/분석, 커뮤니티/소셜, 반대/실패 사례를 분리해서 검색한다.
6. 강한 seed source 3-5개를 고르고 reference, cited-by, author, repository, issue, related-paper, talk, dataset을 따라간다.
7. 출처를 ranking하고 약한 출처, 광고성 출처, 날짜가 불명확한 출처, 방법론이 없는 숫자는 제외하거나 낮은 등급으로 기록한다.
8. 계획이나 답변을 바꾸는 좋은 출처만 `_research/` 또는 프로젝트 docs에 짧게 요약한다.
9. `_history/web-searches/YYYY/`에 검색어, 확인 출처, 제외 출처, plan impact, uncertainty, public decision summary를 남긴다.
10. 의미 있는 작업이면 평가 입력에 `source_provenance_targets`, `plan_evidence_targets`, `web_search_record_targets`를 연결한다.

## Commands

```bash
python3 _tools/source-collector/src/source_collector.py query-plan "topic" --depth deep --output /tmp/query-plan.md --json-output /tmp/query-plan.json
python3 _tools/source-collector/src/source_collector.py report /tmp/source-bundle.json --output /tmp/source-report.md --json-output /tmp/source-report.json
```

## Output

- query ladder 또는 source collector query-plan
- 확인한 source lane과 부족한 lane
- snowballing seed와 따라간 링크
- 좋은 출처 요약 대상과 저장 위치
- 제외한 약한 출처와 이유
- web search record target

## Related

- [Human Search Profile](../../agent-platform/configs/research/human-search-profile.json)
- [Source Discovery Registry](../../agent-platform/configs/research/source-discovery-registry.json)
- [_tools/source-collector/README.ko.md](../../_tools/source-collector/README.ko.md)
- [_ops/prompts/84-human-like-source-discovery.md](../prompts/84-human-like-source-discovery.md)
