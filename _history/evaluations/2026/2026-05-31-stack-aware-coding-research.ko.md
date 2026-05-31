# 작업 평가: 스택별 코딩 조사

## 초기 지시

코딩 조사는 Java/Spring Boot, C, React, Next.js처럼 기술별 공식 문서/표준을 따로 고려하고, Stack Overflow/Reddit/GitHub 토론과 반응 신호도 좋은 조사 자료로 기록해야 한다.

## 결과 요약

- `coding-research-agent` 입력과 readiness checker에 `technology_stack`, `technology_official_docs`, `stack_version_constraints`, `issue_discussion_sources`, `issue_discussion_notes`, `community_signal_notes`를 추가했다.
- known stack의 공식 문서/표준 누락, 이슈/토론 기록 누락, 커뮤니티 신호 해석 누락을 구현 전 gap으로 잡도록 했다.
- coding research profile, template, docs, prompt, workflow, persistent instructions, requirements, specs, history, research note, coordination board를 갱신했다.

## 평가 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 초기 지시와 결과 차이: 없음
- 남은 gap: 없음
- 개선 아이디어: 새 기술 스택이 반복되면 official-doc hint mapping을 확장한다.

## 확인한 레퍼런스

- Spring Boot Reference Documentation: https://docs.spring.io/spring-boot/reference/index.html
- React docs: https://react.dev/learn
- Next.js docs: https://nextjs.org/docs
- ISO/IEC 9899:2024: https://www.iso.org/standard/82075.html
- Stack Overflow vote-up privilege: https://stackoverflow.com/help/privileges/vote-up
- GitHub Reactions API docs: https://docs.github.com/en/rest/reactions/reactions
- 기존 코딩 조사 문서: `agent-platform/docs/coding-research-agent.ko.md`
- 기존 아키텍처 우선 코딩 정책: `_docs/architecture-first-coding-policy.ko.md`

## 검증

- `python3 -m json.tool` changed JSON configs: 통과
- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`: 18 tests 통과
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 77 tests 통과
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /private/tmp/stack-aware-coding-plan.json`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/stack-aware-coding-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/stack-aware-coding-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/task-board/src/task_board.py --check`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/stack-aware-coding-eval.json`: `ready_to_close`

## 결론

요구사항은 반영됐다. 앞으로 코딩 조사는 일반적인 "공식 문서 확인"만으로 닫을 수 없고, 기술 스택별 공식 문서/표준, 버전 제약, high-signal 이슈/토론 출처, 커뮤니티 신호 해석을 함께 남겨야 한다.
