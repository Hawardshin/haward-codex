# 구현 계획

1. 웹 검색으로 large codebase/context/source splitting reference를 확인한다.
2. 기존 parallel work, context archive, omission/resource guard 구조를 확인해 겹치는 부분을 분리한다.
3. `large-scope-decomposition-profile.json`을 자기 설명 설정으로 추가한다.
4. `large-scope-decomposer-agent.json`과 한/영 agent docs를 추가한다.
5. 정책, workflow, prompt를 추가하고 router/start workflow/persistent instructions/AGENTS에 연결한다.
6. memory bootstrap에 warm anchor로 추가한다.
7. 요구사항 기준선, 변경/검토 기록, spec artifacts, history records를 갱신한다.
8. config, agent, memory, docs, naming, workspace monitor snapshot, omission, grounding, evaluator를 검증한다.
9. 커밋하고 push한다.
