# 계획: 딥리서치 에이전트

1. 웹 검색 기록, 요구사항 변경/검토, 스펙 산출물, timing record를 만든다.
2. `deep-research-profile.json`과 `deep-research-template.json`을 self-documenting config로 추가한다.
3. `agent-platform/src/agent_platform/planning/deep_research.py`와 CLI `complete-deep-research`를 추가한다.
4. 단위 테스트로 ready 상태와 주요 누락 gap을 고정한다.
5. agent spec, 문서, workflow, prompt router, README, memory bootstrap, workspace-health config contract를 연결한다.
6. task board, workspace index, memory/config checks, tests, grounding, evaluator를 실행한다.
7. 히스토리/요약/trace/evaluation/timing을 갱신하고 commit/push한다.

## 근거 매핑

- deep research multi-source report pattern <- OpenAI API Deep Research, Exa Research API, LangChain Deep Agents docs
- citation audit 필요성 <- Cited but Not Verified, ReportBench
- 별도 모듈 선택 <- 기존 `research_insight_planner.py`는 계획 readiness, 새 요청은 report readiness

