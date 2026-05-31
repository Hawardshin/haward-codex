# 평가: 유지보수 가능한 언어/아키텍처/폴더 결정

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요구사항: `REQ-WS-022`
- 설치 발생: 없음
- 스킬 작업: 없음

## 완료 요약

- `coding-research-agent`가 구현 전 언어/런타임 후보, 선택 언어, 언어 선택 근거를 요구하도록 확장했다.
- 아키텍처 근거를 이론/프레임워크와 실무자 의견으로 분리하고, trade-off notes를 요구하도록 했다.
- 폴더 구조 후보, 선택 근거, 폴더 의미, 유지보수 근거를 구현 준비 조건에 추가했다.
- 템플릿, 연구 프로필, 문서, 프롬프트, 요구사항, 스펙, 리서치 노트, 조율 보드를 갱신했다.

## 확인한 레퍼런스

- Spring Boot structuring code: https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html
- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- PyPA src layout: https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/
- Go module layout: https://go.dev/doc/modules/layout
- arc42: https://arc42.org/
- C4 model: https://c4model.info/
- SEI Views and Beyond: https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/
- Multivocal literature review guideline: https://doi.org/10.1016/j.infsof.2018.09.006

## 검증

- `python3 -m json.tool` on changed JSON configs: pass
- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`: 23 tests OK
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 82 tests OK
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /private/tmp/maintainable-language-plan.json`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/maintainable-language-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/maintainable-language-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/task-board/src/task_board.py --check`: pass
- `python3 _tools/workspace-index/src/workspace_index.py --check`: pass
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/maintainable-language-eval.json`: `ready_to_close`

## 남은 개선 아이디어

- 여러 실제 프로젝트가 쌓이면 언어/런타임 선택을 점수화하는 별도 rubric을 추가할 수 있다.

## 관련 파일

- 요구사항: `_requirements/baselines/2026-05-31-workspace-platform.ko.md`
- 스펙: `_specs/workspace-platform/2026-06-01-maintainable-language-architecture-folders/spec.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-01-maintainable-language-architecture-folders.ko.md`
- 요청 추적: `_history/request-traces/2026/2026-06-01.ko.md`
- 작업 요약: `_history/work-summaries/2026/2026-06-01.ko.md`
