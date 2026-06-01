# 작업 평가: 대기업/고신뢰 출처 registry

## 초기 지시

대기업과 높은 수준의 사이트 목록은 따로 관리한다.

## 결과 요약

- `agent-platform/configs/research/enterprise-source-registry.json`을 별도 기계 판독 seed list로 추가했다.
- `_research/source-lists/enterprise-high-quality-sites.ko.md`와 영어 companion을 추가했다.
- `_docs/policies/enterprise-source-list-policy.ko.md`와 영어 companion을 추가했다.
- source collection, research insight planning, coding research, prompt, persistent instructions, memory bootstrap, planning template, requirements, spec, request summary, request trace, work summary, coordination board를 갱신했다.

## 평가 결과

- 상태: `ready_to_close`
- 초기 지시와 결과 차이: 없음
- 남은 gap: 없음
- 개선 아이디어: 목록 유지보수가 반복되면 source-collector나 RSS/discovery 도구를 확장해 후보 출처와 `last_checked` 갱신을 자동화한다.

## 확인한 레퍼런스

- Meta Engineering: https://engineering.fb.com/
- Netflix TechBlog: https://netflixtechblog.com/
- Stripe Engineering: https://stripe.com/blog/engineering
- GitHub Engineering: https://github.blog/engineering/
- Cloudflare Blog: https://blog.cloudflare.com/
- Uber Engineering: https://www.uber.com/blog/engineering/
- AWS Architecture Center: https://aws.amazon.com/architecture/
- AWS Architecture Blog: https://aws.amazon.com/blogs/architecture/
- Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Google Cloud Architecture Framework: https://cloud.google.com/architecture/framework
- Google Research Blog: https://research.google/blog/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- OpenAI Research: https://openai.com/science/
- Anthropic Research: https://www.anthropic.com/research

## 검증

- `python3 -m json.tool` for changed JSON configs and temp evaluation inputs: 통과
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 61 tests 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/enterprise-source-registry-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/enterprise-source-registry-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/enterprise-source-registry-eval.json`: `ready_to_close`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: 통과
- `python3 _tools/task-board/src/task_board.py --check`: 통과
- `git diff --check`: 통과

## 결론

요구사항은 반영됐다. 앞으로 대기업/고신뢰 출처는 일반 source taxonomy와 섞지 않고 `enterprise-source-registry.json`과 `_research/source-lists/`에서 별도로 관리한다. 이 registry는 증거가 아니라 조사 시작점이므로, 실제 인용 전에는 항상 정확한 원문 페이지를 다시 확인해야 한다.
