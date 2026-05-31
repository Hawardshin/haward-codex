# 작업 평가: 출처 discovery, provenance, 한국 로컬 리뷰

## 결과

- 상태: `ready_to_close`
- 재작업 필요: 없음
- 평가 입력: `/private/tmp/source-discovery-provenance-eval.json`

## 완료 요약

- `source-discovery-registry.json`을 추가해 세계 기술 블로그, 한국 빅테크 기술 블로그, 인도 기술 소스, 논문 검색 원천, 한국 로컬 리뷰 채널을 한 설정에서 찾을 수 있게 했다.
- `research-insight-planner-agent`, `coding-research-agent`, `work-evaluator-agent` 계약에 `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets`를 추가했다.
- `_tools/korean-local-review/`를 추가해 한국 사용자 기준으로 Naver/Kakao/Naver Blog/Search 후보를 계획하고 점수화할 수 있게 했다.
- `_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md`에 현재 구조에서 겹치는 계층과 의도된 책임 분리를 정리했다.

## 확인한 주요 근거

- NAVER Search API: https://developers.naver.com/products/service-api/search/search.md
- NAVER Blog Search API: https://developers.naver.com/docs/serviceapi/search/blog/blog.md
- Kakao Local API: https://developers.kakao.com/docs/ko/local/dev-guide
- NAVER D2: https://d2.naver.com/home
- Kakao Tech: https://tech.kakao.com/
- LINE Engineering: https://engineering.linecorp.com/ko/
- Toss Tech: https://toss.tech/
- OpenAlex Works API: https://docs.openalex.org/api-entities/works
- Semantic Scholar API: https://www.semanticscholar.org/product/api
- arXiv API: https://info.arxiv.org/help/api/index.html
- Papers with Code: https://paperswithcode.com/

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests`: `67 tests`, `OK`
- `python3 -m unittest discover -s _tools/korean-local-review/tests`: `3 tests`, `OK`
- `python3 -m unittest discover -s _tools/source-collector/tests`: `4 tests`, `OK`
- `check-config-contract`: `self_documenting`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `plan-from-research`: `ready_to_plan`
- `complete-coding-research`: `ready_to_implement`
- `validate-knowledge`: `ready_to_reference`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- `git diff --check`: `OK`

## 남은 제한과 개선점

- Naver/Kakao API credentials가 설정되어 있지 않아 live fetch는 실행하지 않았다. 도구는 credentials가 없으면 `missing_credentials`를 반환한다.
- 실제 API 키를 설정해 반복 사용이 생기면 credential 사용 기록과 live-fetch 검증 기록을 추가한다.
- 무관한 로컬 `a.txt` 삭제는 이번 커밋 범위에 포함하지 않는다.
