# Web-First Intake Workflow

## Purpose

모든 새 사용자 지시를 웹 검색으로 먼저 확인한 뒤 작업을 시작한다.

## Sequence

1. 사용자 지시를 한 문장으로 요약한다.
2. 웹 검색어를 1개 이상 만든다.
3. 웹 검색을 실행한다.
4. 공식 문서, 1차 출처, 논문, 성숙한 오픈소스, 신뢰 가능한 레퍼런스를 우선 확인한다.
5. 조사나 계획에 영향을 주는 작업이면 [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md)의 출처 묶음 기준을 적용한다.
6. 외국 기술 블로그, 조사 아티클, 오픈소스 repo, LinkedIn/커뮤니티 반응, 좋아요/공유/댓글 같은 현업 신호도 수집하되 단독 사실 근거로 쓰지 않는다.
7. 계획에 영향을 주는 출처는 원문을 열어 확인한다.
8. 검색 결과가 무관하거나 약하면 그 사실을 기록하고 로컬 저장소 검증으로 진행한다.
9. 외부 사실이나 최신 정보가 있으면 확인 날짜와 출처를 기록한다.
10. 검색 결과가 계획을 바꾸면 `research-insight-planner-agent`와 `agent-platform/configs/research/research-agent-profile.json`을 사용하고 계획 히스토리에 남긴다.
11. 출처가 많거나 반복 정리가 필요하면 `_tools/source-collector/`로 출처 묶음을 정규화하고 보고서를 만든다.
12. 재사용 가치가 있는 내용은 `_research/`에 저장한다.
13. 의미 있는 작업이면 `_history/web-searches/YYYY/`에 공개 검색 판단 기록을 저장한다.
14. 이후 [_ops/workflows/00-start-here.md](00-start-here.md)의 저장소 탐색과 구현 단계로 이동한다.

## Search Quality Rules

- 검색 결과 제목만 근거로 사용하지 않는다.
- 공식 문서와 1차 출처를 우선한다.
- 출처가 충돌하면 단정하지 않는다.
- 민감한 프로젝트 정보는 일반화해서 검색한다.
- 웹 검색이 실패하면 실패를 평가 보고서에 남긴다.

## Output

- 검색어
- 확인한 출처
- 출처 유형과 권위/인기도/현업 신호
- 계획에 반영할 인사이트
- 무시한 약한 출처 또는 무관한 결과
- 공개 판단 요약
- `web_search_record_targets`
- 추가 검색 필요 여부

## Related

- [_docs/web-first-work-policy.ko.md](../../_docs/web-first-work-policy.ko.md)
- [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md)
- [_tools/source-collector/README.ko.md](../../_tools/source-collector/README.ko.md)
- [_ops/prompts/05-web-first-intake.md](../prompts/05-web-first-intake.md)
- [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md)
- [_history/web-searches/README.ko.md](../../_history/web-searches/README.ko.md)
