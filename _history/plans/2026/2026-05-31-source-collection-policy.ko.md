# 출처 수집 정책 계획

## 초기 요청

- "웹 검색의 경우 공신력이 높은 자료들을 최대한 많이 모아서 진행하고 특히 외국 기술블로그 그런 것들 조사 아티클 조사 좋아요 수가 많은 아티클이나 링크드인 논문등이나 그런 것들도 있지 그런걸 모으는거야."

## 계획 목적

- 웹 검색 시 공신력 높은 자료, 외국 기술 블로그, 조사 아티클, 논문, LinkedIn/커뮤니티/좋아요 신호를 폭넓게 수집하는 규칙을 추가한다.
- 소셜/인기도 신호를 사실 근거가 아니라 adoption/discovery 신호로 구분한다.

## 검색 질문

- 웹 출처의 신뢰도와 권위를 평가하는 기준은 무엇인가?
- 소프트웨어 분야에서 논문 외 기술 블로그와 grey literature를 함께 보는 근거는 무엇인가?
- 좋아요, LinkedIn 반응, stars 같은 인기도 신호는 어떻게 사용해야 하는가?

## 검색 채널

- 웹 검색
- 공식 문서/대학 가이드
- 논문
- 저장소 내부 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Harvard Evaluating Web Sources | https://usingsources.fas.harvard.edu/evaluating-web-sources-0 | 권위, 정확성, corroboration, 최신성 |
| Google E-E-A-T update | https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t | 경험, 전문성, 권위, 신뢰성 |
| Google Helpful Reliable Content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | sourcing, author/site background |
| MLR guidelines in software engineering | https://arxiv.org/abs/1707.02553 | grey literature와 formal literature 결합 근거 |
| OpenAI Academy Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | 최신 정보와 출처 검토 |

## 지식 베이스 검증

- 내부 운영 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증한다.
- 검증 대상: `_docs/web-first-work-policy.ko.md`, `_ops/workflows/05-web-first-intake.md`, `_ops/workflows/55-research-insight-planning.md`, `AGENTS.md`, `README.md`
- 기대 결과: `ready_to_reference`

## 도출한 인사이트

- 검색 출처는 공식 문서와 논문만으로 제한하면 실무 adoption과 현업 제약을 놓칠 수 있다.
- 기술 블로그와 조사 아티클은 현업 맥락을 주지만 품질 평가와 교차 검증이 필요하다.
- 좋아요/공유/댓글/LinkedIn/GitHub stars/HN 점수는 인기도와 adoption 신호일 뿐, 단독 사실 근거가 아니다.

## 계획 단계

1. `_docs/source-collection-policy.ko.md`와 `.en.md`를 추가한다.
2. web-first policy, web-first prompt/workflow, research insight prompt/workflow에 출처 묶음 기준을 반영한다.
3. persistent instructions, workspace rules, README, AGENTS, ops index를 갱신한다.
4. 리서치 노트를 `_research/topics/agent-planning/`에 저장한다.
5. 계획/평가/히스토리를 저장한다.
6. 맵 갱신, 테스트, evaluator 검증 후 커밋하고 push한다.

## 제외하거나 보류한 선택지

- 별도 source-quality evaluator 구현은 보류한다. 출처 점수화가 반복되면 `agent-platform`에 추가한다.
- social scraping 자동화는 보류한다. 현재는 검색과 수동 평가 기준을 먼저 문서화한다.

## 위험과 불확실성

- 많은 출처 수집은 시간이 늘어난다.
- 인기도 신호는 마케팅이나 플랫폼 편향에 취약하다.
- 일부 좋은 자료는 paywall 뒤에 있을 수 있다.

## 검증 방법

- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>`
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | source collection policy를 별도 문서로 분리 | web-first와 출처 품질 기준을 분리해 재사용하기 위함 |
